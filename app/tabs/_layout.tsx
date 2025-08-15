import { Tabs, Redirect } from "expo-router";
import { useAuth } from "@src/auth/useAuth";

export default function TabsLayout() {
  const { token } = useAuth();
  if (!token) return <Redirect href="/auth/login" />;
  return (
    <Tabs screenOptions={{ headerTitleAlign: "center" }}>
      <Tabs.Screen name="index" options={{ title: "Dashboard" }} />
    </Tabs>
  );
}
