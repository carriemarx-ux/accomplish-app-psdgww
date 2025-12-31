
import React, { useState, useEffect, useCallback } from "react";
import { 
  StyleSheet, 
  View, 
  Text, 
  ScrollView, 
  TouchableOpacity,
  RefreshControl,
} from "react-native";
import { colors } from "@/styles/commonStyles";
import { IconSymbol } from "@/components/IconSymbol";
import { getAccomplishmentsByDate, formatDate, type AccomplishmentsByDate } from "@/utils/storageService";
import { useFocusEffect } from "expo-router";

export default function ProfileScreen() {
  const [isPro, setIsPro] = useState(true); // Set to true to show pro version
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

  // Load accomplishments when screen comes into focus
  useFocusEffect(
    useCallback(() => {
      loadAccomplishments();
    }, [])
  );

  // Initial load
  useEffect(() => {
    loadAccomplishments();
  }, []);

  const getTotalCount = () => {
    return accomplishmentsByDate.reduce(
      (total, dateGroup) => total + dateGroup.accomplishments.length,
      0
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View style={styles.header}>
          <Text style={styles.title}>My Accomplishments</Text>
          {isPro && accomplishmentsByDate.length > 0 && (
            <Text style={styles.subtitle}>
              {getTotalCount()} total wins 🎉
            </Text>
          )}
        </View>

        {!isPro ? (
          <View style={styles.proPrompt}>
            <View style={styles.proIcon}>
              <IconSymbol
                ios_icon_name="star.fill"
                android_material_icon_name="star"
                size={48}
                color={colors.secondary}
              />
            </View>
            <Text style={styles.proTitle}>Upgrade to Pro</Text>
            <Text style={styles.proDescription}>
              Track what you accomplished with dates and notes. Never forget your wins!
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
                <Text style={styles.emptyStateText}>Loading...</Text>
              </View>
            ) : accomplishmentsByDate.length === 0 ? (
              <View style={styles.emptyState}>
                <IconSymbol
                  ios_icon_name="checkmark.circle"
                  android_material_icon_name="check_circle"
                  size={64}
                  color={colors.highlight}
                />
                <Text style={styles.emptyStateText}>
                  No accomplishments yet
                </Text>
                <Text style={styles.emptyStateSubtext}>
                  Go to the home screen and press &quot;I did it!&quot; to record your first win!
                </Text>
              </View>
            ) : (
              <View style={styles.list}>
                {accomplishmentsByDate.map((dateGroup, dateIndex) => (
                  <React.Fragment key={dateIndex}>
                    <View style={styles.dateHeader}>
                      <Text style={styles.dateText}>
                        {formatDate(dateGroup.date)}
                      </Text>
                      <View style={styles.dateBadge}>
                        <Text style={styles.dateBadgeText}>
                          {dateGroup.accomplishments.length}
                        </Text>
                      </View>
                    </View>
                    {dateGroup.accomplishments.map((item, itemIndex) => (
                      <View key={itemIndex} style={styles.accomplishmentCard}>
                        <View style={styles.accomplishmentContent}>
                          <IconSymbol
                            ios_icon_name="star.fill"
                            android_material_icon_name="star"
                            size={24}
                            color={colors.primary}
                          />
                          <View style={styles.accomplishmentTextContainer}>
                            <Text style={styles.accomplishmentText}>
                              {item.text}
                            </Text>
                            <Text style={styles.accomplishmentTime}>
                              {new Date(item.date).toLocaleTimeString('en-US', {
                                hour: 'numeric',
                                minute: '2-digit',
                                hour12: true,
                              })}
                            </Text>
                          </View>
                        </View>
                      </View>
                    ))}
                  </React.Fragment>
                ))}
              </View>
            )}
          </View>
        )}
      </ScrollView>
    </View>
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
  },
  title: {
    fontSize: 32,
    fontWeight: '800',
    color: colors.text,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: colors.textSecondary,
  },
  proPrompt: {
    backgroundColor: colors.card,
    borderRadius: 20,
    padding: 32,
    alignItems: 'center',
    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.08)',
    elevation: 3,
  },
  proIcon: {
    marginBottom: 16,
  },
  proTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 12,
  },
  proDescription: {
    fontSize: 16,
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 24,
  },
  upgradeButton: {
    backgroundColor: colors.secondary,
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 24,
    boxShadow: '0px 4px 12px rgba(255, 193, 7, 0.2)',
    elevation: 4,
  },
  upgradeButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
  },
  accomplishmentsContainer: {
    flex: 1,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  emptyStateText: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    marginTop: 16,
    marginBottom: 8,
  },
  emptyStateSubtext: {
    fontSize: 14,
    color: colors.textSecondary,
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  list: {
    gap: 12,
  },
  dateHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 16,
    marginBottom: 12,
    paddingHorizontal: 4,
  },
  dateText: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
  },
  dateBadge: {
    backgroundColor: colors.primary,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  dateBadgeText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  accomplishmentCard: {
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 16,
    marginBottom: 8,
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.06)',
    elevation: 2,
  },
  accomplishmentContent: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },
  accomplishmentTextContainer: {
    flex: 1,
  },
  accomplishmentText: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.text,
    marginBottom: 4,
    lineHeight: 22,
  },
  accomplishmentTime: {
    fontSize: 12,
    color: colors.textSecondary,
  },
});
