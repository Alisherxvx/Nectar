import React from 'react';
import { View, Text, FlatList, Pressable, StyleSheet, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Header, Button, EmptyState } from '../components/UI';
import { useStore } from '../context/StoreContext';
import { colors, radius } from '../theme';

const iconFor = { home: 'home-outline', work: 'briefcase-outline', other: 'location-outline' };

export default function AddressesScreen({ navigation, route }) {
  const { t, addresses, addressId, selectAddress, deleteAddress, addressText } = useStore();
  const selectMode = route.params?.select;

  const confirmDelete = (id) =>
    Alert.alert(t('addr.deleteConfirm'), '', [
      { text: t('common.cancel'), style: 'cancel' },
      { text: t('common.delete'), style: 'destructive', onPress: () => deleteAddress(id) },
    ]);

  return (
    <View style={{ flex: 1, backgroundColor: colors.light }}>
      <Header title={t('addr.title')} onBack={() => navigation.goBack()} />
      {addresses.length === 0 ? (
        <EmptyState icon="location-outline" title={t('addr.empty')} text={t('addr.emptyText')} actionTitle={t('addr.add')} onAction={() => navigation.navigate('AddressEdit', {})} />
      ) : (
        <>
          <FlatList
            data={addresses}
            keyExtractor={(a) => a.id}
            contentContainerStyle={{ padding: 20, paddingBottom: 110 }}
            renderItem={({ item: a }) => {
              const selected = a.id === addressId;
              return (
                <Pressable
                  onPress={() => {
                    selectAddress(a.id);
                    if (selectMode) navigation.goBack();
                  }}
                  style={[styles.card, selected && styles.cardOn]}
                >
                  <View style={[styles.icon, selected && { backgroundColor: colors.primary }]}>
                    <Ionicons name={iconFor[a.label] || 'location-outline'} size={20} color={selected ? '#fff' : colors.primary} />
                  </View>
                  <View style={{ flex: 1, marginLeft: 14 }}>
                    <Text style={styles.label}>{t('addr.' + (a.label || 'other'))}</Text>
                    <Text style={styles.text}>{addressText(a)}</Text>
                    {a.comment ? <Text style={styles.comment} numberOfLines={1}>💬 {a.comment}</Text> : null}
                  </View>
                  <View style={styles.actions}>
                    <Pressable onPress={() => navigation.navigate('AddressEdit', { id: a.id })} hitSlop={8}>
                      <Ionicons name="create-outline" size={20} color={colors.gray} />
                    </Pressable>
                    <Pressable onPress={() => confirmDelete(a.id)} hitSlop={8} style={{ marginTop: 14 }}>
                      <Ionicons name="trash-outline" size={20} color={colors.red} />
                    </Pressable>
                  </View>
                </Pressable>
              );
            }}
          />
          <View style={styles.footer}>
            <Button title={t('addr.add')} icon="add" onPress={() => navigation.navigate('AddressEdit', {})} />
          </View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: { flexDirection: 'row', backgroundColor: '#fff', borderRadius: radius.lg, padding: 14, marginBottom: 12, borderWidth: 1.5, borderColor: 'transparent' },
  cardOn: { borderColor: colors.primary },
  icon: { width: 42, height: 42, borderRadius: 13, backgroundColor: colors.primarySoft, alignItems: 'center', justifyContent: 'center' },
  label: { fontSize: 16, fontWeight: '800', color: colors.dark },
  text: { fontSize: 14, color: colors.dark, marginTop: 3, lineHeight: 20 },
  comment: { fontSize: 13, color: colors.gray, marginTop: 4 },
  actions: { alignItems: 'center', marginLeft: 8 },
  footer: { position: 'absolute', left: 0, right: 0, bottom: 0, padding: 20, backgroundColor: '#fff', borderTopWidth: 1, borderTopColor: '#EEF1EE' },
});
