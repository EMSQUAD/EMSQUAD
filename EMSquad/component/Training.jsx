import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Training = () =>{
    const getTrainingData = () => {
        
        const tempDate = new Date().getDate();
        // Load data from mongoDB
        if(tempDate != 0)
            return tempDate;
        
        
        
        return (
            <View style={styles.Training}>
            <Text style={styles.TrainingTitle}>{`${tempDate}, משימות`}</Text>
            <View style={styles.TrainingData}>{getTrainingData()}</View>
        </View>
    )
}
}

const styles = StyleSheet.create({
    Training: {
        position: 'absolute',
        width: 300,
        height: 300,
        backgroundColor: 'gray',
        borderColor: 'red'
    },
    TrainingTitle: {
        fontSize: 18,
        color: 'white'
    }

})

export default Training;
