import { Platform } from 'react-native';

export const colors = {
  primary: '#0F8A5F',
  primaryDark: '#0A6B49',
  primarySoft: '#E6F5EE',
  accent: '#FF9F1C',
  accentSoft: '#FFF3DE',
  dark: '#14221B',
  text: '#14221B',
  gray: '#6B7A72',
  light: '#F3F5F3',
  border: '#E3E8E4',
  white: '#FFFFFF',
  red: '#E5484D',
  redSoft: '#FDECEC',
  bg: '#FFFFFF',
  cream: '#FFF8EC',
};

export const radius = { sm: 10, md: 14, lg: 18, xl: 26, button: 16 };

export const shadow = Platform.select({
  ios: {
    shadowColor: '#0B2A1D',
    shadowOpacity: 0.08,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 6 },
  },
  android: { elevation: 3 },
  default: {},
});
