/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    "*.{js,ts,jsx,tsx,mdx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    fontSize: {
      'xs': ['0.675rem', { lineHeight: '1rem' }], // 12px -> 10.8px
      'sm': ['0.788rem', { lineHeight: '1.125rem' }], // 14px -> 12.6px
      'base': ['0.9rem', { lineHeight: '1.35rem' }], // 16px -> 14.4px
      'lg': ['1.013rem', { lineHeight: '1.463rem' }], // 18px -> 16.2px
      'xl': ['1.125rem', { lineHeight: '1.575rem' }], // 20px -> 18px
      '2xl': ['1.35rem', { lineHeight: '1.8rem' }], // 24px -> 21.6px
      '3xl': ['1.688rem', { lineHeight: '2.025rem' }], // 30px -> 27px
      '4xl': ['2.025rem', { lineHeight: '2.25rem' }], // 36px -> 32.4px
      '5xl': ['2.7rem', { lineHeight: '1' }], // 48px -> 43.2px
      '6xl': ['3.375rem', { lineHeight: '1' }], // 60px -> 54px
      '7xl': ['4.05rem', { lineHeight: '1' }], // 72px -> 64.8px
      '8xl': ['5.4rem', { lineHeight: '1' }], // 96px -> 86.4px
      '9xl': ['7.2rem', { lineHeight: '1' }], // 128px -> 115.2px
    },
    extend: {
      fontFamily: {
        apple: [
          "-apple-system",
          "BlinkMacSystemFont",
          "SF Pro Display",
          "SF Pro Text",
          "Segoe UI",
          "Roboto",
          "Helvetica Neue",
          "Arial",
          "sans-serif",
        ],
        sans: [
          "-apple-system",
          "BlinkMacSystemFont",
          "SF Pro Display",
          "SF Pro Text",
          "Segoe UI",
          "Roboto",
          "Helvetica Neue",
          "Arial",
          "sans-serif",
        ],
      },
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
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
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
        // 自定义绿色
        "custom-green": {
          DEFAULT: "#13C2A3",
          50: "#E6F9F5",
          100: "#CCF3EB",
          200: "#99E7D7",
          300: "#66DBC3",
          400: "#33CFAF",
          500: "#13C2A3",
          600: "#0F9B82",
          700: "#0B7461",
          800: "#074D41",
          900: "#032620",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
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
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
