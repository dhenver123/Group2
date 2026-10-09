import React from 'react';

import {
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { useRouter } from 'expo-router';

import Screen from '../components/Screen';
import Panel from '../components/Panel';
import BottomNav from '../components/BottomNav';

import { useApp } from '../context/AppContext';

export default function Home() {
  const router = useRouter();

  const {
    profile,
    todayMissions,
    completedToday,
    todayProgress,
    streak,
    xp,
    level,
    darkMode,
  } = useApp();

  const dateText =
    new Intl.DateTimeFormat(
      'en-US',
      {
        weekday: 'long',
        month: 'long',
        day: 'numeric',
      }
    ).format(new Date());

  return (
    <View
      style={[
        styles.root,
        darkMode && styles.darkRoot,
      ]}
    >
      <Screen>
        <View style={styles.header}>
          <View>
            <Text
              style={[
                styles.kicker,
                darkMode &&
                  styles.darkMuted,
              ]}
            >
              STUDENT DAILY MISSION
            </Text>

            <Text
              style={[
                styles.greeting,
                darkMode &&
                  styles.darkText,
              ]}
            >
              Good evening,{' '}
              {profile.name ||
                'Student'} 👋
            </Text>

            <Text
              style={[
                styles.date,
                darkMode &&
                  styles.darkMuted,
              ]}
            >
              {dateText}
            </Text>
          </View>

          <Pressable
            onPress={() =>
              router.push(
                '/profile' as never
              )
            }
            style={styles.avatar}
          >
            <Text style={styles.avatarText}>
              {(
                profile.name ||
                'S'
              )
                .charAt(0)
                .toUpperCase()}
            </Text>
          </Pressable>
        </View>

        <View style={styles.hero}>
          <View style={styles.heroTop}>
            <View>
              <Text style={styles.heroLabel}>
                TODAY'S MISSION
              </Text>

              <Text style={styles.heroTitle}>
                Make today count.
              </Text>
            </View>

            <Text style={styles.heroPercent}>
              {todayProgress}%
            </Text>
          </View>

          <View
            style={styles.progressTrack}
          >
            <View
              style={[
                styles.progressFill,
                {
                  width: `${todayProgress}%`,
                },
              ]}
            />
          </View>

          <View
            style={styles.heroBottom}
          >
            <Text
              style={styles.heroSmall}
            >
              {completedToday} of{' '}
              {todayMissions.length}{' '}
              missions complete
            </Text>

            <Text
              style={styles.heroSmall}
            >
              Level {level}
            </Text>
          </View>
        </View>

        <View style={styles.statsRow}>
          <StatCard
            value={`${streak}`}
            label="Day streak"
            icon="🔥"
            darkMode={darkMode}
          />

          <StatCard
            value={`${xp}`}
            label="Total XP"
            icon="⚡"
            darkMode={darkMode}
          />

          <StatCard
            value={`${todayMissions.length}`}
            label="Today"
            icon="✦"
            darkMode={darkMode}
          />
        </View>

        <View style={styles.sectionHeader}>
          <Text
            style={[
              styles.sectionTitle,
              darkMode &&
                styles.darkText,
            ]}
          >
            Your focus
          </Text>

          <Pressable
            onPress={() =>
              router.push(
                '/missions' as never
              )
            }
          >
            <Text style={styles.link}>
              See all
            </Text>
          </Pressable>
        </View>

        {todayMissions
          .slice(0, 3)
          .map((mission) => (
            <Pressable
              key={mission.id}
              onPress={() =>
                router.push(
                  '/missions' as never
                )
              }
            >
              <Panel>
                <View
                  style={styles.missionRow}
                >
                  <View
                    style={[
                      styles.dot,
                      mission.completed &&
                        styles.doneDot,
                    ]}
                  >
                    <Text
                      style={
                        styles.dotText
                      }
                    >
                      {mission.completed
                        ? '✓'
                        : '○'}
                    </Text>
                  </View>

                  <View
                    style={
                      styles.missionInfo
                    }
                  >
                    <Text
                      style={[
                        styles.missionTitle,
                        mission.completed &&
                          styles.completed,
                        darkMode &&
                          styles.darkText,
                      ]}
                    >
                      {mission.title}
                    </Text>

                    <Text
                      style={
                        styles.missionMeta
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
            </Pressable>
          ))}

        {todayMissions.length === 0 && (
          <Panel>
            <Text
              style={[
                styles.emptyTitle,
                darkMode &&
                  styles.darkText,
              ]}
            >
              No missions yet.
            </Text>

            <Text
              style={
                styles.missionMeta
              }
            >
              Add your first mission
              and start your streak.
            </Text>
          </Panel>
        )}

        <View style={styles.sectionHeader}>
          <Text
            style={[
              styles.sectionTitle,
              darkMode &&
                styles.darkText,
            ]}
          >
            Quick actions
          </Text>
        </View>

        <View style={styles.quickRow}>
          <Pressable
            onPress={() =>
              router.push(
                '/missions' as never
              )
            }
            style={styles.quickCard}
          >
            <Text
              style={styles.quickIcon}
            >
              ＋
            </Text>

            <Text
              style={styles.quickTitle}
            >
              Add mission
            </Text>

            <Text
              style={styles.quickSub}
            >
              Plan your next task
            </Text>
          </Pressable>

          <Pressable
            onPress={() =>
              router.push(
                '/progress' as never
              )
            }
            style={styles.quickCard}
          >
            <Text
              style={styles.quickIcon}
            >
              ↗
            </Text>

            <Text
              style={styles.quickTitle}
            >
              View progress
            </Text>

            <Text
              style={styles.quickSub}
            >
              Check your stats
            </Text>
          </Pressable>
        </View>
      </Screen>

      <BottomNav />
    </View>
  );
}

function StatCard({
  value,
  label,
  icon,
  darkMode,
}: {
  value: string;
  label: string;
  icon: string;
  darkMode: boolean;
}) {
  return (
    <View
      style={[
        styles.statCard,
        darkMode &&
          styles.darkCard,
      ]}
    >
      <Text style={styles.statIcon}>
        {icon}
      </Text>

      <Text
        style={[
          styles.statValue,
          darkMode &&
            styles.darkText,
        ]}
      >
        {value}
      </Text>

      <Text
        style={styles.statLabel}
      >
        {label}
      </Text>
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

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 22,
  },

  kicker: {
    color: '#8A8DA0',
    fontSize: 10,
    fontWeight: '900',
    letterSpacing: 1.4,
    marginBottom: 5,
  },

  greeting: {
    color: '#16182A',
    fontSize: 24,
    fontWeight: '900',
  },

  date: {
    color: '#8A8DA0',
    marginTop: 4,
    fontSize: 13,
  },

  darkText: {
    color: '#F7F7FB',
  },

  darkMuted: {
    color: '#9A9DB0',
  },

  avatar: {
    width: 48,
    height: 48,
    borderRadius: 17,
    backgroundColor: '#E8E2FF',
    alignItems: 'center',
    justifyContent: 'center',
  },

  avatarText: {
    color: '#6C4DE6',
    fontWeight: '900',
    fontSize: 18,
  },

  hero: {
    backgroundColor: '#17182C',
    borderRadius: 28,
    padding: 22,
    marginBottom: 16,
  },

  heroTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  heroLabel: {
    color: '#B9B0FF',
    fontSize: 10,
    fontWeight: '900',
    letterSpacing: 1.5,
  },

  heroTitle: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: '900',
    marginTop: 5,
  },

  heroPercent: {
    color: '#FFFFFF',
    fontSize: 30,
    fontWeight: '900',
  },

  progressTrack: {
    height: 10,
    borderRadius: 5,
    backgroundColor: '#30334B',
    marginTop: 22,
    overflow: 'hidden',
  },

  progressFill: {
    height: '100%',
    borderRadius: 5,
    backgroundColor: '#8D72FF',
  },

  heroBottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },

  heroSmall: {
    color: '#A7A9BA',
    fontSize: 12,
    fontWeight: '700',
  },

  statsRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 24,
  },

  statCard: {
    flex: 1,
    backgroundColor: '#FFF',
    borderRadius: 20,
    padding: 15,
    minHeight: 110,
  },

  darkCard: {
    backgroundColor: '#171A2E',
  },

  statIcon: {
    fontSize: 19,
    marginBottom: 10,
  },

  statValue: {
    color: '#17182C',
    fontSize: 22,
    fontWeight: '900',
  },

  statLabel: {
    color: '#8A8DA0',
    fontSize: 11,
    marginTop: 3,
    fontWeight: '700',
  },

  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },

  sectionTitle: {
    color: '#17182C',
    fontSize: 18,
    fontWeight: '900',
  },

  link: {
    color: '#6C4DE6',
    fontWeight: '800',
    fontSize: 13,
  },

  missionRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  dot: {
    width: 40,
    height: 40,
    borderRadius: 14,
    backgroundColor: '#F0EEFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 13,
  },

  doneDot: {
    backgroundColor: '#DDF7EA',
  },

  dotText: {
    color: '#6C4DE6',
    fontSize: 18,
    fontWeight: '900',
  },

  missionInfo: {
    flex: 1,
  },

  missionTitle: {
    color: '#202236',
    fontSize: 14,
    fontWeight: '800',
  },

  completed: {
    textDecorationLine: 'line-through',
    color: '#9093A2',
  },

  missionMeta: {
    color: '#9295A5',
    fontSize: 11,
    marginTop: 5,
    fontWeight: '600',
  },

  emptyTitle: {
    fontSize: 15,
    fontWeight: '900',
    color: '#17182C',
    marginBottom: 5,
  },

  quickRow: {
    flexDirection: 'row',
    gap: 12,
  },

  quickCard: {
    flex: 1,
    backgroundColor: '#EDE9FF',
    borderRadius: 22,
    padding: 17,
    minHeight: 125,
  },

  quickIcon: {
    color: '#6C4DE6',
    fontSize: 24,
    fontWeight: '900',
  },

  quickTitle: {
    color: '#2A2351',
    fontSize: 14,
    fontWeight: '900',
    marginTop: 15,
  },

  quickSub: {
    color: '#746C95',
    fontSize: 11,
    marginTop: 4,
  },
});