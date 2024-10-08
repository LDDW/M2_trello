import {
  collection,
  doc,
  getDocs,
  query,
  where,
  setDoc,
  deleteDoc,
  updateDoc,
  orderBy,
} from "firebase/firestore";
import { db } from "@/libs/firebase";

export const createSection = async (title: string, uid: string) => {
  try {
    const docRef = doc(collection(db, "sections"));
    const sectionId = docRef.id;

    await setDoc(docRef, {
      id: sectionId,
      title,
      userId: uid,
      createdAt: new Date(),
    });

    return sectionId;
  } catch (error) {
    console.error("Erreur lors de la création de la section :", error);
    throw error;
  }
};

export const updateSection = async (sectionId: string, newTitle: string) => {
  const docRef = doc(db, "sections", sectionId);
  await updateDoc(docRef, {
    title: newTitle,
  });
};

export const deleteSection = async (sectionId: string) => {
  try {
    const docRef = doc(db, "sections", sectionId);
    await deleteDoc(docRef);
    console.log(`Section avec ID ${sectionId} supprimée avec succès`);
  } catch (error) {
    console.error("Erreur lors de la suppression de la section :", error);
    throw error;
  }
};

// Lire les sections
export const fetchSections = async (uid: string) => {
  try {
    const sectionsRef = collection(db, "sections");
    const q = query(
      sectionsRef,
      where("userId", "==", uid),
      orderBy("createdAt", "asc")
    );
    const querySnapshot = await getDocs(q);

    const sections = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return sections;
  } catch (error) {
    console.error("Erreur lors de la récupération des sections :", error);
    throw error;
  }
};

interface Card {
  id: string;
  title: string;
  description: string;
  index: number;
  sectionId: string;
}


export const fetchCardsForSection = async (uid: string) => {
  try {
    const cardsRef = collection(db, "cards");
    const q = query(
      cardsRef,
      where("sectionId", "==", uid),
      orderBy("index", "asc")
    );
    const querySnapshot = await getDocs(q);

    const cardsData = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Card[];

    console.log("Cards fetched successfully");
    return cardsData;
  } catch (error) {
    console.error("Error fetching cards: ", error);
  }
};

export const createCard = async (
  title: string,
  description: string,
  sectionId: string,
  index: number
) => {
  try {
    const docRef = doc(collection(db, "cards"));
    const cardId = docRef.id;

    await setDoc(docRef, {
      id: cardId,
      title,
      description,
      index,
      sectionId,
      createdAt: new Date(),
    });

    return cardId;
  } catch (error) {
    console.error("Error creating card: ", error);
  }
};

export const updateCard = async (cardId: string, title: string, description: string) => {
  const docRef = doc(db, "cards", cardId);
  await updateDoc(docRef, {
    title,
    description,
  });
};

export const deleteCard = async (cardId: string) => {
  try {
    const docRef = doc(db, "cards", cardId);
    await deleteDoc(docRef);
    console.log(`Carte avec ID ${cardId} supprimée avec succès`);
  } catch (error) {
    console.error("Erreur lors de la suppression de la carte :", error);
    throw error;
  }
};
