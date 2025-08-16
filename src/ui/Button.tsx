import { ActivityIndicator, Pressable, StyleSheet, Text, View, ViewStyle, TextStyle } from "react-native";
import { colors, radius, spacing } from "@src/theme";
import { ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost";

export default function Button({
  title,
  onPress,
  disabled,
  loading,
  variant = "primary",
  style,
  leftIcon,
  textStyle, // 🔹 nova prop
}: {
  title: string;
  onPress?: () => void;
  disabled?: boolean;
  loading?: boolean;
  variant?: Variant;
  style?: ViewStyle;
  leftIcon?: ReactNode;
  textStyle?: TextStyle; // 🔹 permite sobrescrever estilo do texto
}) {
  const bg =
    variant === "primary"   ? colors.accent :
    variant === "secondary" ? colors.brand  :
    "transparent";

  const fg =
    variant === "primary"   ? "#FFFFFF"   :
    variant === "secondary" ? "#FFFFFF"   :
    colors.text;

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled || loading}
      android_ripple={{ color: "#00000010" }}
      style={({ pressed }) => [
        styles.base,
        { backgroundColor: bg, opacity: pressed || disabled ? 0.85 : 1 },
        variant === "ghost" && { borderWidth: 1, borderColor: colors.border },
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator color={fg} />
      ) : (
        <View style={styles.content}>
          {leftIcon ? <View style={{ marginRight: spacing(2) }}>{leftIcon}</View> : null}
          <Text style={[styles.label, { color: fg }, textStyle]}>{title}</Text>
          {/* 🔹 textStyle sobrescreve se for passado */}
        </View>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    height: 48,
    borderRadius: radius.lg,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: spacing(6),
  },
  primary: {
    backgroundColor: colors.brandDark, // verde
  },
    textPrimary: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "600",
  },
  disabled: {
    backgroundColor: "#A5D6A7", // verde claro
  },
  content: { flexDirection: "row", alignItems: "center", justifyContent: "center" },
  label: { fontSize: 16, fontWeight: "700" },
});
