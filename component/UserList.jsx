import React, { useState, useEffect } from 'react';
import { StyleSheet, FlatList, Text, TouchableOpacity } from 'react-native';

const UserList = ({ onUserSelect }) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('http://localhost:3000/users');
        if (!response.ok) {
          throw new Error('Failed to fetch users');
        }
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };
    fetchUsers();
  }, []);

  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        style={styles.userItem}
        onPress={() => onUserSelect(item.name)}
      >
        <Text style={styles.text}>{item.name}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <FlatList
      data={users}
      renderItem={renderItem}
      keyExtractor={(item) => item._id}
    />
  );
};

const styles = StyleSheet.create({
  userItem: {
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#ddd',
    marginBottom: 5,
  },
  text: {
    fontSize: 16,
  },
});

export default UserList;
