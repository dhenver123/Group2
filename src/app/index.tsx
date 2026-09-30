import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';

export default function AthleteProfileScreen() {
  const router = useRouter();

  // Lesson 3: User Inputs State
  const [athleteName, setAthleteName] = useState('Alex Trainer');
  const [workoutType, setWorkoutType] = useState('CHEST'); // Default workout target

  // Helper: Derive initial target sets based on workout complexity/type
  const getWorkoutBaseSets = (type: string) => {
    const cleanType = type.trim().toUpperCase();
    if (cleanType.includes('ABS')) return 3;
    if (cleanType.includes('ARMS')) return 4;
    if (cleanType.includes('CHEST')) return 5;
    if (cleanType.includes('LEGS')) return 6;
    return cleanType.length > 0 ? Math.min(Math.max(cleanType.length, 3), 8) : 4;
  };

  const initialSets = getWorkoutBaseSets(workoutType);

  // Lesson 2: useState for Set Counter
  const [sets, setSets] = useState(initialSets);

  // Handle Target Workout Input Change & recalculate base target sets
  const handleWorkoutChange = (text: string) => {
    setWorkoutType(text);
    const newInitial = getWorkoutBaseSets(text);
    setSets(newInitial);
  };

  // Lesson 4 & 5: Navigation with Parameters
  const handleNavigate = () => {
    router.push({
      pathname: '/(tabs)/dashboard' as any,
      params: { athleteName, workoutType, sets, initialSets },
    });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Lesson 1: Styled View & Text (About Myself / Athlete Card) */}
      <View style={styles.card}>
        <Text style={styles.avatar}>🏋️‍♂️</Text>
        <Text style={styles.title}>About The Athlete</Text>
        <Text style={styles.subtitle}>Fitness & Mobile Tech Student</Text>
        <Text style={styles.bio}>
          Dedicated to tracking fitness gains in the gym and progress in React Native application development!
        </Text>
      </View>

      {/* Lesson 3: Interactive Text Inputs */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Athlete Name:</Text>
        <TextInput
          style={styles.input}
          value={athleteName}
          onChangeText={setAthleteName}
          placeholder="Enter athlete name"
          placeholderTextColor="#64748B"
        />

        <Text style={styles.label}>Target Workout (ARMS, ABS, CHEST...):</Text>
        <TextInput
          style={styles.input}
          value={workoutType}
          onChangeText={handleWorkoutChange}
          placeholder="e.g. Arms, Abs, Chest, Legs"
          placeholderTextColor="#64748B"
          autoCapitalize="characters"
        />
      </View>

      {/* Lesson 2: Counter State for Target Sets */}
      <View style={styles.counterCard}>
        <Text style={styles.counterTitle}>Target Sets ({workoutType.toUpperCase()})</Text>
        <Text style={styles.counterValue}>{sets}</Text>
        <Text style={styles.initialText}>
          (Base Sets for '{workoutType.toUpperCase()}': {initialSets})
        </Text>

        <View style={styles.buttonRow}>
          <TouchableOpacity style={[styles.btn, styles.addBtn]} onPress={() => setSets(sets + 1)}>
            <Text style={styles.btnText}>+1</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.btn, styles.subBtn]}
            onPress={() => setSets(Math.max(1, sets - 1))}
          >
            <Text style={styles.btnText}>-1</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.btn, styles.resetBtn]} onPress={() => setSets(initialSets)}>
            <Text style={styles.btnText}>Reset</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Lesson 4 & 5 Trigger */}
      <TouchableOpacity style={styles.navButton} onPress={handleNavigate}>
        <Text style={styles.navButtonText}>Go to Workout Dashboard ➔</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, backgroundColor: '#0F172A' },
  card: { backgroundColor: '#1E293B', padding: 20, borderRadius: 16, alignItems: 'center', marginBottom: 20, elevation: 4 },
  avatar: { fontSize: 50, marginBottom: 10 },
  title: { fontSize: 22, fontWeight: 'bold', color: '#38BDF8' },
  subtitle: { fontSize: 14, color: '#94A3B8', marginBottom: 10 },
  bio: { textAlign: 'center', color: '#CBD5E1', lineHeight: 20 },
  inputContainer: { backgroundColor: '#1E293B', padding: 16, borderRadius: 16, marginBottom: 20, elevation: 3 },
  label: { fontSize: 14, fontWeight: '600', color: '#94A3B8', marginBottom: 6 },
  input: { borderWidth: 1, borderColor: '#334155', borderRadius: 8, padding: 10, color: '#F8FAFC', backgroundColor: '#0F172A', marginBottom: 12 },
  counterCard: { backgroundColor: '#1E293B', padding: 20, borderRadius: 16, alignItems: 'center', marginBottom: 20, elevation: 4 },
  counterTitle: { fontSize: 16, fontWeight: '600', color: '#94A3B8' },
  counterValue: { fontSize: 48, fontWeight: 'bold', color: '#38BDF8', marginVertical: 10 },
  initialText: { fontSize: 12, color: '#64748B', marginBottom: 16 },
  buttonRow: { flexDirection: 'row', gap: 10 },
  btn: { paddingVertical: 10, paddingHorizontal: 20, borderRadius: 8 },
  addBtn: { backgroundColor: '#10B981' },
  subBtn: { backgroundColor: '#EF4444' },
  resetBtn: { backgroundColor: '#64748B' },
  btnText: { color: '#FFFFFF', fontWeight: 'bold', fontSize: 16 },
  navButton: { backgroundColor: '#0284C7', padding: 16, borderRadius: 12, alignItems: 'center' },
  navButtonText: { color: '#FFFFFF', fontWeight: 'bold', fontSize: 16 },
});