import React, { useState } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

// Нағыз фото болса — фотоны, болмаса (немесе жүктелмесе) әдемі эмодзи-плиткасын көрсетеді.
// item: { image, emoji, bg }  — тауар немесе санат объектісі
export default function ProductImage({ item, style, rounded = 0, emojiSize = 52, resizeMode = 'cover' }) {
  const [failed, setFailed] = useState(false);
  const source = item.image ? (typeof item.image === 'string' ? { uri: item.image } : item.image) : null;
  const showPhoto = source && !failed;

  return (
    <View style={[styles.wrap, { backgroundColor: item.bg || '#F3F5F3', borderRadius: rounded }, style]}>
      {showPhoto ? (
        <Image source={source} style={[StyleSheet.absoluteFill, { borderRadius: rounded }]} resizeMode={resizeMode} onError={() => setFailed(true)} />
      ) : (
        <Text style={{ fontSize: emojiSize }}>{item.emoji}</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { alignItems: 'center', justifyContent: 'center', overflow: 'hidden' },
});
