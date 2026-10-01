import React from "react";
import { Stack } from "expo-router";
import { MissionProvider } from "../context/MissionContext";

export default function RootLayout() {
  return (
    <MissionProvider>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      />
    </MissionProvider>
  );
}