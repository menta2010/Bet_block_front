import { ReactNode } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet, View } from "react-native";
import { colors, spacing } from "@src/theme";

export default function Screen({ children, padded = true }: { children: ReactNode; padded?: boolean; }) {
  return (
    <SafeAreaView style={styles.root}>
      <View style={[styles.container, padded && { padding: spacing(5) }]}>
        {children}
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.bg },
  container: { flex: 1 },
});
