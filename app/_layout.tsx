import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import 'react-native-reanimated';
import { useColorScheme } from '@/hooks/useColorScheme';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [isReady, setIsReady] = useState(false);  // État pour gérer l'affichage du texte sur le splash screen.
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      // Delai de 3 secondes avant de masquer le splash screen
      setTimeout(() => {
        setIsReady(true); // Quand le délai est écoulé, tout est prêt pour afficher l'écran principal
        SplashScreen.hideAsync(); // Cache le splash screen après un délai
      }, 3000);  // 3000ms = 3 secondes de délai
    }
  }, [loaded]);

  if (!isReady) {
    return (
      <View style={styles.splashContainer}>
        {/* Image au-dessus du texte */}
        <Image 
          source={require('../assets/images/chat_chien_logo.png')}  // Remplace par le chemin de ton image
          style={styles.splashImage} 
        />
        {/* Texte affiché sous l'image */}
        <Text style={styles.splashText}>Bienvenue sur Chat is my best hybrid friend</Text>
      </View>
    );
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  splashContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',  // La couleur de fond du splash screen
  },
  splashImage: {
    width: 150,  // Ajuste la largeur de l'image
    height: 150, // Ajuste la hauteur de l'image
    marginBottom: 20,  // Espacement entre l'image et le texte
  },
  splashText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333333',  // La couleur du texte
    textAlign: 'center', // Pour centrer le texte
    marginHorizontal: 20, // Pour éviter que le texte soit trop proche des bords
  },
});
