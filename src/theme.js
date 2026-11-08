import { Platform } from 'react-native';

export const colors = {
  primary: '#53B175',
  primaryDark: '#3E9A5E',
  primarySoft: '#E8F5EC',
  dark: '#181725',
  gray: '#7C7C7C',
  light: '#F2F3F2',
  border: '#E2E2E2',
  white: '#FFFFFF',
  orange: '#F8A44C',
  red: '#F3603F',
  bg: '#FFFFFF',
};

export const radius = { sm: 10, md: 14, lg: 18, xl: 26 };

export const shadow = Platform.select({
  ios: {
    shadowColor: '#101828',
    shadowOpacity: 0.08,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 6 },
  },
  android: { elevation: 3 },
});

export const font = {
  regular: { fontWeight: '400' },
  medium: { fontWeight: '500' },
  semibold: { fontWeight: '600' },
  bold: { fontWeight: '700' },
};
