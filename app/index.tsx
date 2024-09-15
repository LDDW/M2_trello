import React from "react";
import { useRouter } from "expo-router";
import { Dimensions, Image, StyleSheet, View, Text } from "react-native";
import Button from "@/components/common/Button";

const { width, height } = Dimensions.get("window");

export default function Index() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/images/rocket.jpeg")}
        style={styles.image}
        resizeMode="cover"
      />
      <View style={styles.content}>
        <View style={styles.textContainer}>
          <Text style={styles.title}>
            Bienvenue sur
            <Text style={styles.highlight}> Trello Like</Text>
          </Text>
          <Text style={styles.subtitle}>
            L'application de productivité pour gagner du temps
          </Text>
        </View>
        <View style={styles.buttonContainer}>
          <Button
            onPress={() => router.push("/singin")}
            text="Connexion"
            buttonStyle={{ width: "50%" }}
          />
          <Button
            onPress={() => router.push("/singup")}
            text="Inscription"
            buttonStyle={{ width: "50%", backgroundColor: "white" }}
            textStyle={{ color: "#254EDB" }}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    width: width,
    height: height * 0.7,
    position: "absolute",
    top: 0,
    left: 0,
  },
  content: {
    flex: 1,
    paddingHorizontal: 25,
    paddingVertical: 25,
    marginTop: height * 0.575,
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "white",
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
  },
  textContainer: {
    width: "100%",
  },
  title: {
    fontSize: 48,
    fontWeight: "bold",
  },
  highlight: {
    color: "#3366FF",
  },
  subtitle: {
    color: "gray",
    fontSize: 16,
    marginTop: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    borderRadius: 50,
    borderWidth: 1,
    borderColor: "#254EDB",
  },
});
