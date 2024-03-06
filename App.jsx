import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  StyleSheet,
  StatusBar,
  Dimensions,
  View,
  TouchableOpacity,
  Image,
  Text,
} from "react-native";
import { Ionicons } from '@expo/vector-icons';
import * as Notifications from 'expo-notifications';
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./component/Home.component";
import UserListComponent from "./component/DisplayUsers.component";
import EventListComponent from "./component/DisplayEvents.component";
import WalkieTalkiePTT from "./component/walkieTalkie.component";
import LoginScreen from "./component/Login";
import HomeScreenSolider from "./component/Home.component.solider";
import Listteam from "./component/Listteam";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import StatusSwitch from "./component/Status";
import ChatScreen from "./component/ChatScreen";

const Stack = createNativeStackNavigator();
const App = () => {
  // const [showAvailable, setShowAvailable] = useState(true);

  const updateShowAvailable = () => {
    setShowAvailable((prev) => !prev);
  };
  // const [showAvailable, setShowAvailable] = useState(true);
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
          <Stack.Screen
            name="List"
            component={Listteam}
            // component={(props) => <Listteam {...props} updateShowAvailable={updateShowAvailable} />}
            // component={(props) => (
            // <Listteam {...props} showAvailable={showAvailable} />
            // )}
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
              // headerRight: () => (
              //   <TouchableOpacity onPress={() => updateShowAvailable()}>
              //     <MaterialCommunityIcons
              //       name="filter-variant"
              //       size={24}
              //       color="white"
              //     />
              //   </TouchableOpacity>
              // ),
            }}
          />
          {/* {(props) => <Listteam {...props} showAvailable={showAvailable} />} */}

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
            options={{ headerShown: true }}
          />

          <Stack.Screen
            name="Status"
            component={StatusSwitch}
            options={{ headerShown: false }}
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
  headerImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginLeft: 10, // Adjust the margin to position the image to the right of the text
  },
  headerTitle: {
    color: 'black',
    fontSize: 18, // You might want to adjust the size depending on your needs
    // Add additional styling as needed for alignment or font properties
  },
});

export default App;
