import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const UserSelectionScreen = ({ route }) => {
  const navigation = useNavigation();
  const { userId } = route.params;
  const [lastChattedUser, setLastChattedUser] = useState(null);

  const users = ['user1', 'user2', 'user3'];

  const navigateToChat = async (selectedUser) => {
    try {
      // Update the last chatted user in AsyncStorage
      await AsyncStorage.setItem(`lastChattedUser_${userId}`, selectedUser);

      // Update the state for a quicker visual change
      setLastChattedUser(selectedUser);

      // Navigate to the chat screen with the selected user
      navigation.navigate('ChatScreen', { userId, selectedUser });
    } catch (error) {
      console.error('Error updating last chatted user:', error);
    }
  };

  useEffect(() => {
    // Get the last chatted user from AsyncStorage
    const getLastChattedUser = async () => {
      try {
        const lastChattedUser = await AsyncStorage.getItem(`lastChattedUser_${userId}`);
        setLastChattedUser(lastChattedUser);
      } catch (error) {
        console.error('Error reading last chatted user from AsyncStorage:', error);
      }
    };

    getLastChattedUser();
  }, [userId]);

  const renderUserBox = (user) => (
    <TouchableOpacity
      key={user}
      style={[
        styles.boxer,
        lastChattedUser === user && styles.lastChattedBoxer,
      ]}
      onPress={() => navigateToChat(user)}
    >
      <View style={styles.textContainer}>
        <Text style={styles.userText}>{user.toUpperCase()}</Text>
      </View>
      {lastChattedUser === user && (
        <View style={styles.lastChattedTag}>
          <Text style={{ color: 'white' }}>Last Active</Text>
        </View>
      )}
    </TouchableOpacity>
  );

  return (
    <View style={styles.outer}>
      <Text style={styles.head}>Contacts</Text>
      {users.map((user) => (user !== userId ? renderUserBox(user) : null))}
      {renderUserBox('group')}
    </View>
  );
};

const styles = StyleSheet.create({
  outer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    gap: 15,
  },
  boxer: {
    backgroundColor: 'orange',
    height: 60,
    width: 300,
    borderRadius: 10,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    position: 'relative',
  },
  lastChattedBoxer: {
    backgroundColor: 'green', 
    borderColor: 'black',
    borderWidth: 3,
  },
  userText: {
    fontSize: 30,
    fontFamily: 'sans-serif-light',
    color: 'white',
  },
  lastChattedTag: {
    position: 'absolute',
    top: -15,
    backgroundColor: 'black', 
    padding: 5,
    borderRadius: 5,
  },
  head: {
    color: 'black',
    fontSize: 30,
  },
  textContainer: {
    width: 150,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default UserSelectionScreen;
