import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
} from "react-native";
import { router } from "expo-router";

import Header from "../components/Header";
import CustomButton from "../components/CustomButton";
import Colors from "../constants/Colors";
import { useMissions } from "../context/MissionContext";

export default function HomeScreen() {
  const {
    studentName,
    setStudentName,
    totalMissions,
    completedMissions,
  } = useMissions();

  const [nameInput, setNameInput] = useState(
    studentName === "Student" ? "" : studentName
  );

  const startStudyDay = () => {
    const trimmedName = nameInput.trim();

    if (trimmedName.length > 0) {
      setStudentName(trimmedName);
    }

    router.push("/tasks");
  };

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      keyboardShouldPersistTaps="handled"
    >
      <View style={styles.hero}>
        <Text style={styles.emoji}>📚</Text>

        <Text style={styles.title}>
          Student Daily Mission
        </Text>

        <Text style={styles.subtitle}>
          Organize your study day, complete your missions,
          and track your progress.
        </Text>
      </View>

      <View style={styles.card}>
        <Header
          title="Welcome!"
          subtitle="Enter your name to begin your study day."
        />

        <Text style={styles.label}>Your Name</Text>

        <TextInput
          value={nameInput}
          onChangeText={setNameInput}
          placeholder="Enter your name"
          placeholderTextColor={Colors.textLight}
          style={styles.input}
        />

        <CustomButton
          title="Start My Study Day"
          onPress={startStudyDay}
        />
      </View>

      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>
            {totalMissions}
          </Text>
          <Text style={styles.statLabel}>Missions</Text>
        </View>

        <View style={styles.statCard}>
          <Text style={styles.statNumber}>
            {completedMissions}
          </Text>
          <Text style={styles.statLabel}>Completed</Text>
        </View>
      </View>

      <CustomButton
        title="My Profile"
        variant="secondary"
        onPress={() => router.push("/profile")}
      />

      <CustomButton
        title="Daily Study Tips"
        variant="secondary"
        onPress={() => router.push("/tips")}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: Colors.background,
    padding: 20,
    paddingTop: 60,
  },

  hero: {
    alignItems: "center",
    marginBottom: 30,
  },

  emoji: {
    fontSize: 56,
    marginBottom: 12,
  },

  title: {
    fontSize: 30,
    fontWeight: "800",
    color: Colors.text,
    textAlign: "center",
  },

  subtitle: {
    fontSize: 16,
    color: Colors.textLight,
    textAlign: "center",
    lineHeight: 24,
    marginTop: 10,
  },

  card: {
    backgroundColor: Colors.card,
    borderRadius: 18,
    padding: 20,
    borderWidth: 1,
    borderColor: Colors.border,
    marginBottom: 18,
  },

  label: {
    fontSize: 15,
    fontWeight: "600",
    color: Colors.text,
    marginBottom: 8,
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
    marginBottom: 15,
  },

  statsContainer: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 18,
  },

  statCard: {
    flex: 1,
    backgroundColor: Colors.card,
    borderRadius: 15,
    padding: 20,
    alignItems: "center",
    borderWidth: 1,
    borderColor: Colors.border,
  },

  statNumber: {
    fontSize: 30,
    fontWeight: "800",
    color: Colors.primary,
  },

  statLabel: {
    marginTop: 5,
    color: Colors.textLight,
    fontSize: 14,
  },
});