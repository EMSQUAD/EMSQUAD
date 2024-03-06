import React, { useState, useEffect } from 'react';
import { View, Text, ActivityIndicator, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native'; 

const UserListComponent = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigation = useNavigation(); // Use useNavigation hook to get navigation object
    

    useEffect(() => {
        fetchUsersFromAPI();
    }, []);

    const fetchUsersFromAPI = async () => {
        try {
            const response = await fetch('https://server-ems-rzdd.onrender.com/user');

            if (!response.ok) {
                throw new Error('Failed to fetch users');
            }
            const data = await response.json();
            setUsers(data.data); // Assuming the API response has a 'data' property containing the array of users
            setLoading(false);
        } catch (error) {
            console.error('Error fetching users:', error);
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="blue" />
            </View>
        );
    }

    if (!Array.isArray(users) || users.length === 0) {
        return (
            <View style={styles.container}>
                <Text>No users found</Text>
            </View>
        );
    }

    return (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
            {users.map((user, index) => (
                <TouchableOpacity
                    key={`${user.id_use}_${index}`}
                    style={styles.card}
                    onPress={() => {
                        // Log user information to the console
                        console.log("Navigating with user ID:", user.id_use);
                        navigation.navigate('ChatScreen', { userId: user.id_use });
                    }}>
                    <Image source={{ uri: user.image }} style={styles.image} />
                    <View style={styles.userInfo}>
                        <Text style={styles.userName}>{`${user.first_name} ${user.last_name}`}</Text>
                        <Text style={styles.userInfoText}>{`Phone: ${user.phone}`}</Text>
                        <Text style={styles.userInfoText}>{`Status: ${user.status_ability}`}</Text>
                    </View>
                </TouchableOpacity>
            ))}
        </ScrollView>
    );
    
};

const styles = StyleSheet.create({
    scrollContainer: {
        flexGrow: 1,
        width: '100%',
    },
    container: {
        flex: 1,
        padding: 16,
        paddingTop: 30,
        backgroundColor: '#fff',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    card: {
        flexDirection: 'row-reverse', 
        alignItems: 'center',
        backgroundColor: '#D9D9D9',
        borderRadius: 10,
        padding: 10,
        marginBottom: 10,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        width: '100%',
    },
    image: {
        width: 70,
        height: 70,
        borderRadius: 35,
        marginLeft: 10, 
    },
    userInfo: {
        flex: 1,
        alignItems: 'flex-end', 
    },
    userName: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
        textAlign: 'right', 
    },
    userInfoText: {
        fontSize: 16,
        marginBottom: 3,
        textAlign: 'right', 
    },
    
    userPhone: { 
        fontSize: 16,
        marginBottom: 3,
        textAlign: 'right', 
    },
    userStatus: { 
        fontSize: 16,
        marginBottom: 3,
        textAlign: 'right', 
    },
    
});

export default UserListComponent;
