import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { router } from "expo-router";

import Header from "../components/Panel";
import CustomButton from "../components/CustomButton";
import Colors from "../constants/Colors";
import studyTips, {
  StudyTip,
} from "../data/tips";

export default function TipsScreen() {
  const [tip, setTip] = useState<StudyTip | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulates getting data from an API.
    // In a real application, fetch() could be used here.
    const loadTip = () => {
      setLoading(true);

      const randomIndex = Math.floor(
        Math.random() * studyTips.length
      );

      const selectedTip = studyTips[randomIndex];

      setTip(selectedTip);
      setLoading(false);
    };

    loadTip();
  }, []);

  const getAnotherTip = () => {
    setLoading(true);

    const randomIndex = Math.floor(
      Math.random() * studyTips.length
    );

    setTip(studyTips[randomIndex]);
    setLoading(false);
  };

  return (
    <ScrollView
      contentContainerStyle={styles.container}
    >
      <Header
        title="Daily Study Tip"
        subtitle="A small reminder to help you study."
      />

      <View style={styles.tipCard}>
        {loading ? (
          <ActivityIndicator
            size="large"
            color={Colors.primary}
          />
        ) : (
          <>
            <Text style={styles.emoji}>💡</Text>

            <Text style={styles.tipTitle}>
              {tip?.title}
            </Text>

            <Text style={styles.tipDescription}>
              {tip?.description}
            </Text>
          </>
        )}
      </View>

      <CustomButton
        title="Get Another Tip"
        onPress={getAnotherTip}
      />

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

  tipCard: {
    backgroundColor: Colors.card,
    borderRadius: 20,
    padding: 30,
    minHeight: 250,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: Colors.border,
    marginBottom: 20,
  },

  emoji: {
    fontSize: 55,
    marginBottom: 15,
  },

  tipTitle: {
    fontSize: 24,
    fontWeight: "800",
    color: Colors.text,
    textAlign: "center",
    marginBottom: 12,
  },

  tipDescription: {
    color: Colors.textLight,
    fontSize: 16,
    lineHeight: 24,
    textAlign: "center",
  },
});