// src/theme.ts
export const colors = {
  // marca
  brand: "#3B6B63",      // Verde acinzentado (texto principal / botões)
  brandLight: "#6FA69D", // Verde claro secundário
  accent: "#3B6B63",     // Laranja pastel da flecha
  accentLight: "#FFD9B5",
  white:"#ffffffff",

  // superfícies
  bg: "#EEF9F4",         // Fundo principal
  card: "#FFFFFF",       // Cards brancos
  muted: "#F6FDFB",      // Pastel mais claro para seções
  border: "#D4EAE3",

  // texto
  text: "#3B6B63",
  subtext: "#6FA69D",

  // estados
  warning: "#FFB84C",
  danger: "#FF6B6B",
  success: "#8CD790",
};

export const radius = { xs: 6, sm: 10, md: 14, lg: 18, xl: 24 };
export const spacing = (n: number) => n * 4;

export const shadow = {
  shadowColor: "#000",
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.05,
  shadowRadius: 8,
  elevation: 2,
};

export const typography = {
  h1: { fontSize: 28, fontWeight: "800" as const, color: colors.text },
  h2: { fontSize: 22, fontWeight: "700" as const, color: colors.text },
  body: { fontSize: 16, color: colors.text },
  note: { fontSize: 14, color: colors.subtext },
};
