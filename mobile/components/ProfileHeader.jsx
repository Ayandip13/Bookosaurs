import { View, Text } from "react-native";
import React from "react";
import { useAuthStore } from "../store/authStore";
import styles from "../assets/styles/profile.styles";
import { Image } from "expo-image";
import { formatMemberSince } from "../lib/util";

const ProfileHeader = () => {
  const { user } = useAuthStore();

  if (!user) {
    return (
      <View style={styles.profileHeader}>
        <Text style={styles.username}>Loading profile...</Text>
      </View>
    );
  }

  return (
    <View style={styles.profileHeader}>
      <Image
        source={{ uri: user?.profileImage || "https://via.placeholder.com/100" }}
        style={styles.profileImage}
      />
      <View style={{ height: 60, width: 0.4, backgroundColor: "black", right: 16 }} />
      <View style={styles.profileInfo}>
        <Text style={styles.username}>{user?.username || "No username"}</Text>
        <Text style={styles.email}>{user?.email || "No email"}</Text>
        <Text style={styles.memberSince}>
          {user?.createdAt ? formatMemberSince(user.createdAt) : "Joined Unknown"}
        </Text>
      </View>
    </View>
  );
};

export default ProfileHeader;
