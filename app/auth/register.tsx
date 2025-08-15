import { useState } from "react";
import { View, Text, KeyboardAvoidingView, Platform, useWindowDimensions, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import Screen from "@src/ui/Screen";
import Button from "@src/ui/Button";
import Input from "@src/ui/Input";
import { colors, radius, spacing, shadow } from "@src/theme";
import { useAuth, registerApi, loginApi } from "@src/auth/useAuth";

export default function Register() {
  const { width } = useWindowDimensions();
  const isWide = width >= 480;
  const { setToken } = useAuth();
  const router = useRouter();

  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleRegister() {
    if (!nome.trim() || !email.trim() || !senha.trim()) return;
    try {
      setLoading(true);
      await registerApi(nome.trim(), email.trim(), senha);
      const { access_token } = await loginApi(email.trim(), senha);
      await setToken(access_token);
      router.replace("/tabs");
    } catch (e: any) {
      alert(e?.response?.data?.detail ?? "Não foi possível criar a conta");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Screen>
      <KeyboardAvoidingView behavior={Platform.select({ ios: "padding", android: undefined })} style={styles.center}>
        <View style={[styles.card, isWide && styles.cardWide]}>
          <Text style={styles.title}>Criar conta</Text>
          <Input placeholder="Nome" value={nome} onChangeText={setNome} />
          <Input placeholder="Email" autoCapitalize="none" keyboardType="email-address" value={email} onChangeText={setEmail} />
          <Input placeholder="Senha" secureTextEntry value={senha} onChangeText={setSenha} />
          <Button title="Cadastrar" onPress={handleRegister} loading={loading} />
          <Button title="Já tenho conta" variant="ghost" onPress={() => router.replace("/auth/login")} />
        </View>
      </KeyboardAvoidingView>
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
