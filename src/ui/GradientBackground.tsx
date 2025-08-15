// ui/GradientBackground.tsx
import React from "react";
import { StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

/**
 * Fundo super suave:
 * - Começa no #EEF9F4 (quase branco esverdeado)
 * - Vai para #EAF6F1 (variação 2%)
 * - Morre em transparente para o card “flutuar” levemente
 */
export default function GradientBackground() {
  return (
    <>
      {/* camada de base bem clara */}
      <LinearGradient
        colors={["#EEF9F4", "#EAF6F1"]}
        locations={[0, 1]}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
        style={StyleSheet.absoluteFill}
        pointerEvents="none"
      />

      {/* véu sutil que desaparece no rodapé (quase imperceptível) */}
      <LinearGradient
        colors={["rgba(238, 249, 244, 0.0)", "rgba(238, 249, 244, 0.3)"]}
        locations={[0.55, 1]}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
        style={StyleSheet.absoluteFill}
        pointerEvents="none"
      />
    </>
  );
}
