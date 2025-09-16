import {
  View,
  Text,
  Alert,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useRouter } from "expo-router";
import { API_URL } from "../../constants/api";
import styles from "../../assets/styles/profile.styles";
import { useAuthStore } from "../../store/authStore";

import ProfileHeader from "../../components/ProfileHeader";
import LogoutButton from "../../components/LogoutButton";
import { Ionicons } from "@expo/vector-icons";
import COLORS from "../../constants/colors";
import { Image } from "expo-image";
import RatingStars from "../../components/RatingStars";
import Loader from "../../components/Loader";

export default function Profile() {
  const [books, setBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [deletedBookId, setDeletedBookId] = useState(null);

  const router = useRouter();

  const { token } = useAuthStore();

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`${API_URL}/books/user`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await response.json();
      if (!response) {
        throw new Error(data.message || "Failed to fetch user books");
      }
      setBooks(data);
    } catch (error) {
      console.error("Error fetching data", error);
      Alert.alert("Error", "Failed to load profile data. Pull down to refresh");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDeleteBook = async (bookId) => {
    try {
      setDeletedBookId(bookId);
      const response = await fetch(`${API_URL}/books/${bookId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Failed to delete book");
      }
      setBooks(books.filter((book) => book._id !== bookId));
      Alert.alert("Success", "Recommendation deleted succesfully");
    } catch (error) {
      Alert.alert(
        "Error",
        error.message || "Failed to delete the recommendation from list"
      );
    } finally {
      setDeletedBookId(null);
    }
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    await fetchData();
    setRefreshing(false);
  };

  if (isLoading && !refreshing) {
    <Loader />;
  }

  const confirmDelete = (bookId) => {
    Alert.alert(
      "Delete Recomendation",
      "Are you sure to delete the book from recomendation list",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => handleDeleteBook(bookId),
        },
      ]
    );
  };

  const renderBookItem = ({ item }) => (
    <View style={styles.bookItem}>
      <Image source={item.image} contentFit="fill" style={styles.bookImage} />
      <View style={styles.bookInfo}>
        <Text style={styles.bookTitle}>{item.title}</Text>
        <RatingStars rating={item.rating} size={13} style={{ marginTop: 10 }} />
        <Text style={styles.bookCaption} numberOfLines={2}>
          {item.caption}
        </Text>
        <Text style={styles.bookDate}>
          {new Date(item.createdAt).toLocaleDateString()}
        </Text>
      </View>
      <TouchableOpacity
        onPress={() => confirmDelete(item._id)}
        style={styles.deleteButton}
      >
        {deletedBookId === item._id ? (
          <ActivityIndicator size="small" color={COLORS.primary} />
        ) : (
          <Ionicons name="trash-outline" size={20} color={COLORS.primary} />
        )}
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <ProfileHeader />
      <LogoutButton />

      {/* Recommendations */}
      <View style={styles.booksHeader}>
        <Text style={styles.bookTitle}>Your Recommendations 📚 :</Text>
        <Text style={styles.booksCount}>{books.length} Books</Text>
      </View>
      <FlatList
        data={books}
        renderItem={renderBookItem}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            colors={[COLORS.primary]}
            tintColor={COLORS.primary}
          />
        }
        keyExtractor={(item) => item._id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.booksList} //These styles will be applied to the scroll view content container which wraps all of the child views. Example:
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons
              name="book-outline"
              size={69}
              color={COLORS.textSecondary}
            />
            <Text style={styles.emptyText}>No Recomendations yet</Text>
            <TouchableOpacity
              style={styles.addButton}
              onPress={() => router.push("/create")}
            >
              <Text style={styles.addButtonText}>Add Your First Book</Text>
            </TouchableOpacity>
          </View>
        }
      />
    </View>
  );
}
