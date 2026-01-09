import React, { useEffect, useState } from 'react';
import { Button, Modal, StyleSheet, Text, TextInput, View } from 'react-native';

import type { Task } from '@/src/types/task';

interface EditTaskFormProps {
  task: Task;
  visible: boolean;
  onSave: (updatedTask: Omit<Task, 'id' | 'status'>) => void;
  onCancel: () => void;
}

// EditTaskForm is a modal form component for editing an existing task.
// It pre-populates the form with the task's current title and description.
// Changes are saved only when the user confirms (onSave callback is invoked).
export function EditTaskForm({ task, visible, onSave, onCancel }: EditTaskFormProps) {
  const [title, setTitle] = useState<string>(task.title);
  const [description, setDescription] = useState<string>(task.description);

  useEffect(() => {
    if (!visible) return;
    setTitle(task.title);
    setDescription(task.description);
  }, [task.id, task.title, task.description, visible]);

  // When modal closes, reset form state to task's current values.
  const handleCancel = () => {
    setTitle(task.title);
    setDescription(task.description);
    onCancel();
  };

  const canSave = title.trim().length > 0;

  const handleSave = () => {
    if (!canSave) return;
    onSave({
      title: title.trim(),
      description: description.trim(),
    });
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      onRequestClose={handleCancel}
      presentationStyle="pageSheet"
    >
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Edit Task</Text>
        </View>

        <View style={styles.form}>
          <TextInput
            value={title}
            onChangeText={setTitle}
            placeholder="Title"
            style={styles.input}
            autoCapitalize="sentences"
            returnKeyType="next"
          />

          <TextInput
            value={description}
            onChangeText={setDescription}
            placeholder="Description"
            style={[styles.input, styles.inputMultiline]}
            multiline
            numberOfLines={3}
          />
        </View>

        <View style={styles.actions}>
          <Button title="Cancel" onPress={handleCancel} color="#6b7280" />
          <Button title="Save" onPress={handleSave} disabled={!canSave} />
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  header: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111827',
  },
  form: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 14,
    color: '#111827',
    backgroundColor: '#f9fafb',
    marginBottom: 12,
  },
  inputMultiline: {
    textAlignVertical: 'top',
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingBottom: 16,
    gap: 8,
  },
});
