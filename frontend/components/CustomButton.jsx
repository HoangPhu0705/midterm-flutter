import { TouchableOpacity, Text, View } from 'react-native'

const CustomButton = ({title, handlePress, containerStyles, textStyles, isLoading }) => {
  return (
    <TouchableOpacity 
      className = {`bg-secondary rounded-xl min-h-[62px] justify-center items-center ${containerStyles}`}
      onPress={handlePress}
      activeOpacity={0.7}
    >
        <Text className = "text-primary font-psemibold text-lg">{title}</Text>
    </TouchableOpacity>
  )
}

export default CustomButton