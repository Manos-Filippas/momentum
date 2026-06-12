import { useEffect } from 'react';
import { View, Text, Image, StyleSheet, useColorScheme } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';

const lightIcon = require('../assets/light-splash-icon.png');
const darkIcon = require('../assets/dark-splash-icon.png');

type Props = {
  onReady: () => void;
};

export default function AppSplash({ onReady }: Props) {
  const scheme = useColorScheme();
  const isDark = scheme === 'dark';

  useEffect(() => {
    SplashScreen.hideAsync();
    const timer = setTimeout(onReady, 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={[styles.container, { backgroundColor: isDark ? '#0B0D0A' : '#C9FB45' }]}>
      <Image source={isDark ? darkIcon : lightIcon} style={styles.icon} resizeMode="contain" />
      <Text style={[styles.text, { color: isDark ? '#F4F6EF' : '#121608' }]}>Momentum</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    width: 120,
    height: 120,
  },
  text: {
    marginTop: 16,
    fontSize: 32,
    fontWeight: '700',
    letterSpacing: 1,
  },
});
