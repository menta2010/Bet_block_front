// app/auth/login.tsx
import { useEffect, useRef, useState } from "react";
import {
  View, Text, KeyboardAvoidingView, Platform, useWindowDimensions,
  StyleSheet, Animated, Image
} from "react-native";
import { Link, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

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

  // placeholder para futuro login com Google (apenas UI por enquanto)
  const onGooglePress = () => {
    // TODO: plugar lógica do Google aqui (ex: expo-auth-session / backend)
  };

  return (
    <Screen padded={false}>
      <GradientBackground />

      <KeyboardAvoidingView behavior={Platform.select({ ios: "padding", android: undefined })} style={{ flex: 1 }}>
        <Animated.View style={[styles.center, { opacity: fade, transform: [{ translateY: slide }] }]}>
          {/* HERO (logo + subtítulo) com respiro menor */}
          <View style={styles.hero}>
            <Image
              source={require("../../assets/branding/logo3.png")}
              style={{ width: logoSize, height: logoSize, marginBottom: 4 }}
              resizeMode="contain"
            />
            <Text style={styles.subtitle}>
              Controle suas apostas, controle seu futuro.
            </Text>
          </View>

          <Card style={[styles.card, isWide && { width: 520 }, { marginTop: 14 }]}>
            <H1 style={{ textAlign: "center", marginBottom: 20 }}>
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

            {/* link “Esqueceu sua senha?” alinhado à direita */}
            <View style={{ alignItems: "flex-end", marginTop: 6, marginBottom: 8 }}>
              <Link href="/auth/forgot" style={{ color: colors.brand, fontWeight: "600" }}>
                Esqueceu sua senha?
              </Link>
            </View>

            {errorMsg ? (
              <Text style={{ color: colors.danger, marginBottom: 8 }}>
                {errorMsg}
              </Text>
            ) : null}

            {/* botão primário */}
            <Button
              title="Login"
              onPress={onLogin}
              loading={loading}
              leftIcon={<Ionicons name="lock-closed" size={20} color="#FFFFFF" />}
              style={{ marginTop: 8, backgroundColor: "#3FA285" }}
            />

            {/* separador “ou” */}
            <View style={styles.separator}>
              <View style={styles.sepLine} />
              <Text style={styles.sepText}>ou</Text>
              <View style={styles.sepLine} />
            </View>

            {/* botão Google (UI) */}
        <Button
          title="Continuar com Google"
          onPress={onGooglePress}
          leftIcon={<Ionicons name="logo-google" size={20} color="#DB4437" />}
          style={{
            backgroundColor: "#fff",       // fundo branco padrão Google
            borderWidth: 1,
            borderColor: colors.border,
            marginTop: 8,
          }}
          textStyle={{
            color: "#000",                 // texto preto (padrão Google)
            fontWeight: "600",
          }}
        />

            <Note style={{ textAlign: "center", marginTop: 16 }}>
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
  hero: {
    alignItems: "center",
    marginTop: 12,
    paddingHorizontal: 16,
  },
  subtitle: {
    color: colors.subtext,
    textAlign: "center",
    marginTop: 4,
    lineHeight: 20,
    maxWidth: 360,
    fontSize: 16,
    fontWeight: "500",
  },
  card: {
    marginTop: spacing(6),
    width: "92%",
    borderRadius: 18,
    ...shadow,
  },
  separator: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginTop: 14,
    marginBottom: 6,
  },
  sepLine: {
    flex: 1,
    height: StyleSheet.hairlineWidth,
    backgroundColor: colors.border,
  },
  sepText: {
    color: colors.subtext,
    fontWeight: "600",
    fontSize: 12,
  },
});
