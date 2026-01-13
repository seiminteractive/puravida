import pool from '../config/database.js'

// Obtener todos los eventos con sus relaciones
export const getAllEvents = async () => {
  const connection = await pool.getConnection()
  try {
    // Obtener eventos
    const [events] = await connection.query(
      'SELECT * FROM events ORDER BY fecha_mes DESC, fecha_dia DESC'
    )

    // Para cada evento, obtener sus relaciones
    for (const event of events) {
      // Obtener artistas
      const [artists] = await connection.query(
        'SELECT * FROM event_artists WHERE event_id = ?',
        [event.id]
      )
      event.artists = artists

      // Obtener tickets
      const [tickets] = await connection.query(
        'SELECT * FROM ticket_links WHERE event_id = ?',
        [event.id]
      )
      event.tickets = tickets

      // Obtener mesas
      const [mesas] = await connection.query(
        'SELECT * FROM event_mesas WHERE event_id = ?',
        [event.id]
      )
      event.mesas = mesas[0] || null

      // Obtener hospedaje
      const [lodging] = await connection.query(
        'SELECT * FROM event_lodging WHERE event_id = ?',
        [event.id]
      )
      event.lodging = lodging[0] || null

      // Obtener transportes
      const [transports] = await connection.query(
        'SELECT * FROM event_transports WHERE event_id = ?',
        [event.id]
      )
      
      // Para cada transporte, obtener contactos
      for (const transport of transports) {
        const [contacts] = await connection.query(
          'SELECT * FROM transport_contacts WHERE transport_id = ?',
          [transport.id]
        )
        transport.contacts = contacts
      }
      event.transports = transports
    }

    return events
  } finally {
    connection.release()
  }
}

// Obtener un evento por ID con sus relaciones
export const getEventById = async (id) => {
  const connection = await pool.getConnection()
  try {
    const [events] = await connection.query(
      'SELECT * FROM events WHERE id = ?',
      [id]
    )

    if (events.length === 0) {
      return null
    }

    const event = events[0]

    // Obtener relaciones
    const [artists] = await connection.query(
      'SELECT * FROM event_artists WHERE event_id = ?',
      [event.id]
    )
    event.artists = artists

    const [tickets] = await connection.query(
      'SELECT * FROM ticket_links WHERE event_id = ?',
      [event.id]
    )
    event.tickets = tickets

    const [mesas] = await connection.query(
      'SELECT * FROM event_mesas WHERE event_id = ?',
      [event.id]
    )
    event.mesas = mesas[0] || null

    const [lodging] = await connection.query(
      'SELECT * FROM event_lodging WHERE event_id = ?',
      [event.id]
    )
    event.lodging = lodging[0] || null

    const [transports] = await connection.query(
      'SELECT * FROM event_transports WHERE event_id = ?',
      [event.id]
    )
    
    for (const transport of transports) {
      const [contacts] = await connection.query(
        'SELECT * FROM transport_contacts WHERE transport_id = ?',
        [transport.id]
      )
      transport.contacts = contacts
    }
    event.transports = transports

    return event
  } finally {
    connection.release()
  }
}

