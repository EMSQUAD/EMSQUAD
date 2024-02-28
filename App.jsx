import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  StyleSheet,
  StatusBar,
  Dimensions,
  View,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./component/Home.component";
import UserListComponent from "./component/DisplayUsers.component";
import EventListComponent from "./component/DisplayEvents.component";
import WalkieTalkiePTT from "./component/walkieTalkie.component";
import LoginScreen from "./component/Login";


const Stack = createNativeStackNavigator();

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check authentication status here and update isLoggedIn accordingly
    // For simplicity, I'm assuming isLoggedIn changes based on user login/logout
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar hidden translucent backgroundColor="transparent" />
      <NavigationContainer>
        <Stack.Navigator>
          {isLoggedIn ? (
            <>
              <Stack.Screen
                name="Home"
                component={HomeScreen}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="Users"
                component={UserListComponent}
                options={{
                  headerShown: true,
                  headerStyle: { backgroundColor: "black" },
                  headerTitle: "צאטים",
                  headerTitleStyle: {
                    color: "white",
                    fontSize: 20,
                    fontWeight: "bold",
                  },
                  headerBackTitle: "חזור",
                }}
              />
              <Stack.Screen
                name="Events"
                component={EventListComponent}
                options={{
                  headerShown: true,
                  headerStyle: { backgroundColor: "black" },
                  headerTitle: "אירועים",
                  headerTitleStyle: {
                    color: "white",
                    fontSize: 20,
                    fontWeight: "bold",
                  },
                  headerBackTitle: "חזור",
                }}
              />
              <Stack.Screen
                name="WalkieTalkie"
                component={WalkieTalkiePTT}
                options={{ headerShown: false }}
              />
            </>
          ) : (
            <Stack.Screen
              name="Login"
              component={LoginScreen}
              options={{ headerShown: false }}
            />
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
  },
});

export default App;
