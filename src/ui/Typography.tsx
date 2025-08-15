// src/ui/Typography.tsx
import { Text, TextProps } from "react-native";
import { typography } from "@src/theme";

export const H1 = (p: TextProps) => <Text {...p} style={[typography.h1, p.style]} />;
export const H2 = (p: TextProps) => <Text {...p} style={[typography.h2, p.style]} />;
export const P  = (p: TextProps) => <Text {...p} style={[typography.body, p.style]} />;
export const Note = (p: TextProps) => <Text {...p} style={[typography.note, p.style]} />;
