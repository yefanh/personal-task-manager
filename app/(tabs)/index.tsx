import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { AddTaskForm } from '@/components/tasks/AddTaskForm';
import { TaskList } from '@/components/tasks/TaskList';

import { mockTasks } from '@/src/data/mockTasks';
import type { Task } from '@/src/types/task';

// TaskListScreen is a smart/container component that manages state and business logic.
// It delegates rendering to presentational components (AddTaskForm and TaskList).
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

  return (
    <View style={styles.container}>
      <AddTaskForm
        title={newTitle}
        description={newDescription}
        onChangeTitle={setNewTitle}
        onChangeDescription={setNewDescription}
        onSubmit={handleSubmitNewTask}
      />

      <TaskList tasks={tasks} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
});

