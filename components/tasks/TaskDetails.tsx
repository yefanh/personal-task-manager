import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import type { Task } from '@/src/types/task';

interface TaskDetailsProps {
  task: Pick<Task, 'title' | 'description' | 'status'>;
}

export function TaskDetails({ task }: TaskDetailsProps) {
  const isCompleted = task.status === 'completed';
  const statusStyle = isCompleted ? styles.statusCompleted : styles.statusPending;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{task.title}</Text>
        <View style={[styles.statusBadge, statusStyle]}>
          <Text style={styles.statusText}>{task.status}</Text>
        </View>
      </View>

      <Text style={styles.label}>Description</Text>
      <Text style={styles.description}>{task.description || '—'}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#ffffff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111827',
    flex: 1,
    marginRight: 12,
  },
  statusBadge: {
    borderRadius: 999,
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#111827',
    textTransform: 'capitalize',
  },
  statusCompleted: {
    backgroundColor: '#d1fae5',
  },
  statusPending: {
    backgroundColor: '#fde68a',
  },
  label: {
    fontSize: 12,
    fontWeight: '700',
    color: '#6b7280',
    marginBottom: 6,
    textTransform: 'uppercase',
    letterSpacing: 0.6,
  },
  description: {
    fontSize: 16,
    color: '#111827',
    lineHeight: 22,
  },
});
