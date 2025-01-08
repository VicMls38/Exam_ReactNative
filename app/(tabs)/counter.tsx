import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Battery from 'expo-battery'; // Importer expo-battery

export default function CountScreen() {
  const [chatCount, setChatCount] = useState<number>(0); // État pour le compteur du chat
  const [dogCount, setDogCount] = useState<number>(0); // État pour le compteur du chien
  const [batteryLevel, setBatteryLevel] = useState<number>(0); // État pour le niveau de la batterie

  // Fonction pour récupérer les compteurs depuis AsyncStorage et mettre à jour les états
  const getCounts = async () => {
    try {
      // Récupérer les valeurs des compteurs
      const savedChatCount = await AsyncStorage.getItem('chatCount');
      const savedDogCount = await AsyncStorage.getItem('dogCount');

      // Si des valeurs sont récupérées, les stocker dans l'état
      if (savedChatCount !== null) setChatCount(parseInt(savedChatCount, 10));
      if (savedDogCount !== null) setDogCount(parseInt(savedDogCount, 10));
    } catch (error) {
      console.error('Erreur lors de la récupération des compteurs :', error);
    }
  };

  // Mettre à jour les compteurs dès que le composant est monté
  useEffect(() => {
    getCounts(); // Récupérer les compteurs au chargement de la page

    const intervalId = setInterval(() => {
      getCounts(); // Rafraîchir les compteurs toutes les 5 secondes (par exemple)
    }, 5000); // Interrogation toutes les 5 secondes

    // Nettoyage de l'intervalle lorsque le composant est démonté
    return () => clearInterval(intervalId);
  }, []); // On effectue l'effet une seule fois au montage du composant

  // Fonction pour récupérer le niveau de la batterie
  useEffect(() => {
    const getBatteryLevel = async () => {
      try {
        const level = await Battery.getBatteryLevelAsync(); // Récupérer le niveau de la batterie
        setBatteryLevel(level * 100); // Convertir en pourcentage
      } catch (error) {
        console.error('Erreur lors de la récupération du niveau de la batterie :', error);
      }
    };

    getBatteryLevel(); // Appel initial

    // Optionnel : vous pouvez aussi écouter les changements de niveau de batterie
    const batteryListener = Battery.addBatteryLevelListener(({ batteryLevel }) => {
      setBatteryLevel(batteryLevel * 100); // Mettre à jour l'état avec le nouveau niveau de batterie
    });

    // Nettoyage
    return () => {
      batteryListener.remove();
    };
  }, []);

  // Réinitialiser les compteurs
  const resetCounters = async () => {
    try {
      // Réinitialiser les valeurs dans AsyncStorage
      await AsyncStorage.setItem('chatCount', '0');
      await AsyncStorage.setItem('dogCount', '0');

      // Réinitialiser localement les compteurs
      setChatCount(0); 
      setDogCount(0); 
    } catch (error) {
      console.error('Erreur lors de la réinitialisation des compteurs :', error);
    }
  };

  // Incrémenter le compteur du chat
  const incrementChat = async () => {
    const newCount = chatCount + 1;
    setChatCount(newCount);
    await AsyncStorage.setItem('chatCount', newCount.toString());
  };

  // Incrémenter le compteur du chien
  const incrementDog = async () => {
    const newCount = dogCount + 1;
    setDogCount(newCount);
    await AsyncStorage.setItem('dogCount', newCount.toString());
  };

  // Déterminer la couleur de fond en fonction du niveau de la batterie
  const backgroundColor = batteryLevel > 50 ? '#ADD8E6' : '#FFCCCB'; // Bleu clair si > 50%, saumon si < 50%

  return (
    <SafeAreaView style={[styles.container, { backgroundColor }]}>
      <Text style={styles.text}>Chat Clicked: {chatCount} times</Text>
      <Text style={styles.text}>Dog Clicked: {dogCount} times</Text>

      <TouchableOpacity
        style={styles.resetButton}
        onPress={resetCounters} // Réinitialiser les compteurs
      >
        <Text style={styles.resetButtonText}>Reset Counters</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    marginBottom: 20,
    color: 'white', // Texte en blanc
  },
  resetButton: {
    padding: 10,
    backgroundColor: 'red',
    borderRadius: 5,
  },
  resetButtonText: {
    color: 'white', // Texte du bouton en blanc
    fontSize: 16,
  },
  image: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
});
