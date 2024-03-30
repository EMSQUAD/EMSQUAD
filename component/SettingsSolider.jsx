import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

const settingsOptions = [
  {
    title: "הוסף משימות",
    icon: "tasks",
    navigateTo: "AddTask",
  },
  {
    title: "סטטוס",
    icon: "check-circle",
    navigateTo: "Status",
  },
  {
    title: "עריכת פרופיל",
    icon: "edit",
    navigateTo: "EditProfile",
  },
];

const SettingsSoliderPage = ({ navigation, route }) => {
  const userDetails = route.params.userDetails;

  return (
    <ScrollView style={styles.container}>
      {settingsOptions.map((option, index) => (
        <TouchableOpacity
          key={index}
          style={styles.optionContainer}
          onPress={() =>
            navigation.navigate(option.navigateTo, { userDetails })
          }
        >
          <Icon
            name={option.icon}
            size={24}
            color="black"
            style={styles.icon}
          />
          <Text style={styles.optionText}>{option.title}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  optionContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#CCCCCC",
    width: "100%",
  },

  optionText: {
    fontSize: 18,
    flex: 1,
    textAlign: "right",
    paddingRight: 20,
  },
});

export default SettingsSoliderPage;
