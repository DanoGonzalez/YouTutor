import { Tabs } from "expo-router";
import React, { useState, useEffect } from "react";
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

SplashScreen.preventAutoHideAsync();

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const [appIsReady, setAppIsReady] = useState(false);
  const [showSplash, setShowSplash] = useState(true);
  const [onboardingStep, setOnboardingStep] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [onboardingCompleted, setOnboardingCompleted] = useState(false);

  const [fontsLoaded] = useFonts({
    Roboto_400Regular,
  });

  useEffect(() => {
    async function prepare() {
      try {
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
      setTimeout(() => setShowSplash(false), 2000); // Show splash for 2 seconds
    }
  }, [appIsReady, fontsLoaded]);

  const handleLogin = () => {
    setIsLoggedIn(true);
    setOnboardingCompleted(true);
  };

  if (!appIsReady || !fontsLoaded || showSplash) {
    return <YouTutorSplashScreen onReady={() => setAppIsReady(true)} />;
  }

  if (!onboardingCompleted) {
    switch (onboardingStep) {
      case 0:
        return (
          <OnboardingScreen
            onFinish={() => {
              setOnboardingStep(1);
            }}
          />
        );
      case 1:
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
      case 2:
        return (
          <OnboardingScreen3
            onFinish={() => {
              setOnboardingCompleted(true);
            }}
            onBack={() => {
              setOnboardingStep(1);
            }}
          />
        );
    }
  }

  if (!isLoggedIn) {
    return (
      <View style={{ flex: 1 }}>
        <Login onLogin={handleLogin} />
      </View>
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
