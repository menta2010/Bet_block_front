// app/auth/register.tsx
import { useEffect, useRef, useState } from "react";
import { View, Text, KeyboardAvoidingView, Platform, StyleSheet, Animated, Image } from "react-native";
import { Link, useRouter } from "expo-router";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

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

      <KeyboardAvoidingView behavior={Platform.select({ ios: "padding" })} style={{ flex: 1 }}>
        <Animated.View style={[styles.center, { opacity: fade, transform: [{ translateY: slide }] }]}>
          <View style={{ alignItems: "center", marginTop: spacing(10) }}>
            <Image
              source={require("../../assets/branding/logo3.png")}
              style={{ width: 300, height: 300, marginBottom: spacing(3) }}
              resizeMode="contain"
            />
            {/* Ou o ícone:
            <MaterialCommunityIcons name="dice-multiple" size={64} color={colors.brand} />
            */}
            <Text style={{ color: colors.subtext, marginTop: spacing(1) }}>
              Comece agora sua jornada de controle.
            </Text>
          </View>

          <Card style={[styles.card]}>
            <H1 style={{ textAlign: "center", marginBottom: spacing(6), color: colors.brand }}>
              Criar conta
            </H1>

            <Input label="Nome" value={nome} onChangeText={setNome} />
            <Input label="Email" value={email} onChangeText={setEmail} autoCapitalize="none" keyboardType="email-address" />
            <Input label="Senha" value={senha} onChangeText={setSenha} secureTextEntry secureToggle />

            {errorMsg ? (
              <Text style={{ color: colors.danger, marginBottom: spacing(2) }}>{errorMsg}</Text>
            ) : null}

            <Button
              title="Cadastrar"
              onPress={onRegister}
              loading={loading}
              leftIcon={<Ionicons name="person-add" size={20} color="#FFFFFF" />}
              variant="secondary"
            />

            <Note style={{ textAlign: "center", marginTop: spacing(4) }}>
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
  card: {
    marginTop: spacing(6),
    width: "92%",
    borderRadius: 18,
    ...shadow,
  },
});
