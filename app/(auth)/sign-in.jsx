import { View, Text, ScrollView, Dimensions, Alert, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../../constants";
import { Link, useRouter } from "expo-router"; 

import { CustomButton, FormField } from "../../components";
import { useState } from "react";
import { getAuth, signInWithEmailAndPassword } from '@firebase/auth';

const SignIn = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const router = useRouter(); 

  const submit = async () => {
    setIsSubmitting(true);
    try {
      await signInWithEmailAndPassword(getAuth(), form.email, form.password);
      router.push('/home');
    } catch (error) {
      console.error(error);
      Alert.alert("Error", error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  
  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        <View className="w-full flex justify-start min-h-[85vh] px-4 my-6">
          <Image source={images.logo} className="w-[185px] h-[50px]" />
          <Text className="text-2xl font-semibold text-white mt-2 font-psemibold mb-7">
            Sign In to SoundCharm
          </Text>

          <FormField
            title="Email"
            value={form.email}
            handleChangeText={(e) => setForm({...form, email: e })}
            otherStyles="mt-7"
            keyboardType="email-address"
          />

          <FormField
            title="Password"
            value={form.password}
            handleChangeText={(e) => setForm({...form, password: e })}
            otherStyles="mt-7"
          />

          <CustomButton
            title="Sign In"
            containerStyles="mt-7"
            handlePress={submit} // Corrected to call the submit function
            isLoading={isSubmitting}
          />

          <View className="flex justify-center pt-5 flex-row gap-2">
            <Text className="text-lg text-gray-100 font-pregular">
              Don't have an account?
            </Text>
            <Link
              href="/sign-up"
              className="text-lg font-psemibold text-secondary"
            >
              Sign up
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignIn;