// Crear nuevo evento
export const createEvent = async (eventData) => {
  const connection = await pool.getConnection()
  try {
    await connection.beginTransaction()

    // 1. Crear el evento principal
    const [result] = await connection.query(
      `INSERT INTO events (dj, fecha_dia, fecha_mes, lugar, descripcion, media_url, transports_enabled)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [
        eventData.dj,
        eventData.fecha_dia,
        eventData.fecha_mes,
        eventData.lugar,
        eventData.descripcion,
        eventData.media_url || null,
        eventData.transports_enabled || false
      ]
    )

    const eventId = result.insertId

    // 2. Insertar artistas (obligatorio - mínimo 1)
    if (eventData.artists && eventData.artists.length > 0) {
      for (const artist of eventData.artists) {
        await connection.query(
          `INSERT INTO event_artists (event_id, artist_name, image_url, media_type)
           VALUES (?, ?, ?, ?)`,
          [eventId, artist.artist_name, artist.image_url, artist.media_type || 'image']
        )
      }
    }

    // 3. Insertar tickets (obligatorio - mínimo 1)
    if (eventData.tickets && eventData.tickets.length > 0) {
      for (const ticket of eventData.tickets) {
        await connection.query(
          `INSERT INTO ticket_links (event_id, ticketer_name, link_url)
           VALUES (?, ?, ?)`,
          [eventId, ticket.ticketer_name, ticket.link_url]
        )
      }
    }

    // 4. Insertar mesas (opcional)
    if (eventData.mesas) {
      await connection.query(
        `INSERT INTO event_mesas (event_id, enabled, image_url, description, whatsapp_number)
         VALUES (?, ?, ?, ?, ?)`,
        [
          eventId,
          eventData.mesas.enabled !== false,
          eventData.mesas.image_url || null,
          eventData.mesas.description || null,
          eventData.mesas.whatsapp_number || null
        ]
      )
    }

    // 5. Insertar hospedaje (opcional)
    if (eventData.lodging) {
      await connection.query(
        `INSERT INTO event_lodging (event_id, enabled, image_url, description)
         VALUES (?, ?, ?, ?)`,
        [
          eventId,
          eventData.lodging.enabled !== false,
          eventData.lodging.image_url || null,
          eventData.lodging.description || null
        ]
      )
    }

    // 6. Insertar transportes (opcional)
    if (eventData.transports && eventData.transports.length > 0) {
      for (const transport of eventData.transports) {
        const [transportResult] = await connection.query(
          `INSERT INTO event_transports (event_id, transport_name, image_url, description)
           VALUES (?, ?, ?, ?)`,
          [eventId, transport.transport_name, transport.image_url || null, transport.description || null]
        )

        // Insertar contactos del transporte (con nombre y número)
        if (transport.contacts && transport.contacts.length > 0) {
          for (const contact of transport.contacts) {
            // Aceptar strings (solo número) u objetos { name: "...", contact: "..." }
            let contactName = 'Contacto'
            let contactValue = contact
            
            if (typeof contact === 'object' && contact !== null) {
              contactName = contact.name || 'Contacto'
              contactValue = contact.contact || contact.number || contact
            }
            
            if (contactValue) { // Solo insertar si hay valor
              await connection.query(
                `INSERT INTO transport_contacts (transport_id, contact_name, contact)
                 VALUES (?, ?, ?)`,
                [transportResult.insertId, contactName, contactValue]
              )
            }
          }
        }
      }
    }

    await connection.commit()

    // Retornar el evento creado
    return await getEventById(eventId)
  } catch (error) {
    await connection.rollback()
    throw error
  } finally {
    connection.release()
  }
}

// Actualizar evento
export const updateEvent = async (id, eventData) => {
  const connection = await pool.getConnection()
  try {
    await connection.beginTransaction()

    // Verificar si el evento existe
    const [existing] = await connection.query('SELECT id FROM events WHERE id = ?', [id])
    if (existing.length === 0) {
      return null
    }

    // 1. Actualizar evento principal
    await connection.query(
      `UPDATE events 
       SET dj = ?, fecha_dia = ?, fecha_mes = ?, lugar = ?, descripcion = ?, media_url = ?, transports_enabled = ?
       WHERE id = ?`,
      [
        eventData.dj,
        eventData.fecha_dia,
        eventData.fecha_mes,
        eventData.lugar,
        eventData.descripcion,
        eventData.media_url || null,
        eventData.transports_enabled || false,
        id
      ]
    )

    // 2. Actualizar artistas (eliminar y recrear)
    if (eventData.artists) {
      await connection.query('DELETE FROM event_artists WHERE event_id = ?', [id])
      for (const artist of eventData.artists) {
        await connection.query(
          `INSERT INTO event_artists (event_id, artist_name, image_url, media_type)
           VALUES (?, ?, ?, ?)`,
          [id, artist.artist_name, artist.image_url, artist.media_type || 'image']
        )
      }
    }

    // 3. Actualizar tickets (eliminar y recrear)
    if (eventData.tickets) {
      await connection.query('DELETE FROM ticket_links WHERE event_id = ?', [id])
      for (const ticket of eventData.tickets) {
        await connection.query(
          `INSERT INTO ticket_links (event_id, ticketer_name, link_url)
           VALUES (?, ?, ?)`,
          [id, ticket.ticketer_name, ticket.link_url]
        )
      }
    }

    // 4. Actualizar mesas
    if (eventData.mesas) {
      await connection.query('DELETE FROM event_mesas WHERE event_id = ?', [id])
      await connection.query(
        `INSERT INTO event_mesas (event_id, enabled, image_url, description, whatsapp_number)
         VALUES (?, ?, ?, ?, ?)`,
        [
          id,
          eventData.mesas.enabled !== false,
          eventData.mesas.image_url || null,
          eventData.mesas.description || null,
          eventData.mesas.whatsapp_number || null
        ]
      )
    }

    // 5. Actualizar hospedaje
    if (eventData.lodging) {
      await connection.query('DELETE FROM event_lodging WHERE event_id = ?', [id])
      await connection.query(
        `INSERT INTO event_lodging (event_id, enabled, image_url, description)
         VALUES (?, ?, ?, ?)`,
        [
          id,
          eventData.lodging.enabled !== false,
          eventData.lodging.image_url || null,
          eventData.lodging.description || null
        ]
      )
    }

    // 6. Actualizar transportes
    if (eventData.transports) {
      await connection.query('DELETE FROM event_transports WHERE event_id = ?', [id])
      for (const transport of eventData.transports) {
        const [transportResult] = await connection.query(
          `INSERT INTO event_transports (event_id, transport_name, image_url, description)
           VALUES (?, ?, ?, ?)`,
          [id, transport.transport_name, transport.image_url || null, transport.description || null]
        )

        if (transport.contacts && transport.contacts.length > 0) {
          for (const contact of transport.contacts) {
            // Aceptar strings (solo número) u objetos { name: "...", contact: "..." }
            let contactName = 'Contacto'
            let contactValue = contact
            
            if (typeof contact === 'object' && contact !== null) {
              contactName = contact.name || 'Contacto'
              contactValue = contact.contact || contact.number || contact
            }
            
            if (contactValue) { // Solo insertar si hay valor
              await connection.query(
                `INSERT INTO transport_contacts (transport_id, contact_name, contact)
                 VALUES (?, ?, ?)`,
                [transportResult.insertId, contactName, contactValue]
              )
            }
          }
        }
      }
    }

    await connection.commit()

    // Retornar el evento actualizado
    return await getEventById(id)
  } catch (error) {
    await connection.rollback()
    throw error
  } finally {
    connection.release()
  }
}

// Eliminar evento
export const deleteEvent = async (id) => {
  const connection = await pool.getConnection()
  try {
    const [result] = await connection.query('DELETE FROM events WHERE id = ?', [id])
    
    return result.affectedRows > 0
  } finally {
    connection.release()
  }
}
