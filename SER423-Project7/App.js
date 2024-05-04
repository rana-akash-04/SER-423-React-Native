import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Switch,
  TouchableOpacity,
  FlatList
} from 'react-native';

export default class App extends Component {
  state = {
    userName: '',
    isAdmin: false,
    greetingMessage: '',
    greetedUsers: []
  };

  greetUser = () => {
    const { userName, isAdmin } = this.state;
    const greetingMessage = `Hello, ${userName}!`;
    const newUser = { name: userName, isAdmin };

    // Update greetedUsers array with new user
    this.setState(prevState => ({
      greetingMessage,
      greetedUsers: [...prevState.greetedUsers, newUser]
    }));
  };

  renderUserItem = ({ item }) => (
    <View style={styles.userItem}>
      <Text>{item.name}</Text>
      <Text>{item.isAdmin ? 'Admin' : 'Not Admin'}</Text>
    </View>
  );

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.label}>Enter User Name</Text>
        <TextInput
          style={styles.inputField}
          placeholder="User Name"
          onChangeText={(userName) => this.setState({ userName })}
          value={this.state.userName}
        />
        <Text style={styles.label}>Admin</Text>
        <Switch
          style={styles.radio}
          value={this.state.isAdmin}
          onValueChange={(isAdmin) => this.setState({ isAdmin })}
        />
        <TouchableOpacity
          disabled={!this.state.userName}
          style={[styles.buttonStyle, !this.state.userName && styles.disabled]}
          onPress={this.greetUser}
        >
          <Text>Greet</Text>
        </TouchableOpacity>
        <Text style={styles.label}>Response:</Text>
        <Text style={styles.message}>{this.state.greetingMessage}</Text>
        <FlatList
          style={styles.list}
          data={this.state.greetedUsers}
          renderItem={this.renderUserItem}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  inputField: {
    padding: 10,
    fontSize: 16,
    width: 200,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 10,
  },
  label: {
    fontSize: 16,
    marginTop: 10,
  },
  radio: {
    marginBottom: 10,
  },
  buttonStyle: {
    padding: 10,
    backgroundColor: '#1DA1F2',
    borderRadius: 5,
    marginBottom: 20,
  },
  disabled: {
    backgroundColor: '#999',
  },
  message: {
    fontSize: 18,
    marginVertical: 10,
    textAlign: 'center',
  },
  list: {
    marginTop: 20,
    width: '100%',
  },
  userItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderColor: '#ccc',
    borderBottomWidth: 1,
    width: '100%',
  },
});
