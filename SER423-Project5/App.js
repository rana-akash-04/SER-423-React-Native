import React, { Component } from 'react';
import * as Location from 'expo-location';
import MapView, { Marker } from 'react-native-maps';
import { StyleSheet, View, Text, TouchableOpacity, Animated } from 'react-native';

export default class App extends Component {
  state = {
    label: 'You',
    poi1: {
      coords: {
        latitude: 33.307146,
        longitude: -111.681177
      }
    },
    poi2: {
      coords: {
        latitude: 33.423204,
        longitude: -111.939612
      }
    },
    location: null,
    notificationVisible: false,
    notificationText: ''
  };

  notificationAnimation = new Animated.Value(-100); // Initial position above the screen

  async componentDidMount() {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      console.error('Permission to access location was denied');
      return;
    }
    this.getLocation();
  }

  async getLocation() {
    const label = 'You';
    const location = await Location.getCurrentPositionAsync();
    this.setState({ label, location });
  }

  showNotification(text) {
    this.setState({ notificationVisible: true, notificationText: text }, () => {
      Animated.timing(this.notificationAnimation, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true
      }).start(() => {
        setTimeout(() => {
          this.hideNotification();
        }, 2000); // Hide notification after 2 seconds
      });
    });
  }

  hideNotification() {
    Animated.timing(this.notificationAnimation, {
      toValue: -100,
      duration: 500,
      useNativeDriver: true
    }).start(() => {
      this.setState({ notificationVisible: false });
    });
  }

  renderNotification() {
    const { notificationVisible, notificationText } = this.state;
    if (notificationVisible) {
      return (
        <Animated.View
          style={[
            styles.notification,
            { transform: [{ translateY: this.notificationAnimation }] }
          ]}
        >
          <Text style={styles.notificationText}>{notificationText}</Text>
        </Animated.View>
      );
    }
    return null;
  }

  renderMap() {
    const { location, label } = this.state;
    return location ? (
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          latitudeDelta: 0.09,
          longitudeDelta: 0.04
        }}
        region={{
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          latitudeDelta: 0.09,
          longitudeDelta: 0.04
        }}
      >
        <Marker coordinate={location.coords} title={label} />
      </MapView>
    ) : null;
  }

  render() {
    const { poi1, poi2 } = this.state;

    return (
      <View style={styles.container}>
        {this.renderMap()}
        {this.renderNotification()}
        <View style={styles.buttons}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              this.getLocation();
              this.showNotification('Changed to You');
            }}
          >
            <Text style={styles.label}>You</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              this.setState({ location: poi1, label: 'POI 1' });
              this.showNotification('Changed to POI 1');
            }}
          >
            <Text style={styles.label}>POI 1</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              this.setState({ location: poi2, label: 'POI 2' });
              this.showNotification('Changed to POI 2');
            }}
          >
            <Text style={styles.label}>POI 2</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  map: {
    flex: 1
  },
  buttons: {
    position: 'absolute',
    bottom: 15,
    left: 15,
    flexDirection: 'row'
  },
  button: {
    width: 100,
    height: 50,
    marginHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'grey',
    borderRadius: 5,
    elevation: 4
  },
  label: {
    fontWeight: 'bold'
  },
  notification: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: '#ff9900',
    padding: 10
  },
  notificationText: {
    color: '#fff',
    textAlign: 'center'
  }
});




