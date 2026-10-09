import React, { useMemo, useState } from 'react';

import {
  Alert,
  Keyboard,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

import Screen from '../components/Screen';
import Panel from '../components/Panel';
import BottomNav from '../components/BottomNav';

import {
  Category,
  Priority,
  useApp,
} from '../context/AppContext';

const categories: Category[] = [
  'School',
  'Personal',
  'Health',
];

const priorities: Priority[] = [
  'Low',
  'Medium',
  'High',
];

function getToday() {
  const date = new Date();

  const year = date.getFullYear();

  const month = String(
    date.getMonth() + 1
  ).padStart(2, '0');

  const day = String(
    date.getDate()
  ).padStart(2, '0');

  return `${year}-${month}-${day}`;
}

export default function Missions() {
  const {
    missions,
    addMission,
    toggleMission,
    deleteMission,
    darkMode,
    loading,
  } = useApp();

  const [title, setTitle] =
    useState('');

  const [category, setCategory] =
    useState<Category>('School');

  const [priority, setPriority] =
    useState<Priority>('Medium');

  const [filter, setFilter] =
    useState<
      'All' | 'Open' | 'Done'
    >('All');

  const [search, setSearch] =
    useState('');

  const today = getToday();

  /*
   * Get today's missions.
   */
  const todayMissions = useMemo(() => {
    return missions.filter(
      (mission) =>
        mission.date === today
    );
  }, [missions, today]);

  /*
   * Count completed missions.
   */
  const completedCount =
    todayMissions.filter(
      (mission) =>
        mission.completed
    ).length;

  /*
   * Count open missions.
   */
  const openCount =
    todayMissions.filter(
      (mission) =>
        !mission.completed
    ).length;

  /*
   * Filter missions.
   */
  const filtered = useMemo(() => {
    return todayMissions
      .filter((mission) => {
        if (filter === 'Open') {
          return !mission.completed;
        }

        if (filter === 'Done') {
          return mission.completed;
        }

        return true;
      })
      .filter((mission) =>
        mission.title
          .toLowerCase()
          .includes(
            search.toLowerCase()
          )
      );
  }, [
    todayMissions,
    filter,
    search,
  ]);

  /*
   * ADD MISSION
   */
  const submit = () => {
    const cleanTitle =
      title.trim();

    if (!cleanTitle) {
      Alert.alert(
        'Mission needed',
        'Type a mission before adding it.'
      );

      return;
    }

    addMission(
      cleanTitle,
      category,
      priority,
      today
    );

    setTitle('');

    Keyboard.dismiss();

    Alert.alert(
      'Mission added',
      `"${cleanTitle}" was added to today's missions.`
    );
  };

  /*
   * Clear mission input.
   */
  const clearTitle = () => {
    setTitle('');
  };

  /*
   * DELETE MISSION
   *
   * Directly removes the mission.
   *
   * IMPORTANT:
   * We do NOT use Alert here.
   * This makes the X button work
   * reliably on Expo Web and mobile.
   */
  const removeMission = (
    missionId: string
  ) => {
    deleteMission(missionId);
  };

  /*
   * Loading screen.
   */
  if (loading) {
    return (
      <View
        style={styles.loadingRoot}
      >
        <Text
          style={styles.loadingTitle}
        >
          Loading missions...
        </Text>
      </View>
    );
  }

  return (
    <View
      style={[
        styles.root,
        darkMode &&
          styles.darkRoot,
      ]}
    >
      <Screen>
        <Text
          style={[
            styles.kicker,
            darkMode &&
              styles.darkMuted,
          ]}
        >
          YOUR QUEST BOARD
        </Text>

        <Text
          style={[
            styles.title,
            darkMode &&
              styles.darkText,
          ]}
        >
          Missions
        </Text>

        <Text
          style={[
            styles.subtitle,
            darkMode &&
              styles.darkMuted,
          ]}
        >
          Small wins become big progress.
        </Text>

        {/* TODAY STATUS */}
        <Panel>
          <View
            style={styles.statusHeader}
          >
            <View>
              <Text
                style={[
                  styles.statusTitle,
                  darkMode &&
                    styles.darkText,
                ]}
              >
                Today's status
              </Text>

              <Text
                style={
                  styles.statusSubtitle
                }
              >
                {completedCount} of{' '}
                {todayMissions.length}{' '}
                missions completed
              </Text>
            </View>

            <View
              style={[
                styles.statusBadge,
                completedCount ===
                  todayMissions.length &&
                  todayMissions.length >
                    0 &&
                  styles.statusComplete,
              ]}
            >
              <Text
                style={
                  styles.statusBadgeText
                }
              >
                {completedCount}/
                {todayMissions.length}
              </Text>
            </View>
          </View>

          <View
            style={styles.statusBar}
          >
            <View
              style={[
                styles.statusProgress,
                {
                  width:
                    todayMissions.length ===
                    0
                      ? '0%'
                      : `${Math.round(
                          (completedCount /
                            todayMissions.length) *
                            100
                        )}%`,
                },
              ]}
            />
          </View>

          <View
            style={styles.statusNumbers}
          >
            <Text
              style={styles.openText}
            >
              {openCount} open
            </Text>

            <Text
              style={styles.doneText}
            >
              {completedCount} done
            </Text>
          </View>
        </Panel>

        {/* ADD MISSION */}
        <Panel>
          <Text
            style={[
              styles.formTitle,
              darkMode &&
                styles.darkText,
            ]}
          >
            Create a mission
          </Text>

          <View
            style={styles.inputWrapper}
          >
            <TextInput
              value={title}
              onChangeText={setTitle}
              placeholder="What do you want to finish?"
              placeholderTextColor="#9B9EAC"
              style={[
                styles.input,
                darkMode &&
                  styles.darkInput,
              ]}
              returnKeyType="done"
              onSubmitEditing={
                submit
              }
            />

            {title.length > 0 && (
              <Pressable
                onPress={clearTitle}
                style={
                  styles.clearInputButton
                }
                hitSlop={8}
              >
                <Text
                  style={
                    styles.clearInputText
                  }
                >
                  ×
                </Text>
              </Pressable>
            )}
          </View>

          <Text
            style={styles.label}
          >
            Category
          </Text>

          <View
            style={styles.chips}
          >
            {categories.map(
              (item) => (
                <Pressable
                  key={item}
                  onPress={() =>
                    setCategory(item)
                  }
                  style={[
                    styles.chip,
                    category === item &&
                      styles.selectedChip,
                  ]}
                >
                  <Text
                    style={[
                      styles.chipText,
                      category ===
                        item &&
                        styles.selectedChipText,
                    ]}
                  >
                    {item}
                  </Text>
                </Pressable>
              )
            )}
          </View>

          <Text
            style={styles.label}
          >
            Priority
          </Text>

          <View
            style={styles.chips}
          >
            {priorities.map(
              (item) => (
                <Pressable
                  key={item}
                  onPress={() =>
                    setPriority(item)
                  }
                  style={[
                    styles.chip,
                    priority === item &&
                      styles.selectedChip,
                  ]}
                >
                  <Text
                    style={[
                      styles.chipText,
                      priority ===
                        item &&
                        styles.selectedChipText,
                    ]}
                  >
                    {item}
                  </Text>
                </Pressable>
              )
            )}
          </View>

          <Pressable
            onPress={submit}
            style={({ pressed }) => [
              styles.addButton,
              pressed &&
                styles.addButtonPressed,
            ]}
          >
            <Text
              style={
                styles.addButtonText
              }
            >
              ＋ Add mission
            </Text>
          </Pressable>
        </Panel>

        {/* SEARCH */}
        <View
          style={styles.searchBox}
        >
          <Text
            style={styles.searchIcon}
          >
            ⌕
          </Text>

          <TextInput
            value={search}
            onChangeText={setSearch}
            placeholder="Search today's missions"
            placeholderTextColor="#9B9EAC"
            style={styles.searchInput}
          />

          {search.length > 0 && (
            <Pressable
              onPress={() =>
                setSearch('')
              }
              hitSlop={8}
            >
              <Text
                style={styles.searchClear}
              >
                ×
              </Text>
            </Pressable>
          )}
        </View>

        {/* FILTERS */}
        <View
          style={styles.filters}
        >
          {(
            [
              'All',
              'Open',
              'Done',
            ] as const
          ).map((item) => (
            <Pressable
              key={item}
              onPress={() =>
                setFilter(item)
              }
              style={[
                styles.filter,
                filter === item &&
                  styles.activeFilter,
              ]}
            >
              <Text
                style={[
                  styles.filterText,
                  filter === item &&
                    styles.activeFilterText,
                ]}
              >
                {item}
              </Text>
            </Pressable>
          ))}
        </View>

        {/* MISSIONS */}
        {filtered.map(
          (mission) => (
            <Panel
              key={mission.id}
            >
              <View
                style={
                  styles.missionRow
                }
              >
                {/* DONE CHECKBOX */}
                <Pressable
                  onPress={() =>
                    toggleMission(
                      mission.id
                    )
                  }
                  style={[
                    styles.check,
                    mission.completed &&
                      styles.checked,
                  ]}
                  hitSlop={5}
                >
                  <Text
                    style={
                      styles.checkText
                    }
                  >
                    {mission.completed
                      ? '✓'
                      : ''}
                  </Text>
                </Pressable>

                {/* MISSION INFORMATION */}
                <View
                  style={styles.info}
                >
                  <View
                    style={
                      styles.titleRow
                    }
                  >
                    <Text
                      style={[
                        styles.missionTitle,
                        mission.completed &&
                          styles.doneTitle,
                        darkMode &&
                          styles.darkText,
                      ]}
                    >
                      {mission.title}
                    </Text>

                    <View
                      style={[
                        styles.statusLabel,
                        mission.completed
                          ? styles.doneLabel
                          : styles.openLabel,
                      ]}
                    >
                      <Text
                        style={
                          mission.completed
                            ? styles.doneLabelText
                            : styles.openLabelText
                        }
                      >
                        {mission.completed
                          ? 'DONE'
                          : 'OPEN'}
                      </Text>
                    </View>
                  </View>

                  <Text
                    style={styles.meta}
                  >
                    {mission.category}
                    {' · '}
                    {mission.priority}{' '}
                    priority
                  </Text>
                </View>

                {/* DELETE X */}
                <Pressable
                  onPress={() =>
                    removeMission(
                      mission.id
                    )
                  }
                  style={({ pressed }) => [
                    styles.deleteButton,
                    pressed &&
                      styles.deleteButtonPressed,
                  ]}
                  hitSlop={10}
                >
                  <Text
                    style={
                      styles.delete
                    }
                  >
                    ×
                  </Text>
                </Pressable>
              </View>
            </Panel>
          )
        )}

        {filtered.length === 0 && (
          <Panel>
            <Text
              style={[
                styles.empty,
                darkMode &&
                  styles.darkText,
              ]}
            >
              {filter === 'Done'
                ? 'No completed missions yet.'
                : filter === 'Open'
                ? 'No open missions.'
                : 'Nothing here yet.'}
            </Text>

            <Text
              style={styles.meta}
            >
              {filter === 'Done'
                ? 'Complete a mission and it will appear here.'
                : 'Add a mission above to get started.'}
            </Text>
          </Panel>
        )}
      </Screen>

      <BottomNav />
    </View>
  );
}

const styles =
  StyleSheet.create({
    loadingRoot: {
      flex: 1,
      backgroundColor: '#F6F7FB',
      alignItems: 'center',
      justifyContent: 'center',
    },

    loadingTitle: {
      color: '#6C4DE6',
      fontSize: 16,
      fontWeight: '900',
    },

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

    darkMuted: {
      color: '#9A9DB0',
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

    statusHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },

    statusTitle: {
      color: '#17182C',
      fontSize: 16,
      fontWeight: '900',
    },

    statusSubtitle: {
      color: '#9295A5',
      fontSize: 11,
      marginTop: 4,
    },

    statusBadge: {
      minWidth: 48,
      height: 48,
      borderRadius: 16,
      backgroundColor: '#EEE9FF',
      alignItems: 'center',
      justifyContent: 'center',
    },

    statusComplete: {
      backgroundColor: '#DDF7E7',
    },

    statusBadgeText: {
      color: '#6C4DE6',
      fontWeight: '900',
      fontSize: 13,
    },

    statusBar: {
      height: 8,
      borderRadius: 10,
      backgroundColor: '#ECECF2',
      overflow: 'hidden',
      marginTop: 15,
    },

    statusProgress: {
      height: '100%',
      backgroundColor: '#6C4DE6',
      borderRadius: 10,
    },

    statusNumbers: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 8,
    },

    openText: {
      color: '#9295A5',
      fontSize: 11,
      fontWeight: '700',
    },

    doneText: {
      color: '#6C4DE6',
      fontSize: 11,
      fontWeight: '800',
    },

    formTitle: {
      color: '#17182C',
      fontSize: 17,
      fontWeight: '900',
      marginBottom: 12,
    },

    inputWrapper: {
      position: 'relative',
    },

    input: {
      height: 52,
      borderWidth: 1,
      borderColor: '#E7E7EE',
      borderRadius: 16,
      paddingHorizontal: 15,
      paddingRight: 45,
      color: '#22243A',
      fontSize: 14,
      backgroundColor: '#FAFAFC',
    },

    darkInput: {
      backgroundColor: '#20243B',
      borderColor: '#30344E',
      color: '#FFF',
    },

    clearInputButton: {
      position: 'absolute',
      right: 10,
      top: 8,
      width: 36,
      height: 36,
      borderRadius: 18,
      alignItems: 'center',
      justifyContent: 'center',
    },

    clearInputText: {
      color: '#8A8DA0',
      fontSize: 25,
      fontWeight: '500',
    },

    label: {
      color: '#8A8DA0',
      fontSize: 11,
      fontWeight: '800',
      marginTop: 15,
      marginBottom: 8,
    },

    chips: {
      flexDirection: 'row',
      gap: 8,
      flexWrap: 'wrap',
    },

    chip: {
      borderRadius: 14,
      paddingHorizontal: 13,
      paddingVertical: 8,
      backgroundColor: '#F2F2F6',
    },

    selectedChip: {
      backgroundColor: '#E8E2FF',
    },

    chipText: {
      color: '#777A8C',
      fontSize: 12,
      fontWeight: '800',
    },

    selectedChipText: {
      color: '#6C4DE6',
    },

    addButton: {
      height: 50,
      borderRadius: 16,
      backgroundColor: '#6C4DE6',
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 18,
    },

    addButtonPressed: {
      opacity: 0.75,
      transform: [
        { scale: 0.98 },
      ],
    },

    addButtonText: {
      color: '#FFF',
      fontWeight: '900',
      fontSize: 14,
    },

    searchBox: {
      height: 52,
      backgroundColor: '#FFF',
      borderRadius: 17,
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 15,
      marginBottom: 10,
    },

    searchIcon: {
      fontSize: 25,
      color: '#8A8DA0',
      marginRight: 8,
    },

    searchInput: {
      flex: 1,
      color: '#22243A',
      fontSize: 13,
    },

    searchClear: {
      color: '#8A8DA0',
      fontSize: 24,
      paddingLeft: 8,
    },

    filters: {
      flexDirection: 'row',
      gap: 8,
      marginBottom: 12,
    },

    filter: {
      paddingHorizontal: 15,
      paddingVertical: 8,
      borderRadius: 14,
      backgroundColor: '#EDEEF3',
    },

    activeFilter: {
      backgroundColor: '#6C4DE6',
    },

    filterText: {
      color: '#7C7F8F',
      fontSize: 11,
      fontWeight: '800',
    },

    activeFilterText: {
      color: '#FFF',
    },

    missionRow: {
      flexDirection: 'row',
      alignItems: 'center',
    },

    check: {
      width: 38,
      height: 38,
      borderRadius: 13,
      borderWidth: 2,
      borderColor: '#D8D8E2',
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: 13,
    },

    checked: {
      backgroundColor: '#6C4DE6',
      borderColor: '#6C4DE6',
    },

    checkText: {
      color: '#FFF',
      fontWeight: '900',
      fontSize: 17,
    },

    info: {
      flex: 1,
    },

    titleRow: {
      flexDirection: 'row',
      alignItems: 'center',
    },

    missionTitle: {
      color: '#202236',
      fontSize: 14,
      fontWeight: '800',
      flex: 1,
    },

    doneTitle: {
      textDecorationLine: 'line-through',
      color: '#9295A5',
    },

    statusLabel: {
      paddingHorizontal: 7,
      paddingVertical: 4,
      borderRadius: 8,
      marginLeft: 7,
    },

    openLabel: {
      backgroundColor: '#EEE9FF',
    },

    doneLabel: {
      backgroundColor: '#DDF7E7',
    },

    openLabelText: {
      color: '#6C4DE6',
      fontSize: 8,
      fontWeight: '900',
    },

    doneLabelText: {
      color: '#279354',
      fontSize: 8,
      fontWeight: '900',
    },

    meta: {
      color: '#9295A5',
      fontSize: 11,
      marginTop: 5,
      fontWeight: '600',
    },

    deleteButton: {
      width: 36,
      height: 36,
      alignItems: 'center',
      justifyContent: 'center',
      marginLeft: 5,
    },

    deleteButtonPressed: {
      opacity: 0.5,
      transform: [
        { scale: 0.9 },
      ],
    },

    delete: {
      fontSize: 26,
      color: '#B4B6C2',
      fontWeight: '400',
    },

    empty: {
      color: '#202236',
      fontWeight: '900',
      fontSize: 15,
      marginBottom: 5,
    },
  });