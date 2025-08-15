import { Pressable, Text, StyleSheet, ActivityIndicator, ViewStyle, TextStyle } from "react-native";
import { colors, radius, spacing, shadow } from "@src/theme";

type Props = {
  title: string;
  onPress: () => void;
  loading?: boolean;
  disabled?: boolean;
  variant?: "primary" | "ghost";
  style?: ViewStyle;
  textStyle?: TextStyle;
};

export default function Button({ title, onPress, loading, disabled, variant = "primary", style, textStyle }: Props) {
  const isDisabled = disabled || loading;
  const base = [styles.base, variant === "ghost" ? styles.ghost : styles.primary, style, isDisabled && styles.disabled];
  return (
    <Pressable onPress={onPress} disabled={isDisabled} style={base}>
      {loading ? <ActivityIndicator color="#fff" /> : <Text style={[styles.text, textStyle]}>{title}</Text>}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    borderRadius: radius.md,
    paddingVertical: spacing(3),
    alignItems: "center",
    ...shadow,
  },
  primary: { backgroundColor: colors.primary },
  ghost: { backgroundColor: "transparent", borderWidth: 1, borderColor: colors.border },
  disabled: { opacity: 0.6 },
  text: { color: "#fff", fontWeight: "700" },
});
