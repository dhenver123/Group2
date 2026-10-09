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

export default function ProfileScreen() {
  const { studentName } = useMissions();

  return (
    <ScrollView
      contentContainerStyle={styles.container}
    >
      <Header
        title="My Profile"
        subtitle="A simple student profile"
      />

      <View style={styles.profileCard}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>
            {studentName.charAt(0).toUpperCase()}
          </Text>
        </View>

        <Text style={styles.name}>
          {studentName}
        </Text>

        <Text style={styles.role}>
          React Native Student
        </Text>
      </View>

      <View style={styles.infoCard}>
        <Text style={styles.sectionTitle}>
          About Me
        </Text>

        <Text style={styles.description}>
          I am a student learning React Native and
          mobile application development. I am currently
          practicing how to create interactive and
          multi-screen applications.
        </Text>
      </View>

      <View style={styles.infoCard}>
        <Text style={styles.sectionTitle}>
          Skills I Am Learning
        </Text>

        <View style={styles.skill}>
          <Text style={styles.skillText}>
            ✓ React Native
          </Text>
        </View>

        <View style={styles.skill}>
          <Text style={styles.skillText}>
            ✓ TypeScript
          </Text>
        </View>

        <View style={styles.skill}>
          <Text style={styles.skillText}>
            ✓ Expo Router
          </Text>
        </View>

        <View style={styles.skill}>
          <Text style={styles.skillText}>
            ✓ Component State
          </Text>
        </View>
      </View>

      <CustomButton
        title="Back to Home"
        variant="secondary"
        onPress={() => router.replace("/")}
      />
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

  profileCard: {
    backgroundColor: Colors.primary,
    borderRadius: 20,
    padding: 30,
    alignItems: "center",
    marginBottom: 18,
  },

  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: Colors.white,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
  },

  avatarText: {
    fontSize: 38,
    fontWeight: "800",
    color: Colors.primary,
  },

  name: {
    color: Colors.white,
    fontSize: 25,
    fontWeight: "800",
  },

  role: {
    color: Colors.white,
    opacity: 0.9,
    marginTop: 5,
  },

  infoCard: {
    backgroundColor: Colors.card,
    borderRadius: 16,
    padding: 20,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: Colors.border,
  },

  sectionTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: Colors.text,
    marginBottom: 10,
  },

  description: {
    color: Colors.textLight,
    fontSize: 15,
    lineHeight: 23,
  },

  skill: {
    backgroundColor: Colors.background,
    borderRadius: 10,
    padding: 12,
    marginTop: 8,
  },

  skillText: {
    color: Colors.text,
    fontSize: 15,
    fontWeight: "500",
  },
});