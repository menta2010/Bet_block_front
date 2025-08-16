import { Stack } from "expo-router";
import Toast, { BaseToast, ErrorToast } from "react-native-toast-message";
import React from "react";

// Se você já exporta essas cores do seu tema, pode importar de @src/theme.
// Aqui ficam fixas para o exemplo:
const colors = {
  brand: "#2C8D73",      // verde principal
  card: "#FFFFFF",
  text: "#1d3b35",
  danger: "#E53E3E",
  border: "#DDE8E4",
};

// personalização dos toasts (opcional, mas deixa tudo consistente)
const toastConfig = {
  success: (props: any) => (
    <BaseToast
      {...props}
      style={{
        borderLeftColor: colors.brand,
        backgroundColor: colors.card,
        borderRadius: 14,
        borderWidth: 1,
        borderColor: colors.border,
      }}
      contentContainerStyle={{ paddingHorizontal: 12 }}
      text1Style={{ fontSize: 16, fontWeight: "700", color: colors.text }}
      text2Style={{ fontSize: 14, color: colors.text }}
    />
  ),
  error: (props: any) => (
    <ErrorToast
      {...props}
      style={{
        borderLeftColor: colors.danger,
        backgroundColor: colors.card,
        borderRadius: 14,
        borderWidth: 1,
        borderColor: colors.border,
      }}
      text1Style={{ fontSize: 16, fontWeight: "700", color: colors.text }}
      text2Style={{ fontSize: 14, color: colors.text }}
    />
  ),
};

export default function RootLayout() {
  return (
    <>
      <Stack screenOptions={{ headerShown: false }} />
      {/* Monta o Toast na raiz da árvore */}
      <Toast config={toastConfig} topOffset={58} />
    </>
  );
}
