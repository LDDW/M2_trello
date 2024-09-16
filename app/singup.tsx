import React from "react";
import { Link, useRouter } from "expo-router";
import { View, StyleSheet, Text } from "react-native";
import { Input } from "@ui-kitten/components";
import Button from "@/components/common/Button";
import { SafeAreaView } from "react-native-safe-area-context";
import { auth } from "@/libs/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";

export default function SingIn() {
  const router = useRouter();

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState(null);

  const handleSingUp = async () => {
    setError(null);
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      router.push("/singin");
    } catch (error: any) {
      setError(error.message);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.form}>
        <View>
          <Text style={styles.title}>Inscription</Text>
          <Text style={styles.text}>
            Inscrivez-vous pour accéder à toutes les fonctionnalités de
            l'application
          </Text>
        </View>
        {error ? <Text>{error}</Text> : null}
        <Input
          label={<Text>Email</Text>}
          placeholder="email@exemple.com"
          onChangeText={setEmail}
        />
        <Input
          label={<Text>Mot de passe</Text>}
          placeholder="Mot de passe"
          onChangeText={setPassword}
          secureTextEntry
        />
        <Button onPress={handleSingUp} text="Inscription" />
      </View>

      <Text>
        Vous avez déjà un compte ?{" "}
        <Link
          href="/singin"
          style={{ color: "#254EDB", textDecorationLine: "underline" }}
        >
          Connexion
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
  text: {
    fontSize: 13,
    color: "#A0A0A0",
    marginTop: 10,
    fontWeight: "500",
  },
  form: {
    marginTop: 50,
    width: "100%",
    gap: 20,
  },
});
