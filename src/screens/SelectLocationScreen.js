import React, { useState } from 'react';
import { View, Text, Pressable, Modal, FlatList, ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MapIllustration, ChevronDownIcon, CheckIcon } from '../components/Icons';
import { BlurBackground, BackButton, PrimaryButton, Title, Subtitle } from '../components/UI';
import { colors } from '../theme';

const ZONES = {
  Banasree: ['Block A', 'Block B', 'Block C', 'Block D'],
  Gulshan: ['Gulshan 1', 'Gulshan 2', 'Baridhara'],
  Dhanmondi: ['Road 2', 'Road 8', 'Road 27'],
  Uttara: ['Sector 3', 'Sector 7', 'Sector 11'],
};

function SelectField({ label, value, placeholder, options, onSelect }) {
  const [open, setOpen] = useState(false);
  return (
    <View style={styles.field}>
      <Text style={styles.label}>{label}</Text>
      <Pressable style={styles.select} onPress={() => options.length && setOpen(true)}>
        <Text style={[styles.selectText, !value && styles.placeholder]}>{value || placeholder}</Text>
        <ChevronDownIcon color={colors.gray} />
      </Pressable>

      <Modal visible={open} transparent animationType="fade" onRequestClose={() => setOpen(false)}>
        <Pressable style={styles.backdrop} onPress={() => setOpen(false)}>
          <View style={styles.sheet}>
            <Text style={styles.sheetTitle}>{label}</Text>
            <FlatList
              data={options}
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <Pressable
                  style={styles.option}
                  onPress={() => {
                    onSelect(item);
                    setOpen(false);
                  }}
                >
                  <Text style={styles.optionText}>{item}</Text>
                  {item === value ? <CheckIcon /> : null}
                </Pressable>
              )}
            />
          </View>
        </Pressable>
      </Modal>
    </View>
  );
}

export default function SelectLocationScreen({ navigation }) {
  const [zone, setZone] = useState('Banasree');
  const [area, setArea] = useState('');

  return (
    <View style={styles.flex}>
      <BlurBackground />
      <SafeAreaView style={styles.flex}>
        <ScrollView contentContainerStyle={styles.container}>
          <BackButton onPress={() => navigation.goBack()} />

          <View style={styles.hero}>
            <MapIllustration />
            <Title style={styles.title}>Select Your Location</Title>
            <Subtitle style={styles.subtitle}>
              Switch on your location to stay in tune with what's happening in your area
            </Subtitle>
          </View>

          <SelectField
            label="Your Zone"
            value={zone}
            options={Object.keys(ZONES)}
            onSelect={(z) => {
              setZone(z);
              setArea('');
            }}
          />
          <SelectField
            label="Your Area"
            value={area}
            placeholder="Types of your area"
            options={ZONES[zone] || []}
            onSelect={setArea}
          />

          <PrimaryButton
            title="Submit"
            style={styles.button}
            onPress={() => navigation.navigate('Login')}
          />
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  container: {
    paddingHorizontal: 25,
    paddingTop: 10,
    paddingBottom: 30,
  },
  hero: {
    alignItems: 'center',
    marginTop: 30,
    marginBottom: 50,
  },
  title: {
    marginTop: 36,
    textAlign: 'center',
  },
  subtitle: {
    textAlign: 'center',
    marginTop: 14,
    paddingHorizontal: 10,
  },
  field: {
    marginBottom: 30,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.gray,
    marginBottom: 12,
  },
  select: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    paddingBottom: 12,
  },
  selectText: {
    fontSize: 18,
    color: colors.text,
  },
  placeholder: {
    color: '#B1B1B1',
  },
  button: {
    marginTop: 10,
  },
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.35)',
    justifyContent: 'flex-end',
  },
  sheet: {
    backgroundColor: colors.white,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: 25,
    paddingTop: 20,
    paddingBottom: 40,
    maxHeight: '60%',
  },
  sheetTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 10,
  },
  option: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  optionText: {
    fontSize: 18,
    color: colors.text,
  },
});
