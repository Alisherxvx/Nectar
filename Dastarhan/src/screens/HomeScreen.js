import React from 'react';
import { View, Text, ScrollView, Pressable, StyleSheet, FlatList, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import SearchBar from '../components/SearchBar';
import ProductCard from '../components/ProductCard';
import { collectionProducts, groceryPicks, categories } from '../data/products';
import { useStore } from '../context/StoreContext';
import { formatPrice } from '../utils/format';
import { FREE_DELIVERY_FROM } from '../config';
import { colors, radius } from '../theme';

const { width: W } = Dimensions.get('window');
const BANNER_W = W - 40;

function Section({ title, onSeeAll, children, seeAll }) {
  return (
    <View style={{ marginTop: 28 }}>
      <View style={styles.sectionHead}>
        <Text style={styles.sectionTitle}>{title}</Text>
        <Pressable onPress={onSeeAll} hitSlop={8}>
          <Text style={styles.seeAll}>{seeAll}</Text>
        </Pressable>
      </View>
      {children}
    </View>
  );
}

function HList({ data }) {
  return (
    <FlatList
      horizontal
      data={data}
      keyExtractor={(i) => i.id}
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ paddingHorizontal: 20, paddingVertical: 8 }}
      ItemSeparatorComponent={() => <View style={{ width: 14 }} />}
      renderItem={({ item }) => <ProductCard product={item} width={170} />}
    />
  );
}

export default function HomeScreen({ navigation }) {
  const insets = useSafeAreaInsets();
  const { t, currentAddress, addressText } = useStore();

  const banners = [
    { id: 'b1', colors: ['#0F8A5F', '#3FBF8A'], emoji: '🥬', title: t('home.b1.title'), sub: t('home.b1.sub'), go: () => navigation.navigate('Category', { collection: 'exclusive' }) },
    { id: 'b2', colors: ['#FF9F1C', '#FFC15E'], emoji: '🚚', title: t('home.b2.title'), sub: t('home.b2.sub', { amount: formatPrice(FREE_DELIVERY_FROM) }), go: () => navigation.navigate('Category', { collection: 'best' }) },
    { id: 'b3', colors: ['#7A3E1D', '#B8693B'], emoji: '🧀', title: t('home.b3.title'), sub: t('home.b3.sub'), go: () => navigation.navigate('Category', { id: 'dairy' }) },
  ];

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: colors.white }}
      contentContainerStyle={{ paddingTop: insets.top + 10, paddingBottom: 30 }}
      showsVerticalScrollIndicator={false}
    >
      <Pressable style={styles.location} onPress={() => navigation.navigate('Addresses')}>
        <View style={styles.pin}>
          <Ionicons name="location" size={18} color={colors.primary} />
        </View>
        <View style={{ flex: 1, marginLeft: 10 }}>
          <Text style={styles.locLabel}>{t('home.deliverTo')}</Text>
          <Text style={styles.locText} numberOfLines={1}>{currentAddress ? addressText(currentAddress) : t('home.noAddress')}</Text>
        </View>
        <Ionicons name="chevron-down" size={18} color={colors.gray} />
      </Pressable>

      <View style={{ paddingHorizontal: 20, marginTop: 16 }}>
        <SearchBar onPress={() => navigation.navigate('Search')} />
      </View>

      <FlatList
        horizontal
        data={banners}
        keyExtractor={(b) => b.id}
        showsHorizontalScrollIndicator={false}
        snapToInterval={BANNER_W + 12}
        decelerationRate="fast"
        contentContainerStyle={{ paddingHorizontal: 20, paddingTop: 18 }}
        ItemSeparatorComponent={() => <View style={{ width: 12 }} />}
        renderItem={({ item }) => (
          <Pressable onPress={item.go}>
            <LinearGradient colors={item.colors} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={[styles.banner, { width: BANNER_W }]}>
              <View style={{ flex: 1 }}>
                <Text style={styles.bannerTitle}>{item.title}</Text>
                <Text style={styles.bannerSub}>{item.sub}</Text>
              </View>
              <Text style={styles.bannerEmoji}>{item.emoji}</Text>
            </LinearGradient>
          </Pressable>
        )}
      />

      <Section title={t('home.categories')} seeAll={t('common.all')} onSeeAll={() => navigation.navigate('Explore')}>
        <FlatList
          horizontal
          data={categories}
          keyExtractor={(c) => c.id}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 20, paddingVertical: 6 }}
          ItemSeparatorComponent={() => <View style={{ width: 12 }} />}
          renderItem={({ item }) => (
            <Pressable onPress={() => navigation.navigate('Category', { id: item.id })} style={styles.catItem}>
              <View style={[styles.catCircle, { backgroundColor: item.bg, borderColor: item.border }]}>
                <Text style={{ fontSize: 30 }}>{item.emoji}</Text>
              </View>
              <Text style={styles.catLabel} numberOfLines={2}>{t('cat.' + item.id)}</Text>
            </Pressable>
          )}
        />
      </Section>

      <Section title={t('home.exclusive')} seeAll={t('common.all')} onSeeAll={() => navigation.navigate('Category', { collection: 'exclusive' })}>
        <HList data={collectionProducts('exclusive')} />
      </Section>
      <Section title={t('home.best')} seeAll={t('common.all')} onSeeAll={() => navigation.navigate('Category', { collection: 'best' })}>
        <HList data={collectionProducts('best')} />
      </Section>
      <Section title={t('home.groceries')} seeAll={t('common.all')} onSeeAll={() => navigation.navigate('Explore')}>
        <HList data={groceryPicks} />
      </Section>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  location: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20 },
  pin: { width: 38, height: 38, borderRadius: 19, backgroundColor: colors.primarySoft, alignItems: 'center', justifyContent: 'center' },
  locLabel: { fontSize: 12, color: colors.gray, fontWeight: '600' },
  locText: { fontSize: 16, fontWeight: '800', color: colors.dark, marginTop: 1 },
  banner: { height: 130, borderRadius: radius.xl, padding: 20, flexDirection: 'row', alignItems: 'center', overflow: 'hidden' },
  bannerTitle: { color: '#fff', fontSize: 22, fontWeight: '800' },
  bannerSub: { color: 'rgba(255,255,255,0.92)', fontSize: 14, fontWeight: '600', marginTop: 6, maxWidth: 190 },
  bannerEmoji: { fontSize: 64 },
  sectionHead: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, marginBottom: 6 },
  sectionTitle: { fontSize: 21, fontWeight: '800', color: colors.dark },
  seeAll: { fontSize: 15, fontWeight: '700', color: colors.primary },
  catItem: { width: 78, alignItems: 'center' },
  catCircle: { width: 66, height: 66, borderRadius: 33, borderWidth: 1.5, alignItems: 'center', justifyContent: 'center' },
  catLabel: { marginTop: 8, fontSize: 12, fontWeight: '600', color: colors.dark, textAlign: 'center' },
});
