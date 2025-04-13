import React from "react";
import { View, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import COLORS from "../constants/colors";
import styles from "../assets/styles/create.styles";

export default function RatingStars({ rating = 0, onRate = null, size = 24 }) {
  const stars = [];

  for (let i = 0; i < 5; i++) {
    stars.push(
      <TouchableOpacity
        key={i}
        onPress={() => onRate && onRate(i)} // If onRate is passed, clicking works
        disabled={!onRate} // Disable click if no function provided
        style={styles.starButton}
      >
        <Ionicons
          name={i <= rating ? "star" : "star-outline"}
          size={size}
          color={i <= rating ? "#FEBA17" : COLORS.textSecondary}
        />
      </TouchableOpacity>
    );
  }

  return <View style={styles.ratingContainer}>{stars}</View>;
}
