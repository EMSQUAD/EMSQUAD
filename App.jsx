import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  StyleSheet,
  StatusBar,
  Dimensions,
  View,
} from "react-native";
import * as Notifications from 'expo-notifications';
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./component/Home.component";
import UserListComponent from "./component/DisplayUsers.component";
import EventListComponent from "./component/DisplayEvents.component";
import WalkieTalkiePTT from "./component/walkieTalkie.component";
import LoginScreen from "./component/Login";
import HomeScreenSolider from "./component/Home.component.solider";
import ChatScreen from "./component/ChatScreen";
// import Listteam from "./component/Listteam";

const Stack = createNativeStackNavigator();
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

// Request permissions for notifications
async function registerForPushNotificationsAsync() {
  const { status } = await Notifications.getPermissionsAsync();
  if (status !== 'granted') {
    const { status: newStatus } = await Notifications.requestPermissionsAsync();
    if (newStatus !== 'granted') {
      console.log('Permission to receive notifications was denied');
      return;
    }
  }
  const token = (await Notifications.getExpoPushTokenAsync()).data;
  console.log(token);
  // Now you can save the token to your user's data or send it to your server to associate it with the user
}

registerForPushNotificationsAsync();

const App = () => {
  useEffect(() => { }, []);

  return (
    <View style={styles.container}>
      <StatusBar hidden translucent backgroundColor="transparent" />
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            // component={(props) => <HomeScreen {...props} />}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="HomeSolider"
            component={HomeScreenSolider}
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
          {/* <Stack.Screen
            name="List"
            component={Listteam}
            options={{
              headerShown: true,
              headerStyle: { backgroundColor: "black" },
              headerTitle: "צוות",
              headerTitleStyle: {
                color: "white",
                fontSize: 20,
                fontWeight: "bold",
              },
              headerBackTitle: "חזור",
            }}
          /> */}



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
          <Stack.Screen
            name="ChatScreen"
            component={ChatScreen}
          />
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
