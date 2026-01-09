import React, { useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';

import { AddTaskForm } from '@/components/tasks/AddTaskForm';
import { TaskCard } from '@/components/tasks/TaskCard';

import { mockTasks } from '@/src/data/mockTasks';
import type { Task } from '@/src/types/task';

// FlatList is preferred over ScrollView for large or dynamic lists because
// it renders items lazily and recycles views, improving performance and memory.
// keyExtractor tells FlatList how to uniquely identify each item for stable
// re-rendering and efficient diffing when data changes.
export default function TaskListScreen() {
  // Explicitly type state as Task[] to enforce the shape strictly (no any).
  const [tasks, setTasks] = useState<Task[]>(mockTasks);
  const [newTitle, setNewTitle] = useState<string>('');
  const [newDescription, setNewDescription] = useState<string>('');

  const handleSubmitNewTask = (values: { title: string; description: string }) => {
    // Keep validation minimal: a task must have a non-empty title.
    const title = values.title.trim();
    if (title.length === 0) return;

    const description = values.description.trim();

    const newTask: Task = {
      id: `task-${Date.now()}`,
      title,
      description,
      status: 'pending',
    };

    // Use a functional update to ensure we always append to the latest state.
    setTasks((prevTasks) => [newTask, ...prevTasks]);

    setNewTitle('');
    setNewDescription('');
  };

  const keyExtractor = (t: Task) => t.id;

  const ItemSeparator = () => <View style={styles.separator} />;

  return (
    <View style={styles.container}>
      <AddTaskForm
        title={newTitle}
        description={newDescription}
        onChangeTitle={setNewTitle}
        onChangeDescription={setNewDescription}
        onSubmit={handleSubmitNewTask}
      />

      <FlatList
        data={tasks}
        renderItem={({ item }) => <TaskCard task={item} />}
        keyExtractor={keyExtractor}
        ItemSeparatorComponent={ItemSeparator}
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
    paddingTop: 8,
  },
  separator: {
    height: 12,
  },
});

