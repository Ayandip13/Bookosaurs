import { Stack, useRouter, useSegments } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import SafeScreen from "../components/SafeScreen.jsx";
import { StatusBar } from "expo-status-bar";
import { useAuthStore } from "../store/authStore.js";
import { useEffect } from "react";


export default function RootLayout() {
  const router = useRouter(); // for navigation
  const segments = useSegments(); // get current route group like (auth), (tabs)

  const { checkAuth, user, token } = useAuthStore(); // custom auth hook

  useEffect(() => {
    checkAuth(); // check if user is logged in on app start
  }, []);

  useEffect(() => {
    const inAuthScreen = segments[0] === "(auth)"; // check if user is in auth screen
    const isSignedIn = user && token; // check if user is logged in

    // if not logged in and not in auth screen, redirect to auth
    if (!isSignedIn && !inAuthScreen) router.replace("/(auth)");
    // if logged in and still in auth screen, redirect to tabs (main app)
    else if (isSignedIn && inAuthScreen) router.replace("/(tabs)");
  }, [user, token, segments]);

  console.log("now in", segments); // for debugging current route

  return (
    <SafeAreaProvider>
      <SafeScreen>
        {/* Define two main screen groups: (tabs) and (auth) */}
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(tabs)" />
          <Stack.Screen name="(auth)" />
        </Stack>
      </SafeScreen>
      <StatusBar style="dark" />
    </SafeAreaProvider>
  );
}
