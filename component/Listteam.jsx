import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import {
  useNavigation,
  useRoute,
  useFocusEffect,
} from "@react-navigation/native";

const ListTeam = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();
  const route = useRoute();

  useEffect(() => {
    fetchUsersFromAPI();
  }, []);

  const fetchUsersFromAPI = async () => {
    try {
      const response = await fetch("https://server-ems-rzdd.onrender.com/user");

      if (!response.ok) {
        throw new Error("Failed to fetch users");
      }

      const data = await response.json();
      const { userDetails } = route.params;
      const loggedInUserId = userDetails.id;
      const filteredUsers = data.data.filter(
        (user) => user.id_use !== loggedInUserId
      );
      console.log("filteredUsers:", filteredUsers);
      console.log("userDetails:", userDetails);
      console.log("loggedInUserId:", loggedInUserId);
      setUsers(filteredUsers);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching users:", error);
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchUsersFromAPI();
    }, [])
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="blue" />
      </View>
    );
  }

  if (!Array.isArray(users) || users.length === 0) {
    return (
      <View style={styles.container}>
        <Text>No users found</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      {users.map((user, index) => (
        <TouchableOpacity
          key={`${user.id_use}_${index}`}
          style={styles.card}
          onPress={() => navigation.navigate("ProfileUser", { user })}
        >
          <Image source={{ uri: user.image }} style={styles.image} />
          <View style={styles.userInfo}>
            <Text
              style={styles.userName}
            >{`${user.first_name} ${user.last_name}`}</Text>
            <Text style={styles.userInfoText}>{`פלאפון: ${user.phone}`}</Text>
            <Text
              style={styles.userInfoText}
            >{`סטטוס: ${user.status_ability}`}</Text>
            <View style={styles.availabilityCircleContainer}>
              <View
                style={[
                  styles.availabilityCircle,
                  {
                    backgroundColor:
                      user.status_ability === "available" ? "green" : "red",
                  },
                ]}
              />
            </View>
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    width: "100%",
  },
  container: {
    flex: 1,
    padding: 16,
    paddingTop: 30,
    backgroundColor: "#fff",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    flexDirection: "row-reverse",
    alignItems: "center",
    backgroundColor: "#D9D9D9",
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    width: "100%",
    justifyContent: "flex-end",
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 35,
    marginRight: 10,
    marginLeft: 10,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
    textAlign: "right",
    paddingRight: 10,
  },
  userInfoText: {
    fontSize: 16,
    marginBottom: 3,
    textAlign: "right",
    paddingRight: 10,
  },
  availabilityCircleContainer: {
    position: "absolute",
    top: 5,
    left: 5,
    width: 20,
    height: 20,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  availabilityCircle: {
    width: 15,
    height: 15,
    borderRadius: 7.5,
  },
});

export default ListTeam;
