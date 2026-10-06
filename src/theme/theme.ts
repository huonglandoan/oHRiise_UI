import { createTheme, rem } from '@mantine/core';

export const theme = createTheme({
  primaryColor: 'blue',
  fontFamily: 'Inter, system-ui, sans-serif',
  headings: {
    fontFamily: 'Inter, system-ui, sans-serif',
    sizes: {
      h1: { fontSize: rem(32), fontWeight: '900', lineHeight: '1.2' },
      h2: { fontSize: rem(24), fontWeight: '800', lineHeight: '1.3' },
      h3: { fontSize: rem(20), fontWeight: '700', lineHeight: '1.4' },
      h4: { fontSize: rem(18), fontWeight: '700', lineHeight: '1.4' },
      h5: { fontSize: rem(16), fontWeight: '600', lineHeight: '1.5' },
      h6: { fontSize: rem(14), fontWeight: '600', lineHeight: '1.5' },
    },
  },
  components: {
    Button: {
      defaultProps: {
        radius: 'md',
        fw: 600,
      },
    },
    TextInput: {
      defaultProps: {
        radius: 'md',
      },
    },
    Select: {
      defaultProps: {
        radius: 'md',
      },
    },
    Card: {
      defaultProps: {
        radius: 'lg',
        shadow: 'sm',
        withBorder: true,
      },
    },
    Paper: {
      defaultProps: {
        radius: 'lg',
        shadow: 'sm',
      },
    }
  },
});
