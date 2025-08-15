import { forwardRef, useState } from "react";
import { StyleSheet, Text, TextInput, TextInputProps, View } from "react-native";
import { colors, radius, spacing } from "@src/theme";

type Props = TextInputProps & { label?: string; error?: string; secureToggle?: boolean; };

const Input = forwardRef<TextInput, Props>(({ label, error, secureTextEntry, secureToggle, style, ...rest }, ref) => {
  const [hide, setHide] = useState(!!secureTextEntry);
  return (
    <View style={styles.block}>
      {label ? <Text style={styles.label}>{label}</Text> : null}
      <View style={[styles.field, style, error && { borderColor: colors.danger }]}>
        <TextInput
          ref={ref}
          placeholderTextColor={colors.subtext}
          secureTextEntry={hide}
          style={styles.input}
          {...rest}
        />
        {secureToggle ? (
          <Text
            onPress={() => setHide((v) => !v)}
            style={{ color: colors.brand, fontWeight: "600" }}
          >
            {hide ? "Mostrar" : "Ocultar"}
          </Text>
        ) : null}
      </View>
      {error ? <Text style={styles.error}>{error}</Text> : null}
    </View>
  );
});
export default Input;

const styles = StyleSheet.create({
  block: { marginBottom: spacing(4) },
  label: { marginBottom: spacing(2), color: colors.subtext },
  field: {
    height: 52,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.card,
    paddingHorizontal: spacing(4),
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  input: { flex: 1, fontSize: 16, color: colors.text, marginRight: spacing(2) },
  error: { color: colors.danger, marginTop: spacing(1) },
});
