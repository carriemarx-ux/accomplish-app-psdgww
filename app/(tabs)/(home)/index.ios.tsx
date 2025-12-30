
import React, { useRef, useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity, Platform } from "react-native";
import { colors } from "@/styles/commonStyles";
import * as Haptics from "expo-haptics";
import ConfettiCannon from "react-native-confetti-cannon";

export default function HomeScreen() {
  const confettiRef = useRef<any>(null);
  const [celebrationCount, setCelebrationCount] = useState(0);

  const handlePress = () => {
    console.log("I did it button pressed!");
    
    // Trigger gentle haptic feedback
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);

    // Trigger confetti
    if (confettiRef.current) {
      confettiRef.current.start();
    }

    // Increment celebration count
    setCelebrationCount(prev => prev + 1);
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Celebrate Your Wins! 🎉</Text>
        <Text style={styles.subtitle}>
          Press the button every time you accomplish something
        </Text>

        <View style={styles.statsContainer}>
          <Text style={styles.statsText}>
            Celebrations Today: {celebrationCount}
          </Text>
        </View>

        <TouchableOpacity 
          style={styles.button}
          onPress={handlePress}
          activeOpacity={0.8}
        >
          <Text style={styles.buttonText}>I did it!</Text>
        </TouchableOpacity>

        <View style={styles.upgradeContainer}>
          <Text style={styles.upgradeText}>
            Want to track what you accomplished?
          </Text>
          <TouchableOpacity 
            style={styles.upgradeButton}
            onPress={() => console.log("Upgrade pressed - Superwall integration coming")}
            activeOpacity={0.7}
          >
            <Text style={styles.upgradeButtonText}>Upgrade to Pro ✨</Text>
          </TouchableOpacity>
        </View>
      </View>

      <ConfettiCannon
        ref={confettiRef}
        count={150}
        origin={{ x: -10, y: 0 }}
        autoStart={false}
        fadeOut={true}
        fallSpeed={2500}
        colors={[colors.primary, colors.secondary, colors.accent, '#FF6B6B', '#4ECDC4']}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingBottom: 120, // Space for tab bar
  },
  title: {
    fontSize: 32,
    fontWeight: '800',
    color: colors.text,
    textAlign: 'center',
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 16,
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: 40,
    paddingHorizontal: 20,
  },
  statsContainer: {
    backgroundColor: colors.card,
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 16,
    marginBottom: 40,
    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.08)',
    elevation: 3,
  },
  statsText: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
  },
  button: {
    backgroundColor: colors.primary,
    paddingVertical: 24,
    paddingHorizontal: 60,
    borderRadius: 50,
    boxShadow: '0px 8px 24px rgba(76, 175, 80, 0.3)',
    elevation: 8,
    marginBottom: 60,
  },
  buttonText: {
    fontSize: 28,
    fontWeight: '700',
    color: '#FFFFFF',
    textAlign: 'center',
  },
  upgradeContainer: {
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  upgradeText: {
    fontSize: 14,
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: 12,
  },
  upgradeButton: {
    backgroundColor: colors.secondary,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 24,
    boxShadow: '0px 4px 12px rgba(255, 193, 7, 0.2)',
    elevation: 4,
  },
  upgradeButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
  },
});
