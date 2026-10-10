/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // ArtCraft CSS variable bindings
        bg: 'var(--bg)',
        'bg-raised': 'var(--bg-raised)',
        'bg-sunken': 'var(--bg-sunken)',
        ink: 'var(--ink)',
        'ink-strong': 'var(--ink-strong)',
        muted: 'var(--muted)',
        faint: 'var(--faint)',
        line: 'var(--line)',
        'line-strong': 'var(--line-strong)',
        accent: 'var(--accent)',
        'accent-ink': 'var(--accent-ink)',
        'invert-bg': 'var(--invert-bg)',
        'invert-fg': 'var(--invert-fg)',
        danger: 'var(--danger)',

        // Fallbacks / legacy aliases for existing component compatibility
        midnight: 'var(--bg)',
        deep: 'var(--bg-sunken)',
        evening: 'var(--bg-raised)',
        snow: 'var(--ink-strong)',
        silver: 'var(--ink)',
        'light-gray': 'var(--muted)',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Archivo', 'sans-serif'],
        serif: ['"Instrument Serif"', 'serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      letterSpacing: {
        hud: '0.15em',
        cta: '0.12em',
      },
      animation: {
        'pulse-subtle': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      }
    },
  },
  plugins: [],
}
