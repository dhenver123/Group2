import React, {
  useState,
} from 'react';

import {
  Alert,
  Pressable,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  View,
} from 'react-native';

import Screen from '../components/Screen';
import Panel from '../components/Panel';
import BottomNav from '../components/BottomNav';

import {
  Profile as ProfileType,
  useApp,
} from '../context/AppContext';

export default function Profile() {
  const {
    profile,
    updateProfile,
    darkMode,
    setDarkMode,
    xp,
    level,
  } = useApp();

  const [draft, setDraft] =
    useState<ProfileType>(
      profile
    );

  const [editing, setEditing] =
    useState(false);

  const save = () => {
    if (!draft.name.trim()) {
      Alert.alert(
        'Name needed',
        'Please enter your name.'
      );

      return;
    }

    updateProfile(draft);

    setEditing(false);
  };

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
          YOUR IDENTITY
        </Text>

        <Text
          style={[
            styles.title,
            darkMode &&
              styles.darkText,
          ]}
        >
          Profile
        </Text>

        <Text style={styles.subtitle}>
          Make the app yours.
        </Text>

        <View style={styles.profileHero}>
          <View style={styles.avatar}>
            <Text
              style={styles.avatarText}
            >
              {(
                profile.name ||
                'S'
              )
                .charAt(0)
                .toUpperCase()}
            </Text>
          </View>

          <Text
            style={styles.profileName}
          >
            {profile.name}
          </Text>

          <Text
            style={styles.profileCourse}
          >
            {profile.course}
          </Text>

          <View
            style={styles.levelPill}
          >
            <Text
              style={
                styles.levelPillText
              }
            >
              LEVEL {level} · {xp} XP
            </Text>
          </View>
        </View>

        {!editing ? (
          <>
            <Panel>
              <Info
                label="School"
                value={
                  profile.school
                }
                darkMode={darkMode}
              />

              <Info
                label="Year level"
                value={profile.year}
                darkMode={darkMode}
              />

              <Info
                label="About me"
                value={profile.bio}
                darkMode={darkMode}
              />
            </Panel>

            <Pressable
              onPress={() =>
                setEditing(true)
              }
              style={styles.primary}
            >
              <Text
                style={
                  styles.primaryText
                }
              >
                Edit profile
              </Text>
            </Pressable>
          </>
        ) : (
          <Panel>
            <Field
              label="Name"
              value={draft.name}
              onChange={(value) =>
                setDraft({
                  ...draft,
                  name: value,
                })
              }
              darkMode={darkMode}
            />

            <Field
              label="Course"
              value={draft.course}
              onChange={(value) =>
                setDraft({
                  ...draft,
                  course: value,
                })
              }
              darkMode={darkMode}
            />

            <Field
              label="School"
              value={draft.school}
              onChange={(value) =>
                setDraft({
                  ...draft,
                  school: value,
                })
              }
              darkMode={darkMode}
            />

            <Field
              label="Year level"
              value={draft.year}
              onChange={(value) =>
                setDraft({
                  ...draft,
                  year: value,
                })
              }
              darkMode={darkMode}
            />

            <Field
              label="Bio"
              value={draft.bio}
              onChange={(value) =>
                setDraft({
                  ...draft,
                  bio: value,
                })
              }
              darkMode={darkMode}
              multiline
            />

            <View
              style={styles.editButtons}
            >
              <Pressable
                onPress={() => {
                  setDraft(profile);
                  setEditing(false);
                }}
                style={styles.cancel}
              >
                <Text
                  style={
                    styles.cancelText
                  }
                >
                  Cancel
                </Text>
              </Pressable>

              <Pressable
                onPress={save}
                style={
                  styles.primarySmall
                }
              >
                <Text
                  style={
                    styles.primaryText
                  }
                >
                  Save
                </Text>
              </Pressable>
            </View>
          </Panel>
        )}

        <Panel>
          <View
            style={styles.settingRow}
          >
            <View
              style={{ flex: 1 }}
            >
              <Text
                style={[
                  styles.settingTitle,
                  darkMode &&
                    styles.darkText,
                ]}
              >
                Dark mode
              </Text>

              <Text
                style={styles.settingSub}
              >
                Use a darker interface
                at night.
              </Text>
            </View>

            <Switch
              value={darkMode}
              onValueChange={
                setDarkMode
              }
            />
          </View>
        </Panel>

        <Panel>
          <Text
            style={[
              styles.tipTitle,
              darkMode &&
                styles.darkText,
            ]}
          >
            Your mission philosophy
          </Text>

          <Text style={styles.tip}>
            Plan small. Finish
            consistently. Celebrate
            progress. ✦
          </Text>
        </Panel>
      </Screen>

      <BottomNav />
    </View>
  );
}

