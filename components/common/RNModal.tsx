import { View, Text, StyleSheet, TouchableOpacity, Modal } from "react-native";
import React from "react";
import Ionicons from "@expo/vector-icons/Ionicons";

interface ModalProps {
  modalVisible: boolean;
  handleModal: (state: boolean) => void;
  title: string;
  children: React.ReactElement;
}

export default function RNModal({
  modalVisible,
  handleModal,
  title,
  children,
}: ModalProps) {
  return (
    <Modal
      visible={modalVisible}
      onRequestClose={() => handleModal(false)}
      animationType="slide"
      presentationStyle="pageSheet"
    >
      <View style={styles.modal}>
        <View style={styles.header}>
          <Text style={styles.headerText}>{title}</Text>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => handleModal(false)}
          >
            <Ionicons name="close" size={16} color="black" />
          </TouchableOpacity>
        </View>
        <View style={styles.main}>{children}</View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modal: {
    width: "100%",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    padding: 20,
    borderBottomWidth: 1,
    borderColor: "#EFF1F7",
  },
  headerText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  closeButton: {
    width: 30,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
    backgroundColor: "#EFF1F7",
  },
  main: {
    padding: 20,
    gap: 20,
  },
});
