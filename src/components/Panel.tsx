import React from 'react';

import {
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';

import { useApp } from '../context/AppContext';

type Props = {
  children: React.ReactNode;
  style?: ViewStyle;
};

export default function Panel({
  children,
  style,
}: Props) {
  const { darkMode } = useApp();

  return (
    <View
      style={[
        styles.panel,
        darkMode && styles.darkPanel,
        style,
      ]}
    >
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  panel: {
    backgroundColor: '#FFFFFF',

    borderRadius: 24,

    padding: 18,

    marginBottom: 16,

    shadowColor: '#1C2035',

    shadowOpacity: 0.05,

    shadowRadius: 16,

    shadowOffset: {
      width: 0,
      height: 6,
    },

    elevation: 2,
  },

  darkPanel: {
    backgroundColor: '#171A2E',

    shadowOpacity: 0,
  },
});