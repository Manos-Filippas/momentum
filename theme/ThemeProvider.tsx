import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useColorScheme } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Colors, { ColorTokens } from './colors';

const STORAGE_KEY = '@momentum/theme_preference';

export type ThemePreference = 'system' | 'light' | 'dark';
export type ColorScheme = 'light' | 'dark';

type ThemeContextType = {
  theme: ColorTokens;
  colorScheme: ColorScheme;
  themePreference: ThemePreference;
  setThemePreference: (pref: ThemePreference) => Promise<void>;
};

const ThemeContext = createContext<ThemeContextType | null>(null);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const systemScheme = useColorScheme() ?? 'light';
  const [preference, setPreference] = useState<ThemePreference>('system');

  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY).then((stored) => {
      if (stored === 'light' || stored === 'dark' || stored === 'system') {
        setPreference(stored);
      }
    });
  }, []);

  const setThemePreference = async (pref: ThemePreference) => {
    setPreference(pref);
    await AsyncStorage.setItem(STORAGE_KEY, pref);
  };

  const colorScheme: ColorScheme = preference === 'system' ? systemScheme : preference;
  const theme = Colors[colorScheme];

  return (
    <ThemeContext.Provider value={{ theme, colorScheme, themePreference: preference, setThemePreference }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider');
  return ctx;
}
