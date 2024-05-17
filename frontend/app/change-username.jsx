import React, { useState } from 'react';
import { View, Text, Alert, TouchableOpacity } from 'react-native';
import { getAuth, updateProfile } from 'firebase/auth';
import CustomButton from '../components/CustomButton';
import FormField from '../components/FormField';
import { useRouter } from 'expo-router';
import AntDesign from 'react-native-vector-icons/AntDesign';

const ChangeUsername = () => {
  const [newUsername, setNewUsername] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const handleChangeUsername = async () => {
    const auth = getAuth();
    const user = auth.currentUser;

    if (!user) {
      Alert.alert("Error", "No user is currently signed in.");
      return;
    }

    if (newUsername.trim() === '') {
      Alert.alert("Error", "Username cannot be empty.");
      return;
    }

    setIsSubmitting(true);

    try {
      await updateProfile(user, { displayName: newUsername });
      Alert.alert("Success", "Username updated successfully.");
      router.push('/profile');
    } catch (error) {
      console.error("Error updating username: ", error);
      Alert.alert("Error", error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <View className="flex-1 items-center justify-start bg-black-100 p-6">
      <View className="flex flex-row w-full justify-center relative">
        <TouchableOpacity className="absolute left-0" onPress={() => router.push('/profile')}>
          <AntDesign name="arrowleft" size={32} color="#fff" />
        </TouchableOpacity>
        <Text className="text-2xl font-pbold text-white mb-6">Change Username</Text>
      </View>

      <FormField
        title="Set your new username"
        placeholder="Enter new username"
        value={newUsername}
        handleChangeText={setNewUsername}
        otherStyles="mb-4"
      />

      <CustomButton
        title="Change Username"
        handlePress={handleChangeUsername}
        containerStyles="w-full"
        isLoading={isSubmitting}
      />
    </View>
  );
}

export default ChangeUsername;
