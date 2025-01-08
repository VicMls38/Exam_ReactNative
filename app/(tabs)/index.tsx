import { StyleSheet, View} from 'react-native';

import { Button } from '@react-navigation/elements';
import {useNavigation} from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { SafeAreaView } from 'react-native-safe-area-context';


// Typage de la navigation
type RootStackParamList = {
  explore: undefined;
  // Ajoutez d'autres routes ici si nécessaire
};

export default function HomeScreen() {

  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <SafeAreaView style={styles.container}>  
      <View style={styles.innerContainer}>    
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

  BtnRedirectExplore: {
    width:'80%',
    height:'20%',
  },
  
});
