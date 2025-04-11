import { View, Text, TouchableOpacity, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import { Image } from "expo-image";
import styles from "../../assets/styles/home.styles";
import { useAuthStore } from "../../store/authStore";
import { API_URL } from "../../constants/api";
import { Ionicons } from "@expo/vector-icons";
// import {renderRatingPicker} from "./create"

export default function Home() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHashMore] = useState(true);

  const fetchBooks = async (pageNum = 1, refresh = false) => {
    try {
      if (refresh) setRefreshing(true);
      else if (pageNum === 1) setLoading(true);

      const response = await fetch(`${API_URL}/books?page=${page}&limit=5`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await response.json();
      if (!response.ok)
        throw new Error(data.message || "Failed to fetch the books");

      setBooks((prevBooks) => [...prevBooks, ...data.books]); //...data.books cause `books` itself is an array of multiple objects, that's why we spreading the items..
      setHashMore(pageNum < data.totalPages);
      setPage(pageNum); //is it okay? or we should a condition? for if setHash true then only setPage should be pageNum
    } catch (error) {
      console.log("Error fetching books", error);
    } finally {
      if (refresh) setRefreshing(false);
      else setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const handleLoadMore = async () => {};

  const renderItem = ({ item }) => (
    <View style={styles.bookCard}>
      <View style={styles.bookHeader}>
        <View style={styles.userInfo}>
          <Image
            source={{ uri: item.user.profileImage }}
            style={styles.avatar}
          />
          <Text style={styles.username}>{item.user.username}</Text>
        </View>
      </View>
      <View style={styles.bookImageContainer}>
        <Image
          source={item.image}
          contentFit="cover"
          style={styles.bookImage}
        />
      </View>

      <View style={styles.bookDetails}>
        <Text style={styles.bookTitle}>{item?.title}</Text>
        <View style={styles.ratingContainer}>
          {/* {renderRatingPicker(item.rating)} */}
        </View>
        <Text style={styles.caption}>{item?.caption}</Text>
      </View>
    </View>
  );

  const { token } = useAuthStore();

  return (
    <View style={styles.container}>
      <FlatList
        data={books}
        renderItem={renderItem}
        keyExtractor={(item) => item._id}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}
