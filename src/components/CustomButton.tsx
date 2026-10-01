import React from "react";
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ViewStyle,
} from "react-native";
import Colors from "../constants/Colors";

type CustomButtonProps = {
  title: string;
  onPress: () => void;
  variant?: "primary" | "secondary" | "danger";
  style?: ViewStyle;
};

export default function CustomButton({
  title,
  onPress,
  variant = "primary",
  style,
}: CustomButtonProps) {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        variant === "primary" && styles.primary,
        variant === "secondary" && styles.secondary,
        variant === "danger" && styles.danger,
        style,
      ]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <Text
        style={[
          styles.text,
          variant === "secondary" && styles.secondaryText,
        ]}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    minHeight: 50,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    marginBottom: 12,
  },

  primary: {
    backgroundColor: Colors.primary,
  },

  secondary: {
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: Colors.primary,
  },

  danger: {
    backgroundColor: Colors.danger,
  },

  text: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: "600",
  },

  secondaryText: {
    color: Colors.primary,
  },
});