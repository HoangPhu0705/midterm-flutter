import React, { useState } from 'react';
import { View, Text, Alert, TouchableOpacity } from 'react-native';
import { getAuth, EmailAuthProvider, reauthenticateWithCredential, updatePassword } from 'firebase/auth';
import CustomButton from '../components/CustomButton';
import FormField from '../components/FormField';
import { useRouter } from 'expo-router';
import AntDesign from 'react-native-vector-icons/AntDesign';


const ChangePassword = () => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const handleChangePassword = async () => {
    setIsLoading(true);

    if (newPassword !== confirmPassword) {
      Alert.alert("Error", "New passwords do not match");
      setIsLoading(false);
      return;
    }

    const auth = getAuth();
    const user = auth.currentUser;

    if (!user) {
      Alert.alert("Error", "No user is currently signed in.");
      setIsLoading(false);
      return;
    }

    try {
      const credential = EmailAuthProvider.credential(user.email, oldPassword);
      await reauthenticateWithCredential(user, credential);

      await updatePassword(user, newPassword);
      Alert.alert("Success", "Password changed successfully");
      router.push('/profile');
      
    } catch (error) {
      Alert.alert("Error", error.message);
    }

    setIsLoading(false);
  };

  return (
    <View className="flex-1 items-center justify-start bg-black-100 p-6">
      <View className = "flex flex-row w-full justify-center relative">
        <TouchableOpacity className="absolute left-0" onPress={() => {router.push('/profile')}}>
          <AntDesign name="arrowleft" size={32} color="#fff" />
        </TouchableOpacity>
        <Text className="text-2xl font-pbold text-white mb-6">Change Password</Text>

      </View>
      <FormField
        title="Old Password"
        value={oldPassword}
        placeholder="Enter old password"
        handleChangeText={setOldPassword}
        otherStyles="mb-4"
      />
      <FormField
        title="New Password"
        value={newPassword}
        placeholder="Enter new password"
        handleChangeText={setNewPassword}
        otherStyles="mb-4"
      />
      <FormField
        title="Confirm New Password"
        value={confirmPassword}
        placeholder="Confirm new password"
        handleChangeText={setConfirmPassword}
        otherStyles="mb-6"
      />
      <CustomButton
        title="Change Password"
        handlePress={handleChangePassword}
        containerStyles="w-full"
        isLoading={isLoading}
      />
    </View>
  );
};

export default ChangePassword;
