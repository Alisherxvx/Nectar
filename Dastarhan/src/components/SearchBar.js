import React from 'react';
import { View, Text, TextInput, Pressable, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useStore } from '../context/StoreContext';
import { colors, radius } from '../theme';

export default function SearchBar({ value, onChangeText, onPress, placeholder, autoFocus, style }) {
  const { t } = useStore();
  const ph = placeholder || t('home.search');
  const content = (
    <View style={[styles.box, style]}>
      <Ionicons name="search" size={20} color={colors.gray} />
      {onPress ? (
        <Text style={styles.placeholder}>{ph}</Text>
      ) : (
        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder={ph}
          placeholderTextColor={colors.gray}
          style={styles.input}
          autoFocus={autoFocus}
          returnKeyType="search"
        />
      )}
      {!onPress && !!value && (
        <Pressable onPress={() => onChangeText('')} hitSlop={10}>
          <Ionicons name="close-circle" size={18} color="#B1B9B4" />
        </Pressable>
      )}
    </View>
  );
  return onPress ? <Pressable onPress={onPress}>{content}</Pressable> : content;
}

const styles = StyleSheet.create({
  box: { flexDirection: 'row', alignItems: 'center', backgroundColor: colors.light, borderRadius: radius.md, paddingHorizontal: 15, height: 52 },
  placeholder: { marginLeft: 10, color: colors.gray, fontSize: 15, fontWeight: '500' },
  input: { flex: 1, marginLeft: 10, fontSize: 15, fontWeight: '500', color: colors.dark, padding: 0 },
});
