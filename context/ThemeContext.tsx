import React, { createContext, useState, useContext, useEffect } from 'react';
import { useColorScheme, Platform } from 'react-native';

type Theme = 'light' | 'dark' | 'system';

type ThemeContextType = {
  theme: Theme;
  currentTheme: 'light' | 'dark';
  setTheme: (theme: Theme) => void;
  colors: {
    background: string;
    text: string;
    secondaryText: string;
    card: string;
    cardBorder: string;
    primary: string;
    primaryLight: string;
    accent: string;
    tabBar: string;
    tabBarInactive: string;
    navBar: string;
    gradientStart: string;
    gradientEnd: string;
    divider: string;
    modalBackground: string;
  };
};

const lightColors = {
  background: '#ffffff',
  text: '#333333',
  secondaryText: '#666666',
  card: '#f9f9f9',
  cardBorder: '#f0f0f0',
  primary: '#5e17eb',
  primaryLight: '#e0d1ff',
  accent: '#ff3b30',
  tabBar: '#ffffff',
  tabBarInactive: '#888888',
  navBar: '#f0e5ff',
  gradientStart: '#5e17eb',
  gradientEnd: '#7c3aed',
  divider: '#f0f0f0',
  modalBackground: 'rgba(0, 0, 0, 0.5)',
};

const darkColors = {
  background: '#121212',
  text: '#e0e0e0',
  secondaryText: '#a0a0a0',
  card: '#1e1e1e',
  cardBorder: '#333333',
  primary: '#9b74ff',
  primaryLight: '#332560',
  accent: '#ff6961',
  tabBar: '#1c1c1e',
  tabBarInactive: '#7a7a7c',
  navBar: '#27124e',
  gradientStart: '#7c3aed',
  gradientEnd: '#5e17eb',
  divider: '#333333',
  modalBackground: 'rgba(0, 0, 0, 0.7)',
};

const defaultContext: ThemeContextType = {
  theme: 'system',
  currentTheme: 'light',
  setTheme: () => {},
  colors: lightColors,
};

const ThemeContext = createContext<ThemeContextType>(defaultContext);

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const deviceTheme = useColorScheme();
  const [theme, setTheme] = useState<Theme>('system');

  // Determine the actual theme colors to use based on the selected theme and system setting
  const currentTheme = theme === 'system' 
    ? (deviceTheme === 'dark' ? 'dark' : 'light')
    : theme;

  const colors = currentTheme === 'dark' ? darkColors : lightColors;

  // Load saved theme preference on initial load
  useEffect(() => {
    const loadThemePreference = async () => {
      try {
        // Only use localStorage on web
        if (Platform.OS === 'web') {
          try {
            const savedTheme = localStorage.getItem('themePreference');
            if (savedTheme && ['light', 'dark', 'system'].includes(savedTheme)) {
              setTheme(savedTheme as Theme);
            }
          } catch (e) {
            console.error('Failed to load theme preference from localStorage:', e);
          }
        } else {
          // For native platforms, we would use AsyncStorage
          // For now, we'll just use the default system theme
          // In a real app, you would implement AsyncStorage here:
          // const savedTheme = await AsyncStorage.getItem('themePreference');
          // if (savedTheme && ['light', 'dark', 'system'].includes(savedTheme)) {
          //   setTheme(savedTheme as Theme);
          // }
        }
      } catch (error) {
        console.error('Failed to load theme preference:', error);
      }
    };
    
    loadThemePreference();
  }, []);

  // Save theme preference when it changes
  useEffect(() => {
    try {
      if (Platform.OS === 'web') {
        try {
          localStorage.setItem('themePreference', theme);
        } catch (e) {
          console.error('Failed to save theme preference to localStorage:', e);
        }
      } else {
        // For native platforms, we would use AsyncStorage
        // For now, we'll just skip saving on native
        // In a real app, you would implement AsyncStorage here:
        // AsyncStorage.setItem('themePreference', theme);
      }
    } catch (error) {
      console.error('Failed to save theme preference:', error);
    }
  }, [theme]);

  const themeContextValue: ThemeContextType = {
    theme,
    currentTheme,
    setTheme,
    colors,
  };

  return (
    <ThemeContext.Provider value={themeContextValue}>
      {children}
    </ThemeContext.Provider>
  );
};