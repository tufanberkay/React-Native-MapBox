import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import ScooterProvider from '../providers/ScooterProvider';

export default function Layout() {
  return (
    <ScooterProvider>
      <Stack />
      <StatusBar style="light" />
    </ScooterProvider>
  );
}
