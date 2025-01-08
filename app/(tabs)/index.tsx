import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';
import { Audio } from 'expo-av'; // Importation du module audio
import { Button } from '@react-navigation/elements';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { SafeAreaView } from 'react-native-safe-area-context';

// Typage de la navigation
type RootStackParamList = {
  explore: undefined;
  test: undefined;
};

export default function HomeScreen() {
  const [batteryLevel, setBatteryLevel] = useState(0);
  const [bgColor, setBgColor] = useState('#fff');
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  // Fonction pour jouer le son
  const playSound = async () => {
    try {
      const { sound } = await Audio.Sound.createAsync(
        require('@/assets/sounds/chat.mp3') // Remplacez par le chemin correct vers votre fichier audio
      );
      await sound.playAsync(); // Lecture du son
    } catch (error) {
      console.error('Erreur lors de la lecture du son :', error);
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: bgColor }]}>
      <View style={styles.innerContainer}>
        {/* Image cliquable */}
        <TouchableOpacity onPress={playSound}>
          <Image
            source={require('@/assets/images/chat.png')} // Remplacez par le chemin correct vers votre image
            style={styles.image}
            resizeMode="contain"
          />
        </TouchableOpacity>
        <Text style={styles.batteryLevelText}>Battery Level: {Math.round(batteryLevel * 100)}%</Text>
        <Button onPress={() => navigation.navigate('explore')}>Go to Explore</Button>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  innerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 200, // Largeur de l'image
    height: 200, // Hauteur de l'image
  },
  batteryLevelText: {
    fontSize: 18,
    marginBottom: 20,
  },
  BtnRedirectExplore: {
    width: '80%',
    height: '20%',
  },
});
