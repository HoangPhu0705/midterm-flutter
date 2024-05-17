import { View, Text } from 'react-native'
import React from 'react'

const AlbumDetail = ({artistName, trackName}) => {
  return (
    <View className = "justify-between items-start mt-10 ">
        <Text className = "text-2xl font-bold text-white">{trackName}</Text>
        <Text className = "text-xl font-bold text-slate-300">{artistName}</Text>
    </View>
  )
}

export default AlbumDetail