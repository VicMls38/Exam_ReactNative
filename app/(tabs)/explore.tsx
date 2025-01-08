import React from 'react';
import { SafeAreaView, View, Text, StyleSheet } from 'react-native';

export default function Explore() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.innerContainer}>
        <Text style={styles.text}>Test</Text>
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
  text: {
    fontSize: 50,
    color: 'white',
  },
});