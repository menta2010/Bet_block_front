// src/ui/GradientBackground.tsx
import { LinearGradient } from "expo-linear-gradient";
import { ViewProps } from "react-native";

export default function GradientBackground(props: ViewProps) {
  return (
    <LinearGradient
      colors={["#F2FBF7", "#EEF9F4"]} 
      start={{ x: 0.5, y: 0 }}
      end={{ x: 0.5, y: 1 }}
      style={[{ position: "absolute", inset: 0 }, props.style as any]}
    />
  );
}
