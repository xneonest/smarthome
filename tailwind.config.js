/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive) / <alpha-value>)",
          foreground: "hsl(var(--destructive-foreground) / <alpha-value>)",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        neonest: {
          bg: {
            primary: '#0D0D0F',
            secondary: '#16161A',
            elevated: '#1E1E24',
          },
          accent: {
            cyan: '#00E6C8',
            blue: '#00A8E8',
            green: '#00D26A',
          },
          border: {
            subtle: 'rgba(255,255,255,0.08)',
            glow: 'rgba(0,230,200,0.25)',
          },
          text: {
            primary: '#FFFFFF',
            secondary: 'rgba(255,255,255,0.65)',
            muted: 'rgba(255,255,255,0.4)',
          }
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      borderRadius: {
        xl: "calc(var(--radius) + 4px)",
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        xs: "calc(var(--radius) - 6px)",
      },
      boxShadow: {
        xs: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
        card: "0 8px 32px rgba(0,0,0,0.4)",
        float: "0 16px 48px rgba(0,0,0,0.5)",
        glowCyan: "0 0 24px rgba(0,230,200,0.3), 0 0 60px rgba(0,230,200,0.1)",
        glowBlue: "0 0 24px rgba(0,168,232,0.25)",
        textGlow: "0 0 40px rgba(0,230,200,0.35)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "caret-blink": {
          "0%,70%,100%": { opacity: "1" },
          "20%,50%": { opacity: "0" },
        },
        "ring-rotate": {
          from: { transform: "rotate(0deg)" },
          to: { transform: "rotate(360deg)" },
        },
        "ring-rotate-reverse": {
          from: { transform: "rotate(0deg)" },
          to: { transform: "rotate(-360deg)" },
        },
        "ambient-breathe": {
          "0%, 100%": { opacity: "0.6" },
          "50%": { opacity: "1" },
        },
        "pulse-glow": {
          "0%, 100%": { boxShadow: "0 0 24px rgba(0,230,200,0.3), 0 0 60px rgba(0,230,200,0.1)" },
          "50%": { boxShadow: "0 0 32px rgba(0,230,200,0.5), 0 0 80px rgba(0,230,200,0.2)" },
        },
        "float": {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "caret-blink": "caret-blink 1.25s ease-out infinite",
        "ring-rotate": "ring-rotate 8s linear infinite",
        "ring-rotate-reverse": "ring-rotate-reverse 6s linear infinite",
        "ambient-breathe": "ambient-breathe 6s ease-in-out infinite",
        "ambient-breathe-delayed": "ambient-breathe 8s ease-in-out infinite 2s",
        "pulse-glow": "pulse-glow 3s ease-in-out infinite",
        "float": "float 4s ease-in-out infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
