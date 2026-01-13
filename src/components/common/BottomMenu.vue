<template>
  <div class="bottom-menu">
    <!-- Tab Navigation -->
    <div class="menu-tabs">
      <button
        v-for="tab in tabs"
        :key="tab.id"
        @click="activeTab = tab.id"
        :class="['menu-tab', { active: activeTab === tab.id }]"
      >
        <img :src="tab.icon" :alt="tab.label" class="tab-icon" />
        <span class="tab-label">{{ tab.label }}</span>
      </button>
    </div>

    <!-- Tab Content -->
    <div class="menu-content">
      <!-- Máquinas Tab -->
      <div v-if="activeTab === 'machines'" class="tab-pane machines-pane">
        <div class="machines-grid">
          <button
            v-for="machine in machines"
            :key="machine.id"
            @click="selectMachine(machine)"
            :class="['machine-card', { selected: selectedMachine?.id === machine.id }]"
          >
            <div class="machine-icon">
              <img src="/assets/iconoEventos1.png" alt="Machine" />
            </div>
            <div class="machine-info">
              <h3 class="machine-name">{{ machine.name }}</h3>
              <p class="machine-status">{{ machine.status }}</p>
            </div>
          </button>
        </div>
      </div>

      <!-- Mediciones Tab -->
      <div v-if="activeTab === 'measurements'" class="tab-pane measurements-pane">
        <div class="measurements-container">
          <div v-if="selectedMachine" class="machine-header">
            <h2 class="selected-machine-name">{{ selectedMachine.name }}</h2>
            <p class="selected-machine-status">{{ selectedMachine.status }}</p>
          </div>
          <div v-else class="no-selection">
            <p>Selecciona una máquina para ver sus mediciones</p>
          </div>

          <!-- Mediciones Grid -->
          <div class="measurements-grid">
            <div
              v-for="(measurement, index) in measurements"
              :key="index"
              class="measurement-card"
            >
              <div class="measurement-header">
                <span class="measurement-type">{{ measurement.type }}</span>
                <span class="measurement-time">{{ measurement.time }}</span>
              </div>
              <div class="measurement-value">
                {{ measurement.value }}
              </div>
              <div class="measurement-unit">
                {{ measurement.unit }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const activeTab = ref('machines')
const selectedMachine = ref(null)

const tabs = [
  {
    id: 'machines',
    label: 'Máquinas',
    icon: '/assets/iconoEventos1.png'
  },
  {
    id: 'measurements',
    label: 'Mediciones',
    icon: '/assets/iconoEventos2.png'
  }
]

const machines = [
  {
    id: 1,
    name: 'Máquina A',
    status: 'Activa'
  },
  {
    id: 2,
    name: 'Máquina B',
    status: 'Activa'
  },
  {
    id: 3,
    name: 'Máquina C',
    status: 'Inactiva'
  },
  {
    id: 4,
    name: 'Máquina D',
    status: 'Activa'
  }
]

const measurements = [
  {
    type: 'Temperatura',
    value: '45.2',
    unit: '°C',
    time: '14:32'
  },
  {
    type: 'Presión',
    value: '1.2',
    unit: 'bar',
    time: '14:32'
  },
  {
    type: 'Velocidad',
    value: '850',
    unit: 'RPM',
    time: '14:31'
  },
  {
    type: 'Vibración',
    value: '2.1',
    unit: 'mm/s',
    time: '14:30'
  },
  {
    type: 'Humedad',
    value: '65',
    unit: '%',
    time: '14:29'
  },
  {
    type: 'Corriente',
    value: '12.5',
    unit: 'A',
    time: '14:28'
  }
]

const selectMachine = (machine) => {
  selectedMachine.value = machine
}
</script>

<style scoped>
.bottom-menu {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: #000;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  z-index: 9999;
  height: auto;
  max-height: 60vh;
  display: flex;
  flex-direction: column;
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.5);
}

