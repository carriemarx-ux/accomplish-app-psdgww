
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
    if (Platform.OS === 'ios') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    } else if (Platform.OS === 'android') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }

    // Trigger confetti
    if (confettiRef.current) {
      confettiRef.current.start();
    }

    // Increment celebration count
    setCelebrationCount(prev => prev + 1);
  };

  return (
    <View style={styles.container}>
      {/* Header Section - Full Width */}
      <View style={styles.headerSection}>
        <Text style={styles.title}>Celebrate Your Wins!</Text>
        <View style={styles.counterRow}>
          <View style={styles.counterContainer}>
            <Text style={styles.counterText}>🎉 {celebrationCount}</Text>
          </View>
        </View>
      </View>

      {/* Main Content */}
      <View style={styles.content}>
        <TouchableOpacity 
          style={styles.button}
          onPress={handlePress}
          activeOpacity={0.8}
        >
          <Text style={styles.buttonText}>I did it!</Text>
        </TouchableOpacity>

        <Text style={styles.subtitle}>
          Press the button every time you accomplish something
        </Text>
      </View>

      {/* Upgrade Section - Moved higher to avoid tab bar overlap */}
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
  headerSection: {
    paddingTop: Platform.OS === 'android' ? 48 : 60,
    paddingHorizontal: 20,
    width: '100%',
    marginBottom: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: '800',
    color: colors.text,
    width: '100%',
    marginBottom: 12,
    textAlign: 'center',
  },
  counterRow: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  counterContainer: {
    backgroundColor: colors.card,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
    elevation: 2,
  },
  counterText: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  button: {
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: colors.gold,
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0px 12px 40px rgba(255, 215, 0, 0.5)',
    elevation: 12,
    borderWidth: 4,
    borderColor: colors.goldLight,
  },
  buttonText: {
    fontSize: 32,
    fontWeight: '800',
    color: '#FFFFFF',
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  subtitle: {
    fontSize: 16,
    color: colors.textSecondary,
    textAlign: 'center',
    marginTop: 32,
    paddingHorizontal: 20,
  },
  upgradeContainer: {
    backgroundColor: colors.lightBlue,
    paddingVertical: 20,
    paddingHorizontal: 20,
    paddingBottom: 120,
    alignItems: 'center',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    boxShadow: '0px -4px 20px rgba(0, 0, 0, 0.1)',
    elevation: 8,
  },
  upgradeText: {
    fontSize: 15,
    color: colors.text,
    textAlign: 'center',
    marginBottom: 12,
    fontWeight: '500',
  },
  upgradeButton: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 24,
    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.15)',
    elevation: 4,
  },
  upgradeButtonText: {
    fontSize: 17,
    fontWeight: '700',
    color: colors.text,
  },
});
