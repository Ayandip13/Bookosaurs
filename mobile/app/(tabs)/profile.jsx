import { View, Text } from "react-native";
import React, { useState } from "react";
import { useRouter } from "expo-router";

export default function Profile() {
  const [books, setBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const router = useRouter();

  return (
    <View>
      <Text>Profile tab</Text>
    </View>
  );
}
