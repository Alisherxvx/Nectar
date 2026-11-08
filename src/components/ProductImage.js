import React, { useState, useEffect, useRef } from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const MAX_RETRIES = 3;

// Фото товара: при сбое сети повторяет загрузку, пока не загрузится, и показывает заглушку.
export default function ProductImage({ uri, style, resizeMode = 'cover', rounded = 0, tint = '#F2F3F2' }) {
  const [attempt, setAttempt] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);
  const timer = useRef(null);

  useEffect(() => () => clearTimeout(timer.current), []);

  const onError = () => {
    if (attempt < MAX_RETRIES) {
      timer.current = setTimeout(() => setAttempt((a) => a + 1), 1200 * (attempt + 1));
    } else {
      setFailed(true);
    }
  };

  const source =
    typeof uri === 'string'
      ? { uri: attempt === 0 ? uri : `${uri}${uri.includes('?') ? '&' : '?'}retry=${attempt}` }
      : uri;

  return (
    <View style={[styles.wrap, { backgroundColor: tint, borderRadius: rounded }, style]}>
      {!failed && (
        <Image
          key={attempt}
          source={source}
          style={[StyleSheet.absoluteFill, { borderRadius: rounded, opacity: loaded ? 1 : 0 }]}
          resizeMode={resizeMode}
          onLoad={() => setLoaded(true)}
          onError={onError}
        />
      )}
      {(!loaded || failed) && <Ionicons name="leaf-outline" size={28} color="#B9C4BD" />}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { alignItems: 'center', justifyContent: 'center', overflow: 'hidden' },
});
