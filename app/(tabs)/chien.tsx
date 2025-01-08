import React, { useEffect, useState } from 'react';
import { SafeAreaView, View, Image, StyleSheet, ActivityIndicator, Text, TouchableOpacity, Linking, Alert } from 'react-native';

export default function Explore() {
  const [dogImage, setDogImage] = useState<string | null>(null); // État pour stocker l'URL de l'image
  const [loading, setLoading] = useState(true); // État pour afficher un indicateur de chargement

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

  // Utilisation de useEffect pour récupérer l'image au chargement de la page
  useEffect(() => {
    fetchDogImage();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.innerContainer}>
        {loading ? (
          // Affiche un indicateur de chargement pendant que l'image se charge
          <ActivityIndicator size="large" color="#0000ff" />
        ) : dogImage ? (
          // Affiche l'image lorsqu'elle est disponible et la rend cliquable
          <TouchableOpacity onPress={sendSMS}>
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
    backgroundColor: '#f5f5f5', // Couleur de fond
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
