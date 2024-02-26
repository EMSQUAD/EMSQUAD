// import React from "react";
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

// import NavBar from "./component/Navbar";
// import Header from "./component/Header";
import UserListComponent from "./component/DisplayUsers.component";
import EventListComponent from "./component/DisplayEvents.component";
import WalkieTalkiePTT from "./component/walkieTalkie.component";
import LoginScreen from "./component/Login";
import React, { useEffect } from "react";

const Stack = createNativeStackNavigator();

const App = () => {
  useEffect(() => {
    // console.log('App height:', Dimensions.get('window').height);
  }, []);
  return (
    // <SafeAreaView style={styles.container}>
    <View style={styles.container}>
      <StatusBar hidden translucent backgroundColor="transparent" />
      <NavigationContainer>
        <Stack.Navigator>
{/* 
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{
              header: () => null, // Hide the header
            }}
          /> */}

          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{
              header: () => null, // Hide the header
            }}
          />
          <Stack.Screen
            name="Users"
            component={UserListComponent}
            options={{
              headerShown: true,
              headerStyle: {
                backgroundColor: "black",
              },
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
              headerStyle: {
                backgroundColor: "black",
              },
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
            options={{
              header: () => null, // Hide the header
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
      {/* <Header /> */}
      {/* <NavBar /> */}
      {/* </SafeAreaView> */}
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
