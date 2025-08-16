import { useState } from "react";
import { View, KeyboardAvoidingView, Platform, StyleSheet, Image } from "react-native";
import { Link, useRouter } from "expo-router";
import Toast from "react-native-toast-message";

import Screen from "@src/ui/Screen";
import Card from "@src/ui/Card";
import Input from "@src/ui/Input";
import Button from "@src/ui/Button";
import GradientBackground from "@src/ui/GradientBackground";
import { H1, Note } from "@src/ui/Typography";
import { colors, spacing, shadow } from "@src/theme";
import { requestPasswordResetCode } from "@src/auth/useAuth";
import { Ionicons } from "@expo/vector-icons";

export default function Forgot() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = async () => {
    const v = email.trim();
    if (!v) return;

    try {
      setLoading(true);
      await requestPasswordResetCode(v);

      // toast de sucesso (aparece e permanece na transição)
      Toast.show({
        type: "success",
        text1: "Código enviado!",
        text2: "Verifique seu e-mail para prosseguir.",
      });

      router.push({ pathname: "/auth/reset", params: { email: v } });
    } catch (e: any) {
      Toast.show({
        type: "error",
        text1: "Não foi possível enviar o código",
        text2: e?.message ?? "Tente novamente em instantes.",
      });
    } finally {
      setLoading(false);
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
              Esqueci minha senha
            </H1>

            <Input
              label="Email"
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              keyboardType="email-address"
              style={{ marginBottom: 20 }}
            />
            <Button
            title="Enviar código"
            onPress={onSubmit}
            loading={loading}
            leftIcon={<Ionicons name="mail" size={20} color="#FFFFFF" />} // opcional, se quiser ícone igual estilo login
            style={{ backgroundColor: "#3FA285", marginTop: spacing(2), marginBottom: 16 }} // cor igual do login
            textStyle={{ color: "#FFFFFF", fontWeight: "600" }} // garante texto branco
            />

            <View style={{ height: spacing(4) }} />

            <Note style={{ textAlign: "center" }}>
              Já tem o código?{" "}
              <Link href={{ pathname: "/auth/reset", params: { email } }} style={{ color: colors.brand }}>
                Redefinir senha
              </Link>
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

const styles = StyleSheet.create({
  center: { flex: 1, alignItems: "center" },
  card: {
    marginTop: spacing(2),
    width: "92%",
    borderRadius: 18,
    ...shadow,
  },
});
