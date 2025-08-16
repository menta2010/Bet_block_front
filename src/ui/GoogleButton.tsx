import React from "react";
import {
  Pressable,
  Text,
  ActivityIndicator,
  StyleSheet,
  ViewStyle,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors, radius } from "@src/theme";

type Props = {
  title?: string;
  onPress?: () => void;
  disabled?: boolean;
  loading?: boolean;
  /** Estilos extras no container (ex.: marginTop) */
  style?: ViewStyle | ViewStyle[];
  /** Caso queira ajustar tipografia em algum lugar específico */
  textStyle?: any;
};

export default function GoogleButton({
  title = "Continuar com Google",
  onPress,
  disabled,
  loading = false,
  style,
  textStyle,
}: Props) {
  const isBlocked = disabled || loading;

  return (
    <Pressable
      onPress={onPress}
      disabled={isBlocked}
      android_ripple={{ color: "#e6e6e6" }}
      style={({ pressed }) => [
        styles.base,
        isBlocked && styles.disabled,
        { transform: [{ scale: pressed ? 0.98 : 1 }] },
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator size="small" color={colors.text} />
      ) : (
        <>
          <Ionicons
            name="logo-google"
            size={20}
            color="#DB4437"
            style={styles.icon}
          />
          <Text style={[styles.text, textStyle]}>{title}</Text>
        </>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    height: 44, // alinhado aos inputs
    borderRadius: radius.lg,
    borderWidth: 1.5,
    borderColor: colors.border,
    backgroundColor: "#fff",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 14,
  },
  disabled: { opacity: 0.6 },
  icon: { marginRight: 10 },
  text: { color: colors.text, fontWeight: "700" },
});
