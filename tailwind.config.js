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
      'xs': ['0.9rem', { lineHeight: '1.25rem' }], // 12px -> 15px
      'sm': ['1.05rem', { lineHeight: '1.5rem' }], // 14px -> 17.5px
      'base': ['1.2rem', { lineHeight: '1.8rem' }], // 16px -> 20px
      'lg': ['1.35rem', { lineHeight: '2rem' }], // 18px -> 22.5px
      'xl': ['1.5rem', { lineHeight: '2.25rem' }], // 20px -> 25px
      '2xl': ['1.8rem', { lineHeight: '2.4rem' }], // 24px -> 30px
      '3xl': ['2.25rem', { lineHeight: '2.7rem' }], // 30px -> 37.5px
      '4xl': ['2.7rem', { lineHeight: '3rem' }], // 36px -> 45px
      '5xl': ['3.6rem', { lineHeight: '1' }], // 48px -> 60px
      '6xl': ['4.5rem', { lineHeight: '1' }], // 60px -> 75px
      '7xl': ['6rem', { lineHeight: '1' }], // 72px -> 90px
      '8xl': ['7.2rem', { lineHeight: '1' }], // 96px -> 120px
      '9xl': ['9.6rem', { lineHeight: '1' }], // 128px -> 160px
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
