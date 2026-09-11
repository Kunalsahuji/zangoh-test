// src/theme.js
import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  colors: {
    brand: {
      50: '#F5EFFC',
      100: '#E2D1F9',
      200: '#C8A7F4',
      300: '#AE7DEF',
      400: '#9453EA',
      500: '#6E26D5', // Active Purple
      600: '#561CBD',
      700: '#42149A',
      800: '#3C2A58', // Header Dark Purple
      900: '#26193E',
    },
    accent: {
      purple: '#6E26D5',
      darkHeader: '#3C2A58',
      bgLight: '#F3F4F8',
      cardBg: '#FFFFFF',
      textPrimary: '#1E1E2D',
      textSecondary: '#7E8299',
      greenSuccess: '#10B981',
      redAlert: '#EF4444',
      orangeWarn: '#F59E0B',
      blueInfo: '#3B82F6',
    }
  },
  fonts: {
    heading: `'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif`,
    body: `'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif`,
  },
  styles: {
    global: {
      body: {
        bg: '#F3F4F8',
        color: '#1E1E2D',
      },
    },
  },
  components: {
    Button: {
      baseStyle: {
        fontWeight: '600',
        borderRadius: '8px',
      },
      variants: {
        solid: {
          bg: 'brand.500',
          color: 'white',
          _hover: {
            bg: 'brand.600',
          },
          _active: {
            bg: 'brand.700',
          },
        },
        outline: {
          borderColor: 'gray.200',
          color: 'gray.700',
          bg: 'white',
          _hover: {
            bg: 'gray.50',
          },
        },
      },
    },
    Card: {
      baseStyle: {
        p: '4',
        borderRadius: '12px',
        boxShadow: '0px 1px 3px rgba(0, 0, 0, 0.05)',
        bg: 'white',
        border: '1px solid',
        borderColor: 'gray.100',
      },
    },
  },
});

export default theme;