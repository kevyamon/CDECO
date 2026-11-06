/**
 * =============================================================================
 * DESIGN SYSTEM - TOKENS DE COULEURS OFFICIELS CDECO
 * =============================================================================
 *
 * Centralisation stricte des valeurs de couleurs pour bannir les couleurs
 * hexadécimales codées en dur ou les classes arbitraires dans les composants.
 */

export const colors = Object.freeze({
  brand: {
    blue: "hsl(var(--cdeco-blue))",
    blueLight: "hsl(var(--cdeco-blue-light))",
    gold: "hsl(var(--cdeco-gold))",
    goldLight: "hsl(var(--cdeco-gold-light))",
    green: "hsl(var(--cdeco-green))",
    red: "hsl(var(--cdeco-red))",
  },
  surface: {
    background: "hsl(var(--background))",
    foreground: "hsl(var(--foreground))",
    card: "hsl(var(--card))",
    cardForeground: "hsl(var(--card-foreground))",
    popover: "hsl(var(--popover))",
    popoverForeground: "hsl(var(--popover-foreground))",
  },
  semantic: {
    primary: "hsl(var(--primary))",
    primaryForeground: "hsl(var(--primary-foreground))",
    secondary: "hsl(var(--secondary))",
    secondaryForeground: "hsl(var(--secondary-foreground))",
    destructive: "hsl(var(--destructive))",
    destructiveForeground: "hsl(var(--destructive-foreground))",
    muted: "hsl(var(--muted))",
    mutedForeground: "hsl(var(--muted-foreground))",
    accent: "hsl(var(--accent))",
    accentForeground: "hsl(var(--accent-foreground))",
    border: "hsl(var(--border))",
    input: "hsl(var(--input))",
    ring: "hsl(var(--ring))",
  },
});

export default colors;

