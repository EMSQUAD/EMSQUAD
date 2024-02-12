import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { BarChart } from 'react-native-chart-kit';

const PersonalTracking = () => {
    const getPersonalData = () => {
        const tempDate = new Date().getFullYear();
        if (tempDate !== 0) {
            const PersonalData = ['משימה 1', 'משימה 2', 'משימה 3'];
            return PersonalData;
        } else {
            return [];
        }
    };

    const personalData = getPersonalData();

    const chartData = {
        labels: personalData.map((item, index) => `משימה ${index + 1}`),
        datasets: [
            {
                data: personalData.map(() => Math.floor(Math.random() * 100)), // Dummy data, replace with your actual data
            },
        ],
    };
    const getRandomColor = () => {
        // Generate random RGB values
        const r = Math.floor(Math.random() * 256);
        const g = Math.floor(Math.random() * 256);
        const b = Math.floor(Math.random() * 256);
        // Return color string in rgba format
        return `rgba(${r}, ${g}, ${b}, 1)`;
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>מעקב אישי</Text>
            <View style={styles.chartContainer}>
                <BarChart
                    data={chartData}
                    width={340}
                    height={115}
                    yAxisSuffix="%"
                    chartConfig={{
                        backgroundGradientFrom: '#c0c0c0',
                        backgroundGradientTo: 'white',
                        decimalPlaces: 0,
                        color: (opacity = 1) => getRandomColor(),
                        labelColor: (opacity = 1) => 'black',
                    }}
                    style={styles.barChart}
                    verticalLabelRotation={30} 
                    fromZero={true}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 660,
        alignSelf: 'center',
        width: 350,
        height: 150, 
        backgroundColor: '#c0c0c0',
        borderColor: 'gray',
        borderWidth: 2,
        borderRadius: 15,
    },
    title: {
        fontSize: 18,
        fontWeight: '900',
        textAlign: 'right',
        padding: 10,
    },
    chartContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        marginTop: 0, 
    },
    barChart: {
        borderRadius: 10,
        position: 'relative',
        bottom: 5,
    },
});

export default PersonalTracking;
