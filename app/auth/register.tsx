// app/auth/register.tsx
import { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Animated,
  Image,
  useWindowDimensions,
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
import { useAuth, registerApi, loginApi } from "@src/auth/useAuth";
import { getErrorMessage } from "@src/utils/getErrorMessage";

export default function Register() {
  const { width } = useWindowDimensions();
  const logoSize = Math.min(Math.round(width * 0.48), 220);

  const { setToken } = useAuth();
  const router = useRouter();

  const [nome, setNome] = useState("");
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

  const onRegister = async () => {
    if (!nome.trim() || !email.trim() || !senha.trim()) return;
    try {
      setLoading(true);
      setErrorMsg(null);
      await registerApi(nome.trim(), email.trim(), senha);
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
      <GradientBackground />

      <KeyboardAvoidingView
        behavior={Platform.select({ ios: "padding", android: undefined })}
        style={{ flex: 1 }}
      >
        <Animated.View style={[styles.center, { opacity: fade, transform: [{ translateY: slide }] }]}>
          {/* HERO (logo + subtítulo) igual ao login */}
          <View style={styles.hero}>
            <Image
              source={require("../../assets/branding/logo3.png")}
              style={{ width: logoSize, height: logoSize, marginBottom: 4 }}
              resizeMode="contain"
            />
            <Text style={styles.subtitle}>
                Crie sua conta e controle suas apostas.
            </Text>
          </View>

          <Card style={[styles.card, { marginTop: 14 }]}>
            <H1 style={{ textAlign: "center", marginBottom: 20 }}>
              Criar conta
            </H1>

            <Input label="Nome" value={nome} onChangeText={setNome} />
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
              <Text style={{ color: colors.danger, marginBottom: 8 }}>{errorMsg}</Text>
            ) : null}

            <Button
              title="Cadastrar"
              onPress={onRegister}
              loading={loading}
              leftIcon={<Ionicons name="person-add" size={20} color="#FFFFFF" />}
              style={{ marginTop: 8, backgroundColor: "#3FA285" }}
            />

            <Note style={{ textAlign: "center", marginTop: 16 }}>
              Já tem conta?{" "}
              <Link href="/auth/login" style={{ color: colors.brand }}>
                Entrar
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
});