function Info({
  label,
  value,
  darkMode,
}: {
  label: string;
  value: string;
  darkMode: boolean;
}) {
  return (
    <View style={styles.info}>
      <Text
        style={styles.infoLabel}
      >
        {label}
      </Text>

      <Text
        style={[
          styles.infoValue,
          darkMode &&
            styles.darkText,
        ]}
      >
        {value}
      </Text>
    </View>
  );
}

function Field({
  label,
  value,
  onChange,
  darkMode,
  multiline,
}: {
  label: string;
  value: string;
  onChange: (
    value: string
  ) => void;
  darkMode: boolean;
  multiline?: boolean;
}) {
  return (
    <View style={styles.field}>
      <Text
        style={styles.fieldLabel}
      >
        {label}
      </Text>

      <TextInput
        value={value}
        onChangeText={onChange}
        multiline={multiline}
        placeholder={label}
        placeholderTextColor="#9B9EAC"
        style={[
          styles.input,
          multiline &&
            styles.multiline,
          darkMode &&
            styles.darkInput,
        ]}
      />
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

  profileHero: {
    backgroundColor: '#17182C',
    borderRadius: 27,
    alignItems: 'center',
    padding: 24,
    marginBottom: 16,
  },

  avatar: {
    width: 80,
    height: 80,
    borderRadius: 28,
    backgroundColor: '#8D72FF',
    alignItems: 'center',
    justifyContent: 'center',
  },

  avatarText: {
    color: '#FFF',
    fontSize: 32,
    fontWeight: '900',
  },

  profileName: {
    color: '#FFF',
    fontSize: 24,
    fontWeight: '900',
    marginTop: 13,
  },

  profileCourse: {
    color: '#AAAFC0',
    fontSize: 12,
    marginTop: 4,
  },

  levelPill: {
    marginTop: 14,
    paddingHorizontal: 13,
    paddingVertical: 7,
    backgroundColor: '#292C44',
    borderRadius: 14,
  },

  levelPillText: {
    color: '#C5BBFF',
    fontSize: 9,
    fontWeight: '900',
    letterSpacing: 1,
  },

  info: {
    marginBottom: 17,
  },

  infoLabel: {
    color: '#9295A5',
    fontSize: 10,
    fontWeight: '800',
    marginBottom: 5,
    textTransform: 'uppercase',
  },

  infoValue: {
    color: '#22243A',
    fontSize: 14,
    fontWeight: '800',
  },

  primary: {
    height: 53,
    borderRadius: 17,
    backgroundColor: '#6C4DE6',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },

  primarySmall: {
    flex: 1,
    height: 50,
    borderRadius: 15,
    backgroundColor: '#6C4DE6',
    alignItems: 'center',
    justifyContent: 'center',
  },

  primaryText: {
    color: '#FFF',
    fontWeight: '900',
  },

  field: {
    marginBottom: 13,
  },

  fieldLabel: {
    color: '#858897',
    fontSize: 10,
    fontWeight: '800',
    marginBottom: 6,
  },

  input: {
    minHeight: 48,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#E6E6ED',
    backgroundColor: '#FAFAFC',
    paddingHorizontal: 13,
    color: '#22243A',
    fontSize: 13,
  },

  darkInput: {
    backgroundColor: '#20243B',
    borderColor: '#30344E',
    color: '#FFF',
  },

  multiline: {
    minHeight: 80,
    paddingTop: 12,
    textAlignVertical: 'top',
  },

  editButtons: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 5,
  },

  cancel: {
    flex: 1,
    height: 50,
    borderRadius: 15,
    backgroundColor: '#ECECF1',
    alignItems: 'center',
    justifyContent: 'center',
  },

  cancelText: {
    color: '#676A7A',
    fontWeight: '900',
  },

  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  settingTitle: {
    color: '#22243A',
    fontSize: 14,
    fontWeight: '900',
  },

  settingSub: {
    color: '#9295A5',
    fontSize: 11,
    marginTop: 4,
  },

  tipTitle: {
    color: '#22243A',
    fontSize: 14,
    fontWeight: '900',
  },

  tip: {
    color: '#9295A5',
    fontSize: 12,
    lineHeight: 19,
    marginTop: 7,
  },
});