import { StatusBar } from "expo-status-bar";
import { ScrollView, Text, View, Image } from "react-native";
import { Redirect, router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../constants";
import CustomButton from "../components/CustomButton";

export default function App() {
  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView contentContainerStyle={{ height: "100%" }}>
        <View className="w-full justify-center items-center min-h-[85vh] px-10 content-start">
          <Image source={images.logo} className="h-[100px] w-full" />

          <View className="h-[350px] w-[80%] rounded-lg shadow-md border border-white">
            <Image source={images.cards} className="w-full h-full rounded-lg" />
          </View>

          <View className="relative mt-3">
            <Text className="text-3xl text-white font-bold text-center relative ">
              Discover endless songs with
              <Text className="text-secondary-200"> SoundCharm</Text>
              <Image
                source={images.path}
                className="w-[286px] h-[28px]"
                resizeMode="contain"
              />
            </Text>

            <Text className="text-sm font-pregular text-gray-100 mt-7 text-center">
              Embark on a Musical Odyssey: Dive into a World of Boundless Discovery with SoundCharm
            </Text>
          </View>

          <CustomButton
            title="Continue with email"
            handlePress = {() => {router.push('/home')}}
            containerStyles = "w-full mt-7"

          />

          

        </View>

      </ScrollView>
      <StatusBar hidden/>
    </SafeAreaView>
  );
}
