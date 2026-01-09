import React, { useMemo, useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';

import { mockTasks } from '@/src/data/mockTasks';
import type { Task } from '@/src/types/task';

// FlatList is preferred over ScrollView for large or dynamic lists because
// it renders items lazily and recycles views, improving performance and memory.
// keyExtractor tells FlatList how to uniquely identify each item for stable
// re-rendering and efficient diffing when data changes.
export default function TaskListScreen() {
  // Explicitly type state as Task[] to enforce the shape strictly (no any).
  const [tasks] = useState<Task[]>(mockTasks);

  const renderItem = ({ item }: { item: Task }) => {
    const isCompleted = item.status === 'completed';
    const statusStyle = isCompleted ? styles.statusCompleted : styles.statusPending;

    return (
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Text style={styles.title}>{item.title}</Text>
          <View style={[styles.statusBadge, statusStyle]}>
            <Text style={styles.statusText}>{item.status}</Text>
          </View>
        </View>
        <Text style={styles.description} numberOfLines={1}>
          {item.description}
        </Text>
      </View>
    );
  };

  const keyExtractor = (t: Task) => t.id;

  const itemSeparator = useMemo(
    () => <View style={styles.separator} />,
    []
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={tasks}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        ItemSeparatorComponent={() => itemSeparator}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  listContent: {
    padding: 16,
  },
  card: {
    backgroundColor: '#f9fafb',
    borderRadius: 12,
    padding: 12,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    flex: 1,
    marginRight: 8,
  },
  description: {
    fontSize: 14,
    color: '#4b5563',
  },
  separator: {
    height: 12,
  },
  statusBadge: {
    borderRadius: 999,
    paddingVertical: 4,
    paddingHorizontal: 10,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#111827',
    textTransform: 'capitalize',
  },
  statusCompleted: {
    backgroundColor: '#d1fae5', // green-100
  },
  statusPending: {
    backgroundColor: '#fde68a', // amber-200
  },
});
