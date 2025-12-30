
import React, { useState } from "react";
import { 
  StyleSheet, 
  View, 
  Text, 
  ScrollView, 
  TouchableOpacity,
  TextInput,
  Modal,
  Platform,
} from "react-native";
import { colors } from "@/styles/commonStyles";
import { IconSymbol } from "@/components/IconSymbol";

interface Accomplishment {
  id: string;
  text: string;
  date: Date;
}

export default function ProfileScreen() {
  const [isPro, setIsPro] = useState(false);
  const [accomplishments, setAccomplishments] = useState<Accomplishment[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newAccomplishment, setNewAccomplishment] = useState("");

  const handleAddAccomplishment = () => {
    if (newAccomplishment.trim()) {
      const newItem: Accomplishment = {
        id: Date.now().toString(),
        text: newAccomplishment.trim(),
        date: new Date(),
      };
      setAccomplishments([newItem, ...accomplishments]);
      setNewAccomplishment("");
      setShowAddModal(false);
      console.log("Added accomplishment:", newItem);
    }
  };

  const handleDeleteAccomplishment = (id: string) => {
    setAccomplishments(accomplishments.filter(item => item.id !== id));
    console.log("Deleted accomplishment:", id);
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    });
  };

  return (
    <View style={styles.container}>
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={styles.title}>My Accomplishments</Text>
          <Text style={styles.subtitle}>
            Track everything you&apos;ve achieved
          </Text>
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
                // TODO: Integrate Superwall here
                // For demo purposes, let's enable pro mode
                setIsPro(true);
              }}
              activeOpacity={0.8}
            >
              <Text style={styles.upgradeButtonText}>Unlock Pro Features ✨</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.accomplishmentsContainer}>
            <TouchableOpacity 
              style={styles.addButton}
              onPress={() => setShowAddModal(true)}
              activeOpacity={0.8}
            >
              <IconSymbol
                ios_icon_name="plus.circle.fill"
                android_material_icon_name="add_circle"
                size={24}
                color="#FFFFFF"
              />
              <Text style={styles.addButtonText}>Add Accomplishment</Text>
            </TouchableOpacity>

            {accomplishments.length === 0 ? (
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
                  Tap the button above to add your first win!
                </Text>
              </View>
            ) : (
              <View style={styles.list}>
                {accomplishments.map((item) => (
                  <View key={item.id} style={styles.accomplishmentCard}>
                    <View style={styles.accomplishmentContent}>
                      <IconSymbol
                        ios_icon_name="checkmark.circle.fill"
                        android_material_icon_name="check_circle"
                        size={24}
                        color={colors.primary}
                      />
                      <View style={styles.accomplishmentTextContainer}>
                        <Text style={styles.accomplishmentText}>
                          {item.text}
                        </Text>
                        <Text style={styles.accomplishmentDate}>
                          {formatDate(item.date)}
                        </Text>
                      </View>
                    </View>
                    <TouchableOpacity
                      onPress={() => handleDeleteAccomplishment(item.id)}
                      style={styles.deleteButton}
                      activeOpacity={0.7}
                    >
                      <IconSymbol
                        ios_icon_name="trash"
                        android_material_icon_name="delete"
                        size={20}
                        color={colors.textSecondary}
                      />
                    </TouchableOpacity>
                  </View>
                ))}
              </View>
            )}
          </View>
        )}
      </ScrollView>

      <Modal
        visible={showAddModal}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowAddModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Add Accomplishment</Text>
            <TextInput
              style={styles.input}
              placeholder="What did you accomplish?"
              placeholderTextColor={colors.textSecondary}
              value={newAccomplishment}
              onChangeText={setNewAccomplishment}
              multiline
              autoFocus
            />
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => {
                  setShowAddModal(false);
                  setNewAccomplishment("");
                }}
                activeOpacity={0.8}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, styles.saveButton]}
                onPress={handleAddAccomplishment}
                activeOpacity={0.8}
              >
                <Text style={styles.saveButtonText}>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
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
    paddingTop: Platform.OS === 'android' ? 48 : 20,
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
  addButton: {
    backgroundColor: colors.primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 16,
    marginBottom: 24,
    boxShadow: '0px 4px 12px rgba(76, 175, 80, 0.2)',
    elevation: 4,
    gap: 8,
  },
  addButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
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
  },
  list: {
    gap: 12,
  },
  accomplishmentCard: {
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.06)',
    elevation: 2,
  },
  accomplishmentContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
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
  },
  accomplishmentDate: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  deleteButton: {
    padding: 8,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContent: {
    backgroundColor: colors.card,
    borderRadius: 20,
    padding: 24,
    width: '100%',
    maxWidth: 400,
    boxShadow: '0px 8px 24px rgba(0, 0, 0, 0.2)',
    elevation: 8,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 16,
  },
  input: {
    backgroundColor: colors.background,
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    color: colors.text,
    minHeight: 100,
    textAlignVertical: 'top',
    marginBottom: 20,
  },
  modalButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  modalButton: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: colors.highlight,
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
  },
  saveButton: {
    backgroundColor: colors.primary,
  },
  saveButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});
