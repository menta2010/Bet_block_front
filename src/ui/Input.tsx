import React, { useMemo, useRef, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TextInputProps,
  Pressable,
  StyleSheet,
  Platform,
  Animated,
  Easing,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
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
    () => [styles.inputContainer, focused && styles.inputFocused, style],
    [focused, style]
  );

  // animação do olho
  const pressAnim = useRef(new Animated.Value(0)).current;
  const animateEye = () => {
    Animated.sequence([
      Animated.timing(pressAnim, {
        toValue: 1,
        duration: 110,
        easing: Easing.out(Easing.quad),
        useNativeDriver: true,
      }),
      Animated.timing(pressAnim, {
        toValue: 0,
        duration: 110,
        easing: Easing.in(Easing.quad),
        useNativeDriver: true,
      }),
    ]).start();
  };

  const eyeStyle = {
    transform: [
      {
        scale: pressAnim.interpolate({
          inputRange: [0, 1],
          outputRange: [1, 0.92],
        }),
      },
      {
        rotate: pressAnim.interpolate({
          inputRange: [0, 1],
          outputRange: ["0deg", "-8deg"],
        }),
      },
    ],
    opacity: pressAnim.interpolate({
      inputRange: [0, 1],
      outputRange: [1, 0.9],
    }),
  };

  const effectiveSecure = secureTextEntry ? hidden : false;

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
          secureTextEntry={effectiveSecure}
          onFocus={handleFocus}
          onBlur={handleBlur}
          value={value}
          selectionColor={colors.brandDark}
          {...rest}
        />

        {showToggle && (
          <Pressable
            onPress={() => {
              setHidden((p) => !p);
              animateEye();
            }}
            hitSlop={8}
            style={styles.toggle}
          >
            <Animated.View style={[eyeStyle, styles.eyeWrap]}>
              <Ionicons
                name={hidden ? "eye-off" : "eye"}
                size={20}
                color={colors.brand}
              />
            </Animated.View>
            <Text style={styles.toggleText}>{hidden ? "Mostrar" : "Ocultar"}</Text>
          </Pressable>
        )}
      </View>
    </View>
  );
}

const HEIGHT = 44;

const styles = StyleSheet.create({
  label: {
    color: colors.text,
    marginBottom: spacing(1),
    fontWeight: "600",
  },
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
      },
    }),
  },
  input: {
    flex: 1,
    color: colors.text,
    fontSize: 16,
    paddingVertical: 0,
    height: HEIGHT,
    ...Platform.select({
      android: { textAlignVertical: "center", includeFontPadding: false },
    }),
  },
  toggle: {
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: spacing(2),
    paddingVertical: spacing(1),
  },
  eyeWrap: {
    marginRight: spacing(1),
  },
  toggleText: {
    color: colors.brand,
    fontWeight: "700",
  },
});
