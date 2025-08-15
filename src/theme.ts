// src/theme.ts
export const colors = {
  bg: "#F3F4F6",
  card: "#FFFFFF",
  text: "#111827",
  subtext: "#6B7280",
  primary: "#10B981",
  primaryDark: "#0E9F74",
  border: "#E5E7EB",
  danger: "#EF4444",
};

export const radius = { sm: 8, md: 12, lg: 16, xl: 20 };
export const spacing = (n: number) => n * 4; // spacing(4) = 16
export const shadow = {
  shadowColor: "#000",
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.08,
  shadowRadius: 6,
  elevation: 2,
};
