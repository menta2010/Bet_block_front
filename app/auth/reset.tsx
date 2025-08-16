import { useEffect, useState } from "react";
import { View, KeyboardAvoidingView, Platform, StyleSheet, Image } from "react-native";
import { useLocalSearchParams, Link, useRouter } from "expo-router";
import Toast from "react-native-toast-message";

import Screen from "@src/ui/Screen";
import Card from "@src/ui/Card";
import Input from "@src/ui/Input";
import Button from "@src/ui/Button";
import GradientBackground from "@src/ui/GradientBackground";
import { H1, Note } from "@src/ui/Typography";
import { colors, spacing, shadow } from "@src/theme";
import { resetPassword, requestPasswordResetCode } from "@src/auth/useAuth";
import { Ionicons } from "@expo/vector-icons";


export default function Reset() {
  const router = useRouter();
  const params = useLocalSearchParams<{ email?: string }>();

  const [email, setEmail] = useState(params.email ?? "");
  const [code, setCode] = useState("");
  const [senha, setSenha] = useState("");
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);

  // se veio da tela de "esqueci", manter o toast de sucesso (já acontece na transição)
  useEffect(() => {
    // nada a fazer aqui — apenas mantemos o comportamento atual
  }, []);

  const onSubmit = async () => {
    if (!email.trim() || !code.trim() || !senha.trim()) return;

    try {
      setLoading(true);
      await resetPassword({ email: email.trim(), code: code.trim(), nova_senha: senha });

      Toast.show({ type: "success", text1: "Senha alterada com sucesso!" });
      router.replace("/auth/login");
    } catch (e: any) {
      Toast.show({
        type: "error",
        text1: "Erro ao redefinir",
        text2: e?.message ?? "Tente novamente.",
      });
    } finally {
      setLoading(false);
    }
  };

  const onResend = async () => {
    if (!email.trim()) {
      Toast.show({ type: "error", text1: "Informe seu e-mail para reenviar o código." });
      return;
    }

    try {
      setResending(true);
      await requestPasswordResetCode(email.trim());
      Toast.show({ type: "success", text1: "Novo código enviado ao seu e-mail." });
    } catch (e: any) {
      Toast.show({
        type: "error",
        text1: "Não foi possível enviar",
        text2: e?.message ?? "Tente novamente.",
      });
    } finally {
      setResending(false);
    }
  };

  return (
    <Screen padded={false}>
      <GradientBackground />

      <KeyboardAvoidingView
        behavior={Platform.select({ ios: "padding", android: undefined })}
        style={{ flex: 1 }}
      >
        <View style={styles.center}>
          {/* Logo */}
          <Image
            source={require("../../assets/branding/logo3.png")}
            style={{ width: 200, height: 200, marginTop: spacing(4) }}
            resizeMode="contain"
          />

          {/* Card */}
         <Card style={[styles.card, { marginTop: 32 }]}>
            <H1 style={{ textAlign: "center", marginBottom: spacing(3), color: colors.brand }}>
              Redefinir senha
            </H1>

            <Input
              label="Email"
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              keyboardType="email-address"
            />
            <Input label="Código" value={code} onChangeText={setCode}  style={{ marginBottom: 12 }}/>
            <Input
              label="Nova senha"
              value={senha}
              onChangeText={setSenha}
              secureTextEntry
              secureToggle
                style={{ marginBottom: 20 }}
            />

            <Button
              title="Confirmar"
              onPress={onSubmit}
              loading={loading}
              leftIcon={<Ionicons name="checkmark-circle" size={20} color="#fff" />}
              style={{ backgroundColor: "#3FA285", marginTop: spacing(2), marginBottom: 16  }} 
              textStyle={{ color: "#fff", fontWeight: "600" }}
            />

            <Note style={{ textAlign: "center", marginTop: spacing(3) }}>
              Não recebeu o código?{" "}
              <TextLink onPress={onResend} disabled={resending} />
            </Note>

            <Note style={{ textAlign: "center", marginTop: spacing(2) }}>
              Lembrou a senha?{" "}
              <Link href="/auth/login" style={{ color: colors.brand }}>
                Voltar ao login
              </Link>
            </Note>
          </Card>
        </View>
      </KeyboardAvoidingView>
    </Screen>
  );
}

function TextLink({ onPress, disabled }: { onPress: () => void; disabled?: boolean }) {
  return (
    <Link
      href="#"
      onPress={(e) => {
        e.preventDefault();
        if (!disabled) onPress();
      }}
      style={{ color: colors.brand, opacity: disabled ? 0.6 : 1 }}
    >
      Enviar novamente
    </Link>
  );
}

const styles = StyleSheet.create({
  center: { flex: 1, alignItems: "center" },
  card: {
    marginTop: spacing(2),
    width: "92%",
    borderRadius: 18,
    ...shadow,
  },
});
