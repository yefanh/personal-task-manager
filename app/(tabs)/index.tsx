import React, { useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';

import { AddTaskForm } from '@/components/tasks/AddTaskForm';
import { EditTaskForm } from '@/components/tasks/EditTaskForm';
import { TaskList } from '@/components/tasks/TaskList';

import { mockTasks } from '@/src/data/mockTasks';
import type { Task } from '@/src/types/task';

// TaskListScreen is a smart/container component that manages state and business logic.
// It delegates rendering to presentational components (AddTaskForm, TaskList, and EditTaskForm).
export default function TaskListScreen() {
  // Explicitly type state as Task[] to enforce the shape strictly (no any).
  const [tasks, setTasks] = useState<Task[]>(mockTasks);
  const [newTitle, setNewTitle] = useState<string>('');
  const [newDescription, setNewDescription] = useState<string>('');
  const [editingTask, setEditingTask] = useState<Task | null>(null);

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

  // Handle opening the edit form when user taps Edit on a task card.
  const handleEditPress = (task: Task) => {
    setEditingTask(task);
  };

  // Handle saving changes to an edited task.
  // Find the task by id and update its title and description while preserving id and status.
  const handleSaveEdit = (updatedData: Omit<Task, 'id' | 'status'>) => {
    if (!editingTask) return;

    setTasks((prevTasks) =>
      prevTasks.map((t) =>
        t.id === editingTask.id
          ? { ...t, title: updatedData.title, description: updatedData.description }
          : t
      )
    );

    setEditingTask(null);
  };

  const handleCancelEdit = () => {
    setEditingTask(null);
  };

  const handleDeletePress = (task: Task) => {
    Alert.alert('Delete task?', 'This action cannot be undone.', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: () => {
          setTasks((prevTasks) => prevTasks.filter((t) => t.id !== task.id));
          if (editingTask?.id === task.id) setEditingTask(null);
        },
      },
    ]);
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

      <TaskList tasks={tasks} onEditPress={handleEditPress} onDeletePress={handleDeletePress} />

      {editingTask && (
        <EditTaskForm
          task={editingTask}
          visible={!!editingTask}
          onSave={handleSaveEdit}
          onCancel={handleCancelEdit}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
});

