import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import DraggableFlatList, {
  RenderItemParams,
} from "react-native-draggable-flatlist";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Input } from "@ui-kitten/components";
import Button from "../common/Button";
import RNModal from "../common/RNModal";

const { width, height } = Dimensions.get("window");

interface BoardSectionProps {
  handleModalSection: (state: boolean, status: string) => void;
}

export default function BoardSection({
  handleModalSection,
}: BoardSectionProps) {
  const [modalVisible, setModalVisible] = React.useState(false);
  const [modalStatus, setModalStatus] = React.useState("");
  const [cards, setCards] = React.useState([]);

  const handleModal = (state: boolean, status = "") => {
    setModalVisible(state);
    setModalStatus(status);
  };

  const handleCreateCard = () => {};

  const handleUpdateCard = () => {};

  const handleDeleteCard = () => {};

  const renderItem = ({ item, drag, isActive }: RenderItemParams<any>) => {
    return (
      <TouchableOpacity
        style={[
          styles.card,
          { backgroundColor: isActive ? "#f0f0f0" : "#F6F8FC" },
        ]}
        onLongPress={drag}
        onPress={() => handleModal(true, "edit")}
      >
        <Text>{item.text}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>BoardSection</Text>
          <TouchableOpacity
            style={styles.dropdownItem}
            onPress={() => handleModalSection(true, "edit")}
          >
            <Ionicons name="ellipsis-horizontal" size={20} color="black" />
          </TouchableOpacity>
        </View>

        <DraggableFlatList
          data={cards}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          onDragEnd={({ data }) => setCards(data)}
          contentContainerStyle={styles.flatListContent}
        />

        <View style={styles.footer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => handleModal(true, "create")}
          >
            <Ionicons name="add" size={16} color="white" />
            <Text style={{ fontSize: 14, color: "white" }}>
              Ajouter une carte
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* modal */}
      <RNModal
        modalVisible={modalVisible}
        handleModal={handleModal}
        title={
          modalStatus === "create"
            ? "Ajouter une nouvelle carte"
            : "Modifier la carte"
        }
      >
        <>
          <Input label={<Text>Titre</Text>} />
          <Input multiline={true} label={<Text>Description</Text>} />
          <Button
            onPress={() => handleModal(false)}
            text={modalStatus === "create" ? "VALIDER" : "SAUVEGARDER"}
          />
          {modalStatus === "edit" && (
            <Button
              onPress={() => handleModal(false)}
              text="SUPPRIMER"
              buttonStyle={{ backgroundColor: "#e43b10" }}
            />
          )}
        </>
      </RNModal>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: width - 60,
    height: height - 150,
    marginLeft: 20,
    borderRadius: 10,
    backgroundColor: "white",
    overflow: "hidden",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 15,
    paddingHorizontal: 10,
  },
  headerText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  flatListContent: {
    flexGrow: 1,
    paddingHorizontal: 10,
    paddingBottom: 110,
  },
  footer: {
    padding: 10,
    width: "100%",
    backgroundColor: "white",
    position: "absolute",
    bottom: 0,
    left: 0,
  },
  button: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    gap: 10,
    backgroundColor: "#254EDB",
    borderRadius: 10,
  },
  card: {
    padding: 20,
    marginVertical: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#f0f0f0",
  },
  dropdownItem: {
    alignItems: "center",
    justifyContent: "flex-start",
    paddingVertical: 6,
    paddingHorizontal: 10,
    gap: 10,
  },
  dropdownText: {
    fontSize: 16,
    color: "#333",
  },
  dropdownContainer: {
    backgroundColor: "white",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});
