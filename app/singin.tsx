import React from "react";
import { Link, useRouter } from "expo-router";
import { View, StyleSheet, Text } from "react-native";
import { Input } from "@ui-kitten/components";
import Button from "@/components/common/Button";
import { SafeAreaView } from "react-native-safe-area-context";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/libs/firebase";

export default function SingIn() {
  const router = useRouter();

  const [email, setEmail] = React.useState("doe@gmail.com");
  const [password, setPassword] = React.useState("doejohn");
  const [error, setError] = React.useState("");

  const handleSingIn = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      router.push("/(authenticated)/board");
    } catch (error: any) {
      setError("Email ou mot de passe incorrect");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.form}>
        <Text style={styles.title}>Connexion</Text>
        {error ? <Text style={{ color: "red" }}>{error}</Text> : null}
        <Input
          label={<Text>Email</Text>}
          placeholder="email@exemple.com"
          value={email}
          onChangeText={setEmail}
        />
        <Input
          label={<Text>Mot de passe</Text>}
          placeholder="Mot de passe"
          value={password}
          onChangeText={setPassword}
        />
        <Button onPress={handleSingIn} text="Connexion" />
      </View>

      <Text>
        Vous n'avez pas de compte ?{" "}
        <Link
          href="/singup"
          style={{ color: "#254EDB", textDecorationLine: "underline" }}
        >
          Inscription
        </Link>
      </Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 25,
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
  },
  form: {
    marginTop: 50,
    width: "100%",
    gap: 20,
  },
});
