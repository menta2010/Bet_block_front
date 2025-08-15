// app/auth/login.tsx
import { useEffect, useRef, useState } from "react";
import {
  View, Text, KeyboardAvoidingView, Platform, useWindowDimensions,
  StyleSheet, Animated, Image
} from "react-native";
import { Link, useRouter } from "expo-router";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

import Screen from "@src/ui/Screen";
import Card from "@src/ui/Card";
import Input from "@src/ui/Input";
import Button from "@src/ui/Button";
import GradientBackground from "@src/ui/GradientBackground";
import { H1, Note } from "@src/ui/Typography";
import { colors, spacing, shadow } from "@src/theme";
import { useAuth, loginApi } from "@src/auth/useAuth";
import { getErrorMessage } from "@src/utils/getErrorMessage";

export default function Login() {
  const { width } = useWindowDimensions();
  const isWide = width >= 480;
  const { setToken } = useAuth();
  const router = useRouter();
  const logoSize = Math.min(Math.round(width * 0.48), 220);

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // animação suave do bloco central
  const fade = useRef(new Animated.Value(0)).current;
  const slide = useRef(new Animated.Value(12)).current;
  useEffect(() => {
    Animated.parallel([
      Animated.timing(fade, { toValue: 1, duration: 450, useNativeDriver: true }),
      Animated.timing(slide, { toValue: 0, duration: 450, useNativeDriver: true }),
    ]).start();
  }, []);

  const onLogin = async () => {
    if (!email.trim() || !senha.trim()) return;
    try {
      setLoading(true);
      setErrorMsg(null);
      const { access_token } = await loginApi(email.trim(), senha);
      await setToken(access_token);
      router.replace("/tabs");
    } catch (e: any) {
      setErrorMsg(getErrorMessage(e));
    } finally {
      setLoading(false);
    }
  };

  return (
    <Screen padded={false}>
      {/* fundo com gradiente */}
      <GradientBackground />

      <KeyboardAvoidingView behavior={Platform.select({ ios: "padding", android: undefined })} style={{ flex: 1 }}>
        <Animated.View style={[styles.center, { opacity: fade, transform: [{ translateY: slide }] }]}>
          {/* Topo: logo + frase */}
          <View style={{ alignItems: "center", marginTop: spacing(4) }}>
            <Image
              source={require("../../assets/branding/logo3.png")}
              style={{
                width: logoSize,
                height: logoSize,
                marginBottom: spacing(0) // antes spacing(3)
              }}
              resizeMode="contain"
            />
             <Text style={{ color: colors.subtext, marginTop: spacing(0), textAlign: "center" }}>
              Controle suas apostas, controle seu futuro.
            </Text>
          </View>

          <Card style={[styles.card, isWide && { width: 520 }, { marginTop: 16 /* antes spacing(6) */ }]}>
            <H1 style={{ textAlign: "center", marginBottom: 20, color: colors.brand }}>
              Entrar
            </H1>

            <Input
              label="Email"
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              keyboardType="email-address"
            />
            <Input
              label="Senha"
              value={senha}
              onChangeText={setSenha}
              secureTextEntry
              secureToggle
            />

            {errorMsg ? (
              <Text style={{ color: colors.danger, marginBottom: spacing(2) }}>
                {errorMsg}
              </Text>
            ) : null}

            {/* ===== 5) Botão com ícone ===== */}
            <Button
              title="Login"
              onPress={onLogin}
              loading={loading}
              leftIcon={<Ionicons name="lock-closed" size={20} color={colors.white} />}
              style={{ marginTop: spacing(2) }}
            />

            <Note style={{ textAlign: "center", marginTop: spacing(4) }}>
              Não tem conta?{" "}
              <Link href="/auth/register" style={{ color: colors.brand }}>
                Crie agora
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
    marginTop: spacing(6),
    width: "92%",
    borderRadius: 18,
    ...shadow,
  },
});
