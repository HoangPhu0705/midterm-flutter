import React from 'react';
import { View, Text, Image } from 'react-native';
import { images } from "../../constants";
import { InfoField, CustomButton } from '../../components';
import { useRouter} from 'expo-router';
import { getAuth } from 'firebase/auth';



const Profile = () => {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await getAuth().signOut();
      router.push('/sign-in');  
    } catch (error) {
      console.error('Error signing out: ', error);
    }
  };
  return (
    <View className="flex-1 items-center justify-start bg-black-100 p-6">
      <Image
        
        source={images.logo}
        style={{ width: 150, height: 150, borderRadius: 75, marginBottom: 20 }}
      />
      <InfoField
        title = "Email"
        placeholder={getAuth().currentUser.email}
      />

      <InfoField
        title = "Username"
        placeholder={getAuth().currentUser.displayName == null ? "soundcharmer" : getAuth().currentUser.displayName}
        otherStyles = "mt-7"
      />

      <InfoField
        title = "Password"
        placeholder={"********"}
        otherStyles = "mt-7"
        
      />


      <CustomButton
          title= "Logout"
          containerStyles="mt-7 w-full"
          handlePress={handleLogout}

      />
     
    </View>
  );
}

export default Profile;
