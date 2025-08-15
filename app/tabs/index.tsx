import { View, Text } from "react-native";
export default function Home() {
  return (
    <View style={{ padding: 16 }}>
      <Text style={{ fontSize: 18, fontWeight: "600" }}>Bem-vindo!</Text>
      <Text>Após logar, veremos aqui um resumo do progresso.</Text>
    </View>
  );
}
