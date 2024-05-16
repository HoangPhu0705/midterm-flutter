import { View, Text } from 'react-native'
import React from 'react'

const AlbumDetail = ({artistName, trackName}) => {
  return (
    <View className = "justify-start items-start mt-10 ">
        <Text className = "text-4xl font-bold text-white">{trackName}</Text>
        <Text className = "text-xl font-bold text-slate-300">{artistName}</Text>
    </View>
  )
}

export default AlbumDetail