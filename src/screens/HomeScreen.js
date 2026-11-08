import React from 'react';
import { View, Text, ScrollView, Pressable, StyleSheet, FlatList, ImageBackground } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import SearchBar from '../components/SearchBar';
import ProductCard from '../components/ProductCard';
import ProductImage from '../components/ProductImage';
import { exclusiveOffer, bestSelling, groceries, groceryChips } from '../data/products';
import { colors, radius, shadow } from '../theme';

function Section({ title, onSeeAll, children }) {
  return (
    <View style={{ marginTop: 26 }}>
      <View style={styles.sectionHead}>
        <Text style={styles.sectionTitle}>{title}</Text>
        <Pressable onPress={onSeeAll} hitSlop={8}>
          <Text style={styles.seeAll}>Все</Text>
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
      renderItem={({ item }) => <ProductCard product={item} width={172} />}
    />
  );
}

export default function HomeScreen({ navigation }) {
  const insets = useSafeAreaInsets();

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: colors.white }}
      contentContainerStyle={{ paddingTop: insets.top + 12, paddingBottom: 30 }}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.location}>
        <Ionicons name="location-sharp" size={18} color={colors.dark} />
        <Text style={styles.locationText}>Алматы, Казахстан</Text>
      </View>

      <View style={{ paddingHorizontal: 20, marginTop: 18 }}>
        <SearchBar onPress={() => navigation.navigate('Search')} />
      </View>

      <View style={{ paddingHorizontal: 20, marginTop: 20 }}>
        <ImageBackground
          source={{ uri: 'https://loremflickr.com/900/450/vegetables,market?lock=90' }}
          style={styles.banner}
          imageStyle={{ borderRadius: radius.lg }}
        >
          <View style={styles.bannerShade} />
          <View style={styles.bannerContent}>
            <Text style={styles.bannerTitle}>Свежие овощи</Text>
            <Text style={styles.bannerSub}>Скидки до 40%</Text>
          </View>
        </ImageBackground>
      </View>

      <Section title="Эксклюзивные предложения" onSeeAll={() => navigation.navigate('Category', { id: 'fruits' })}>
        <HList data={exclusiveOffer} />
      </Section>

      <Section title="Хиты продаж" onSeeAll={() => navigation.navigate('Category', { id: 'fruits' })}>
        <HList data={bestSelling} />
      </Section>

      <Section title="Продукты" onSeeAll={() => navigation.navigate('Category', { id: 'dairy' })}>
        <FlatList
          horizontal
          data={groceryChips}
          keyExtractor={(i) => i.id}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 20, paddingVertical: 6 }}
          ItemSeparatorComponent={() => <View style={{ width: 14 }} />}
          renderItem={({ item }) => (
            <Pressable
              onPress={() => navigation.navigate('Category', { id: item.id })}
              style={[styles.chip, { backgroundColor: item.color }]}
            >
              <ProductImage uri={item.image} style={styles.chipImg} rounded={26} tint="#ffffff80" />
              <Text style={styles.chipText}>{item.label}</Text>
            </Pressable>
          )}
        />
        <HList data={groceries} />
      </Section>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  location: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center' },
  locationText: { marginLeft: 6, fontSize: 18, fontWeight: '600', color: colors.dark },
  banner: { height: 114, borderRadius: radius.lg, justifyContent: 'center', overflow: 'hidden' },
  bannerShade: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(16,40,24,0.42)', borderRadius: radius.lg },
  bannerContent: { paddingLeft: 22 },
  bannerTitle: { color: '#fff', fontSize: 22, fontWeight: '800' },
  bannerSub: { color: '#BDF0CE', fontSize: 14, fontWeight: '600', marginTop: 4 },
  sectionHead: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 6,
  },
  sectionTitle: { fontSize: 22, fontWeight: '700', color: colors.dark },
  seeAll: { fontSize: 15, fontWeight: '600', color: colors.primary },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: 22,
    paddingLeft: 12,
    height: 82,
    borderRadius: radius.lg,
    minWidth: 190,
  },
  chipImg: { width: 56, height: 56, marginRight: 14 },
  chipText: { fontSize: 17, fontWeight: '700', color: colors.dark },
});
