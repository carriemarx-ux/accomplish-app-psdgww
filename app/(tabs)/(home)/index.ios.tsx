
import React, { useRef, useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity, TextInput, Alert, Vibration, KeyboardAvoidingView, ScrollView, Keyboard } from "react-native";
import { colors } from "@/styles/commonStyles";
import * as Haptics from "expo-haptics";
import ConfettiCannon from "react-native-confetti-cannon";
import { saveAccomplishment } from "@/utils/storageService";

export default function HomeScreen() {
  const confettiRef = useRef<any>(null);
  const [celebrationCount, setCelebrationCount] = useState(0);
  const [isPro, setIsPro] = useState(true);
  const [accomplishment, setAccomplishment] = useState("");

  const triggerGentleHaptic = () => {
    console.log("Triggering crescendo haptic feedback mirroring confetti");
    
    const hapticSequence = async () => {
      await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      setTimeout(() => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light), 100);
      setTimeout(() => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium), 200);
      setTimeout(() => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium), 300);
      setTimeout(() => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy), 400);
      setTimeout(() => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium), 600);
      setTimeout(() => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium), 800);
      setTimeout(() => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light), 1000);
      setTimeout(() => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light), 1200);
      setTimeout(() => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light), 1400);
      setTimeout(() => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light), 1600);
      setTimeout(() => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light), 1800);
      setTimeout(() => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light), 2000);
    };
    hapticSequence();
  };

  const handlePress = async () => {
    console.log("I did it button pressed!");
    
    Keyboard.dismiss();
    console.log("Keyboard dismissed");
    
    triggerGentleHaptic();

    if (confettiRef.current) {
      confettiRef.current.start();
    }

    setCelebrationCount(prev => prev + 1);

    if (isPro && accomplishment.trim()) {
      try {
        await saveAccomplishment(accomplishment);
        console.log("Accomplishment saved:", accomplishment);
        setAccomplishment("");
      } catch (error) {
        console.error("Error saving accomplishment:", error);
        
        if (error instanceof Error && error.message === 'STORAGE_FULL') {
          Alert.alert(
            'Storage Full',
            'Your device is out of storage space. Please free up some space and try again.',
            [{ text: 'OK' }]
          );
        } else {
          Alert.alert(
            'Error',
            'Failed to save. Please try again.',
            [{ text: 'OK' }]
          );
        }
      }
    }
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container}
      behavior="padding"
      keyboardVerticalOffset={0}
    >
      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.headerSection}>
          <Text style={styles.emoji}>🎉✨🌟</Text>
          <Text style={styles.title}>Celebrate Your Wins!</Text>
          <Text style={styles.subtitle}>Every win deserves a celebration</Text>
          
          <View style={styles.counterRow}>
            <View style={styles.counterContainer}>
              <Text style={styles.counterEmoji}>🎊</Text>
              <Text style={styles.counterNumber}>{celebrationCount}</Text>
              <Text style={styles.counterLabel}>celebrations</Text>
            </View>
          </View>
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.textInput}
            placeholder="What did you do? ✨"
            placeholderTextColor={colors.textLight}
            value={accomplishment}
            onChangeText={setAccomplishment}
            multiline
            numberOfLines={3}
            textAlignVertical="top"
          />
        </View>

        <View style={styles.content}>
          <View style={styles.buttonGlow}>
            <TouchableOpacity 
              style={styles.button}
              onPress={handlePress}
              activeOpacity={0.85}
            >
              <Text style={styles.buttonEmoji}>🎯</Text>
              <Text style={styles.buttonText}>I did it!</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.description}>
            Tap the button every time you achieve something amazing! 🌈
          </Text>
        </View>

        {!isPro && (
          <View style={styles.upgradeContainer}>
            <Text style={styles.upgradeEmoji}>⭐</Text>
            <Text style={styles.upgradeTitle}>
              Save Your Wins!
            </Text>
            <Text style={styles.upgradeText}>
              Keep a permanent record with dates and notes
            </Text>
            <TouchableOpacity 
              style={styles.upgradeButton}
              onPress={() => {
                console.log("Upgrade pressed - Superwall integration coming");
                setIsPro(true);
              }}
              activeOpacity={0.8}
            >
              <Text style={styles.upgradeButtonText}>Upgrade to Pro ✨</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>

      <ConfettiCannon
        ref={confettiRef}
        count={200}
        origin={{ x: -10, y: 0 }}
        autoStart={false}
        fadeOut={true}
        fallSpeed={2500}
        colors={colors.confetti}
      />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContent: {
    flexGrow: 1,
  },
  headerSection: {
    paddingTop: 60,
    paddingHorizontal: 20,
    width: '100%',
    marginBottom: 20,
    alignItems: 'center',
  },
  emoji: {
    fontSize: 40,
    marginBottom: 8,
  },
  title: {
    fontSize: 36,
    fontWeight: '900',
    color: colors.text,
    textAlign: 'center',
    marginBottom: 8,
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: 20,
  },
  counterRow: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 8,
  },
  counterContainer: {
    backgroundColor: colors.card,
    paddingVertical: 16,
    paddingHorizontal: 28,
    borderRadius: 30,
    boxShadow: `0px 4px 20px ${colors.cardShadow}`,
    elevation: 6,
    borderWidth: 2,
    borderColor: colors.primary,
    alignItems: 'center',
    flexDirection: 'row',
    gap: 8,
  },
  counterEmoji: {
    fontSize: 24,
  },
  counterNumber: {
    fontSize: 28,
    fontWeight: '900',
    color: colors.primary,
  },
  counterLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textSecondary,
  },
  inputContainer: {
    width: '100%',
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  textInput: {
    backgroundColor: colors.card,
    borderRadius: 20,
    padding: 20,
    fontSize: 16,
    color: colors.text,
    minHeight: 100,
    maxHeight: 140,
    borderWidth: 3,
    borderColor: colors.border,
    boxShadow: `0px 4px 16px ${colors.cardShadow}`,
    elevation: 4,
    fontWeight: '500',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingBottom: 40,
    minHeight: 300,
  },
  buttonGlow: {
    padding: 8,
    borderRadius: 120,
    backgroundColor: colors.primaryLight,
    opacity: 0.3,
  },
  button: {
    width: 220,
    height: 220,
    borderRadius: 110,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: `0px 16px 50px ${colors.cardShadow}`,
    elevation: 16,
    borderWidth: 6,
    borderColor: colors.card,
  },
  buttonEmoji: {
    fontSize: 48,
    marginBottom: 8,
  },
  buttonText: {
    fontSize: 32,
    fontWeight: '900',
    color: colors.card,
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
    letterSpacing: -0.5,
  },
  description: {
    fontSize: 16,
    color: colors.textSecondary,
    textAlign: 'center',
    marginTop: 30,
    paddingHorizontal: 20,
    fontWeight: '600',
  },
  upgradeContainer: {
    backgroundColor: colors.upgradeBackground,
    paddingVertical: 32,
    paddingHorizontal: 24,
    paddingBottom: 120,
    alignItems: 'center',
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    boxShadow: '0px -6px 30px rgba(156, 39, 176, 0.15)',
    elevation: 10,
  },
  upgradeEmoji: {
    fontSize: 56,
    marginBottom: 12,
  },
  upgradeTitle: {
    fontSize: 24,
    fontWeight: '900',
    color: colors.text,
    textAlign: 'center',
    marginBottom: 8,
  },
  upgradeText: {
    fontSize: 16,
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: 20,
    fontWeight: '500',
  },
  upgradeButton: {
    backgroundColor: colors.upgradeAccent,
    paddingVertical: 18,
    paddingHorizontal: 40,
    borderRadius: 30,
    boxShadow: '0px 6px 20px rgba(156, 39, 176, 0.3)',
    elevation: 8,
  },
  upgradeButtonText: {
    fontSize: 18,
    fontWeight: '800',
    color: colors.card,
  },
});
