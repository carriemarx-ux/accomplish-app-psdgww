
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = '@accomplishments';

export interface Accomplishment {
  id: string;
  text: string;
  date: string; // ISO string format
}

export interface AccomplishmentsByDate {
  date: string; // YYYY-MM-DD format
  accomplishments: Accomplishment[];
}

/**
 * Save a new accomplishment to storage
 */
export const saveAccomplishment = async (text: string): Promise<void> => {
  try {
    const accomplishment: Accomplishment = {
      id: Date.now().toString(),
      text: text.trim(),
      date: new Date().toISOString(),
    };

    const existing = await getAllAccomplishments();
    const updated = [accomplishment, ...existing];
    
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    console.log('Accomplishment saved successfully:', accomplishment);
  } catch (error) {
    console.error('Error saving accomplishment:', error);
    
    // Check if it's a storage quota error
    if (error instanceof Error && error.message.includes('QuotaExceededError')) {
      throw new Error('STORAGE_FULL');
    }
    throw error;
  }
};

/**
 * Get all accomplishments from storage
 */
export const getAllAccomplishments = async (): Promise<Accomplishment[]> => {
  try {
    const data = await AsyncStorage.getItem(STORAGE_KEY);
    if (data) {
      return JSON.parse(data);
    }
    return [];
  } catch (error) {
    console.error('Error loading accomplishments:', error);
    return [];
  }
};

/**
 * Get accomplishments grouped by date, sorted newest first
 */
export const getAccomplishmentsByDate = async (): Promise<AccomplishmentsByDate[]> => {
  try {
    const accomplishments = await getAllAccomplishments();
    
    // Group by date
    const grouped = new Map<string, Accomplishment[]>();
    
    accomplishments.forEach((item) => {
      const date = new Date(item.date);
      const dateKey = date.toISOString().split('T')[0]; // YYYY-MM-DD
      
      if (!grouped.has(dateKey)) {
        grouped.set(dateKey, []);
      }
      grouped.get(dateKey)!.push(item);
    });
    
    // Convert to array and sort by date (newest first)
    const result: AccomplishmentsByDate[] = Array.from(grouped.entries())
      .map(([date, accomplishments]) => ({
        date,
        accomplishments,
      }))
      .sort((a, b) => b.date.localeCompare(a.date));
    
    return result;
  } catch (error) {
    console.error('Error grouping accomplishments by date:', error);
    return [];
  }
};

/**
 * Delete a specific accomplishment
 */
export const deleteAccomplishment = async (id: string): Promise<void> => {
  try {
    const existing = await getAllAccomplishments();
    const updated = existing.filter((item) => item.id !== id);
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    console.log('Accomplishment deleted successfully:', id);
  } catch (error) {
    console.error('Error deleting accomplishment:', error);
    throw error;
  }
};

/**
 * Clear all accomplishments (for testing purposes)
 */
export const clearAllAccomplishments = async (): Promise<void> => {
  try {
    await AsyncStorage.removeItem(STORAGE_KEY);
    console.log('All accomplishments cleared');
  } catch (error) {
    console.error('Error clearing accomplishments:', error);
    throw error;
  }
};

/**
 * Format a date string for display
 */
export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  
  const dateKey = date.toISOString().split('T')[0];
  const todayKey = today.toISOString().split('T')[0];
  const yesterdayKey = yesterday.toISOString().split('T')[0];
  
  if (dateKey === todayKey) {
    return 'Today';
  } else if (dateKey === yesterdayKey) {
    return 'Yesterday';
  } else {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });
  }
};
