import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';

import { TaskCard } from './TaskCard';

import type { Task } from '@/src/types/task';

interface TaskListProps {
  tasks: Task[];
  onTaskPress?: (task: Task) => void;
  onEditPress?: (task: Task) => void;
  onDeletePress?: (task: Task) => void;
  onToggleStatusPress?: (task: Task) => void;
}

// TaskList is a presentational component responsible only for rendering the task list.
// It receives tasks as props and does not manage any state.
// This separation of concerns makes the component reusable and easier to test.
export function TaskList({ tasks, onTaskPress, onEditPress, onDeletePress, onToggleStatusPress }: TaskListProps) {
  const keyExtractor = (t: Task) => t.id;

  const ItemSeparator = () => <View style={styles.separator} />;

  return (
    <FlatList
      data={tasks}
      renderItem={({ item }) => (
        <TaskCard
          task={item}
          onPress={onTaskPress}
          onEditPress={onEditPress}
          onDeletePress={onDeletePress}
          onToggleStatusPress={onToggleStatusPress}
        />
      )}
      keyExtractor={keyExtractor}
      ItemSeparatorComponent={ItemSeparator}
      contentContainerStyle={styles.listContent}
    />
  );
}

const styles = StyleSheet.create({
  listContent: {
    padding: 16,
    paddingTop: 8,
  },
  separator: {
    height: 12,
  },
});
