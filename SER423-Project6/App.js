import React, { Component } from 'react';
import { StyleSheet, SafeAreaView, View, Button, Image } from 'react-native';
import glamorous from 'glamorous-native';
import store from './redux';
import { addPhoto } from './redux/photos/actions';


// AlbumText with glamorous styling
const AlbumText = glamorous.text({
  fontSize: 22,
  color: 'black',
});

// TitleText with glamorous styling
const TitleText = glamorous.text({
  fontSize: 30,
  color: 'darkblue',
});

// URLText with glamorous styling
const URLText = glamorous.text({
  fontSize: 18,
  color: 'lightgrey',
});

// ThumbnailURLText with glamorous styling
const ThumbnailURLText = glamorous.text({
  fontSize: 18,
  color: 'darkgreen',
});

// Map containing photo objects
const photos = {
  photo1: {
    album: 'Steph',
    title: 'Deep Three Pointer',
    url: 'https://i.ytimg.com/vi/TbZ-DrXjxVc/maxresdefault.jpg',
    thumbnailUrl: 'https://e0.365dm.com/23/07/2048x1152/skysports-steph-curry-golden-state-warriors_6223154.jpg?20230719104642',
  },
  photo2: {
    album: 'LeBron',
    title: 'Dunk',
    url: 'https://fanatics.frgimages.com/los-angeles-lakers/lebron-james-los-angeles-lakers-unsigned-dunk-against-houston-rockets-photograph_pi3847000_ff_3847416-6bd162a6dffaf7547d57_full.jpg?_hv=2&w=900',
    thumbnailUrl: 'https://m.media-amazon.com/images/M/MV5BZDg1ZWIyODYtZDI1My00ODZlLWI4Y2UtMTQ5YTdkZmYxYTE2XkEyXkFqcGdeQXVyNjc1OTk4NjA@._V1_FMjpg_UX1000_.jpg',
  },
  photo3: {
    album: 'Luka',
    title: 'Step Back Three',
    url: 'https://wehco.media.clients.ellingtoncms.com/cocagne/img/photos/2019/02/14/doncic8058622870_t800.jpg?90232451fbcadccc64a17de7521d859a8f88077d',
    thumbnailUrl: 'https://media-cldnry.s-nbcnews.com/image/upload/t_fit-760w,f_auto,q_auto:best/rockcms/2024-01/240126-luka-doncic-dallas-mavericks-wm-713p-bc68a7.jpg',
  },
};

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPhotoKey: Object.keys(photos)[0],
    };
  }

  // Function to add the next photo from the map to the Redux store
  addNextPhotoToStore = () => {
    const { currentPhotoKey } = this.state;
    const photoKeys = Object.keys(photos);
  
    // Find the index of the current photo key
    const currentIndex = photoKeys.indexOf(currentPhotoKey);
  
    // Calculate the next index to cycle through photos
    const nextIndex = (currentIndex + 1) % photoKeys.length;
  
    // Get the next photo key
    const nextPhotoKey = photoKeys[nextIndex];
    const nextPhoto = photos[nextPhotoKey];
  
    store.dispatch(addPhoto(nextPhoto));
  
    // Update component state 
    this.setState({ currentPhotoKey: nextPhotoKey });
  };
  
  render() {
    const { currentPhotoKey } = this.state;
    const currentPhoto = photos[currentPhotoKey];
  
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.photoList}>
          <View style={styles.photoContainer}>
            <AlbumText>{currentPhoto.album}</AlbumText>
            <Image source={{ url: currentPhoto.url}} style={styles.image}/>
            <TitleText>{currentPhoto.title}</TitleText>
            <URLText>{currentPhoto.url}</URLText>
            <Image source={{url: currentPhoto.thumbnailUrl}} style={styles.thumbnail} />
            <ThumbnailURLText>{currentPhoto.thumbnailUrl}</ThumbnailURLText>
          </View>
        </View>
        <Button title="Next Photo" onPress={this.addNextPhotoToStore} />
      </SafeAreaView>
    );
  }
  
}  

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  photoList: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
  photoContainer: {
    marginBottom: 20,
  },
  image: {
    height: 300,
    width: 300,
  },
  thumbnail: {
    height: 50,
    width: 50,
    borderRadius: 25,
  },
});
