import React from "react";
import { View, Text, StyleSheet } from "react-native";

const Training = () => {
  const getTrainingData = () => {
    const tempDate = new Date().getFullYear();
    if (tempDate !== 0) {
      const trainingData = [
        "ישיבה צוות 8.3 ",
        "תרגיל  אימון 9.3",
        "ספירת מלאי 10.3",
      ];

      return (
        <View>
          {trainingData.map((item, index) => (
            <View key={index} style={styles.listItem}>
              <Text style={styles.listItemText}>{item}</Text>
              <Text style={styles.bullet}> •</Text>
            </View>
          ))}
        </View>
      );
    } else {
      return null;
    }
  };

  return (
    <View style={styles.Training}>
      <Text style={styles.TrainingTitle}>אירועים קרובים</Text>
      <View style={styles.TrainingData}>{getTrainingData()}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  Training: {
    position: "absolute",
    top: 460,
    alignSelf: "center",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
    width: 350,
    height: 150,
    backgroundColor: "#c0c0c0",
    borderColor: "gray",
    borderWidth: 2,
    borderRadius: 15,
  },
  TrainingTitle: {
    fontSize: 18,
    color: "black",
    fontWeight: "900",
    padding: 10,
  },
  TrainingData: {
    paddingRight: 15,
  },
  listItem: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginBottom: 1,
  },
  bullet: {
    fontSize: 18,
    marginRight: 5,
    textAlign: "right",
  },
  listItemText: {
    fontSize: 14,
    color: "black",
    textAlign: "right",
  },
});

export default Training;
