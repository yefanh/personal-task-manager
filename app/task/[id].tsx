import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { Stack, useLocalSearchParams } from 'expo-router';

import { TaskDetails } from '@/components/tasks/TaskDetails';

import type { TaskStatus } from '@/src/types/task';

type TaskDetailsRouteParams = {
  id?: string;
  title?: string;
  description?: string;
  status?: TaskStatus;
};

export default function TaskDetailsScreen() {
  const params = useLocalSearchParams<TaskDetailsRouteParams>();

  const title = typeof params.title === 'string' ? params.title : '';
  const description = typeof params.description === 'string' ? params.description : '';
  const status: TaskStatus = params.status === 'completed' ? 'completed' : 'pending';

  const hasMinimalData = title.length > 0;

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: 'Task Details' }} />

      {hasMinimalData ? (
        <TaskDetails task={{ title, description, status }} />
      ) : (
        <View style={styles.fallback}>
          <Text style={styles.fallbackTitle}>Task not found</Text>
          <Text style={styles.fallbackText}>
            Please go back and select a task from the list.
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  fallback: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
  },
  fallbackTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 6,
  },
  fallbackText: {
    fontSize: 14,
    color: '#6b7280',
  },
});
