import React from "react";
import {
  Dimensions,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import BoardSection from "@/components/Board/BoardSection";
import { LinearGradient } from "expo-linear-gradient";
import Ionicons from "@expo/vector-icons/Ionicons";
import Button from "@/components/common/Button";
import { Input } from "@ui-kitten/components";
import RNModal from "@/components/common/RNModal";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useAuth } from "@/hooks/useAuth";
import {
  createSection,
  deleteSection,
  fetchSections,
  updateSection,
} from "@/libs/firestore";

const { width, height } = Dimensions.get("window");

export default function Board() {
  const { user } = useAuth();
  const [sections, setSections] = React.useState<{ id: string }[]>([]);
  const [sectionTitle, setSectionTitle] = React.useState("");
  const [modalVisible, setModalVisible] = React.useState(false);
  const [modalStatus, setModalStatus] = React.useState("");

  const handleModal = (state: boolean, status: string) => {
    setModalVisible(state);
    setModalStatus(status);
  };

  const handleTitleSection = (text: string) => {
    setSectionTitle(text);
  };

  const handleCreateSection = async () => {
    if (sectionTitle.trim() === "") {
      alert("Le titre de la section ne peut pas être vide.");
      return;
    }
    if (user?.uid) {
      await createSection(sectionTitle, user.uid);
      const data = await fetchSections(user.uid);
      setSections(data);
    }
  };

  const handleUpdateSection = async (sectionId: string, newTitle: string) => {
    if (newTitle.trim() === "") {
      alert("Le titre de la section ne peut pas être vide.");
      return;
    }

    await updateSection(sectionId, newTitle);

    if (user?.uid) {
      const updatedSections = await fetchSections(user.uid);
      setSections(updatedSections);
    }
  };

  const handleDeleteSection = async (sectionId: string) => {
    if (user?.uid) {
      try {
        await deleteSection(sectionId);
        const updatedSections = sections.filter(
          (section) => section.id !== sectionId
        );
        setSections(updatedSections);
      } catch (error) {
        console.error("Error deleting section:", error);
      }
    }
  };

  React.useEffect(() => {
    const fetchData = async () => {
      if (user?.uid) {
        const data = await fetchSections(user.uid);
        setSections(data);
      }
    };
    fetchData();
  }, [user]);

  if (!user) {
    return <Text>Loading...</Text>;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <LinearGradient colors={["#dadde7", "#9FA7C6"]} style={styles.container}>
        <StatusBar
          barStyle="light-content"
          backgroundColor="#3366FF"
          hidden={false}
        />
        <ScrollView horizontal={true}>
          {sections.map((section) => (
            <BoardSection
              key={section.id}
              data={section}
              handleUpdateSection={handleUpdateSection}
              handleDeleteSection={handleDeleteSection}
            />
          ))}

          <TouchableOpacity
            style={styles.button}
            onPress={() => handleModal(true, "create")}
          >
            <Ionicons name="add" size={16} color="black" />
            <Text style={{ fontSize: 13 }}>Ajouter une liste</Text>
          </TouchableOpacity>
        </ScrollView>
      </LinearGradient>

      {/* modal */}
      <RNModal
        modalVisible={modalVisible}
        handleModal={() => handleModal(false, "")}
        title={
          modalStatus === "edit"
            ? "Modifier la liste"
            : "Ajouter une nouvelle liste"
        }
      >
        <>
          <Input
            label={<Text>Titre</Text>}
            value={sectionTitle}
            onChangeText={handleTitleSection}
          />
          <Button
            onPress={() => {
              handleCreateSection();
              handleModal(false, "");
            }}
            text="VALIDER"
          />
          {modalStatus === "edit" && (
            <Button
              onPress={() => {
                handleModal(false, "");
              }}
              text="SUPPRIMER"
              buttonStyle={{ backgroundColor: "#e43b10" }}
            />
          )}
        </>
      </RNModal>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
    height: "100%",
  },
  button: {
    width: width - 40,
    height: 40,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    gap: 10,
    backgroundColor: "#EFF1F7",
    borderRadius: 10,
    marginHorizontal: 20,
  },
});
