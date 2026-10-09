import React from 'react';

import {
  ScrollView,
  StyleSheet,
  ViewStyle,
} from 'react-native';

import {
  SafeAreaView,
} from 'react-native-safe-area-context';

import { useApp } from '../context/AppContext';

type Props = {
  children: React.ReactNode;
  style?: ViewStyle;
};

export default function Screen({
  children,
  style,
}: Props) {
  const { darkMode } = useApp();

  return (
    <SafeAreaView
      style={[
        styles.safe,
        darkMode && styles.darkSafe,
      ]}
    >
      <ScrollView
        contentContainerStyle={[
          styles.content,
          style,
        ]}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {children}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#F6F7FB',
  },

  darkSafe: {
    backgroundColor: '#0D1020',
  },

  content: {
    padding: 20,
    paddingBottom: 120,
  },
});