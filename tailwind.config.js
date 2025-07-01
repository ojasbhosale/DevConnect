/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/app/**/*.{ts,tsx}',
    './src/components/**/*.{ts,tsx}',
    './src/lib/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui'],
        mono: ['Fira Code', 'ui-monospace', 'SFMono-Regular'],
      },
      colors: {
        background: '#0f1117',
        foreground: '#ffffff',
        muted: '#6b7280',
        border: '#2a2d38',
        accent: '#3b82f6', // blue-500
        brand: {
          DEFAULT: '#6366f1',  // Indigo-500
          dark: '#4f46e5',
          light: '#818cf8',
        },
        success: '#22c55e',
        warning: '#facc15',
        danger: '#ef4444',
      },
      boxShadow: {
        soft: '0 2px 10px rgba(0, 0, 0, 0.1)',
        focus: '0 0 0 2px rgba(99, 102, 241, 0.5)', // brand focus
      },
      borderRadius: {
        xl: '1rem',
        '2xl': '1.5rem',
      },
      spacing: {
        'layout-gutter': '1.25rem',
      },
    },
  },
  plugins: [],
};
