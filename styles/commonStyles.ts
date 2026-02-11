
import { StyleSheet, ViewStyle, TextStyle } from 'react-native';

// Playful and celebratory color palette! 🎉
export const colors = {
  // Vibrant backgrounds
  background: '#FFF9E6', // Warm cream - cheerful and inviting
  backgroundGradientStart: '#FFE5F0', // Soft pink
  backgroundGradientEnd: '#E0F7FF', // Soft blue
  
  // Text colors
  text: '#2D1B4E', // Deep purple - playful yet readable
  textSecondary: '#7B5FA7', // Medium purple
  textLight: '#A78BCA', // Light purple
  
  // Primary celebration colors
  primary: '#FF6B9D', // Vibrant pink - joyful and energetic
  primaryLight: '#FFB3D9', // Light pink
  primaryDark: '#E5005C', // Deep pink
  
  // Secondary colors
  secondary: '#FFD93D', // Bright yellow - sunshine and happiness
  secondaryLight: '#FFF176', // Light yellow
  
  // Accent colors
  accent: '#6BCF7F', // Fresh green - growth and success
  accentBlue: '#4ECDC4', // Turquoise - calm celebration
  accentOrange: '#FF9F43', // Orange - warmth and energy
  accentPurple: '#A78BFA', // Lavender - playful magic
  
  // UI elements
  card: '#FFFFFF', // Pure white for contrast
  cardShadow: 'rgba(255, 107, 157, 0.15)', // Pink shadow
  highlight: '#FFF3E0', // Warm highlight
  border: '#FFE0F0', // Soft pink border
  
  // Special elements
  gold: '#FFD700', // Gold for achievements
  goldLight: '#FFED4E', // Light gold
  goldShadow: 'rgba(255, 215, 0, 0.4)', // Gold glow
  
  // Upgrade section
  upgradeBackground: '#F3E5F5', // Soft lavender
  upgradeAccent: '#9C27B0', // Purple accent
  
  // Success states
  success: '#6BCF7F',
  successLight: '#B2F5C0',
  
  // Confetti colors (for reference)
  confetti: ['#FF6B9D', '#FFD93D', '#6BCF7F', '#4ECDC4', '#A78BFA', '#FF9F43'],
};

export const buttonStyles = StyleSheet.create({
  instructionsButton: {
    backgroundColor: colors.primary,
    alignSelf: 'center',
    width: '100%',
  },
  backButton: {
    backgroundColor: colors.highlight,
    alignSelf: 'center',
    width: '100%',
  },
});

export const commonStyles = StyleSheet.create({
  wrapper: {
    backgroundColor: colors.background,
    width: '100%',
    height: '100%',
  },
  container: {
    flex: 1,
    backgroundColor: colors.background,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    maxWidth: 800,
    width: '100%',
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
    textAlign: 'center',
    color: colors.text,
    marginBottom: 10
  },
  text: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.text,
    marginBottom: 8,
    lineHeight: 24,
    textAlign: 'center',
  },
  section: {
    width: '100%',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  card: {
    backgroundColor: colors.card,
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    marginVertical: 8,
    width: '100%',
    boxShadow: '0px 2px 3px rgba(0, 0, 0, 0.1)',
    elevation: 2,
  },
  icon: {
    width: 60,
    height: 60,
    tintColor: colors.text,
  },
});
