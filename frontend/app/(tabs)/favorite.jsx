import React, { useState } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity } from 'react-native';
import { Audio } from 'expo-av';
import AntDesign from 'react-native-vector-icons/AntDesign';


const Favorite = () => {
  const [favorites, setFavorites] = useState([
    {
      id: '1',
      title: 'Song 1',
      artist: 'Artist 1',
      albumArtUrl: 'https://via.placeholder.com/150',
      audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
    },
    {
      id: '2',
      title: 'Song 2',
      artist: 'Artist 2',
      albumArtUrl: 'https://via.placeholder.com/150',
      audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
    },
    
  ]);
  const [sound, setSound] = useState(null);

  const playSound = async (audioUrl) => {
    if (sound) {
      await sound.unloadAsync();
    }
    const { sound: newSound } = await Audio.Sound.createAsync({ uri: audioUrl });
    setSound(newSound);
    await newSound.playAsync();
  };

  const renderItem = ({ item }) => (
    <View className="flex-row items-center mb-4 bg-gray-800 p-2 rounded-lg">
      <Image source={{ uri: item.albumArtUrl }} className="w-12 h-12 rounded-lg" />
      <View className="flex-1 ml-4">
        <Text className="text-white text-lg font-bold">{item.title}</Text>
        <Text className="text-gray-400 text-sm">{item.artist}</Text>
      </View>
      <TouchableOpacity onPress={() => playSound(item.audioUrl)} className="bg-[#FFA001] py-2 px-4 rounded-3xl">
        <AntDesign name="playcircleo" size={24} color="#fff" />
      </TouchableOpacity>
      
      <TouchableOpacity onPress={() => playSound(item.audioUrl)} className="m-5">
        <AntDesign name="heart" size={24} color="red" />
      </TouchableOpacity>
    </View>
  );

  return (
    <View className="bg-black-100 h-full p-4">
      <FlatList
        data={favorites}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 16 }}
      />
    </View>
  );
};

export default Favorite;
