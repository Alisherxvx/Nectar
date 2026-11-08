import React from 'react';
import Svg, { Path, Circle, Rect, Ellipse, G, Defs, LinearGradient, Stop } from 'react-native-svg';
import { colors } from '../theme';

/** Морковка — логотип Nectar. color задаёт цвет тела (белый на сплэше, оранжевый на формах). */
export function CarrotIcon({ size = 48, color = colors.carrot, leafColor = colors.primary }) {
  return (
    <Svg width={size} height={size * 1.1} viewBox="0 0 40 44">
      <G>
        <Ellipse cx="22" cy="8" rx="3.2" ry="7.5" fill={leafColor} transform="rotate(25 22 8)" />
        <Ellipse cx="29" cy="11" rx="3" ry="7" fill={leafColor} transform="rotate(70 29 11)" />
        <Ellipse cx="17" cy="11" rx="2.6" ry="6" fill={leafColor} transform="rotate(-20 17 11)" />
      </G>
      <Path
        d="M24 15 C30 14 34 19 31 24 L12 42 C10 44 6 42 7.5 39 L19.5 19 C20.5 16.8 22 15.3 24 15 Z"
        fill={color}
      />
    </Svg>
  );
}

export function BackIcon({ size = 20, color = colors.text }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Path d="M15 4 L7 12 L15 20" stroke={color} strokeWidth="2.4" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}

export function ChevronRightIcon({ size = 20, color = colors.white }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Path d="M9 5 L16 12 L9 19" stroke={color} strokeWidth="2.6" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}

export function ChevronDownIcon({ size = 16, color = colors.text }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Path d="M5 9 L12 16 L19 9" stroke={color} strokeWidth="2.2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}

export function EyeIcon({ size = 22, color = colors.gray, crossed = true }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Path d="M2 12 C5 6.5 8.5 5 12 5 C15.5 5 19 6.5 22 12 C19 17.5 15.5 19 12 19 C8.5 19 5 17.5 2 12 Z" stroke={color} strokeWidth="1.8" fill="none" />
      <Circle cx="12" cy="12" r="3.2" stroke={color} strokeWidth="1.8" fill="none" />
      {crossed && <Path d="M4 4 L20 20" stroke={color} strokeWidth="1.8" strokeLinecap="round" />}
    </Svg>
  );
}

export function CheckIcon({ size = 18, color = colors.primary }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Path d="M4 12.5 L9.5 18 L20 6.5" stroke={color} strokeWidth="2.6" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}

/** Флаг Бангладеш, как в макете (+880). */
export function FlagBD({ width = 34, height = 24 }) {
  return (
    <Svg width={width} height={height} viewBox="0 0 34 24">
      <Rect width="34" height="24" rx="3" fill="#006A4E" />
      <Circle cx="15" cy="12" r="6.5" fill="#F42A41" />
    </Svg>
  );
}

/** Иллюстрация «карта с булавкой» для экрана выбора локации. */
export function MapIllustration({ width = 224, height = 170 }) {
  return (
    <Svg width={width} height={height} viewBox="0 0 224 170">
      <Defs>
        <LinearGradient id="pin" x1="0" y1="0" x2="0" y2="1">
          <Stop offset="0" stopColor="#5B8CFF" />
          <Stop offset="1" stopColor="#3D63DD" />
        </LinearGradient>
      </Defs>
      <Path d="M20 92 L76 72 L76 150 L20 168 Z" fill="#D8E7F7" />
      <Path d="M76 72 L140 92 L140 168 L76 150 Z" fill="#BCD5EF" />
      <Path d="M140 92 L204 72 L204 150 L140 168 Z" fill="#D8E7F7" />
      <Path d="M30 120 C60 110 90 140 120 125 C150 110 170 130 196 118" stroke="#9ED3AE" strokeWidth="7" fill="none" strokeLinecap="round" />
      <Path d="M48 96 L58 158 M160 96 L176 150" stroke="#FFFFFF" strokeWidth="4" opacity="0.8" />
      <Ellipse cx="112" cy="128" rx="18" ry="6" fill="#000" opacity="0.12" />
      <Path d="M112 128 C112 128 76 86 76 58 C76 37 92 22 112 22 C132 22 148 37 148 58 C148 86 112 128 112 128 Z" fill="url(#pin)" />
      <Circle cx="112" cy="57" r="14" fill="#FFFFFF" />
    </Svg>
  );
}
