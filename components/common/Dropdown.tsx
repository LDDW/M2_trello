import {
  View,
  Text,
  StyleSheet,
  Button,
  Touchable,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { Popover } from "@ui-kitten/components";

interface DropdownProps {
  button: React.ReactElement;
  placement: "top start" | "top end" | "bottom start" | "bottom end";
  children: React.ReactElement;
}

export default function Dropdown({
  button,
  placement,
  children,
}: DropdownProps) {
  const [visible, setVisible] = React.useState(false);

  const handleVisible = (state: boolean) => {
    setVisible(state);
  };

  return (
    <View style={styles.buttonContainer}>
      <Popover
        anchor={() => (
          <TouchableOpacity onPress={() => setVisible(true)}>
            {button}
          </TouchableOpacity>
        )}
        visible={visible}
        placement={placement}
        onBackdropPress={() => handleVisible(false)}
      >
        <View style={styles.content}>{children}</View>
      </Popover>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    alignItems: "center",
    paddingHorizontal: 4,
    paddingVertical: 8,
  },
  avatar: {
    marginHorizontal: 4,
  },
});
