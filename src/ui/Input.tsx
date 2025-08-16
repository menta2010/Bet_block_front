import React, { useMemo, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TextInputProps,
  Pressable,
  StyleSheet,
  Platform,
} from "react-native";
import { colors, spacing, radius } from "@src/theme";

type Props = TextInputProps & {
  label?: string;
  secureToggle?: boolean;
  value?: string;
};

export default function Input({
  label,
  secureTextEntry,
  secureToggle,
  value,
  onFocus,
  onBlur,
  style,
  ...rest
}: Props) {
  const [focused, setFocused] = useState(false);
  const [hidden, setHidden] = useState(!!secureTextEntry);

  // Mostra "Mostrar/Ocultar" só se houver texto
  const showToggle =
    !!secureToggle && typeof value === "string" && value.length > 0;

  const handleFocus = (e: any) => {
    setFocused(true);
    onFocus?.(e);
  };
  const handleBlur = (e: any) => {
    setFocused(false);
    onBlur?.(e);
  };

  const containerStyle = useMemo(
    () => [
      styles.inputContainer,
      focused && styles.inputFocused,
      style,
    ],
    [focused, style]
  );

  return (
    <View style={{ marginBottom: spacing(3) }}>
      {!!label && (
        <Text style={styles.label} numberOfLines={1}>
          {label}
        </Text>
      )}

      <View style={containerStyle}>
        <TextInput
          style={styles.input}
          placeholderTextColor={colors.subtext}
          secureTextEntry={hidden}
          onFocus={handleFocus}
          onBlur={handleBlur}
          value={value}
          selectionColor={colors.brandDark} // cursor/seleção verde-escuro
          {...rest}
        />

        {showToggle && (
          <Pressable
            onPress={() => setHidden((p) => !p)}
            hitSlop={8}
            style={styles.toggle}
          >
            <Text style={styles.toggleText}>
              {hidden ? "Mostrar" : "Ocultar"}
            </Text>
          </Pressable>
        )}
      </View>
    </View>
  );
}

const HEIGHT = 26; // altura confortável e padrão

const styles = StyleSheet.create({
  label: {
    color: colors.text,
    marginBottom: spacing(1),
    fontWeight: "600",
  },

  // A BORDA fica aqui no container
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: radius.lg,
    borderWidth: 1.5,
    borderColor: colors.border,
    paddingHorizontal: spacing(3),
    minHeight: HEIGHT,
  },

  // Estado focado (sem mudar altura)
  inputFocused: {
    borderColor: colors.brand,
    borderWidth: 2,
    ...Platform.select({
      ios: {
        shadowColor: colors.brand,
        shadowOpacity: 0.15,
        shadowRadius: 8,
        shadowOffset: { width: 0, height: 3 },
      },
      android: {
        borderColor: colors.brandDark,
        // ripple visual já vem do sistema nos botões; aqui só borda mesmo
      },
    }),
  },

  // O TextInput em si NÃO tem borda nem radius
  input: {
    flex: 1,
    color: colors.text,
    fontSize: 16,
    paddingVertical: 0,
    height: 44, // deixa o cursor estável e o campo mais “slim”
    ...Platform.select({
      android: { textAlignVertical: "center", includeFontPadding: false },
    }),
  },

  toggle: {
    paddingLeft: spacing(2),
    paddingVertical: spacing(1),
  },
  toggleText: {
    color: colors.brand,
    fontWeight: "700",
  },
});
