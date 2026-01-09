import React from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';

interface TaskSearchBarProps {
  value: string;
  onChangeValue: (nextValue: string) => void;
}

export function TaskSearchBar({ value, onChangeValue }: TaskSearchBarProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Search</Text>
      <TextInput
        value={value}
        onChangeText={onChangeValue}
        placeholder="Search tasks by title"
        style={styles.input}
        autoCapitalize="none"
        autoCorrect={false}
        clearButtonMode="while-editing"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingTop: 8,
  },
  label: {
    fontSize: 12,
    fontWeight: '700',
    color: '#6b7280',
    marginBottom: 6,
    textTransform: 'uppercase',
    letterSpacing: 0.6,
  },
  input: {
    height: 44,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 12,
    paddingHorizontal: 12,
    backgroundColor: '#ffffff',
    color: '#111827',
  },
});
