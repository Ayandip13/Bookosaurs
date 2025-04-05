import {
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import { useRouter } from "expo-router";
import styles from "../../assets/styles/create.styles";

export default function Create() {
  const [title, setTitle] = useState("");
  const [caption, setCaption] = useState("");
  const [rating, setRating] = useState(3);
  const [image, setImage] = useState(null);
  const [imageBase64, setImageBase64] = useState(null); //Base64 is a way to turn images into text so they can be easily sent over the internet. It's like translating a picture into words that computers can send in messages.
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const pickImage = async () => {};

  const handleSubmit = async () => {};

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView
        contentContainerStyle={styles.container}
        style={styles.scrollViewStyle}
      >
        <View style={styles.card}>
          <View style={styles.header}>
            <Text style={styles.title}>Add Book Recomendation</Text>
            <Text style={styles.subtitle}>
              Share your favorite read with others
            </Text>
          </View>
          <View style={styles.form}>
            <View style={styles.formGroup}></View>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
