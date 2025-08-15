import { forwardRef } from "react";
import { TextInput, StyleSheet, TextInputProps } from "react-native";
import { colors, radius, spacing } from "@src/theme";

const Input = forwardRef<TextInput, TextInputProps>((props, ref) => {
  return <TextInput ref={ref} placeholderTextColor={colors.subtext} style={styles.input} {...props} />;
});
export default Input;

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
    padding: spacing(3),
    backgroundColor: "#fff",
    color: colors.text,
  },
});
