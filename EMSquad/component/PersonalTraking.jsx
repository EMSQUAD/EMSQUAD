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
                    height={100}
                    yAxisSuffix="%"
                    chartConfig={{
                        backgroundGradientFrom: '#c0c0c0',
                        backgroundGradientTo: 'white',
                        decimalPlaces: 0,
                        color: (opacity = 1) => getRandomColor(),
                        labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                    }}
                    style={styles.barChart}
                    verticalLabelRotation={30} // Adjust rotation if necessary
                    fromZero={true} // Ensure bars start from zero
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
        height: 150, // Adjust height to accommodate title and chart
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
        marginTop: 0, // Add margin to separate title and chart
    },
    barChart: {
        borderRadius: 10,
        position: 'relative',
        bottom: 0,
    },
});

export default PersonalTracking;
