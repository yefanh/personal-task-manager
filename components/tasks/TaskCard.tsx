import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';

import type { Task } from '@/src/types/task';

interface TaskCardProps {
  task: Task;
  onEditPress?: (task: Task) => void;
  onDeletePress?: (task: Task) => void;
}

export function TaskCard({ task, onEditPress, onDeletePress }: TaskCardProps) {
  const isCompleted = task.status === 'completed';
  const statusStyle = isCompleted ? styles.statusCompleted : styles.statusPending;

  return (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Text style={styles.title}>{task.title}</Text>
        <View style={[styles.statusBadge, statusStyle]}>
          <Text style={styles.statusText}>{task.status}</Text>
        </View>
      </View>
      <Text style={styles.description} numberOfLines={1}>
        {task.description}
      </Text>
      {(onEditPress || onDeletePress) && (
        <View style={styles.actions}>
          {onEditPress && <Button title="Edit" onPress={() => onEditPress(task)} color="#3b82f6" />}
          {onDeletePress && (
            <Button title="Delete" onPress={() => onDeletePress(task)} color="#ef4444" />
          )}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
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
    marginBottom: 8,
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
    backgroundColor: '#d1fae5',
  },
  statusPending: {
    backgroundColor: '#fde68a',
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
    paddingTop: 8,
  },
});
