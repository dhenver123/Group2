import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
} from "react-native";
import { router } from "expo-router";

import Header from "../components/Panel";
import CustomButton from "../components/CustomButton";
import MissionCard from "../components/Screen";
import Colors from "../constants/Colors";
import { useMissions } from "../context/MissionContext";

export default function TasksScreen() {
  const {
    studentName,
    missions,
    addMission,
    toggleMission,
    deleteMission,
    resetMissions,
    totalMissions,
    completedMissions,
  } = useMissions();

  const [missionInput, setMissionInput] = useState("");

  const handleAddMission = () => {
    if (missionInput.trim().length === 0) {
      return;
    }

    addMission(missionInput);
    setMissionInput("");
  };

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      keyboardShouldPersistTaps="handled"
    >
      <Header
        title="Study Missions"
        subtitle={`Good luck today, ${studentName}!`}
      />

      <View style={styles.inputCard}>
        <Text style={styles.label}>
          Add a new study mission
        </Text>

        <TextInput
          value={missionInput}
          onChangeText={setMissionInput}
          placeholder="Example: Study Lesson 6"
          placeholderTextColor={Colors.textLight}
          style={styles.input}
          onSubmitEditing={handleAddMission}
        />

        <CustomButton
          title="Add Mission"
          onPress={handleAddMission}
        />
      </View>

      <View style={styles.progressCard}>
        <View>
          <Text style={styles.progressLabel}>
            Your Progress
          </Text>

          <Text style={styles.progressText}>
            {completedMissions} of {totalMissions} completed
          </Text>
        </View>

        <Text style={styles.progressNumber}>
          {totalMissions === 0
            ? 0
            : Math.round(
                (completedMissions / totalMissions) * 100
              )}
          %
        </Text>
      </View>

      <Text style={styles.sectionTitle}>
        Today's Missions
      </Text>

      {missions.length === 0 ? (
        <View style={styles.emptyCard}>
          <Text style={styles.emptyEmoji}>🎯</Text>

          <Text style={styles.emptyTitle}>
            No missions yet
          </Text>

          <Text style={styles.emptyText}>
            Add a study mission above to get started.
          </Text>
        </View>
      ) : (
        missions.map((mission) => (
          <MissionCard
            key={mission.id}
            mission={mission}
            onToggle={() => toggleMission(mission.id)}
            onDelete={() => deleteMission(mission.id)}
          />
        ))
      )}

      <View style={styles.buttons}>
        <CustomButton
          title="View Study Summary"
          onPress={() => router.push("/summary")}
        />

        <CustomButton
          title="Daily Study Tips"
          variant="secondary"
          onPress={() => router.push("/tips")}
        />

        <CustomButton
          title="Reset All Missions"
          variant="danger"
          onPress={resetMissions}
        />

        <CustomButton
          title="Back to Home"
          variant="secondary"
          onPress={() => router.replace("/")}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: Colors.background,
    padding: 20,
    paddingTop: 55,
  },

  inputCard: {
    backgroundColor: Colors.card,
    borderRadius: 16,
    padding: 18,
    borderWidth: 1,
    borderColor: Colors.border,
    marginBottom: 16,
  },

  label: {
    fontSize: 16,
    fontWeight: "700",
    color: Colors.text,
    marginBottom: 10,
  },

  input: {
    height: 52,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 12,
    paddingHorizontal: 15,
    fontSize: 16,
    color: Colors.text,
    backgroundColor: Colors.white,
    marginBottom: 14,
  },

  progressCard: {
    backgroundColor: Colors.primary,
    borderRadius: 16,
    padding: 20,
    marginBottom: 25,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  progressLabel: {
    color: Colors.white,
    fontSize: 14,
    opacity: 0.9,
  },

  progressText: {
    color: Colors.white,
    fontSize: 17,
    fontWeight: "700",
    marginTop: 5,
  },

  progressNumber: {
    color: Colors.white,
    fontSize: 30,
    fontWeight: "800",
  },

  sectionTitle: {
    fontSize: 21,
    fontWeight: "700",
    color: Colors.text,
    marginBottom: 14,
  },

  emptyCard: {
    backgroundColor: Colors.card,
    borderRadius: 16,
    padding: 30,
    alignItems: "center",
    borderWidth: 1,
    borderColor: Colors.border,
    marginBottom: 20,
  },

  emptyEmoji: {
    fontSize: 40,
    marginBottom: 10,
  },

  emptyTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: Colors.text,
  },

  emptyText: {
    color: Colors.textLight,
    textAlign: "center",
    marginTop: 6,
  },

  buttons: {
    marginTop: 10,
  },
});