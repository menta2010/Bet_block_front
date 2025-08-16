import { useState, useRef, useEffect } from "react";
import {
  View, Text, KeyboardAvoidingView, Platform, StyleSheet, Animated, Image,
} from "react-native";
import { Link, useRouter } from "expo-router";

import Screen from "@src/ui/Screen";
import Card from "@src/ui/Card";
import Input from "@src/ui/Input";
import Button from "@src/ui/Button";
import GradientBackground from "@src/ui/GradientBackground";
import { H1, Note } from "@src/ui/Typography";
import { colors, spacing, shadow } from "@src/theme";
import { getErrorMessage } from "@src/utils/getErrorMessage";
// implemente no useAuth conforme snippet mais abaixo
import { requestPasswordResetCode } from "@src/auth/useAuth";

export default function ForgotPassword() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);
  const [err, setErr] = useState<string | null>(null);

  // animação suave
  const fade = useRef(new Animated.Value(0)).current;
  const slide = useRef(new Animated.Value(12)).current;
  useEffect(() => {
    Animated.parallel([
      Animated.timing(fade, { toValue: 1, duration: 450, useNativeDriver: true }),
      Animated.timing(slide, { toValue: 0, duration: 450, useNativeDriver: true }),
    ]).start();
  }, []);

  const onSendCode = async () => {
    if (!email.trim()) return;
    try {
      setLoading(true);
      setMsg(null);
      setErr(null);
      await requestPasswordResetCode(email.trim());
      setMsg("Enviamos um código para o seu e-mail.");
      // leva o usuário direto para a tela de redefinição já com o e-mail preenchido
      setTimeout(() => router.push({ pathname: "/auth/reset", params: { email: email.trim() } }), 500);
    } catch (e: any) {
      setErr(getErrorMessage(e));
    } finally {
      setLoading(false);
    }
  };

  return (
    <Screen padded={false}>
      <GradientBackground />

      <KeyboardAvoidingView behavior={Platform.select({ ios: "padding", android: undefined })} style={{ flex: 1 }}>
        <Animated.View style={[styles.center, { opacity: fade, transform: [{ translateY: slide }] }]}>
          {/* Topo: logo */}
          <View style={{ alignItems: "center", marginTop: spacing(4) }}>
            <Image
              source={require("../../assets/branding/logo3.png")}
              style={{ width: 180, height: 180 }}
              resizeMode="contain"
            />
            <Text style={{ color: colors.subtext, marginTop: spacing(1), textAlign: "center" }}>
              Informe seu e-mail para receber o código.
            </Text>
          </View>

          <Card style={[styles.card]}>
            <H1 style={{ textAlign: "center", marginBottom: spacing(3), color: colors.brand }}>
              Esqueci minha senha
            </H1>

            <Input
              label="Email"
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              keyboardType="email-address"
              autoComplete="email"
              textContentType="emailAddress"
            />

            {err ? <Text style={{ color: colors.danger, marginTop: spacing(2) }}>{err}</Text> : null}
            {msg ? <Text style={{ color: colors.success, marginTop: spacing(2) }}>{msg}</Text> : null}

            <Button
              title="Enviar código"
              onPress={onSendCode}
              loading={loading}
              style={{ marginTop: spacing(3) }}
            />

            <Note style={{ textAlign: "center", marginTop: spacing(4) }}>
              Já tem o código?{" "}
              <Text
                onPress={() => router.push({ pathname: "/auth/reset", params: { email } })}
                style={{ color: colors.brand }}
              >
                Redefinir senha
              </Text>
            </Note>

            <Note style={{ textAlign: "center", marginTop: spacing(2) }}>
              Lembrou a senha?{" "}
              <Link href="/auth/login" style={{ color: colors.brand }}>
                Voltar ao login
              </Link>
            </Note>
          </Card>
        </Animated.View>
      </KeyboardAvoidingView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  center: { flex: 1, alignItems: "center" },
  card: {
    marginTop: spacing(4),
    width: "92%",
    borderRadius: 18,
    ...shadow,
  },
});
