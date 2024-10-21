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
import Login from "@/components/Login";

// Mantener la pantalla de splash visible mientras cargamos los recursos
SplashScreen.preventAutoHideAsync();

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const [appIsReady, setAppIsReady] = useState(false);
  const [showSplash, setShowSplash] = useState(true);
  const [onboardingStep, setOnboardingStep] = useState(-1);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Cargar la fuente Roboto
  const [fontsLoaded] = useFonts({
    Roboto_400Regular,
  });

  useEffect(() => {
    async function prepare() {
      try {
        // Simular una carga de recursos
        await new Promise((resolve) => setTimeout(resolve, 2000));
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
      }
    }
    prepare();
  }, []);

  useEffect(() => {
    if (appIsReady && fontsLoaded) {
      SplashScreen.hideAsync();
      setShowSplash(false);
      setOnboardingStep(0);
    }
  }, [appIsReady, fontsLoaded]);

  if (!appIsReady || !fontsLoaded || showSplash) {
    return <YouTutorSplashScreen onReady={() => setAppIsReady(true)} />;
  }

  if (onboardingStep === 0) {
    return (
      <OnboardingScreen
        onFinish={() => {
          setOnboardingStep(1);
        }}
      />
    );
  }

  if (onboardingStep === 1) {
    return (
      <OnboardingScreen2
        onFinish={() => {
          setOnboardingStep(2);
        }}
        onBack={() => {
          setOnboardingStep(0);
        }}
      />
    );
  }

  if (onboardingStep === 2) {
    return (
      <OnboardingScreen3
        onFinish={() => {
          setOnboardingStep(-1);
        }}
        onBack={() => {
          setOnboardingStep(1);
        }}
      />
    );
  }

  if (!isLoggedIn) {
    return <Login onLogin={() => setIsLoggedIn(true)} />;
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
