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
import { createCard, deleteCard, fetchCardsForSection, updateCard } from "@/libs/firestore";

const { width, height } = Dimensions.get("window");

interface BoardSectionProps {
  handleUpdateSection: (id: string, title: string) => void;
  handleDeleteSection: (id: string) => void;
  data: any;
}

interface Card {
  id: string;
  title: string;
  description: string;
  index: number;
  sectionId: string;
}

export default function BoardSection({
  handleUpdateSection,
  handleDeleteSection,
  data,
}: BoardSectionProps) {
  const { title, id } = data;

  const [modalCard, setModalCard] = React.useState(false);
  const [modalStatus, setModalStatus] = React.useState("");
  const [modalSection, setModalSection] = React.useState(false);
  const [cards, setCards] = React.useState<Card[]>([]);
  const [sectionTitle, setSectionTitle] = React.useState(title);
  const [cardTitle, setCardTitle] = React.useState("");
  const [cardDescription, setCardDescription] = React.useState("");
  const [currentCard, setCurrentCard] = React.useState<Card | null>(null);

  const loadCards = async () => {
    const fetchedCards = await fetchCardsForSection(id);
    if (fetchedCards) {
      setCards(fetchedCards);
    }
  };

  const handleModalCard = (state: boolean, status = "", card?: Card) => {
    setModalCard(state);
    setModalStatus(status);

    if (status === "create") {
      setCardTitle("");
      setCardDescription("");
    } else if (status === "edit" && card) {
      setCurrentCard(card); // stocker la carte actuelle
      setCardTitle(card.title);
      setCardDescription(card.description);
    }
  };

  const handleCreateNewCard = async () => {
    const index = cards.length;
    await createCard(cardTitle, cardDescription, id, index);
    setModalCard(false);
    loadCards();
  };

  const handleUpdateCard = async () => {
    if (currentCard) {
      await updateCard(currentCard.id, cardTitle, cardDescription);
      setModalCard(false);
      loadCards();
    }
  };

  const handleDeleteCard = async () => {
    if (currentCard) {
      await deleteCard(currentCard.id);
      setModalCard(false);
      loadCards();
    }
  };


  const handleModalSection = (state: boolean) => {
    setModalSection(state);
    if (state === true) {
      setSectionTitle(title);
    } else {
      setSectionTitle("");
    }
  };

  const handleSaveChangesSection = () => {
    handleUpdateSection(id, sectionTitle);
    handleModalSection(false);
  };

  const handleDeletSection = () => {
    handleDeleteSection(id);
    handleModalSection(false);
  };

  React.useEffect(() => {
    loadCards();
  }, [id]);

  const renderItem = ({ item, drag, isActive }: RenderItemParams<any>) => {
    return (
      <TouchableOpacity
        style={[
          styles.card,
          { backgroundColor: isActive ? "#f0f0f0" : "#F6F8FC" },
        ]}
        onLongPress={drag}
        onPress={() => handleModalCard(true, "edit", item)}
      >
        <Text>{item.title}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>{title}</Text>
          <TouchableOpacity
            style={styles.dropdownItem}
            onPress={() => handleModalSection(true)}
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
            onPress={() => handleModalCard(true, "create")}
          >
            <Ionicons name="add" size={16} color="white" />
            <Text style={{ fontSize: 14, color: "white" }}>
              Ajouter une carte
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <RNModal
        modalVisible={modalSection}
        handleModal={() => handleModalSection(false)}
        title={"Modifier la section"}
      >
        <>
          <Input
            label={<Text>Titre</Text>}
            value={sectionTitle}
            onChangeText={setSectionTitle}
          />
          <Button
            onPress={() => {
              handleSaveChangesSection();
            }}
            text="SAUVEGARDER"
          />

          <Button
            onPress={() => handleDeletSection()}
            text="SUPPRIMER"
            buttonStyle={{ backgroundColor: "#e43b10" }}
          />
        </>
      </RNModal>

      {/* modal */}
      <RNModal
        modalVisible={modalCard}
        handleModal={() => handleModalCard(false)}
        title={
          modalStatus === "create"
            ? "Ajouter une nouvelle carte"
            : "Modifier la carte"
        }
      >
        <>
          <Input
            label={<Text>Titre</Text>}
            value={cardTitle}
            onChangeText={setCardTitle}
          />
          <Input
            multiline={true}
            label={<Text>Description</Text>}
            value={cardDescription}
            onChangeText={setCardDescription}
          />
          <Button
              onPress={modalStatus === "create" ? handleCreateNewCard : handleUpdateCard}
              text={modalStatus === "create" ? "VALIDER" : "SAUVEGARDER"}
          />
          {modalStatus === "edit" && (
            <Button
              onPress={handleDeleteCard}
              text="SUPPRIMER"
              buttonStyle={{ backgroundColor: "#e43b10" }}
            />
          )}
        </>
      </RNModal>
      {/* <RNModal
        modalVisible={modalCard}
        handleModal={() => handleModalCard(false)}
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
            onPress={() => handleModalCard(false)}
            text={modalStatus === "create" ? "VALIDER" : "SAUVEGARDER"}
          />
          {modalStatus === "edit" && (
            <Button
              onPress={() => handleModalCard(false)}
              text="SUPPRIMER"
              buttonStyle={{ backgroundColor: "#e43b10" }}
            />
          )}
        </>
      </RNModal> */}
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
