import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, ActivityIndicator, TextInput } from 'react-native';
import { Audio } from 'expo-av';
import AntDesign from 'react-native-vector-icons/AntDesign';
import axios from 'axios';
import { getAuth } from 'firebase/auth';
import { getFirestore, collection, query, where, onSnapshot } from 'firebase/firestore';

const DELETE_FAVORITE_API_URL = 'http://10.0.2.2:3000/soundcharm/api/favorites';

const Favorite = () => {
  const [favorites, setFavorites] = useState([]);
  const [filteredFavorites, setFilteredFavorites] = useState([]);
  const [sound, setSound] = useState(null);
  const [isPlayingIndex, setIsPlayingIndex] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchFavorites = async () => {
      const currentUser = getAuth().currentUser;
      if (!currentUser) {
        console.error('No user is currently signed in.');
        return;
      }
      const userId = currentUser.uid;
      const db = getFirestore();
      const favoritesRef = collection(db, 'users', userId, 'favorites');
      const unsubscribe = onSnapshot(favoritesRef, (snapshot) => {
        const fetchedFavorites = snapshot.docs.map(doc => doc.data());
        setFavorites(fetchedFavorites);
        setFilteredFavorites(fetchedFavorites);
        setLoading(false); 
      });
  
      return () => unsubscribe();
    };
  
    fetchFavorites();
  }, []);

  useEffect(() => {
    if (searchQuery === '') {
      setFilteredFavorites(favorites);
    } else {
      setFilteredFavorites(favorites.filter(fav => 
        fav.title.toLowerCase().includes(searchQuery.toLowerCase())
      ));
    }
  }, [searchQuery, favorites]);

  const playSound = async (audioUrl, index) => {
    if (sound) {
      await sound.unloadAsync();
      if (index === isPlayingIndex) {
        setIsPlayingIndex(null); 
        return;
      }
    }

    const { sound: newSound } = await Audio.Sound.createAsync({ uri: audioUrl });
    setSound(newSound);
    await newSound.playAsync();
    setIsPlayingIndex(index);
  };

  const pauseSound = async () => {
    await sound.pauseAsync();
    setIsPlayingIndex(null);
  };

  const deleteFavorite = async (songId) => {
    try {
      const currentUser = getAuth().currentUser;
      if (!currentUser) {
        console.error('No user is currently signed in.');
        return;
      }
      const userId = currentUser.uid; 
      const response = await axios.delete(`${DELETE_FAVORITE_API_URL}/${userId}/${songId}`);

      if (response.status === 200) {
        console.log('Song removed from favorites');
      } else {
        console.log('Failed to delete favorite song');
      }
    } catch (err) {
      console.error(err);
    }
  };

  const renderItem = ({ item, index }) => (
    <View className="flex-row items-center mb-4 bg-gray-800 p-2 rounded-lg">
      <Image source={{ uri: item.albumArtUrl }} className="w-12 h-12 rounded-lg" />
      <View className="flex-1 ml-4">
        <Text className="text-white text-lg font-bold">{item.title}</Text>
        <Text className="text-gray-400 text-sm">{item.artist}</Text>
      </View>
      <TouchableOpacity
        onPress={() => (isPlayingIndex === index ? pauseSound() : playSound(item.audioUrl, index))}
        className="bg-[#FFA001] py-2 px-4 rounded-3xl"
      >
        <AntDesign name={isPlayingIndex === index ? "pausecircleo" : "playcircleo"} size={24} color="#fff" />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {deleteFavorite(item.id)}}
        className="mx-2"
      >
        <AntDesign name="closecircleo" size={28} color="#fff" />
      </TouchableOpacity>
    </View>
  );

  if (loading) {
    return (
      <View className="bg-black-100 h-full flex items-center justify-center">
        <ActivityIndicator size="large" color="#FFA001" />
      </View>
    );
  }

  return (
    <View className="bg-black-100 h-full p-4">
      <TextInput
        className="bg-gray-800 text-white p-2 mb-4 rounded-lg"
        placeholder="Search by song name"
        placeholderTextColor="#7B7B8B"
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
      {filteredFavorites.length === 0 ? (
        <Text className="text-white text-center">No favorite songs found.</Text>
      ) : (
        <FlatList
          data={filteredFavorites}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={{ paddingBottom: 16 }}
        />
      )}
    </View>
  );
};

export default Favorite;
