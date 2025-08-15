import React from "react";
import { StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

export default function GradientBackground() {
  return (
    <>
      {/* degradê principal */}
      <LinearGradient
        colors={["#EEF9F4", "#DFF3EA", "#D2EFDF"]}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
        style={StyleSheet.absoluteFill}
      />
      {/* vinheta bem sutil no topo */}
      <LinearGradient
        colors={["rgba(0,0,0,0.06)", "transparent"]}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 0.25 }}
        style={StyleSheet.absoluteFill}
        pointerEvents="none"
      />
      {/* vinheta sutil embaixo */}
      <LinearGradient
        colors={["transparent", "rgba(0,0,0,0.04)"]}
        start={{ x: 0.5, y: 0.75 }}
        end={{ x: 0.5, y: 1 }}
        style={StyleSheet.absoluteFill}
        pointerEvents="none"
      />
    </>
  );
}
