import { brandColors, brandTypography } from './src/config/theme.js'

export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js}"
  ],
  theme: {
    extend: {
      colors: {
        primary: brandColors.primary,
        secondary: brandColors.secondary,
        tertiary: brandColors.tertiary,
        accent: brandColors.accent,
        indigo: brandColors.indigo,
        coral: brandColors.coral,
        neutral: brandColors.neutral,
      },
      fontFamily: {
        primary: brandTypography.primary,
        secondary: brandTypography.secondary,
      }
    }
  },
  plugins: []
}
