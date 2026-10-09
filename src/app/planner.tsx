import React, {
  useMemo,
  useState,
} from 'react';

import {
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import Screen from '../components/Screen';
import Panel from '../components/Panel';
import BottomNav from '../components/BottomNav';

import { useApp } from '../context/AppContext';

export default function Planner() {
  const {
    missions,
    darkMode,
  } = useApp();

  const [selected, setSelected] =
    useState(new Date());

  const days = useMemo(() => {
    const list: Date[] = [];

    for (
      let i = -2;
      i <= 2;
      i++
    ) {
      const date = new Date();

      date.setDate(
        date.getDate() + i
      );

      list.push(date);
    }

    return list;
  }, []);

  const selectedKey =
    selected
      .toISOString()
      .slice(0, 10);

  const selectedMissions =
    missions.filter(
      (mission) =>
        mission.date ===
        selectedKey
    );

  return (
    <View
      style={[
        styles.root,
        darkMode &&
          styles.darkRoot,
      ]}
    >
      <Screen>
        <Text style={styles.kicker}>
          PLAN YOUR WEEK
        </Text>

        <Text
          style={[
            styles.title,
            darkMode &&
              styles.darkText,
          ]}
        >
          Planner
        </Text>

        <Text style={styles.subtitle}>
          See what deserves your
          attention.
        </Text>

        <View style={styles.days}>
          {days.map((day) => {
            const active =
              day.toDateString() ===
              selected.toDateString();

            return (
              <Pressable
                key={day.toISOString()}
                onPress={() =>
                  setSelected(day)
                }
                style={[
                  styles.day,
                  active &&
                    styles.activeDay,
                ]}
              >
                <Text
                  style={[
                    styles.dayName,
                    active &&
                      styles.activeDayText,
                  ]}
                >
                  {day
                    .toLocaleDateString(
                      'en-US',
                      {
                        weekday:
                          'short',
                      }
                    )
                    .slice(0, 2)}
                </Text>

                <Text
                  style={[
                    styles.dayNumber,
                    active &&
                      styles.activeDayText,
                  ]}
                >
                  {day.getDate()}
                </Text>
              </Pressable>
            );
          })}
        </View>

        <Panel>
          <Text
            style={[
              styles.panelTitle,
              darkMode &&
                styles.darkText,
            ]}
          >
            {selected.toLocaleDateString(
              'en-US',
              {
                weekday: 'long',
                month: 'long',
                day: 'numeric',
              }
            )}
          </Text>

          <Text style={styles.meta}>
            {selectedMissions.length}{' '}
            planned mission
            {selectedMissions.length ===
            1
              ? ''
              : 's'}
          </Text>
        </Panel>

        {selectedMissions.map(
          (mission) => (
            <Panel key={mission.id}>
              <View
                style={styles.row}
              >
                <View
                  style={[
                    styles.timeDot,
                    mission.completed &&
                      styles.doneDot,
                  ]}
                />

                <View
                  style={styles.info}
                >
                  <Text
                    style={[
                      styles.mission,
                      mission.completed &&
                        styles.doneText,
                      darkMode &&
                        styles.darkText,
                    ]}
                  >
                    {mission.title}
                  </Text>

                  <Text
                    style={
                      styles.meta
                    }
                  >
                    {mission.category}
                    {' · '}
                    {mission.priority}{' '}
                    priority
                  </Text>
                </View>
              </View>
            </Panel>
          )
        )}

        {selectedMissions.length ===
          0 && (
          <Panel>
            <Text
              style={[
                styles.empty,
                darkMode &&
                  styles.darkText,
              ]}
            >
              A clear schedule.
            </Text>

            <Text style={styles.meta}>
              No missions are planned
              for this day.
            </Text>
          </Panel>
        )}
      </Screen>

      <BottomNav />
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#F6F7FB',
  },

  darkRoot: {
    backgroundColor: '#0D1020',
  },

  kicker: {
    color: '#8A8DA0',
    fontSize: 10,
    fontWeight: '900',
    letterSpacing: 1.5,
    marginTop: 5,
  },

  title: {
    color: '#17182C',
    fontSize: 32,
    fontWeight: '900',
    marginTop: 5,
  },

  darkText: {
    color: '#F7F7FB',
  },

  subtitle: {
    color: '#8A8DA0',
    fontSize: 13,
    marginTop: 5,
    marginBottom: 20,
  },

  days: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 18,
  },

  day: {
    width: 57,
    height: 72,
    borderRadius: 19,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFF',
  },

  activeDay: {
    backgroundColor: '#6C4DE6',
  },

  dayName: {
    color: '#8A8DA0',
    fontSize: 11,
    fontWeight: '800',
  },

  dayNumber: {
    color: '#22243A',
    fontSize: 19,
    fontWeight: '900',
    marginTop: 6,
  },

  activeDayText: {
    color: '#FFF',
  },

  panelTitle: {
    color: '#17182C',
    fontSize: 16,
    fontWeight: '900',
  },

  meta: {
    color: '#9295A5',
    fontSize: 11,
    marginTop: 5,
    fontWeight: '600',
  },

  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  timeDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#8D72FF',
    marginRight: 14,
  },

  doneDot: {
    backgroundColor: '#4CB782',
  },

  info: {
    flex: 1,
  },

  mission: {
    color: '#202236',
    fontSize: 14,
    fontWeight: '800',
  },

  doneText: {
    textDecorationLine:
      'line-through',
    color: '#9295A5',
  },

  empty: {
    color: '#202236',
    fontSize: 15,
    fontWeight: '900',
  },
});