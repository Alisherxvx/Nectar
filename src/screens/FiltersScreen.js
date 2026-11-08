import React, { useState } from 'react';
import { View, Text, ScrollView, Pressable, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import PrimaryButton from '../components/PrimaryButton';
import { filterCategories, filterBrands } from '../data/products';
import { useStore } from '../context/StoreContext';
import { colors } from '../theme';

function Check({ label, checked, onPress }) {
  return (
    <Pressable onPress={onPress} style={styles.checkRow}>
      <View style={[styles.box, checked && styles.boxOn]}>{checked && <Ionicons name="checkmark" size={16} color="#fff" />}</View>
      <Text style={[styles.checkLabel, checked && { color: colors.primary }]}>{label}</Text>
    </Pressable>
  );
}

export default function FiltersScreen({ navigation }) {
  const insets = useSafeAreaInsets();
  const { filters, setFilters } = useStore();
  const [cats, setCats] = useState(filters.categories);
  const [brands, setBrands] = useState(filters.brands);

  const toggle = (list, setList, v) => setList(list.includes(v) ? list.filter((x) => x !== v) : [...list, v]);

  return (
    <View style={{ flex: 1, backgroundColor: colors.white }}>
      <View style={[styles.header, { paddingTop: Math.max(insets.top, 16) }]}>
        <Pressable onPress={() => navigation.goBack()} hitSlop={10} style={{ width: 60 }}>
          <Ionicons name="close" size={26} color={colors.dark} />
        </Pressable>
        <Text style={styles.title}>Фильтры</Text>
        <Pressable
          onPress={() => {
            setCats([]);
            setBrands([]);
          }}
          hitSlop={10}
          style={{ width: 60, alignItems: 'flex-end' }}
        >
          <Text style={styles.reset}>Сбросить</Text>
        </Pressable>
      </View>

      <ScrollView style={styles.sheet} contentContainerStyle={{ padding: 24, paddingBottom: 140 }} showsVerticalScrollIndicator={false}>
        <Text style={styles.section}>Категории</Text>
        {filterCategories.map((c) => (
          <Check key={c} label={c} checked={cats.includes(c)} onPress={() => toggle(cats, setCats, c)} />
        ))}

        <Text style={[styles.section, { marginTop: 24 }]}>Бренд</Text>
        {filterBrands.map((b) => (
          <Check key={b} label={b} checked={brands.includes(b)} onPress={() => toggle(brands, setBrands, b)} />
        ))}
      </ScrollView>

      <View style={[styles.footer, { paddingBottom: insets.bottom + 14 }]}>
        <PrimaryButton
          title="Применить"
          onPress={() => {
            setFilters({ categories: cats, brands });
            navigation.goBack();
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingBottom: 14,
  },
  title: { fontSize: 20, fontWeight: '700', color: colors.dark },
  reset: { fontSize: 15, fontWeight: '600', color: colors.primary },
  sheet: { flex: 1, backgroundColor: '#F2F3F2', borderTopLeftRadius: 28, borderTopRightRadius: 28 },
  section: { fontSize: 24, fontWeight: '700', color: colors.dark, marginBottom: 14 },
  checkRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: 9 },
  box: {
    width: 24,
    height: 24,
    borderRadius: 8,
    borderWidth: 1.5,
    borderColor: '#B1B1B1',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  boxOn: { backgroundColor: colors.primary, borderColor: colors.primary },
  checkLabel: { fontSize: 16, fontWeight: '500', color: colors.dark },
  footer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    paddingHorizontal: 24,
    paddingTop: 12,
    backgroundColor: '#F2F3F2',
  },
});
