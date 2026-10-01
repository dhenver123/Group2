import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
} from "react";

export type Mission = {
  id: string;
  title: string;
  completed: boolean;
};

type MissionContextType = {
  studentName: string;
  setStudentName: (name: string) => void;

  missions: Mission[];

  addMission: (title: string) => void;
  toggleMission: (id: string) => void;
  deleteMission: (id: string) => void;
  resetMissions: () => void;

  totalMissions: number;
  completedMissions: number;
};

const MissionContext = createContext<MissionContextType | undefined>(
  undefined
);

export function MissionProvider({ children }: { children: ReactNode }) {
  const [studentName, setStudentName] = useState("Student");

  const [missions, setMissions] = useState<Mission[]>([
    {
      id: "1",
      title: "Review React Native Lesson 1",
      completed: false,
    },
    {
      id: "2",
      title: "Practice useState",
      completed: false,
    },
    {
      id: "3",
      title: "Study Expo Router",
      completed: false,
    },
  ]);

  const addMission = (title: string) => {
    const trimmedTitle = title.trim();

    if (trimmedTitle.length === 0) {
      return;
    }

    const newMission: Mission = {
      id: Date.now().toString(),
      title: trimmedTitle,
      completed: false,
    };

    setMissions((currentMissions) => [
      ...currentMissions,
      newMission,
    ]);
  };

  const toggleMission = (id: string) => {
    setMissions((currentMissions) =>
      currentMissions.map((mission) =>
        mission.id === id
          ? {
              ...mission,
              completed: !mission.completed,
            }
          : mission
      )
    );
  };

  const deleteMission = (id: string) => {
    setMissions((currentMissions) =>
      currentMissions.filter((mission) => mission.id !== id)
    );
  };

  const resetMissions = () => {
    setMissions([]);
  };

  const totalMissions = missions.length;

  const completedMissions = missions.filter(
    (mission) => mission.completed
  ).length;

  return (
    <MissionContext.Provider
      value={{
        studentName,
        setStudentName,
        missions,
        addMission,
        toggleMission,
        deleteMission,
        resetMissions,
        totalMissions,
        completedMissions,
      }}
    >
      {children}
    </MissionContext.Provider>
  );
}

export function useMissions() {
  const context = useContext(MissionContext);

  if (!context) {
    throw new Error(
      "useMissions must be used inside MissionProvider"
    );
  }

  return context;
}