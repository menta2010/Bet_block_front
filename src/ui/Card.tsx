import { View, StyleSheet, ViewProps } from "react-native";
import { colors, radius, spacing, shadow } from "@src/theme";

export default function Card({ style, ...rest }: ViewProps) {
  return <View style={[styles.card, style]} {...rest} />;
}
const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.card,
    borderRadius: radius.lg,
    padding: spacing(4),
    borderWidth: 1,
    borderColor: colors.border,
    ...shadow,
  },
});
