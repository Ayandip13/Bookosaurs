import {
  View,
  Text,
  Platform,
  KeyboardAvoidingView,
  TextInput,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import styles from "../../assets/styles/signup.style.js";
import Ionicons from "@expo/vector-icons/Ionicons";
import COLORS from "../../constants/colors.js";
import { router, useRouter } from "expo-router";

export default function Signup() {
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const handleLogin = () => {
    setIsLoading(true);
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={styles.container}>
        <View style={styles.card}>
          <View style={styles.header}>
            <Text style={styles.title}>Bookosaurs 🐲</Text>
            <Text style={styles.subtitle}>Share Your favourite reads</Text>
          </View>
          <View style={styles.formContainer}>
            {/* Username input */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Username</Text>
              <View style={styles.inputContainer}>
                <Ionicons
                  name="person-outline"
                  size={20}
                  color={COLORS.primary}
                  style={styles.inputIcon}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Eg. bruise wayne"
                  autoCapitalize="none"
                  onChangeText={setUserName}
                  value={username}
                  placeholderTextColor={COLORS.placeholderText}
                />
              </View>
            </View>
            {/* email input */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Email</Text>
              <View style={styles.inputContainer}>
                <Ionicons
                  name="mail-outline"
                  size={20}
                  color={COLORS.primary}
                  style={styles.inputIcon}
                />
                <TextInput
                  style={styles.input}
                  placeholder="bwayne99@.."
                  autoCapitalize="none"
                  onChangeText={setEmail}
                  value={email}
                  placeholderTextColor={COLORS.placeholderText}
                />
              </View>
            </View>
            {/* password input */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Password</Text>
              <View style={styles.inputContainer}>
                <Ionicons
                  onPress={() => setShowPassword(!showPassword)}
                  name={showPassword ? "eye" : "eye-off"}
                  size={20}
                  color={COLORS.primary}
                  style={styles.inputIcon}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Enter your password"
                  placeholderTextColor={COLORS.placeholderText}
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={!showPassword}
                />
              </View>
            </View>

            <TouchableOpacity
              style={styles.button}
              activeOpacity={0.7}
              onPress={handleLogin}
              disabled={isLoading}
            >
              {isLoading ? (
                <ActivityIndicator size="small" color="#fff" />
              ) : (
                <Text style={styles.buttonText}>Sign Up</Text>
              )}
            </TouchableOpacity>

            {/* footer */}

            <View style={styles.footer}>
              <Text>Already have an account </Text>
              <TouchableOpacity onPress={() => router.back()}>
                <Text style={styles.link}>Login</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}
