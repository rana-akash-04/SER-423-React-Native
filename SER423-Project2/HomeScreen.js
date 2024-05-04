import React from 'react';
import { FlatList, StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import CustomButton from './CustomButton';

const HomeScreen = ({ navigation }) => {
  const continentLinks = [
    { id: 'ASIA', url: 'https://en.wikipedia.org/wiki/Asia' },
    { id: 'AFRICA', url: 'https://en.wikipedia.org/wiki/Africa' },
    { id: 'EUROPE', url: 'https://en.wikipedia.org/wiki/Europe' },
    { id: 'NORTH AMERICA', url: 'https://en.wikipedia.org/wiki/North_America' },
    { id: 'SOUTH AMERICA', url: 'https://en.wikipedia.org/wiki/South_America' },
    { id: 'OCEANIA', url: 'https://en.wikipedia.org/wiki/Oceania' },
    { id: 'ANTARCTICA', url: 'https://en.wikipedia.org/wiki/Antarctica' },
  ];

  const handleButtonPress = (id) => {
    const continents = continentLinks.find((link) => link.id === id);
    navigation.navigate('WebViewScreen', { url: continents.url, id: continents.id });
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.button}
      onPress={() => handleButtonPress(item.id)}
    >
      <Text style={styles.text}>{item.id}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={continentLinks}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.flatListstyle}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'lightblue',
    alignItems: 'center',
    justifyContent: 'center',
  },
  flatListstyle: {
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    marginVertical: 12,
    padding: 10,
    backgroundColor: 'white',
    borderColor: 'black',
    borderWidth: 4, 
    borderRadius: 25,
  },
  text: {
    color: 'red',
    fontSize: 20,
    textAlign: 'center',
  },
});

export default HomeScreen;


