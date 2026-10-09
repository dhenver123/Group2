import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
} from "react-native";
import { router } from "expo-router";

import Header from "../components/Panel";
import CustomButton from "../components/CustomButton";
import Colors from "../constants/Colors";
import { useMissions } from "../context/MissionContext";

export default function SummaryScreen() {
  const {
    studentName,
    missions,
    totalMissions,
    completedMissions,
  } = useMissions();

  const percentage =
    totalMissions === 0
      ? 0
      : Math.round(
          (completedMissions / totalMissions) * 100
        );

  return (
    <ScrollView
      contentContainerStyle={styles.container}
    >
      <Header
        title="Study Summary"
        subtitle={`Today's progress for ${studentName}`}
      />

      <View style={styles.mainCard}>
        <Text style={styles.bigNumber}>
          {percentage}%
        </Text>

        <Text style={styles.progressTitle}>
          Study Progress
        </Text>

        <Text style={styles.progressDescription}>
          You completed {completedMissions} out of{" "}
          {totalMissions} missions.
        </Text>
      </View>

      <View style={styles.statsRow}>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>
            {totalMissions}
          </Text>

          <Text style={styles.statLabel}>
            Total Missions
          </Text>
        </View>

        <View style={styles.statCard}>
          <Text style={styles.statNumber}>
            {completedMissions}
          </Text>

          <Text style={styles.statLabel}>
            Completed
          </Text>
        </View>
      </View>

      <Text style={styles.sectionTitle}>
        Mission Status
      </Text>

      {missions.length === 0 ? (
        <View style={styles.emptyCard}>
          <Text style={styles.emptyText}>
            There are currently no missions.
          </Text>
        </View>
      ) : (
        missions.map((mission) => (
          <View
            key={mission.id}
            style={styles.missionRow}
          >
            <Text
              style={[
                styles.missionTitle,
                mission.completed &&
                  styles.completedMission,
              ]}
            >
              {mission.title}
            </Text>

            <Text
              style={[
                styles.status,
                mission.completed
                  ? styles.completedStatus
                  : styles.pendingStatus,
              ]}
            >
              {mission.completed
                ? "Completed"
                : "Pending"}
            </Text>
          </View>
        ))
      )}

      <View style={styles.buttons}>
        <CustomButton
          title="Back to Missions"
          onPress={() => router.push("/tasks")}
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

  mainCard: {
    backgroundColor: Colors.primary,
    borderRadius: 20,
    padding: 30,
    alignItems: "center",
    marginBottom: 15,
  },

  bigNumber: {
    color: Colors.white,
    fontSize: 55,
    fontWeight: "800",
  },

  progressTitle: {
    color: Colors.white,
    fontSize: 21,
    fontWeight: "700",
    marginTop: 5,
  },

  progressDescription: {
    color: Colors.white,
    textAlign: "center",
    marginTop: 8,
    opacity: 0.9,
  },

  statsRow: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 25,
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
    fontSize: 28,
    fontWeight: "800",
    color: Colors.primary,
  },

  statLabel: {
    color: Colors.textLight,
    marginTop: 5,
    textAlign: "center",
  },

  sectionTitle: {
    fontSize: 21,
    fontWeight: "700",
    color: Colors.text,
    marginBottom: 12,
  },

  missionRow: {
    backgroundColor: Colors.card,
    borderRadius: 13,
    padding: 16,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: Colors.border,
  },

  missionTitle: {
    fontSize: 16,
    color: Colors.text,
    fontWeight: "600",
  },

  completedMission: {
    textDecorationLine: "line-through",
    color: Colors.textLight,
  },

  status: {
    marginTop: 7,
    fontSize: 13,
    fontWeight: "600",
  },

  completedStatus: {
    color: Colors.success,
  },

  pendingStatus: {
    color: Colors.warning,
  },

  emptyCard: {
    backgroundColor: Colors.card,
    borderRadius: 15,
    padding: 25,
    borderWidth: 1,
    borderColor: Colors.border,
  },

  emptyText: {
    textAlign: "center",
    color: Colors.textLight,
  },

  buttons: {
    marginTop: 20,
  },
});