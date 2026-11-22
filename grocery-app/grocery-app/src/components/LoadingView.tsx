import React from 'react';
import { ActivityIndicator, Pressable, StyleSheet, Text, View } from 'react-native';
import { useProducts } from '../context/ProductsContext';
import { colors } from '../theme/colors';

/** Спиннер во время загрузки и плашка, если API не ответил. */
export function LoadingView() {
  const { loading, error, reload } = useProducts();

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={colors.primary} />
        <Text style={styles.text}>Загрузка товаров...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <Pressable style={styles.banner} onPress={reload}>
        <Text style={styles.bannerText}>Нет связи с API — показаны локальные товары. Нажмите, чтобы повторить.</Text>
      </Pressable>
    );
  }

  return null;
}

const styles = StyleSheet.create({
  center: { alignItems: 'center', paddingVertical: 40, gap: 12 },
  text: { color: colors.textMuted, fontSize: 14 },
  banner: {
    marginHorizontal: 25,
    marginTop: 12,
    padding: 12,
    borderRadius: 12,
    backgroundColor: '#FDE8E4',
  },
  bannerText: { color: colors.danger, fontSize: 13, textAlign: 'center' },
});
