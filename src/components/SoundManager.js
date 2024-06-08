import { useState, useEffect } from 'react';
import { Audio } from 'expo-av';

export default function useSound(soundFile) {
  const [sound, setSound] = useState();

  useEffect(() => {
    return sound
      ? () => {
          sound.unloadAsync(); // ComponentWillUnmount
        }
      : undefined;
  }, [sound]);

  async function playSound() {
    const { sound } = await Audio.Sound.createAsync(soundFile);
    setSound(sound);
    await sound.playAsync();
  }

  return {
    playSound
  };
}
