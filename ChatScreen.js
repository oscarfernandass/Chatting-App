import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import {
  addDoc,
  collection,
  onSnapshot,
  serverTimestamp,
  orderBy,
  query,
} from 'firebase/firestore';
import { database } from './firebase';

const ChatScreen = ({ route }) => {
  const { userId, selectedUser } = route.params;
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  const flatListRef = React.useRef();

  useEffect(() => {
    const chatPath = getChatPath(userId, selectedUser);
    const chatRef = collection(database, 'chats', chatPath, 'messages');
    const orderedChat = query(chatRef, orderBy('timestamp'));

    const unsubscribe = onSnapshot(orderedChat, (snapshot) => {
      setMessages(
        snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      );

      scrollToBottom();
    });

    return () => {
      unsubscribe();
    };
  }, [userId, selectedUser]);

  const getChatPath = (user1, user2) => {
    return selectedUser === 'group'
      ? 'group'
      : user1 < user2
      ? `${user1}-${user2}`
      : `${user2}-${user1}`;
  };

  const scrollToBottom = () => {
    flatListRef.current.scrollToEnd({ animated: true });
  };

  const sendMessage = async () => {
    if (newMessage.trim() !== '') {
      const chatPath = getChatPath(userId, selectedUser);

      const formattedMessage = {
        text: newMessage.trim(),
        user: userId,
        timestamp: serverTimestamp(),
      };

      await addDoc(
        collection(database, 'chats', chatPath, 'messages'),
        formattedMessage
      );
      setNewMessage('');
    }
  };

  const renderMessage = ({ item }) => {
    const isCurrentUser = item.user === userId;

    return (
      <View
        style={[
          styles.messageContainer,
          {
            alignSelf: isCurrentUser ? 'flex-end' : 'flex-start',
            backgroundColor: isCurrentUser ? '#408F45' : 'skyblue',
          },
        ]}
      >
        <Text
          style={[
            styles.text,
            { color: isCurrentUser ? 'white' : 'black' },
          ]}
        >{`${item.user}: ${item.text}`}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>{selectedUser === 'group' ? 'Group Chat' : `Chatting with ${selectedUser}`}</Text>

      <FlatList
        ref={flatListRef}
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={renderMessage}
        style={styles.messageList}
        onContentSizeChange={scrollToBottom}
      />

      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Type your message"
          value={newMessage}
          onChangeText={(text) => setNewMessage(text)}
          style={styles.input}
        />
        <TouchableOpacity style={styles.send} onPress={sendMessage}>
          <Text style={styles.sendText}>Send</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: 'white',
  },
  header: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
    color: 'black',
  },
  messageList: {
    flex: 1,
    marginBottom: 16,
  },
  messageContainer: {
    padding: 8,
    borderRadius: 8,
    marginBottom: 8,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    marginRight: 8,
    padding: 8,
    borderWidth: 1,
    backgroundColor: 'lightgrey',
    borderWidth: 3,
    borderColor: 'black',
    borderRadius: 8,
    color: 'black',
    fontSize: 17,
  },
  send: {
    borderRadius: 10,
    backgroundColor: '#408F45',
  },
  sendText: {
    padding: 13,
    color: 'white',
  },
  text: {
    padding: 10,
    fontSize: 15,
  },
});

export default ChatScreen;
