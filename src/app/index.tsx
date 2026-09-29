import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';

export default function ProfileScreen() {
  const router = useRouter();

  // Lesson 3: User Inputs State
  const [name, setName] = useState('Alex Developer');
  const [section, setSection] = useState('C'); // Default section 'C' -> initial value 3

  // Helper to convert section letter to number (A=1, B=2, C=3...)
  const getSectionValue = (letter: string) => {
    const charCode = letter.toUpperCase().charCodeAt(0);
    return charCode >= 65 && charCode <= 90 ? charCode - 64 : 1;
  };

  const initialCount = getSectionValue(section);

  // Lesson 2: useState for Counter
  const [count, setCount] = useState(initialCount);

  // Update section letter and reset counter
  const handleSectionChange = (text: string) => {
    setSection(text);
    const newInitial = getSectionValue(text);
    setCount(newInitial);
  };

  // Lesson 4 & 5: Navigation and Data Passing
  const handleNavigate = () => {
    router.push({
      pathname: '/dashboard',
      params: { name, section, count, initialCount },
    });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Lesson 1: Styled View & Text (About Myself) */}
      <View style={styles.card}>
        <Text style={styles.avatar}>🧑‍💻</Text>
        <Text style={styles.title}>About Myself</Text>
        <Text style={styles.subtitle}>Mobile App Developer Student</Text>
        <Text style={styles.bio}>
          Passionate about building cross-platform React Native applications and learning component dynamics!
        </Text>
      </View>

      {/* Lesson 3: Interactive Inputs */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Student Name:</Text>
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={setName}
          placeholder="Enter your name"
        />

        <Text style={styles.label}>Section Letter (A, B, C...):</Text>
        <TextInput
          style={styles.input}
          value={section}
          maxLength={1}
          onChangeText={handleSectionChange}
          placeholder="Section"
        />
      </View>

      {/* Lesson 2: Interactive Counter */}
      <View style={styles.counterCard}>
        <Text style={styles.counterTitle}>Study Target Counter</Text>
        <Text style={styles.counterValue}>{count}</Text>
        <Text style={styles.initialText}>(Initial Value from Section '{section.toUpperCase()}': {initialCount})</Text>

        <View style={styles.buttonRow}>
          <TouchableOpacity style={[styles.btn, styles.addBtn]} onPress={() => setCount(count + 1)}>
            <Text style={styles.btnText}>+1</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.btn, styles.subBtn]} onPress={() => setCount(count - 1)}>
            <Text style={styles.btnText}>-1</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.btn, styles.resetBtn]} onPress={() => setCount(initialCount)}>
            <Text style={styles.btnText}>Reset</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Lesson 4 & 5 Trigger */}
      <TouchableOpacity style={styles.navButton} onPress={handleNavigate}>
        <Text style={styles.navButtonText}>Go to Dashboard ➔</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, backgroundColor: '#F3F4F6' },
  card: { backgroundColor: '#FFF', padding: 20, borderRadius: 16, alignItems: 'center', marginBottom: 20, elevation: 3 },
  avatar: { fontSize: 50, marginBottom: 10 },
  title: { fontSize: 22, fontWeight: 'bold', color: '#1F2937' },
  subtitle: { fontSize: 14, color: '#6B7280', marginBottom: 10 },
  bio: { textAlign: 'center', color: '#4B5563', lineHeight: 20 },
  inputContainer: { backgroundColor: '#FFF', padding: 16, borderRadius: 16, marginBottom: 20, elevation: 2 },
  label: { fontSize: 14, fontWeight: '600', color: '#374151', marginBottom: 6 },
  input: { borderWidth: 1, borderColor: '#D1D5DB', borderRadius: 8, padding: 10, marginBottom: 12 },
  counterCard: { backgroundColor: '#FFF', padding: 20, borderRadius: 16, alignItems: 'center', marginBottom: 20, elevation: 3 },
  counterTitle: { fontSize: 16, fontWeight: '600', color: '#374151' },
  counterValue: { fontSize: 48, fontWeight: 'bold', color: '#4F46E5', my: 10 },
  initialText: { fontSize: 12, color: '#9CA3AF', marginBottom: 16 },
  buttonRow: { flexDirection: 'row', gap: 10 },
  btn: { paddingVertical: 10, paddingHorizontal: 20, borderRadius: 8 },
  addBtn: { backgroundColor: '#10B981' },
  subBtn: { backgroundColor: '#EF4444' },
  resetBtn: { backgroundColor: '#6B7280' },
  btnText: { color: '#FFF', fontWeight: 'bold', fontSize: 16 },
  navButton: { backgroundColor: '#4F46E5', padding: 16, borderRadius: 12, alignItems: 'center' },
  navButtonText: { color: '#FFF', fontWeight: 'bold', fontSize: 16 },
});