import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import { AlbumCover, AlbumDetail, Controls } from '../../components';
import { Audio } from 'expo-av';
import axios from 'axios';
import Slider from '@react-native-community/slider';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { getAuth } from 'firebase/auth';

const GET_RECENT_SONGS_API_URL = 'http://10.0.2.2:3000/soundcharm/api/recent-songs';
const ADD_FAVORITE_API_URL = 'http://10.0.2.2:3000/soundcharm/api/add-favorite';

const Home = () => {
  const [tracks, setTracks] = useState([]);
  const [selectedTrack, setSelectedTrack] = useState(0);
  const [pause, setPause] = useState(true);
  const [sound, setSound] = useState(null);
  const [duration, setDuration] = useState(0);
  const [position, setPosition] = useState(0);
  const [favoriteTracks, setFavoriteTracks] = useState(new Set());

  useEffect(() => {
    const fetchTracks = async () => {
      try {
        const response = await axios.get(GET_RECENT_SONGS_API_URL);
        setTracks(response.data);
      } catch (error) {
        console.error("Error fetching tracks: ", error);
      }
    };

    fetchTracks();
  }, []);

  useEffect(() => {
    if (tracks.length > 0) {
      loadSound();
    }
    return () => {
      unloadSound();
    };
  }, [tracks, selectedTrack]);

  useEffect(() => {
    if (sound) {
      if (pause) {
        sound.pauseAsync();
      } else {
        sound.playAsync();
      }
    }
  }, [pause]);

  const loadSound = async () => {
    if (tracks.length === 0) return;
    if (sound) {
      await sound.unloadAsync();
    }
    const { sound: newSound, status } = await Audio.Sound.createAsync(
      { uri: tracks[selectedTrack].audioUrl },
      { shouldPlay: !pause },
      onPlaybackStatusUpdate
    );
    setSound(newSound);
    setDuration(status.durationMillis);
  };

  const unloadSound = async () => {
    if (sound) {
      await sound.unloadAsync();
      setSound(null);
    }
  };

  const onPlaybackStatusUpdate = (status) => {
    if (status.isLoaded) {
      setPosition(status.positionMillis);
      setDuration(status.durationMillis);
      if (status.didJustFinish) {
        onNext();
      }
    }
  };

  const onPlay = () => {
    setPause(false);

    console.log("Now playing: " + tracks[selectedTrack].title);
  };

  const onPause = () => {
    setPause(true);
    
    console.log("Stop playing: " + tracks[selectedTrack].title);
  };

  const onNext = () => {
    setPosition(0);
    setDuration(0);
    setSelectedTrack((prev) => (prev === tracks.length - 1 ? 0 : prev + 1));
  };

  const onBack = () => {
    setPosition(0);
    setDuration(0);
    setSelectedTrack((prev) => (prev === 0 ? tracks.length - 1 : prev - 1));
  };

  const onSlidingComplete = async (value) => {
    if (sound) {
      await sound.setPositionAsync(value);
    }
  };

  if (tracks.length === 0) {
    return (
      <View className="bg-black-100 h-full flex items-center justify-center">
        <ActivityIndicator size="large" color="#FFA001" />
      </View>
    );
  }

  const toggleFavorite = async () => {
    try {
      const currentUser = getAuth().currentUser;
      if (!currentUser) {
        console.error('No user is currently signed in.');
        return;
      }
      const userId = currentUser.uid;
      const currentTrack = tracks[selectedTrack];

      const updatedFavorites = new Set(favoriteTracks);
      if (updatedFavorites.has(currentTrack.id)) {
        updatedFavorites.delete(currentTrack.id);
      } else {
        updatedFavorites.add(currentTrack.id);
      }
      setFavoriteTracks(updatedFavorites);

      const response = await axios.post(ADD_FAVORITE_API_URL, {
        userId,
        song: {
          id: currentTrack.id,
          title: currentTrack.title,
          artist: currentTrack.artist,
          albumArtUrl: currentTrack.albumArtUrl,
          audioUrl: currentTrack.audioUrl
        }
      });

      if (response.status === 200) {
        console.log('Song added to favorites');
      } else {
        console.log('Failed to add song to favorites');
      }
    } catch (err) {
      console.error(err);
    }
  };

  const currentTrack = tracks[selectedTrack];

  return (
    <View className="bg-black-100 h-full">
      <AlbumCover albumCover={currentTrack.albumArtUrl} />

      <View className="flex flex-row justify-between mb-20 mx-2">
        <View View className="flex-1 mr-2">
          <AlbumDetail
            trackName={currentTrack.title}
            artistName={currentTrack.artist}
          />
        </View>

        <TouchableOpacity className="mt-14 ml-2" onPress={toggleFavorite}>
          <AntDesign name={favoriteTracks.has(currentTrack.id) ? "heart" : "hearto"} size={32} color="#fff" />
        </TouchableOpacity>
      </View>
      <Slider
        value={position}
        minimumValue={0}
        maximumValue={duration}
        onSlidingComplete={onSlidingComplete}
        minimumTrackTintColor="#1FB28A"
        maximumTrackTintColor="#D3D3D3"
        thumbTintColor="#1FB28A"
      />

      <Controls
        pause={pause}
        onPause={onPause}
        onPlay={onPlay}
        onNext={onNext}
        onBack={onBack}
      />
    </View>
  );
};

export default Home;
