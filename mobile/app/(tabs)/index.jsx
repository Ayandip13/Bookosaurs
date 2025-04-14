import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Image } from "expo-image";
import styles from "../../assets/styles/home.styles";
import { useAuthStore } from "../../store/authStore";
import { API_URL } from "../../constants/api";
import RatingStars from "../../components/RatingStars";
import { Ionicons } from "@expo/vector-icons";
import { formatPublishDate } from "../../lib/util";
import COLORS from "../../constants/colors";
import Loader from "../../components/Loader";
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

      const response = await fetch(`${API_URL}/books?page=${pageNum}&limit=2`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await response.json();
      if (!response.ok)
        throw new Error(data.message || "Failed to fetch the books");

      // setBooks((prevBooks) => [...prevBooks, ...data.books]); //`...data.books` cause `books` itself is an array of multiple objects, that's why we spreading the items..
      //This upper line is giving the errors that's why we write this code
      const uniqueBooks =
        refresh || pageNum === 1
          ? data.books
          : Array.from(
              new Set([...books, ...data.books].map((book) => book._id))
            ).map((id) =>
              [...books, ...data.books].find((book) => book._id === id)
            );
      setBooks(uniqueBooks);

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

  const handleLoadMore = async () => {
    if (hasMore && !loading && !refreshing) {
      await fetchBooks(page + 1);
    }
  };

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
        <Text style={styles.caption}>{item?.caption}</Text>
        <Text style={styles.date}>
          Shared on {formatPublishDate(item.createdAt)}
        </Text>
        <View style={[styles.ratingContainer, { left: 125, top: -5 }]}>
          <RatingStars rating={item.rating} size={20} />
        </View>
      </View>
    </View>
  );

  // if (loading) return <Loader />;

  const { token } = useAuthStore();

  return (
    <View style={styles.container}>
      <FlatList
        data={books}
        renderItem={renderItem}
        keyExtractor={(item) => item._id}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={() => fetchBooks(1, true)}
            colors={[COLORS.primary]}
            tintColor={COLORS.primary}
          />
        }
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        onEndReached={handleLoadMore} //This is the function that runs when the user reaches the end of the list.
        onEndReachedThreshold={0.1} //This defines how early (how close to the bottom) the event should fire.
        //`ListHeaderComponent` is a property Rendered at the top of all the items. Can be a React Component Class, a render function, or a rendered element.
        ListHeaderComponent={
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Bookosaurs 🐲</Text>

            <Text style={styles.headerSubtitle}>
              Discover great reads from the community
            </Text>
          </View>
        }
        ListFooterComponent={
          hasMore && books.length > 0 ? (
            <ActivityIndicator
              style={styles.footerLoader}
              size="large"
              color={COLORS.primary}
            />
          ) : null
        }
        //Rendered when the list is empty. Can be a React Component Class, a render function, or a rendered element.
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons
              name="book-outline"
              size={70}
              color={COLORS.textSecondary}
            />
            <Text style={styles.emptyText}>No recommendations yet</Text>
            <Text style={styles.emptySubtext}>
              Be the first to share the book
            </Text>
          </View>
        }
      />
    </View>
  );
}
