import React from "react";
import {
  View,
  Text,
  StyleSheet,
} from "react-native";
import Colors from "../constants/Colors";

type HeaderProps = {
  title: string;
  subtitle?: string;
};

export default function Header({
  title,
  subtitle,
}: HeaderProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>

      {subtitle ? (
        <Text style={styles.subtitle}>{subtitle}</Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 24,
  },

  title: {
    fontSize: 28,
    fontWeight: "700",
    color: Colors.text,
  },

  subtitle: {
    fontSize: 15,
    color: Colors.textLight,
    marginTop: 6,
  },
});