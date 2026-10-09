import React from 'react';

import {
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import {
  usePathname,
  useRouter,
} from 'expo-router';

import { useApp } from '../context/AppContext';

const items = [
  {
    label: 'Home',
    icon: '⌂',
    route: '/',
  },
  {
    label: 'Missions',
    icon: '✦',
    route: '/missions',
  },
  {
    label: 'Planner',
    icon: '□',
    route: '/planner',
  },
  {
    label: 'Progress',
    icon: '↗',
    route: '/progress',
  },
  {
    label: 'Profile',
    icon: '○',
    route: '/profile',
  },
];

export default function BottomNav() {
  const router = useRouter();

  const pathname = usePathname();

  const { darkMode } = useApp();

  return (
    <View
      style={[
        styles.bar,
        darkMode && styles.darkBar,
      ]}
    >
      {items.map((item) => {
        const active =
          pathname === item.route;

        return (
          <Pressable
            key={item.route}
            onPress={() =>
              router.replace(
                item.route as never
              )
            }
            style={styles.item}
          >
            <View
              style={[
                styles.icon,
                active &&
                  styles.activeIcon,
              ]}
            >
              <Text
                style={[
                  styles.iconText,
                  active &&
                    styles.activeIconText,
                ]}
              >
                {item.icon}
              </Text>
            </View>

            <Text
              style={[
                styles.label,
                darkMode &&
                  styles.darkLabel,
                active &&
                  styles.activeLabel,
              ]}
            >
              {item.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  bar: {
    position: 'absolute',

    left: 14,
    right: 14,
    bottom: 14,

    height: 76,

    borderRadius: 24,

    backgroundColor: '#FFFFFF',

    flexDirection: 'row',

    justifyContent: 'space-around',

    alignItems: 'center',

    shadowColor: '#1B1D35',

    shadowOpacity: 0.12,

    shadowRadius: 18,

    shadowOffset: {
      width: 0,
      height: 8,
    },

    elevation: 8,
  },

  darkBar: {
    backgroundColor: '#171A2E',
  },

  item: {
    alignItems: 'center',

    justifyContent: 'center',

    width: 65,
  },

  icon: {
    width: 38,

    height: 30,

    borderRadius: 12,

    alignItems: 'center',

    justifyContent: 'center',
  },

  activeIcon: {
    backgroundColor: '#E8E2FF',
  },

  iconText: {
    fontSize: 20,

    color: '#8A8DA0',
  },

  activeIconText: {
    color: '#6C4DE6',

    fontWeight: '800',
  },

  label: {
    marginTop: 3,

    fontSize: 10,

    color: '#8A8DA0',

    fontWeight: '700',
  },

  activeLabel: {
    color: '#6C4DE6',
  },

  darkLabel: {
    color: '#9A9DB0',
  },
});