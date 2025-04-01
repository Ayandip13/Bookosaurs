import { View, Text, Platform, KeyboardAvoidingView } from "react-native";
import React from "react";
import styles from "../../assets/styles/signup.style.js";

export default function Signup() {
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
            {/* USER input */}
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}
