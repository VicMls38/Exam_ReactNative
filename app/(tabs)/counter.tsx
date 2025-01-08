import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, Text, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Battery from 'expo-battery'; // Importer expo-battery

export default function CountScreen() {
  const [chatCount, setChatCount] = useState<number>(0); // État pour le compteur du chat
  const [dogCount, setDogCount] = useState<number>(0); // État pour le compteur du chien
  const [batteryLevel, setBatteryLevel] = useState<number>(0); // État pour le niveau de la batterie

  // Fonction pour récupérer les compteurs depuis AsyncStorage
  useEffect(() => {
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
    getCounts();
  }, []); // L'appel est effectué une seule fois, au chargement du composant

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
      await AsyncStorage.removeItem('chatCount');
      await AsyncStorage.removeItem('dogCount');
      setChatCount(0); // Réinitialiser localement
      setDogCount(0); // Réinitialiser localement
    } catch (error) {
      console.error('Erreur lors de la réinitialisation des compteurs :', error);
    }
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
});
