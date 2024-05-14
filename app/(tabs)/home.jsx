import { View, Text, Button} from "react-native";
import { Tabs, Redirect } from "expo-router";
import { useState, useEffect} from "react";
import { TRACKS } from "./track-data";
import { AlbumCover, AlbumDetail, Controls, CustomButton } from "../../components";
import { Audio } from 'expo-av';

const Home = () => {
  const [selectedTrack, setSelectedTrack] = useState(0);
  const [pause, setPause] = useState(true);
  const currentTrack = TRACKS[selectedTrack];
  const [sound, setSound] = useState();

  // Use useEffect to listen for changes to the pause state
  useEffect(() => {
    if (!pause && sound) {
      sound.playAsync();
    } else if (pause && sound) {
      sound.pauseAsync();
    }
  }, [pause, sound]);

  async function playSound() {
    const { sound } = await Audio.Sound.createAsync({
      uri: currentTrack.audioUrl,
      shouldPlay:!pause,
    });
    setSound(sound);
    console.log(pause);
  }

  function onPlay() {
    console.log("Play click");
    setPause(false);
  }

  function onPause() {
    console.log("Pause click");
    setPause(true);
  }

  function onNext() {
    if (selectedTrack === TRACKS.length - 1) {
      setSelectedTrack(0);
    } else {
      setSelectedTrack(selectedTrack + 1);
    }
  }

  function onBack() {
    if (selectedTrack === 0) {
      setSelectedTrack(TRACKS.length - 1);
    } else {
      setSelectedTrack(selectedTrack - 1);
    }
  }

  useEffect(() => {
    playSound(); // Call playSound initially to start playing the sound
  }, []);

  return (
    <View className="bg-black-100 h-full flex">
      <AlbumCover albumCover={currentTrack.albumArtUrl} />
      <AlbumDetail
        trackName={currentTrack.title}
        artistName={currentTrack.artist}
      />
      <Controls
        pause={pause}
        onPause={onPause}
        onPlay={onPlay}
        onNext={onNext}
        onBack={onBack}
      />
    </View>
  );
};

export default Home;
