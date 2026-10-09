import React from 'react';

import {
  StyleSheet,
  Text,
  View,
} from 'react-native';

import Screen from '../components/Screen';
import Panel from '../components/Panel';
import BottomNav from '../components/BottomNav';

import { useApp } from '../context/AppContext';

export default function Progress() {
  const {
    missions,
    todayProgress,
    streak,
    xp,
    level,
    darkMode,
  } = useApp();

  const completed =
    missions.filter(
      (mission) =>
        mission.completed
    ).length;

  const total =
    missions.length;

  const school =
    missions.filter(
      (mission) =>
        mission.category ===
          'School' &&
        mission.completed
    ).length;

  const personal =
    missions.filter(
      (mission) =>
        mission.category ===
          'Personal' &&
        mission.completed
    ).length;

  const health =
    missions.filter(
      (mission) =>
        mission.category ===
          'Health' &&
        mission.completed
    ).length;

  const xpInLevel =
    xp % 500;

  const levelProgress =
    Math.round(
      (xpInLevel / 500) * 100
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
          YOUR PERFORMANCE
        </Text>

        <Text
          style={[
            styles.title,
            darkMode &&
              styles.darkText,
          ]}
        >
          Progress
        </Text>

        <Text style={styles.subtitle}>
          Your consistency is your
          superpower.
        </Text>

        <View style={styles.levelCard}>
          <View style={styles.levelTop}>
            <View>
              <Text
                style={
                  styles.levelLabel
                }
              >
                CURRENT LEVEL
              </Text>

              <Text
                style={
                  styles.levelNumber
                }
              >
                Level {level}
              </Text>
            </View>

            <Text style={styles.xp}>
              {xp} XP
            </Text>
          </View>

          <View style={styles.track}>
            <View
              style={[
                styles.fill,
                {
                  width: `${levelProgress}%`,
                },
              ]}
            />
          </View>

          <Text
            style={styles.levelMeta}
          >
            {xpInLevel} / 500 XP to
            the next level
          </Text>
        </View>

        <View style={styles.stats}>
          <Metric
            value={`${completed}`}
            label="Completed"
          />

          <Metric
            value={`${Math.max(
              0,
              total - completed
            )}`}
            label="Remaining"
          />

          <Metric
            value={`${streak}`}
            label="Streak"
          />
        </View>

        <Panel>
          <Text
            style={[
              styles.panelTitle,
              darkMode &&
                styles.darkText,
            ]}
          >
            Today's score
          </Text>

          <View
            style={styles.bigScoreRow}
          >
            <Text
              style={[
                styles.bigScore,
                darkMode &&
                  styles.darkText,
              ]}
            >
              {todayProgress}%
            </Text>

            <View
              style={styles.scoreText}
            >
              <Text style={styles.good}>
                Keep going!
              </Text>

              <Text
                style={styles.meta}
              >
                Every completed
                mission adds 50 XP.
              </Text>
            </View>
          </View>

          <View
            style={styles.trackLight}
          >
            <View
              style={[
                styles.fill,
                {
                  width: `${todayProgress}%`,
                },
              ]}
            />
          </View>
        </Panel>

        <Panel>
          <Text
            style={[
              styles.panelTitle,
              darkMode &&
                styles.darkText,
            ]}
          >
            Achievement board
          </Text>

          <Achievement
            icon="🌱"
            title="First Step"
            description="Complete your first mission"
            unlocked={completed >= 1}
          />

          <Achievement
            icon="🔥"
            title="On Fire"
            description="Build a 5-day streak"
            unlocked={streak >= 5}
          />

          <Achievement
            icon="📚"
            title="Study Master"
            description="Complete 10 school missions"
            unlocked={school >= 10}
          />

          <Achievement
            icon="⚡"
            title="Productive"
            description="Complete 20 missions"
            unlocked={completed >= 20}
          />
        </Panel>

        <Panel>
          <Text
            style={[
              styles.panelTitle,
              darkMode &&
                styles.darkText,
            ]}
          >
            Mission breakdown
          </Text>

          <Bar
            label="School"
            value={school}
            total={Math.max(
              1,
              school + 2
            )}
          />

          <Bar
            label="Personal"
            value={personal}
            total={Math.max(
              1,
              personal + 2
            )}
          />

          <Bar
            label="Health"
            value={health}
            total={Math.max(
              1,
              health + 2
            )}
          />
        </Panel>
      </Screen>

      <BottomNav />
    </View>
  );
}

function Metric({
  value,
  label,
}: {
  value: string;
  label: string;
}) {
  return (
    <View style={styles.metric}>
      <Text
        style={styles.metricValue}
      >
        {value}
      </Text>

      <Text
        style={styles.metricLabel}
      >
        {label}
      </Text>
    </View>
  );
}

