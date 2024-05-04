import React, { Component } from 'react';
import { Picker } from '@react-native-picker/picker';
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Audio } from 'expo-av';
import AsyncStorage from '@react-native-async-storage/async-storage';

const key = '@MyApp:key';

const playlist = [
  { title: 'Song 1', uri: 'https://ia800308.us.archive.org/7/items/kwilliams2012-09-22.at853.flac16/kwilliams2012-09-22at853.t16.mp3' },
  { title: 'Song 2', uri: 'https://ia601509.us.archive.org/17/items/mogwai2017-10-20.brussels.fm/Mogwai2017-10-20Brussels-07.mp3' },
  { title: 'Song 3', uri: 'https://ia800503.us.archive.org/8/items/andrewbird2011-01-28.early.dr7.flac16/andrewbird2011-01-28.early.t07.mp3' },
];

export default class App extends Component {
  state = {
    values: ['', '', ''],
    storedValues: [],
    sounds: [],
    currentIndex: null,
    isPlaying: false,
  };

  componentDidMount() {
    this.onLoad();
    this.loadSounds();
  }

  onLoad = async () => {
    try {
      const storedValuesJSON = await AsyncStorage.getItem(key);
      if (storedValuesJSON) {
        const storedValues = JSON.parse(storedValuesJSON);
        this.setState({ storedValues: Array.isArray(storedValues) ? storedValues : [] });
      }
    } catch (error) {
      Alert.alert('Error', 'There was an error while loading the data');
    }
  };

  onSave = async () => {
    const { values } = this.state;
    try {
      await AsyncStorage.setItem(key, JSON.stringify(values));
      Alert.alert('Saved', 'Successfully saved on device');
    } catch (error) {
      Alert.alert('Error', 'There was an error while saving the data');
    }
  };

  loadSounds = async () => {
    const sounds = [];
    try {
      for (const track of playlist) {
        const { sound } = await Audio.Sound.createAsync({ uri: track.uri });
        sounds.push(sound);
      }
      this.setState({ sounds, currentIndex: 0 });
    } catch (error) {
      console.error('Error loading audio:', error);
      Alert.alert('Error', 'Failed to load audio. Please check your internet connection.');
    }
  };

  handlePlayPause = async () => {
    const { sounds, currentIndex, isPlaying } = this.state;
    if (sounds[currentIndex]) {
      try {
        if (isPlaying) {
          await sounds[currentIndex].pauseAsync();
        } else {
          await sounds[currentIndex].playAsync();
        }
        this.setState({ isPlaying: !isPlaying });
      } catch (error) {
        console.error('Error playing/pausing sound:', error);
      }
    }
  };

  handleNext = async () => {
    const { currentIndex, sounds } = this.state;
    const nextIndex = (currentIndex + 1) % playlist.length;
    try {
      await sounds[currentIndex].stopAsync();
      await sounds[nextIndex].playAsync();
      this.setState({ currentIndex: nextIndex, isPlaying: true });
    } catch (error) {
      console.error('Error playing next sound:', error);
    }
  };

  handlePrevious = async () => {
    const { currentIndex, sounds } = this.state;
    const previousIndex = (currentIndex - 1 + playlist.length) % playlist.length;
    try {
      await sounds[currentIndex].stopAsync();
      await sounds[previousIndex].playAsync();
      this.setState({ currentIndex: previousIndex, isPlaying: true });
    } catch (error) {
      console.error('Error playing previous sound:', error);
    }
  };

  render() {
    const { storedValues, values, isPlaying, currentIndex } = this.state;
    const currentSong = playlist[currentIndex]?.title;

    return (
      <View style={styles.container}>
        <Text style={styles.preview}>{storedValues.join(', ')}</Text>

        <Text style={styles.currentSong}>{currentSong}</Text>
        <View style={styles.controlsContainer}>
          <TouchableOpacity onPress={this.handlePrevious} style={styles.button}>
            <Text>Previous</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.handlePlayPause} style={styles.button}>
            <Text>{isPlaying ? 'Pause' : 'Play'}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.handleNext} style={styles.button}>
            <Text>Next</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity onPress={this.onSave} style={styles.button}>
          <Text>Save locally</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={this.onLoad} style={styles.button}>
          <Text>Load data</Text>
        </TouchableOpacity>

        <Picker
          style={styles.picker}
          selectedValue={values[currentIndex]}
          onValueChange={(itemValue) => {
            const updatedValues = [...values];
            updatedValues[currentIndex] = itemValue;
            this.setState({ values: updatedValues });
          }}
        >
          <Picker.Item style={styles.item} label="1 Star" value="1 Star" />
          <Picker.Item style={styles.item} label="2 Stars" value="2 Stars" />
          <Picker.Item style={styles.item} label="3 Stars" value="3 Stars" />
          <Picker.Item style={styles.item} label="4 Stars" value="4 Stars" />
          <Picker.Item style={styles.item} label="5 Stars" value="5 Stars" />
        </Picker>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  preview: {
    backgroundColor: 'grey',
    width: 300,
    height: 80,
    padding: 10,
    borderRadius: 5,
    color: '#333',
    marginBottom: 20,
  },
  currentSong: {
    fontSize: 18,
    marginBottom: 10,
  },
  controlsContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  button: {
    backgroundColor: 'pink',
    width: 100,
    textAlign: 'center',
    padding: 10,
    borderRadius: 3,
    margin: 8,
    marginHorizontal: 5,
  },
  picker: {
    backgroundColor: '#ecf0f1',
    borderRadius: 3,
    width: 300,
    height: 40,
    padding: 5,
    marginBottom: 20,
  },
  item: {
    color: "black",
    fontSize: 18,
  },
});
