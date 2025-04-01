import { Link } from "expo-router";
import { Text, View } from "react-native";
export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>hey let's get started</Text>
      <Link href="/(auth)/" style={{marginBottom:20, marginTop:40}}>login page</Link>
      <Link href="/(auth)/signup">signup page</Link>
    </View>
  );
}
