import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';

export type Priority = 'Low' | 'Medium' | 'High';

export type Category =
  | 'School'
  | 'Personal'
  | 'Health';

export type Mission = {
  id: string;
  title: string;
  category: Category;
  priority: Priority;
  date: string;
  completed: boolean;
};

export type Profile = {
  name: string;
  course: string;
  school: string;
  year: string;
  bio: string;
};

type AppContextValue = {
  missions: Mission[];
  profile: Profile;

  darkMode: boolean;
  loading: boolean;

  addMission: (
    title: string,
    category: Category,
    priority: Priority,
    date?: string
  ) => void;

  toggleMission: (id: string) => void;
  deleteMission: (id: string) => void;

  updateProfile: (profile: Profile) => void;
  setDarkMode: (value: boolean) => void;

  todayMissions: Mission[];
  completedToday: number;
  todayProgress: number;

  streak: number;
  xp: number;
  level: number;
};

const STORAGE_KEY =
  '@student_daily_mission_v2';

/*
 * Get today's date using the device's
 * local timezone.
 */
const getToday = () => {
  const date = new Date();

  const year = date.getFullYear();

  const month = String(
    date.getMonth() + 1
  ).padStart(2, '0');

  const day = String(
    date.getDate()
  ).padStart(2, '0');

  return `${year}-${month}-${day}`;
};

const defaultProfile: Profile = {
  name: 'Student',
  course: 'Information Technology',
  school: 'My School',
  year: '2nd Year',
  bio: 'Learning, building, and completing one mission at a time.',
};

const createSeedMissions = (): Mission[] => {
  const today = getToday();

  return [
    {
      id: 'seed-1',
      title: 'Finish React Native activity',
      category: 'School',
      priority: 'High',
      date: today,
      completed: false,
    },
    {
      id: 'seed-2',
      title: 'Review navigation notes',
      category: 'School',
      priority: 'Medium',
      date: today,
      completed: true,
    },
    {
      id: 'seed-3',
      title: 'Drink enough water',
      category: 'Health',
      priority: 'Low',
      date: today,
      completed: false,
    },
  ];
};

const AppContext =
  createContext<AppContextValue | undefined>(
    undefined
  );

export function AppProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [missions, setMissions] =
    useState<Mission[]>(
      createSeedMissions()
    );

  const [profile, setProfile] =
    useState<Profile>(
      defaultProfile
    );

  const [darkMode, setDarkModeState] =
    useState(false);

  const [loading, setLoading] =
    useState(true);

  /*
   * Load saved application data.
   */
  useEffect(() => {
    let mounted = true;

    const loadData = async () => {
      try {
        const saved =
          await AsyncStorage.getItem(
            STORAGE_KEY
          );

        if (!mounted) {
          return;
        }

        if (saved) {
          const parsed =
            JSON.parse(saved);

          if (
            Array.isArray(
              parsed.missions
            )
          ) {
            setMissions(
              parsed.missions
            );
          }

          if (parsed.profile) {
            setProfile(
              parsed.profile
            );
          }

          if (
            typeof parsed.darkMode ===
            'boolean'
          ) {
            setDarkModeState(
              parsed.darkMode
            );
          }
        }
      } catch (error) {
        console.log(
          'Unable to load saved data:',
          error
        );
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    loadData();

    return () => {
      mounted = false;
    };
  }, []);

  /*
   * Save application data.
   *
   * We don't save anything until the
   * initial AsyncStorage load has finished.
   */
  useEffect(() => {
    if (loading) {
      return;
    }

    const saveData = async () => {
      try {
        await AsyncStorage.setItem(
          STORAGE_KEY,
          JSON.stringify({
            missions,
            profile,
            darkMode,
          })
        );
      } catch (error) {
        console.log(
          'Unable to save data:',
          error
        );
      }
    };

    saveData();
  }, [
    missions,
    profile,
    darkMode,
    loading,
  ]);

  const today = getToday();

  /*
   * Missions for today.
   */
  const todayMissions = useMemo(() => {
    return missions.filter(
      (mission) =>
        mission.date === today
    );
  }, [missions, today]);

  /*
   * Completed missions today.
   */
  const completedToday =
    todayMissions.filter(
      (mission) =>
        mission.completed
    ).length;

  /*
   * Today's progress.
   */
  const todayProgress =
    todayMissions.length === 0
      ? 0
      : Math.round(
          (completedToday /
            todayMissions.length) *
            100
        );

  /*
   * XP.
   *
   * Every completed mission
   * gives 50 XP.
   */
  const xp = useMemo(() => {
    return (
      missions.filter(
        (mission) =>
          mission.completed
      ).length * 50
    );
  }, [missions]);

  /*
   * Every 500 XP = one level.
   */
  const level =
    Math.floor(xp / 500) + 1;

  /*
   * Calculate daily streak.
   */
  const streak = useMemo(() => {
    const completedDays =
      new Set(
        missions
          .filter(
            (mission) =>
              mission.completed
          )
          .map(
            (mission) =>
              mission.date
          )
      );

    let count = 0;

    const cursor = new Date();

    while (
      completedDays.has(
        `${cursor.getFullYear()}-${String(
          cursor.getMonth() + 1
        ).padStart(2, '0')}-${String(
          cursor.getDate()
        ).padStart(2, '0')}`
      )
    ) {
      count++;

      cursor.setDate(
        cursor.getDate() - 1
      );
    }

    return count;
  }, [missions]);

  /*
   * ADD MISSION
   *
   * New missions always start
   * as NOT completed.
   */
  const addMission = (
    title: string,
    category: Category,
    priority: Priority,
    date = today
  ) => {
    const cleanTitle =
      title.trim();

    if (!cleanTitle) {
      return;
    }

    const newMission: Mission = {
      /*
       * Create a unique ID.
       */
      id: `${Date.now()}-${Math.random()
        .toString(36)
        .slice(2, 8)}`,

      title: cleanTitle,

      category,

      priority,

      date,

      /*
       * New mission starts OPEN.
       */
      completed: false,
    };

    setMissions(
      (currentMissions) => [
        newMission,
        ...currentMissions,
      ]
    );
  };

  /*
   * TOGGLE MISSION
   *
   * OPEN -> DONE
   * DONE -> OPEN
   */
  const toggleMission = (
    id: string
  ) => {
    setMissions(
      (currentMissions) =>
        currentMissions.map(
          (mission) =>
            mission.id === id
              ? {
                  ...mission,
                  completed:
                    !mission.completed,
                }
              : mission
        )
    );
  };

  /*
   * DELETE MISSION
   *
   * Removes the mission immediately
   * from the mission list.
   */
  const deleteMission = (
    id: string
  ) => {
    setMissions(
      (currentMissions) =>
        currentMissions.filter(
          (mission) =>
            mission.id !== id
        )
    );
  };

  /*
   * UPDATE PROFILE
   */
  const updateProfile = (
    nextProfile: Profile
  ) => {
    setProfile(
      nextProfile
    );
  };

  /*
   * DARK MODE
   */
  const setDarkMode = (
    value: boolean
  ) => {
    setDarkModeState(value);
  };

  return (
    <AppContext.Provider
      value={{
        missions,

        profile,

        darkMode,

        loading,

        addMission,

        toggleMission,

        deleteMission,

        updateProfile,

        setDarkMode,

        todayMissions,

        completedToday,

        todayProgress,

        streak,

        xp,

        level,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context =
    useContext(AppContext);

  if (!context) {
    throw new Error(
      'useApp must be used inside AppProvider'
    );
  }

  return context;
}