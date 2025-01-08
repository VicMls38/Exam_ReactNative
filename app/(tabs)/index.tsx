import { useEffect, useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Button } from '@react-navigation/elements';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { SafeAreaView } from 'react-native-safe-area-context';
// import DeviceInfo from 'react-native-device-info';

// Typage de la navigation
type RootStackParamList = {
  explore: undefined;
  test: undefined;
  // Ajoutez d'autres routes ici si nécessaire
};

export default function HomeScreen() {
  const [batteryLevel, setBatteryLevel] = useState(0);
  const [bgColor, setBgColor] = useState('#fff'); // Initial background color
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  // Fonction pour récupérer le niveau de la batterie
  // const getBatteryLevel = async () => {
  //   try {
  //     const level = await DeviceInfo.getBatteryLevel(); // Récupère le niveau de la batterie (entre 0 et 1)
  //     setBatteryLevel(level);
  //     if (level >= 0.5) {
  //       setBgColor('#ADD8E6'); // Bleu clair si la batterie est supérieure ou égale à 50%
  //     } else {
  //       setBgColor('#FFB6C1'); // Saumon si la batterie est inférieure à 50%
  //     }
  //   } catch (error) {
  //     console.error('Error fetching battery level', error);
  //   }
  // };

  // // Utilisation de useEffect pour obtenir le niveau de la batterie lorsque la page se charge
  // useEffect(() => {
  //   getBatteryLevel();
  // }, []);

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: bgColor }]}>
      <View style={styles.innerContainer}>
        <Text style={styles.batteryLevelText}>Battery Level: {Math.round(batteryLevel * 100)}%</Text>
        <Button onPress={() => navigation.navigate('explore')}>
          Go to Explore
        </Button>
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
  batteryLevelText: {
    fontSize: 18,
    marginBottom: 20,
  },
  BtnRedirectExplore: {
    width: '80%',
    height: '20%',
  },
});
