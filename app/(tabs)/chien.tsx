import React, { useEffect, useState } from 'react';
import { SafeAreaView, View, Image, StyleSheet, ActivityIndicator, Text, TouchableOpacity, Linking, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Importation d'AsyncStorage
import * as Battery from 'expo-battery'; // Importation de la librairie expo-battery

export default function Explore() {
  const [dogCount, setDogCount] = useState(0); // Compteur pour le chien
  const [dogImage, setDogImage] = useState<string | null>(null); // État pour stocker l'URL de l'image
  const [loading, setLoading] = useState(true); // État pour afficher un indicateur de chargement
  const [bgColor, setBgColor] = useState('#f5f5f5'); // État pour la couleur de fond

  // Fonction pour récupérer une image de chien depuis l'API
  const fetchDogImage = async () => {
    try {
      setLoading(true);
      const response = await fetch('https://dog.ceo/api/breeds/image/random');
      const data = await response.json();
      setDogImage(data.message); // L'URL de l'image se trouve dans `data.message`
    } catch (error) {
      console.error('Erreur lors de la récupération de l\'image :', error);
    } finally {
      setLoading(false);
    }
  };

  // Fonction pour incrémenter le compteur du chien et le stocker dans AsyncStorage
  const incrementDogCount = async () => {
    const newCount = dogCount + 1;
    setDogCount(newCount); // Mise à jour de l'état local
    try {
      await AsyncStorage.setItem('chatCount', newCount.toString()); // Mise à jour dans AsyncStorage
    } catch (error) {
      console.error('Erreur lors de l\'enregistrement du compteur du chat :', error);
    }
  };

  // Fonction pour préparer un SMS
  const sendSMS = () => {
    const phoneNumber = '0606060606';
    const message = 'je n\'aime pas les chats';
    const smsURL = `sms:${phoneNumber}?body=${encodeURIComponent(message)}`;

    Linking.openURL(smsURL).catch((error) => {
      console.error('Erreur lors de l\'ouverture de l\'application SMS :', error);
      Alert.alert('Erreur', 'Impossible d\'ouvrir l\'application SMS.');
    });
  };

  // Fonction pour récupérer le niveau de la batterie
  const fetchBatteryLevel = async () => {
    const level = await Battery.getBatteryLevelAsync();
    
    // Change la couleur de fond en fonction du niveau de la batterie
    if (level > 0.5) {
      setBgColor('#ADD8E6'); // Bleu clair si batterie > 50%
    } else {
      setBgColor('#FFA07A'); // Saumon si batterie <= 50%
    }
  };

  // Utilisation de useEffect pour récupérer l'image au chargement de la page et le niveau de la batterie
  useEffect(() => {
    fetchDogImage();
    fetchBatteryLevel(); // Récupérer le niveau de la batterie
  }, []);

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: bgColor }]}>
      <View style={styles.innerContainer}>
        {loading ? (
          // Affiche un indicateur de chargement pendant que l'image se charge
          <ActivityIndicator size="large" color="#0000ff" />
        ) : dogImage ? (
          // Affiche l'image lorsqu'elle est disponible et la rend cliquable
          <TouchableOpacity
            onPress={() => {
              sendSMS(); // Prépare le SMS
              incrementDogCount(); // Incrémente le compteur du chien
            }}
          >
            <Image source={{ uri: dogImage }} style={styles.image} resizeMode="contain" />
          </TouchableOpacity>
        ) : (
          // Affiche un message d'erreur si l'image n'a pas pu être récupérée
          <Text style={styles.errorText}>Impossible de charger l'image.</Text>
        )}
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
    width: 300, // Largeur de l'image
    height: 300, // Hauteur de l'image
  },
  errorText: {
    fontSize: 18,
    color: 'red',
  },
});
