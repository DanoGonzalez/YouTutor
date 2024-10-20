import { Tabs } from "expo-router";
import React, { useState, useEffect, useCallback } from "react";
import { View } from "react-native";
import { useFonts, Roboto_400Regular } from "@expo-google-fonts/roboto";
import * as SplashScreen from "expo-splash-screen";

import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import YouTutorSplashScreen from "@/components/welcome/YouTutorSplashScreen";
import OnboardingScreen from "@/components/welcome/onboardingScreen";
import OnboardingScreen2 from "@/components/welcome/onboardingScreen2";
import OnboardingScreen3 from "@/components/welcome/onboardingScreen3";

// Mantener la pantalla de splash visible mientras cargamos los recursos
SplashScreen.preventAutoHideAsync();

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const [appIsReady, setAppIsReady] = useState(false);
  const [onboardingStep, setOnboardingStep] = useState(1);

  // Cargar la fuente Roboto
  const [fontsLoaded] = useFonts({
    Roboto_400Regular,
  });

  const onReady = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
      setAppIsReady(true);
    }
  }, [fontsLoaded]);

  if (!appIsReady) {
    return <YouTutorSplashScreen onReady={onReady} />;
  }

  if (onboardingStep === 1) {
    return (
      <OnboardingScreen
        onFinish={() => {
          setOnboardingStep(2);
        }}
      />
    );
  }

  if (onboardingStep === 2) {
    return (
      <OnboardingScreen2
        onFinish={() => {
          setOnboardingStep(3);
        }}
        onBack={() => {
          setOnboardingStep(1);
        }}
      />
    );
  }

  if (onboardingStep === 3) {
    return (
      <OnboardingScreen3
        onFinish={() => {
          setOnboardingStep(0);
        }}
        onBack={() => {
          setOnboardingStep(2);
        }}
      />
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
          headerShown: false,
        }}>
        <Tabs.Screen
          name="index"
          options={{
            title: "Home",
            tabBarIcon: ({ color, focused }) => (
              <TabBarIcon name={focused ? "home" : "home-outline"} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="explore"
          options={{
            title: "Explore",
            tabBarIcon: ({ color, focused }) => (
              <TabBarIcon
                name={focused ? "code-slash" : "code-slash-outline"}
                color={color}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="login"
          options={{
            title: "Login",
            tabBarIcon: ({ color, focused }) => (
              <TabBarIcon
                name={focused ? "log-in" : "log-in-outline"}
                color={color}
              />
            ),
          }}
        />
      </Tabs>
    </View>
  );
}
