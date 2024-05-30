import React, { useEffect, useState } from "react";
import { Text, View, Pressable, Alert, Button, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Audio, InterruptionModeIOS, InterruptionModeAndroid } from "expo-av";

import { styles } from './src/styles/styles';
import { setAudioModeAsync } from "expo-av/build/Audio";

export default function App() {
  const [recordingAudio, setRecordingAudio] = useState(null);
  const [permissionResponse, requestPermission] = Audio.usePermissions();
  const [recordingFileURI, setRecordingFileURI] = useState('');
  const [recordingDuration, setRecordingDuration] = useState(0);
  const [timer, setTimer] = useState(null);
  const [playsInSilentModeIOS, setPlaysInSilentModeIOS] = useState(true);

  useEffect(() => {
    requestPermission().then((granted) => {
      if (granted) {
        Audio.setAudioModeAsync({
          allowsRecordingIOS: playsInSilentModeIOS,
          interruptionModeIOS: InterruptionModeIOS.DoNotMix,
          playsInSilentModeIOS: true,
          shouldDuckAndroid: true,
          interruptionModeAndroid: InterruptionModeAndroid.DoNotMix,
          playThroughEarpieceAndroid: true,
        });
      }
    });
    console.log(permissionResponse);
  }, [setAudioModeAsync]);

  async function tocarAudio() {
    try {
      const { playbackObject } = await Audio.Sound.createAsync(
        { uri: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3' },
        { shouldPlay: true }
      );
      console.log(playbackObject);
    } catch (error) {
      console.error('Erro ao reproduzir o audio:', error);
    }
  }

  async function handleRecordingStart() {
    if (permissionResponse.granted) {
      try {
        const { recording } = await Audio.Recording.createAsync();
        setRecordingAudio(recording);
        setRecordingDuration(0);
        const newTimer = setInterval(() => {
          setRecordingDuration(prevDuration => prevDuration + 1);
        }, 1000);
        setTimer(newTimer);
      } catch (error) {
        console.log(error);
        Alert.alert('Erro ao gravar', 'Não foi possível iniciar a gravação!');
      }
    }
  }

  async function handleRecordingStop() {
    try {
      if (recordingAudio) {
        clearInterval(timer);
        await recordingAudio.stopAndUnloadAsync();
        const fileURI = recordingAudio.getURI();
        console.log('Parou a gravação =>', fileURI);
        setRecordingFileURI(fileURI);
        setRecordingAudio(null);
        setTimer(null);
      }
    } catch (error) {
      console.log(error);
      Alert.alert('Erro ao parar a gravação', 'Não foi possível parar a gravação!');
    }
  }

  useEffect(() => {
    Audio.setAudioModeAsync({
      allowsRecordingIOS: playsInSilentModeIOS
    });
  }, [playsInSilentModeIOS]);

  async function handleAudioPlay() {
    if (recordingFileURI) {
      const { sound } = await Audio.Sound.createAsync({ uri: recordingFileURI }, { shouldPlay: true });
      await sound.setPositionAsync(0);
      await sound.playAsync();
    }
  }

  const formatDuration = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <View style={styles.container}>
      <Pressable onPress={tocarAudio} style={[styles.button1]}>
        <MaterialIcons name="play-arrow" size={44} color='#fff' />
      </Pressable>

      <Pressable
        onPressIn={() => {
          handleRecordingStart();
          setPlaysInSilentModeIOS(true);
        }}
        onPressOut={handleRecordingStop}
        style={[styles.button, recordingAudio && styles.recording]}
      >
        <MaterialIcons name="mic" size={44} color='#fff' />
      </Pressable>

      {recordingAudio &&
        <Text style={styles.label}>Gravando: {formatDuration(recordingDuration)}</Text>
      }

      {recordingFileURI &&
        <Button
          onPress={() => {
            handleAudioPlay();
            setPlaysInSilentModeIOS((current) => (current ? false : true));
          }}
          title="Ouvir Áudio"
          color="#f0f0f0"
        />
      }
    </View>
  );
}
