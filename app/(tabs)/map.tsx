import React, { useEffect, useState } from 'react';
import { SafeAreaView, View, Text, StyleSheet, Dimensions } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';

export default function Explore() {
  const [region, setRegion] = useState<any>(null); // Etat pour la région de la carte
  const [errorMsg, setErrorMsg] = useState<string | null>(null); // Etat pour les erreurs de localisation

  useEffect(() => {
    const getLocation = async () => {
      // Demander les permissions de localisation
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission de localisation refusée');
        return;
      }

      // Obtenir la position actuelle
      let location = await Location.getCurrentPositionAsync({});
      setRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 8.0,  // Pour avoir un zoom suffisant pour voir toute la France
        longitudeDelta: 10.0, // Ajuster pour que la carte couvre toute la France
      });
    };

    getLocation();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      {region ? (
        <MapView style={styles.map} initialRegion={region}>
          <Marker coordinate={{ latitude: region.latitude, longitude: region.longitude }} />
        </MapView>
      ) : (
        <View style={styles.innerContainer}>
          <Text style={styles.text}>Chargement de la carte...</Text>
          {errorMsg && <Text style={styles.text}>{errorMsg}</Text>}
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '100%',
  },
  innerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
    color: 'black',
  },
});
