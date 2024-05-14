import { View, Text, Dimensions, Image } from 'react-native'

const AlbumCover = ({albumCover}) => {

return (
    <View  className = "items-center mt-10 mx-20">
      <Image 
      
        source={{ uri: albumCover }}
        borderRadius={5}
        style={{ width: 410, height: 300}} 

      />
    </View>
  );
} 

export default AlbumCover 