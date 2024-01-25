// Selection.js
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Selection = () => {
  const navigation = useNavigation();

  const navigateToUserSelection = (userId) => {
    
    navigation.navigate('UserSelectionScreen', { userId });
  };

  const renderUserBox = (userId, label) => (
    <TouchableOpacity style={styles.boxer} onPress={() => navigateToUserSelection(userId)}>
      <Image style={styles.img} source={require('./user.png')} />
      <View style={styles.userBoxTextContainer}>
        <Text style={styles.userText}>{label}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.outer}>
      <Text style={styles.log}>LOGIN</Text>
      {renderUserBox('user1', 'USER 1')}
      {renderUserBox('user2', 'User 2')}
      {renderUserBox('user3', 'User 3')}
    </View>
  );
};

const styles = StyleSheet.create({
  outer: {
    height: '100%',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    gap: 20,
  },
  boxer: {
    backgroundColor: '#408F45',
    height: 150,
    width: 300,
    borderRadius: 20,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  img: {
    height: 100,
    width: 100,
  },
  userText: {
    fontSize: 30,
    fontFamily: 'sans-serif-light',
    color: 'white',
  },
  userBoxTextContainer: {
    width: 150,
    justifyContent: 'center',
    alignItems: 'center',
  },
  log: {
    color: 'black',
    fontSize: 40,
  },
});

export default Selection;
