import { View, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { useAuthStore } from "../../store/authStore";

export default function Home() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHashMore] = useState(true);

  const { token } = useAuthStore();

  return (
    <View>
      <Text>Home tab</Text>
      {/* <TouchableOpacity onPress={logout}>
        <Text>Log Out</Text>
      </TouchableOpacity> */}
    </View>
  );
}
