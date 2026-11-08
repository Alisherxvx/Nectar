import React from 'react';
import { View, Text, TextInput, Pressable, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, radius } from '../theme';

export default function SearchBar({ value, onChangeText, onPress, placeholder = 'Поиск товаров', autoFocus, style }) {
  const content = (
    <View style={[styles.box, style]}>
      <Ionicons name="search" size={20} color={colors.dark} />
      {onPress ? (
        <Text style={styles.placeholder}>{placeholder}</Text>
      ) : (
        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={colors.gray}
          style={styles.input}
          autoFocus={autoFocus}
          returnKeyType="search"
        />
      )}
      {!onPress && !!value && (
        <Pressable onPress={() => onChangeText('')} hitSlop={10}>
          <Ionicons name="close-circle" size={18} color="#B1B1B1" />
        </Pressable>
      )}
    </View>
  );
  return onPress ? <Pressable onPress={onPress}>{content}</Pressable> : content;
}

const styles = StyleSheet.create({
  box: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.light,
    borderRadius: radius.md,
    paddingHorizontal: 15,
    height: 50,
  },
  placeholder: { marginLeft: 10, color: colors.gray, fontSize: 15, fontWeight: '500' },
  input: { flex: 1, marginLeft: 10, fontSize: 15, fontWeight: '500', color: colors.dark, padding: 0 },
});
