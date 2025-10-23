// app/_layout.tsx
import {
  useRouter,
  useSegments,
  useRootNavigationState,
  Slot,
  Redirect,
} from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { useAuthStore } from "../store/authStore.js";
import { useEffect, useState } from "react";
import { View, ActivityIndicator } from "react-native";

export default function RootLayout() {
  const router = useRouter();
  const segments = useSegments();
  const navigationState = useRootNavigationState();
  const [isNavigationReady, setIsNavigationReady] = useState(false);

  const { checkAuth, user, token, loading } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, []);

  // Wait for navigation to be ready
  useEffect(() => {
    if (navigationState?.key) {
      setIsNavigationReady(true);
    }
  }, [navigationState?.key]);

  // Handle navigation once everything is ready
  if (isNavigationReady && !loading) {
    const inAuthScreen = (segments?.[0] ?? "") === "(auth)";
    const isSignedIn = !!(user && token);

    if (!isSignedIn && !inAuthScreen) {
      return <Redirect href="/(auth)" />;
    } else if (isSignedIn && inAuthScreen) {
      return <Redirect href="/(tabs)" />;
    }
  }

  // Show loading indicator while checking auth and navigation state
  if (loading || !isNavigationReady) {
    return (
      <SafeAreaProvider>
        {isNavigationReady && !loading ? (
          <Slot />
        ) : (
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <ActivityIndicator size="large" />
          </View>
        )}
        <StatusBar style="dark" />
      </SafeAreaProvider>
    );   
  }

  return (
    <SafeAreaProvider>
      <Slot />
      <StatusBar style="dark" />
    </SafeAreaProvider>
  );
}
