import { Tabs } from 'expo-router';
import React, { useEffect } from 'react';
import {
  Platform,
  Alert,
  BackHandler,
  TouchableOpacity,
  GestureResponderEvent,
  StyleProp,
  ViewStyle,
} from 'react-native';

import { HapticTab } from '@/components/HapticTab';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { BottomTabBarButtonProps } from '@react-navigation/bottom-tabs'; // Importation des types nécessaires

export default function TabLayout() {
  const colorScheme = useColorScheme();

  // Fonction pour quitter l'application
  const handleExit = () => {
    Alert.alert(
      "Quitter l'application",
      "Êtes-vous sûr de vouloir quitter l'application ?",
      [
        { text: "Annuler", style: "cancel" },
        { text: "Quitter", onPress: () => BackHandler.exitApp() }, // Quitte l'application sur Android
      ]
    );
  };

  // Gestion de l'événement BackButton pour quitter l'application
  useEffect(() => {
    const backAction = () => {
      handleExit();
      return true; // Empêche le comportement par défaut (qui est de revenir en arrière)
    };

    BackHandler.addEventListener('hardwareBackPress', backAction);

    return () => {
      BackHandler.removeEventListener('hardwareBackPress', backAction);
    };
  }, []);

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        tabBarInactiveTintColor: Colors[colorScheme ?? 'light'].text,
        headerShown: false,
        tabBarStyle: {
          height: 60, // Ajuste la hauteur de la barre de navigation
          backgroundColor: Colors[colorScheme ?? 'light'].background,
          borderTopWidth: 0,
          elevation: 10, // Ajoute une ombre (Android uniquement)
        },
        tabBarLabelStyle: {
          fontSize: 12, // Taille de la police des labels
          marginBottom: 5, // Espace entre le label et l'icône
        },
        tabBarIconStyle: {
          marginTop: 5, // Espace entre l'icône et le haut
        },
      }}
    >
      {/* Onglet Chat */}
      <Tabs.Screen
        name="index"
        options={{
          title: 'Chat',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="cat" size={28} color={color} />
          ),
        }}
      />
      {/* Onglet Chien */}
      <Tabs.Screen
        name="chien"
        options={{
          title: 'Chien',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="dog" size={28} color={color} />
          ),
        }}
      />
      {/* Onglet Map */}
      <Tabs.Screen
        name="map"
        options={{
          title: 'Map',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="map" size={28} color={color} />
          ),
        }}
      />
      {/* Onglet Count */}
      <Tabs.Screen
        name="counter"
        options={{
          title: 'Count',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="counter" size={28} color={color} />
          ),
        }}
      />

      {/* Onglet Quitter */}
      <Tabs.Screen
        name="exit"
        options={{
          title: 'Quitter',
          tabBarButton: (props: BottomTabBarButtonProps) => (
            <TouchableOpacity
              {...props}
              onPress={(event: GestureResponderEvent) => {
                // Appel à la fonction existante pour quitter
                props.onPress?.(event); // Appelle la fonction par défaut (si définie)
                handleExit(); // Affiche l'alerte pour quitter
              }}
              style={props.style as StyleProp<ViewStyle>} // Correctif pour les types
            >
              <MaterialCommunityIcons
                name="exit-to-app"
                size={28}
                color={Colors[colorScheme ?? 'light'].tint}
              />
            </TouchableOpacity>
          ),
        }}
      />
    </Tabs>
  );
}
