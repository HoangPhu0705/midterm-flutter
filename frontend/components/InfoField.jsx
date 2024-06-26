import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";
import AntDesign from 'react-native-vector-icons/AntDesign';
import { icons } from "../constants";
import { Link, useRouter } from "expo-router"; 


const InfoField = ({
  title,
  value,
  placeholder,
  handleChangeText,
  otherStyles,
  ...props
}) => {
  const router = useRouter(); 


  return (
    <View className={`space-y-2 ${otherStyles}`}>
      <Text className="text-base text-gray-100 font-pmedium">{title}</Text>

      <View className="w-full h-16 px-4 bg-black-100 rounded-2xl border-2 border-black-200 focus:border-secondary flex flex-row items-center">
        <TextInput
            editable={false} selectTextOnFocus={false} 
            className="flex-1 text-white font-psemibold text-base"
            value={value}
            placeholder={placeholder}
            placeholderTextColor="#7B7B8B"
            onChangeText={handleChangeText}
            {...props}
        />
        {(title === "Password" || title === "Username") && (
          <TouchableOpacity onPress={() => {
              if(title === "Password"){
                router.push("change-password");
              }else {
                router.push("change-username");
              }
          }}>
            <AntDesign name = "edit" size = {24} color="#fff"></AntDesign>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default InfoField;