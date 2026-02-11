
import React, { useState, useEffect, useCallback } from "react";
import { 
  StyleSheet, 
  View, 
  Text, 
  ScrollView, 
  TouchableOpacity,
  RefreshControl,
} from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from "@/styles/commonStyles";
import { IconSymbol } from "@/components/IconSymbol";
import { getAccomplishmentsByDate, formatDate, type AccomplishmentsByDate } from "@/utils/storageService";
import { useFocusEffect } from "expo-router";

export default function ProfileScreen() {
  const [isPro, setIsPro] = useState(true);
  const [accomplishmentsByDate, setAccomplishmentsByDate] = useState<AccomplishmentsByDate[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);

  const loadAccomplishments = async () => {
    try {
      console.log("Loading accomplishments...");
      const data = await getAccomplishmentsByDate();
      setAccomplishmentsByDate(data);
      console.log("Loaded accomplishments:", data.length, "dates");
    } catch (error) {
      console.error("Error loading accomplishments:", error);
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadAccomplishments();
    setRefreshing(false);
  };

  useFocusEffect(
    useCallback(() => {
      loadAccomplishments();
    }, [])
  );

  useEffect(() => {
    loadAccomplishments();
  }, []);

  const getTotalCount = () => {
    return accomplishmentsByDate.reduce(
      (total, dateGroup) => total + dateGroup.accomplishments.length,
      0
    );
  };

  const totalCountValue = getTotalCount();

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View style={styles.header}>
          <Text style={styles.headerEmoji}>🏆</Text>
          <Text style={styles.title}>My Wins</Text>
          {isPro && accomplishmentsByDate.length > 0 && (
            <View style={styles.statsContainer}>
              <View style={styles.statBadge}>
                <Text style={styles.statNumber}>{totalCountValue}</Text>
                <Text style={styles.statLabel}>total wins</Text>
              </View>
            </View>
          )}
        </View>

        {!isPro ? (
          <View style={styles.proPrompt}>
            <Text style={styles.proEmoji}>⭐</Text>
            <Text style={styles.proTitle}>Unlock Your Win History</Text>
            <Text style={styles.proDescription}>
              Track what you did with dates and notes. Never forget your amazing achievements! 🌟
            </Text>
            <TouchableOpacity 
              style={styles.upgradeButton}
              onPress={() => {
                console.log("Upgrade to Pro pressed - Superwall integration needed");
                setIsPro(true);
              }}
              activeOpacity={0.8}
            >
              <Text style={styles.upgradeButtonText}>Unlock Pro Features ✨</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.accomplishmentsContainer}>
            {loading ? (
              <View style={styles.emptyState}>
                <Text style={styles.loadingEmoji}>⏳</Text>
                <Text style={styles.emptyStateText}>Loading your wins...</Text>
              </View>
            ) : accomplishmentsByDate.length === 0 ? (
              <View style={styles.emptyState}>
                <Text style={styles.emptyEmoji}>🎯</Text>
                <Text style={styles.emptyStateText}>
                  No wins yet!
                </Text>
                <Text style={styles.emptyStateSubtext}>
                  Go to the home screen and press &quot;I did it!&quot; to record your first amazing win! 🌈
                </Text>
              </View>
            ) : (
              <View style={styles.list}>
                {accomplishmentsByDate.map((dateGroup, dateIndex) => {
                  const formattedDate = formatDate(dateGroup.date);
                  const accomplishmentCount = dateGroup.accomplishments.length;
                  
                  return (
                    <React.Fragment key={dateIndex}>
                      <View style={styles.dateHeader}>
                        <Text style={styles.dateText}>
                          {formattedDate}
                        </Text>
                        <View style={styles.dateBadge}>
                          <Text style={styles.dateBadgeText}>
                            {accomplishmentCount}
                          </Text>
                        </View>
                      </View>
                      {dateGroup.accomplishments.map((item, itemIndex) => {
                        const timeString = new Date(item.date).toLocaleTimeString('en-US', {
                          hour: 'numeric',
                          minute: '2-digit',
                          hour12: true,
                        });
                        
                        return (
                          <View key={itemIndex} style={styles.accomplishmentCard}>
                            <View style={styles.accomplishmentContent}>
                              <View style={styles.iconContainer}>
                                <IconSymbol
                                  ios_icon_name="star.fill"
                                  android_material_icon_name="star"
                                  size={28}
                                  color={colors.secondary}
                                />
                              </View>
                              <View style={styles.accomplishmentTextContainer}>
                                <Text style={styles.accomplishmentText}>
                                  {item.text}
                                </Text>
                                <Text style={styles.accomplishmentTime}>
                                  {timeString}
                                </Text>
                              </View>
                            </View>
                          </View>
                        );
                      })}
                    </React.Fragment>
                  );
                })}
              </View>
            )}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingTop: 20,
    paddingHorizontal: 20,
    paddingBottom: 120,
  },
  header: {
    marginBottom: 32,
    alignItems: 'center',
  },
  headerEmoji: {
    fontSize: 48,
    marginBottom: 8,
  },
  title: {
    fontSize: 36,
    fontWeight: '900',
    color: colors.text,
    marginBottom: 16,
    letterSpacing: -0.5,
  },
  statsContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  statBadge: {
    backgroundColor: colors.card,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 20,
    alignItems: 'center',
    boxShadow: `0px 4px 16px ${colors.cardShadow}`,
    elevation: 4,
    borderWidth: 2,
    borderColor: colors.accent,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: '900',
    color: colors.accent,
  },
  statLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.textSecondary,
    marginTop: 2,
  },
  proPrompt: {
    backgroundColor: colors.card,
    borderRadius: 24,
    padding: 40,
    alignItems: 'center',
    boxShadow: `0px 8px 24px ${colors.cardShadow}`,
    elevation: 6,
    borderWidth: 2,
    borderColor: colors.border,
  },
  proEmoji: {
    fontSize: 72,
    marginBottom: 16,
  },
  proTitle: {
    fontSize: 26,
    fontWeight: '900',
    color: colors.text,
    marginBottom: 12,
    textAlign: 'center',
  },
  proDescription: {
    fontSize: 16,
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: 28,
    lineHeight: 24,
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
  accomplishmentsContainer: {
    flex: 1,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 80,
  },
  emptyEmoji: {
    fontSize: 80,
    marginBottom: 16,
  },
  loadingEmoji: {
    fontSize: 64,
    marginBottom: 16,
  },
  emptyStateText: {
    fontSize: 22,
    fontWeight: '800',
    color: colors.text,
    marginBottom: 12,
  },
  emptyStateSubtext: {
    fontSize: 16,
    color: colors.textSecondary,
    textAlign: 'center',
    paddingHorizontal: 20,
    lineHeight: 24,
    fontWeight: '500',
  },
  list: {
    gap: 12,
  },
  dateHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 20,
    marginBottom: 16,
    paddingHorizontal: 4,
  },
  dateText: {
    fontSize: 20,
    fontWeight: '800',
    color: colors.text,
  },
  dateBadge: {
    backgroundColor: colors.accentBlue,
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 16,
    boxShadow: '0px 2px 8px rgba(78, 205, 196, 0.3)',
    elevation: 3,
  },
  dateBadgeText: {
    fontSize: 16,
    fontWeight: '800',
    color: colors.card,
  },
  accomplishmentCard: {
    backgroundColor: colors.card,
    borderRadius: 20,
    padding: 20,
    marginBottom: 12,
    boxShadow: `0px 4px 16px ${colors.cardShadow}`,
    elevation: 4,
    borderWidth: 2,
    borderColor: colors.border,
  },
  accomplishmentContent: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 16,
  },
  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.highlight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  accomplishmentTextContainer: {
    flex: 1,
  },
  accomplishmentText: {
    fontSize: 17,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 6,
    lineHeight: 24,
  },
  accomplishmentTime: {
    fontSize: 13,
    color: colors.textSecondary,
    fontWeight: '600',
  },
});
