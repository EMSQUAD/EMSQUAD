import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  StyleSheet,
  StatusBar,
  Dimensions,
  View,
  TouchableOpacity,
} from "react-native";
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

const Stack = createNativeStackNavigator();
const ListTeamScreen = ({ route }) => {
  const showAvailable = route.params?.showAvailable ?? true;
  return <Listteam showAvailable={showAvailable} />;
};
const App = () => {
 const [showAvailable, setShowAvailable] = useState(true);

  // const updateShowAvailable = () => {
  //   setShowAvailable((prev) => !prev);
  // };


  // const updateShowAvailable = (newShowAvailable) => {
  //   setShowAvailable(newShowAvailable);
  //   navigation.setParams({ showAvailable: newShowAvailable });
  // };

  // const [showAvailable, setShowAvailable] = useState(true);
  useEffect(() => {
    console.log("showAvailable in App:", showAvailable);
  }, [showAvailable]);

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
            // component={Listteam}
            // component={(props) => <Listteam {...props} updateShowAvailable={updateShowAvailable} />}
            // component={(props) => (
            //   <Listteam {...props} showAvailable={showAvailable} />
            // )}
            component={ListTeamScreen}
            options={({ route }) => ({
              headerShown: true,
              headerStyle: { backgroundColor: "black" },
              headerTitle: "צוות",
              headerTitleStyle: {
                color: "white",
                fontSize: 20,
                fontWeight: "bold",
              },
              headerBackTitle: "חזור",
              headerRight: () => (
                <TouchableOpacity
                //   onPress={() => updateShowAvailable(!showAvailable)}
                // >
                onPress={() => {
                  const showAvailable = route.params?.showAvailable || true;
                  route.params?.updateShowAvailable(!showAvailable);
                }}
              >
                  <MaterialCommunityIcons
                    name="filter-variant"
                    size={24}
                    color="white"
                  />
                </TouchableOpacity>
              ),
            })}
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
