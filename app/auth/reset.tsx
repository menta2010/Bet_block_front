import { useEffect, useRef, useState } from "react";
import {
  View, Text, KeyboardAvoidingView, Platform, StyleSheet, Animated, Image,
} from "react-native";
import { Link, useLocalSearchParams, useRouter } from "expo-router";

import Screen from "@src/ui/Screen";
import Card from "@src/ui/Card";
import Input from "@src/ui/Input";
import Button from "@src/ui/Button";
import GradientBackground from "@src/ui/GradientBackground";
import { H1, Note } from "@src/ui/Typography";
import { colors, spacing, shadow } from "@src/theme";
import { getErrorMessage } from "@src/utils/getErrorMessage";
// implemente no useAuth conforme snippet mais abaixo
import { resetPassword } from "@src/auth/useAuth";

export default function ResetPassword() {
  const router = useRouter();
  const params = useLocalSearchParams<{ email?: string }>();

  const [email, setEmail] = useState(params.email ?? "");
  const [code, setCode] = useState("");
  const [senha, setSenha] = useState("");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const [ok, setOk] = useState<string | null>(null);

  const fade = useRef(new Animated.Value(0)).current;
  const slide = useRef(new Animated.Value(12)).current;
  useEffect(() => {
    Animated.parallel([
      Animated.timing(fade, { toValue: 1, duration: 450, useNativeDriver: true }),
      Animated.timing(slide, { toValue: 0, duration: 450, useNativeDriver: true }),
    ]).start();
  }, []);

  const onReset = async () => {
    if (!email.trim() || !code.trim() || !senha.trim()) return;
    try {
      setLoading(true);
      setErr(null);
      setOk(null);
      await resetPassword({ email: email.trim(), code: code.trim(), nova_senha: senha });
      setOk("Senha alterada com sucesso! Faça login novamente.");
      setTimeout(() => router.replace("/auth/login"), 700);
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
              style={{ width: 170, height: 170 }}
              resizeMode="contain"
            />
            <Text style={{ color: colors.subtext, marginTop: spacing(1), textAlign: "center" }}>
              Digite o código que você recebeu e defina uma nova senha.
            </Text>
          </View>

          <Card style={[styles.card]}>
            <H1 style={{ textAlign: "center", marginBottom: spacing(3), color: colors.brand }}>
              Redefinir senha
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

            <Input
              label="Código"
              value={code}
              onChangeText={setCode}
              keyboardType="number-pad"
              autoCapitalize="none"
            />

            <Input
              label="Nova senha"
              value={senha}
              onChangeText={setSenha}
              secureTextEntry
              secureToggle
            />

            {err ? <Text style={{ color: colors.danger, marginTop: spacing(2) }}>{err}</Text> : null}
            {ok ? <Text style={{ color: colors.success, marginTop: spacing(2) }}>{ok}</Text> : null}

            <Button
              title="Confirmar"
              onPress={onReset}
              loading={loading}
              style={{ marginTop: spacing(3) }}
            />

            <Note style={{ textAlign: "center", marginTop: spacing(4) }}>
              Não recebeu o código?{" "}
              <Link href="/auth/forgot" style={{ color: colors.brand }}>
                Enviar novamente
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