.menu-tabs {
  display: flex;
  gap: 0;
  padding: 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.menu-tab {
  flex: 1;
  padding: 1rem;
  background: transparent;
  border: none;
  color: #999;
  font-family: 'Standard', sans-serif;
  font-size: 0.85rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  border-bottom: 2px solid transparent;
}

.menu-tab:hover {
  color: #51C1E1;
}

.menu-tab.active {
  color: #FFD25C;
  border-bottom-color: #FFD25C;
}

.tab-icon {
  width: 24px;
  height: 24px;
  object-fit: contain;
}

.tab-label {
  font-size: 0.7rem;
}

.menu-content {
  flex: 1;
  overflow-y: auto;
  padding: 1.5rem;
}

.tab-pane {
  animation: fadeIn 0.3s ease;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

/* Máquinas Tab */
.machines-pane {
  max-height: 400px;
}

.machines-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  gap: 1rem;
}

.machine-card {
  padding: 1rem;
  background: rgba(255, 210, 92, 0.05);
  border: 1px solid rgba(255, 210, 92, 0.2);
  border-radius: 0.75rem;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
}

.machine-card:hover {
  border-color: rgba(255, 210, 92, 0.4);
  background: rgba(255, 210, 92, 0.1);
}

.machine-card.selected {
  border-color: #FFD25C;
  background: rgba(255, 210, 92, 0.15);
}

.machine-icon {
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(81, 193, 225, 0.1);
  border-radius: 0.5rem;
}

.machine-icon img {
  width: 32px;
  height: 32px;
  object-fit: contain;
}

.machine-info {
  text-align: center;
}

.machine-name {
  font-family: 'Napzer Rounded', sans-serif;
  font-size: 0.9rem;
  color: #fff;
  margin: 0;
  font-weight: 600;
}

.machine-status {
  font-family: 'Standard', sans-serif;
  font-size: 0.75rem;
  color: #51C1E1;
  margin: 0.25rem 0 0 0;
}

/* Mediciones Tab */
.measurements-pane {
  max-height: 400px;
}

.measurements-container {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.machine-header {
  padding-bottom: 1rem;
  border-bottom: 1px solid rgba(255, 210, 92, 0.2);
}

.selected-machine-name {
  font-family: 'Napzer Rounded', sans-serif;
  font-size: 1.25rem;
  color: #FFD25C;
  margin: 0 0 0.5rem 0;
  font-weight: 600;
}

.selected-machine-status {
  font-family: 'Standard', sans-serif;
  font-size: 0.85rem;
  color: #51C1E1;
  margin: 0;
}

.no-selection {
  text-align: center;
  padding: 2rem 1rem;
  color: #999;
  font-family: 'Standard', sans-serif;
  font-size: 0.9rem;
}

.measurements-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
  gap: 1rem;
}

.measurement-card {
  padding: 1rem;
  background: rgba(81, 193, 225, 0.05);
  border: 1px solid rgba(81, 193, 225, 0.2);
  border-radius: 0.75rem;
  text-align: center;
}

.measurement-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.75rem;
  padding-bottom: 0.75rem;
  border-bottom: 1px solid rgba(81, 193, 225, 0.1);
}

.measurement-type {
  font-family: 'Standard', sans-serif;
  font-size: 0.75rem;
  color: #51C1E1;
  font-weight: 600;
  text-transform: uppercase;
}

.measurement-time {
  font-family: 'Standard', sans-serif;
  font-size: 0.7rem;
  color: #666;
}

.measurement-value {
  font-family: 'Napzer Rounded', sans-serif;
  font-size: 1.5rem;
  color: #FFD25C;
  font-weight: 600;
  margin-bottom: 0.25rem;
}

.measurement-unit {
  font-family: 'Standard', sans-serif;
  font-size: 0.75rem;
  color: #999;
}

/* Scrollbar personalizado */
.menu-content::-webkit-scrollbar {
  width: 6px;
}

.menu-content::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.05);
}

.menu-content::-webkit-scrollbar-thumb {
  background: rgba(255, 210, 92, 0.3);
  border-radius: 3px;
}

.menu-content::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 210, 92, 0.5);
}

@media (max-width: 640px) {
  .menu-tabs {
    padding: 0.5rem 0;
  }

  .menu-tab {
    padding: 0.75rem 0.5rem;
    font-size: 0.75rem;
  }

  .menu-content {
    padding: 1rem;
  }

  .machines-grid,
  .measurements-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 0.75rem;
  }
}
</style>