function Achievement({
  icon,
  title,
  description,
  unlocked,
}: {
  icon: string;
  title: string;
  description: string;
  unlocked: boolean;
}) {
  return (
    <View style={styles.achievement}>
      <View
        style={[
          styles.badge,
          unlocked &&
            styles.unlocked,
        ]}
      >
        <Text
          style={styles.badgeText}
        >
          {unlocked ? icon : '•'}
        </Text>
      </View>

      <View
        style={styles.achievementInfo}
      >
        <Text
          style={
            styles.achievementTitle
          }
        >
          {title}
        </Text>

        <Text style={styles.meta}>
          {description}
        </Text>
      </View>

      <Text
        style={[
          styles.status,
          unlocked &&
            styles.unlockedText,
        ]}
      >
        {unlocked
          ? 'UNLOCKED'
          : 'LOCKED'}
      </Text>
    </View>
  );
}

function Bar({
  label,
  value,
  total,
}: {
  label: string;
  value: number;
  total: number;
}) {
  const width = Math.min(
    100,
    Math.round(
      (value / total) * 100
    )
  );

  return (
    <View style={styles.barBlock}>
      <View
        style={styles.barHeader}
      >
        <Text
          style={styles.barLabel}
        >
          {label}
        </Text>

        <Text style={styles.meta}>
          {value} completed
        </Text>
      </View>

      <View
        style={styles.trackLight}
      >
        <View
          style={[
            styles.fill,
            {
              width: `${width}%`,
            },
          ]}
        />
      </View>
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

  levelCard: {
    backgroundColor: '#17182C',
    borderRadius: 26,
    padding: 21,
    marginBottom: 16,
  },

  levelTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  levelLabel: {
    color: '#A9A1D7',
    fontSize: 9,
    fontWeight: '900',
    letterSpacing: 1.5,
  },

  levelNumber: {
    color: '#FFF',
    fontSize: 25,
    fontWeight: '900',
    marginTop: 4,
  },

  xp: {
    color: '#C5BBFF',
    fontWeight: '900',
  },

  track: {
    height: 10,
    backgroundColor: '#30334B',
    borderRadius: 5,
    marginTop: 20,
    overflow: 'hidden',
  },

  fill: {
    height: '100%',
    borderRadius: 5,
    backgroundColor: '#8D72FF',
  },

  levelMeta: {
    color: '#9A9DB0',
    fontSize: 11,
    marginTop: 8,
  },

  stats: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 16,
  },

  metric: {
    flex: 1,
    backgroundColor: '#FFF',
    borderRadius: 19,
    padding: 16,
  },

  metricValue: {
    color: '#17182C',
    fontSize: 22,
    fontWeight: '900',
  },

  metricLabel: {
    color: '#9295A5',
    fontSize: 10,
    marginTop: 4,
    fontWeight: '700',
  },

  panelTitle: {
    color: '#17182C',
    fontSize: 16,
    fontWeight: '900',
    marginBottom: 16,
  },

  bigScoreRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 17,
  },

  bigScore: {
    color: '#17182C',
    fontSize: 40,
    fontWeight: '900',
    marginRight: 15,
  },

  scoreText: {
    flex: 1,
  },

  good: {
    color: '#6C4DE6',
    fontWeight: '900',
    fontSize: 14,
  },

  meta: {
    color: '#9295A5',
    fontSize: 11,
    marginTop: 4,
    fontWeight: '600',
  },

  trackLight: {
    height: 9,
    backgroundColor: '#ECECF2',
    borderRadius: 5,
    overflow: 'hidden',
  },

  achievement: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },

  badge: {
    width: 43,
    height: 43,
    borderRadius: 15,
    backgroundColor: '#F0F0F4',
    alignItems: 'center',
    justifyContent: 'center',
  },

  unlocked: {
    backgroundColor: '#E8E2FF',
  },

  badgeText: {
    fontSize: 18,
    color: '#A0A2AF',
  },

  achievementInfo: {
    flex: 1,
    marginLeft: 12,
  },

  achievementTitle: {
    color: '#24263A',
    fontWeight: '900',
    fontSize: 13,
  },

  status: {
    color: '#B0B2BD',
    fontSize: 8,
    fontWeight: '900',
  },

  unlockedText: {
    color: '#6C4DE6',
  },

  barBlock: {
    marginBottom: 14,
  },

  barHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },

  barLabel: {
    color: '#34364A',
    fontWeight: '800',
    fontSize: 12,
  },
});