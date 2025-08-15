import { useState } from "react";
import { View, Text, KeyboardAvoidingView, Platform, useWindowDimensions, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import Screen from "@src/ui/Screen";
import Button from "@src/ui/Button";
import Input from "@src/ui/Input";
import { colors, radius, spacing, shadow } from "@src/theme";
import { useAuth, loginApi } from "@src/auth/useAuth";
import { getErrorMessage } from '@src/utils/getErrorMessage';
import Card from "@src/ui/Card";
import { H1, Note } from "@src/ui/Typography";// <- certo
import { Link, router } from "expo-router";



export default function Login() {
  const { width } = useWindowDimensions();
  const isWide = width >= 480;
  const { setToken } = useAuth();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin() {
    if (!email.trim() || !senha.trim()) return;
    try {
      setLoading(true);
      const { access_token } = await loginApi(email.trim(), senha);
      await setToken(access_token);
      router.replace("/tabs");
    } catch (e: any) {
        alert(getErrorMessage(e));
    } finally {
      setLoading(false);
    }
  }

  return (
 <Screen>
      <Card style={{ marginTop: spacing(14) }}>
        <H1 style={{ textAlign: "center", marginBottom: spacing(6), color: colors.brand }}>Entrar</H1>
        <Input label="Email" value={email} onChangeText={setEmail} autoCapitalize="none" keyboardType="email-address" />
        <Input label="Senha" value={senha} onChangeText={setSenha} secureTextEntry secureToggle />
        <Button title="Login" onPress={handleLogin} loading={loading} style={{ marginTop: spacing(2) }} />
        <Note style={{ textAlign: "center", marginTop: spacing(4) }}>
          Não tem conta? <Link href="/auth/register" style={{ color: colors.brand }}>Crie agora</Link>
        </Note>
      </Card>
    </Screen>
  );
}

const styles = StyleSheet.create({
  center: { flex: 1, alignItems: "center", justifyContent: "center" },
  card: {
    width: "100%",
    gap: spacing(3),
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.lg,
    padding: spacing(4),
    backgroundColor: colors.card,
    ...shadow,
  },
  cardWide: { width: 420 },
  title: { fontSize: 22, fontWeight: "700", textAlign: "center", color: colors.text },
});
