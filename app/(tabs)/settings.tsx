import React, { useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, ScrollView, Platform } from 'react-native';
import { ChevronRight, Globe, Moon, Sun, Volume2, Sparkles, Star, Lightbulb } from 'lucide-react-native';
import * as Animatable from 'react-native-animatable';
import { LinearGradient } from 'expo-linear-gradient';
import { languages } from '@/data/languages';
import { useLanguage } from '@/context/LanguageContext';
import { SpeechSettings, useUserPreferences } from '@/context/UserPreferencesContext';
import { useTheme } from '@/context/ThemeContext';
import Slider from '@/components/Slider';

export default function SettingsScreen() {
  const { language, setLanguage, t } = useLanguage();
  const { preferences, updateSpeechSettings } = useUserPreferences();
  const { theme, setTheme, colors, currentTheme } = useTheme();
  const [speechRate, setSpeechRate] = useState(preferences.speechSettings.rate);
  const [speechPitch, setSpeechPitch] = useState(preferences.speechSettings.pitch);
  
  const handleSpeechRateChange = (value: number) => {
    setSpeechRate(value);
    updateSpeechSettings({
      ...preferences.speechSettings,
      rate: value
    });
  };
  
  const handleSpeechPitchChange = (value: number) => {
    setSpeechPitch(value);
    updateSpeechSettings({
      ...preferences.speechSettings,
      pitch: value
    });
  };
  
  const handleLanguageSelect = (langCode: string) => {
    setLanguage(langCode);
  };
  
  const handleThemeChange = (newTheme: 'light' | 'dark' | 'system') => {
    setTheme(newTheme);
  };
  
  const renderLanguageItem = (lang: { code: string, name: string, nativeName: string }) => {
    const isSelected = lang.code === language;
    
    return (
      <Animatable.View 
        key={lang.code}
        animation="fadeInRight"
        duration={500}
        delay={languages.findIndex(l => l.code === lang.code) * 100}
      >
        <TouchableOpacity 
          style={[
            styles.languageItem, 
            { backgroundColor: colors.card, borderBottomColor: colors.cardBorder },
            isSelected && [styles.selectedLanguageItem, { backgroundColor: colors.primary }]
          ]} 
          onPress={() => handleLanguageSelect(lang.code)}
        >
          <View style={styles.languageInfo}>
            <Text style={[
              styles.languageName, 
              { color: colors.text },
              isSelected && styles.selectedLanguageText
            ]}>
              {lang.name}
            </Text>
            <Text style={[
              styles.nativeName, 
              { color: colors.secondaryText },
              isSelected && styles.selectedLanguageText
            ]}>
              {lang.nativeName}
            </Text>
          </View>
          {isSelected && (
            <Animatable.View animation="bounceIn" style={[styles.checkmark, { backgroundColor: colors.background }]}>
              <Text style={[styles.checkmarkText, { color: colors.primary }]}>✓</Text>
            </Animatable.View>
          )}
        </TouchableOpacity>
      </Animatable.View>
    );
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <LinearGradient
        colors={[colors.gradientStart, colors.gradientEnd]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.headerGradient}
      >
        <View style={styles.header}>
          <Animatable.View animation="bounceIn" duration={1200}>
            <Text style={styles.title}>{t.settings}</Text>
          </Animatable.View>
          <Animatable.View animation="fadeIn" delay={400}>
            <Text style={styles.subtitle}>{t.appSettings}</Text>
          </Animatable.View>
          <Animatable.View animation="fadeIn" delay={800} style={styles.headerIcon}>
            <Sparkles size={24} color="#fff" />
          </Animatable.View>
        </View>
      </LinearGradient>

      <ScrollView 
        style={styles.content}
        contentContainerStyle={{ paddingBottom: 40 }}
      >
        <Animatable.View 
          animation="fadeInUp" 
          duration={800} 
          delay={200} 
          style={[styles.section, { backgroundColor: colors.card }]}
        >
          <View style={[styles.sectionHeader, { backgroundColor: colors.cardBorder }]}>
            {currentTheme === 'dark' ? 
              <Moon size={20} color={colors.primary} /> : 
              <Sun size={20} color={colors.primary} />
            }
            <Text style={[styles.sectionTitle, { color: colors.text }]}>{t.appearance}</Text>
          </View>
          <View style={styles.sectionContent}>
            <TouchableOpacity
              style={[
                styles.themeItem, 
                { backgroundColor: colors.background },
                theme === 'light' && {
                  borderColor: colors.primary,
                  borderWidth: 2
                }
              ]}
              onPress={() => handleThemeChange('light')}
            >
              <View style={styles.themeIconContainer}>
                <Sun size={20} color={colors.text} />
              </View>
              <Text style={[styles.themeLabel, { color: colors.text }]}>Light Mode</Text>
              {theme === 'light' && (
                <Animatable.View animation="bounceIn" style={[styles.checkmark, { backgroundColor: colors.primary }]}>
                  <Text style={[styles.checkmarkText, { color: colors.background }]}>✓</Text>
                </Animatable.View>
              )}
            </TouchableOpacity>
            
            <TouchableOpacity
              style={[
                styles.themeItem, 
                { backgroundColor: colors.background },
                theme === 'dark' && {
                  borderColor: colors.primary,
                  borderWidth: 2
                }
              ]}
              onPress={() => handleThemeChange('dark')}
            >
              <View style={styles.themeIconContainer}>
                <Moon size={20} color={colors.text} />
              </View>
              <Text style={[styles.themeLabel, { color: colors.text }]}>Dark Mode</Text>
              {theme === 'dark' && (
                <Animatable.View animation="bounceIn" style={[styles.checkmark, { backgroundColor: colors.primary }]}>
                  <Text style={[styles.checkmarkText, { color: colors.background }]}>✓</Text>
                </Animatable.View>
              )}
            </TouchableOpacity>
            
            <TouchableOpacity
              style={[
                styles.themeItem, 
                { backgroundColor: colors.background },
                theme === 'system' && {
                  borderColor: colors.primary,
                  borderWidth: 2
                }
              ]}
              onPress={() => handleThemeChange('system')}
            >
              <View style={styles.themeIconContainer}>
                <Star size={20} color={colors.text} />
              </View>
              <Text style={[styles.themeLabel, { color: colors.text }]}>System Default</Text>
              {theme === 'system' && (
                <Animatable.View animation="bounceIn" style={[styles.checkmark, { backgroundColor: colors.primary }]}>
                  <Text style={[styles.checkmarkText, { color: colors.background }]}>✓</Text>
                </Animatable.View>
              )}
            </TouchableOpacity>
          </View>
        </Animatable.View>

        <Animatable.View 
          animation="fadeInUp" 
          duration={800} 
          delay={300} 
          style={[styles.section, { backgroundColor: colors.card }]}
        >
          <View style={[styles.sectionHeader, { backgroundColor: colors.cardBorder }]}>
            <Globe size={20} color={colors.primary} />
            <Text style={[styles.sectionTitle, { color: colors.text }]}>{t.language}</Text>
          </View>
          <View style={styles.sectionContent}>
            {languages.map(renderLanguageItem)}
          </View>
        </Animatable.View>
        
        <Animatable.View 
          animation="fadeInUp" 
          duration={800} 
          delay={700} 
          style={[styles.section, { backgroundColor: colors.card }]}
        >
          <View style={[styles.sectionHeader, { backgroundColor: colors.cardBorder }]}>
            <Volume2 size={20} color={colors.primary} />
            <Text style={[styles.sectionTitle, { color: colors.text }]}>{t.speechSettings}</Text>
          </View>
          <View style={styles.sectionContent}>
            <Text style={[styles.sliderLabel, { color: colors.text }]}>{t.speechRate}</Text>
            <View style={styles.sliderLabels}>
              <Text style={[styles.sliderMinLabel, { color: colors.secondaryText }]}>{t.slow}</Text>
              <Star size={12} color={colors.primaryLight} />
              <Text style={[styles.sliderMaxLabel, { color: colors.secondaryText }]}>{t.fast}</Text>
            </View>
            <Slider
              value={speechRate}
              onValueChange={handleSpeechRateChange}
              minimumValue={0.5}
              maximumValue={2.0}
              step={0.1}
              trackColor={{ false: colors.cardBorder, true: colors.primaryLight }}
              thumbTintColor={colors.primary}
            />
            
            <Text style={[styles.sliderLabel, { marginTop: 20, color: colors.text }]}>{t.speechPitch}</Text>
            <View style={styles.sliderLabels}>
              <Text style={[styles.sliderMinLabel, { color: colors.secondaryText }]}>{t.low}</Text>
              <Star size={12} color={colors.primaryLight} />
              <Text style={[styles.sliderMaxLabel, { color: colors.secondaryText }]}>{t.high}</Text>
            </View>
            <Slider
              value={speechPitch}
              onValueChange={handleSpeechPitchChange}
              minimumValue={0.5}
              maximumValue={2.0}
              step={0.1}
              trackColor={{ false: colors.cardBorder, true: colors.primaryLight }}
              thumbTintColor={colors.primary}
            />
          </View>
        </Animatable.View>
        
        <Animatable.View 
          animation="fadeInUp" 
          duration={800} 
          delay={900} 
          style={[styles.section, { backgroundColor: colors.card }]}
        >
          <View style={[styles.sectionHeader, { backgroundColor: colors.cardBorder }]}>
            <Lightbulb size={20} color={colors.primary} />
            <Text style={[styles.sectionTitle, { color: colors.text }]}>{t.about}</Text>
          </View>
          <View style={styles.sectionContent}>
            <TouchableOpacity style={[styles.aboutItem, { backgroundColor: colors.background }]}>
              <Text style={[styles.aboutLabel, { color: colors.text }]}>{t.version}</Text>
              <View style={styles.aboutRightContent}>
                <Text style={[styles.aboutValue, { color: colors.secondaryText }]}>1.0.0</Text>
                <Animatable.View animation="pulse" iterationCount="infinite" duration={2000}>
                  <Star size={12} color={colors.primary} fill={colors.primary} />
                </Animatable.View>
              </View>
            </TouchableOpacity>
            
            <TouchableOpacity style={[styles.aboutItem, { backgroundColor: colors.background }]}>
              <Text style={[styles.aboutLabel, { color: colors.text }]}>{t.privacyPolicy}</Text>
              <ChevronRight size={18} color={colors.secondaryText} />
            </TouchableOpacity>
            
            <TouchableOpacity style={[styles.aboutItem, { backgroundColor: colors.background }]}>
              <Text style={[styles.aboutLabel, { color: colors.text }]}>{t.termsOfService}</Text>
              <ChevronRight size={18} color={colors.secondaryText} />
            </TouchableOpacity>
          </View>
        </Animatable.View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerGradient: {
    paddingTop: Platform.OS === 'ios' ? 50 : 30,
    paddingBottom: 20,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  header: {
    paddingHorizontal: 20,
    position: 'relative',
  },
  title: {
    fontSize: 30,
    fontFamily: 'LuckiestGuy-Regular',
    color: '#fff',
    marginBottom: 8,
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  subtitle: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: 'rgba(255, 255, 255, 0.9)',
  },
  headerIcon: {
    position: 'absolute',
    top: 10,
    right: 20,
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  section: {
    marginBottom: 24,
    borderRadius: 16,
    overflow: 'hidden',
    elevation: 2,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    marginLeft: 12,
  },
  sectionContent: {
    padding: 16,
  },
  languageItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    marginBottom: 8,
    borderRadius: 12,
  },
  languageInfo: {
    flex: 1,
  },
  selectedLanguageItem: {
    borderBottomWidth: 0,
  },
  languageName: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
  },
  nativeName: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
  },
  selectedLanguageText: {
    color: '#fff',
  },
  checkmark: {
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkmarkText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  themeItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  themeIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  themeLabel: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    flex: 1,
  },
  sliderLabel: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    marginBottom: 8,
  },
  sliderLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  sliderMinLabel: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    flex: 1,
  },
  sliderMaxLabel: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    flex: 1,
    textAlign: 'right',
  },
  aboutItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginBottom: 8,
    borderRadius: 12,
  },
  aboutLabel: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
  },
  aboutRightContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  aboutValue: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    marginRight: 8,
  },
});