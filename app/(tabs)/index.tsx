import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';
import { Audio } from 'expo-av'; // Importation du module audio
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StackNavigationProp } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Importation d'AsyncStorage
import * as Battery from 'expo-battery'; // Importation de la librairie expo-battery

// Typage de la navigation
type RootStackParamList = {
  counter: undefined;
};

export default function HomeScreen() {
  const [batteryLevel, setBatteryLevel] = useState(0); // État pour le niveau de batterie
  const [bgColor, setBgColor] = useState('#fff'); // État pour la couleur de fond
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  // Fonction pour récupérer le niveau de la batterie
  const fetchBatteryLevel = async () => {
    const level = await Battery.getBatteryLevelAsync();
    setBatteryLevel(level); // Met à jour l'état avec le niveau de la batterie

    // Changer la couleur de fond en fonction du niveau de la batterie
    if (level > 0.5) {
      setBgColor('#ADD8E6'); // Bleu clair si batterie > 50%
    } else {
      setBgColor('#FFA07A'); // Saumon si batterie <= 50%
    }
  };

  // Fonction pour jouer le son
  const playSound = async () => {
    try {
      const { sound } = await Audio.Sound.createAsync(
        require('@/assets/sounds/chat.mp3') // Remplacez par le chemin correct vers votre fichier audio
      );
      await sound.playAsync(); // Lecture du son
      incrementChatCount(); // Incrémente le compteur lors du clic
    } catch (error) {
      console.error('Erreur lors de la lecture du son :', error);
    }
  };

  // Fonction pour incrémenter le compteur et le stocker dans AsyncStorage
  const incrementChatCount = async () => {
    try {
      const currentCount = await AsyncStorage.getItem('chatCount');
      const newCount = currentCount ? parseInt(currentCount, 10) + 1 : 1;
      await AsyncStorage.setItem('chatCount', newCount.toString()); // Sauvegarde le compteur dans AsyncStorage
    } catch (error) {
      console.error('Erreur lors de l\'incrémentation du compteur du chat :', error);
    }
  };

  // Utilisation de useEffect pour récupérer le niveau de la batterie à chaque fois que le composant se charge
  useEffect(() => {
    fetchBatteryLevel(); // Récupérer le niveau de la batterie
  }, []);

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
  linkText: {
    fontSize: 18,
    marginTop: 20,
    color: 'blue',
  },
});
