export const keyframes = {
  "accordion-down": {
    from: { height: "0" },
    to: { height: "var(--radix-accordion-content-height)" },
  },
  "accordion-up": {
    from: { height: "var(--radix-accordion-content-height)" },
    to: { height: "0" },
  },
  "fade-in": {
    "0%": { opacity: "0" },
    "100%": { opacity: "1" },
  },
  "fade-out": {
    "0%": { opacity: "1" },
    "100%": { opacity: "0" },
  },
  "scale-in": {
    "0%": { opacity: "0", transform: "scale(0.95)" },
    "100%": { opacity: "1", transform: "scale(1)" },
  },
  "pulse-glow": {
    "0%, 100%": {
      boxShadow: "0 0 15px 5px rgba(23, 190, 187, 0.2)"
    },
    "50%": {
      boxShadow: "0 0 25px 8px rgba(23, 190, 187, 0.4)"
    }
  }
};

export const animations = {
  "accordion-down": "accordion-down 0.2s ease-out",
  "accordion-up": "accordion-up 0.2s ease-out",
  "fade-in": "fade-in 0.5s ease-out forwards",
  "fade-out": "fade-out 0.5s ease-out forwards",
  "scale-in": "scale-in 0.2s ease-out",
  "pulse-glow": "pulse-glow 3s ease-in-out infinite"
};