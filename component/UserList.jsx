import React, { useState, useEffect } from 'react';
import { StyleSheet, FlatList } from 'react-native';

const UserList = ({ onUserSelect }) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // קבלת רשימת משתמשים מ-MongoDB
    const fetchUsers = async () => {
      const response = await fetch('mongodb://localhost:3000/user');
      const data = await response.json();
      setUsers(data);
    };
    fetchUsers();
  }, []);

  constrenderItem = ({ item }) => {
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