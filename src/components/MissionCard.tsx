import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import Colors from "../constants/Colors";
import { Mission } from "../context/MissionContext";

type MissionCardProps = {
  mission: Mission;
  onToggle: () => void;
  onDelete: () => void;
};

export default function MissionCard({
  mission,
  onToggle,
  onDelete,
}: MissionCardProps) {
  return (
    <View style={styles.card}>
      <TouchableOpacity
        style={styles.missionArea}
        onPress={onToggle}
      >
        <View
          style={[
            styles.checkbox,
            mission.completed && styles.checkboxCompleted,
          ]}
        >
          {mission.completed && (
            <Text style={styles.checkmark}>✓</Text>
          )}
        </View>

        <Text
          style={[
            styles.title,
            mission.completed && styles.completedText,
          ]}
        >
          {mission.title}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.deleteButton}
        onPress={onDelete}
      >
        <Text style={styles.deleteText}>Delete</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.card,
    borderRadius: 14,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: Colors.border,
  },

  missionArea: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },

  checkbox: {
    width: 26,
    height: 26,
    borderRadius: 7,
    borderWidth: 2,
    borderColor: Colors.primary,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },

  checkboxCompleted: {
    backgroundColor: Colors.success,
    borderColor: Colors.success,
  },

  checkmark: {
    color: Colors.white,
    fontWeight: "700",
  },

  title: {
    flex: 1,
    fontSize: 16,
    color: Colors.text,
    fontWeight: "500",
  },

  completedText: {
    textDecorationLine: "line-through",
    color: Colors.textLight,
  },

  deleteButton: {
    alignSelf: "flex-end",
    marginTop: 12,
    paddingVertical: 5,
    paddingHorizontal: 8,
  },

  deleteText: {
    color: Colors.danger,
    fontWeight: "600",
  },
});