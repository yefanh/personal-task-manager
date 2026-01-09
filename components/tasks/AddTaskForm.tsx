import React from 'react';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';

export interface AddTaskFormValues {
  title: string;
  description: string;
}

interface AddTaskFormProps {
  title: string;
  description: string;
  onChangeTitle: (value: string) => void;
  onChangeDescription: (value: string) => void;
  onSubmit: (values: AddTaskFormValues) => void;
}

export function AddTaskForm({
  title,
  description,
  onChangeTitle,
  onChangeDescription,
  onSubmit,
}: AddTaskFormProps) {
  const canSubmit = title.trim().length > 0;

  const handlePressAdd = () => {
    if (!canSubmit) return;
    onSubmit({ title, description });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add a Task</Text>

      <TextInput
        value={title}
        onChangeText={onChangeTitle}
        placeholder="Title"
        style={styles.input}
        autoCapitalize="sentences"
        returnKeyType="next"
      />

      <TextInput
        value={description}
        onChangeText={onChangeDescription}
        placeholder="Description"
        style={[styles.input, styles.inputMultiline]}
        multiline
        numberOfLines={3}
      />

      <View style={styles.actions}>
        <Button title="Add" onPress={handlePressAdd} disabled={!canSubmit} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 14,
    color: '#111827',
    backgroundColor: '#ffffff',
    marginBottom: 10,
  },
  inputMultiline: {
    textAlignVertical: 'top',
  },
  actions: {
    alignItems: 'flex-start',
  },
});
