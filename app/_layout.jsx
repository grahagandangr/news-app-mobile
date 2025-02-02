import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { ThemeProvider, DarkTheme, DefaultTheme } from '@react-navigation/native';
import { useColorScheme } from 'react-native';
import QueryProvider from '@/providers/QueryProvider';

import '../global.css';

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const theme = colorScheme === 'dark' ? DarkTheme : DefaultTheme;

  return (
    <ThemeProvider value={theme}>
      <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
      <QueryProvider>
        <Stack
          screenOptions={{
            headerStyle: {
              backgroundColor: theme.colors.card,
            },
            headerTintColor: theme.colors.text,
            contentStyle: {
              backgroundColor: theme.colors.background,
            },
          }}>
          <Stack.Screen
            name="index"
            options={{
              title: 'News',
            }}
          />
        </Stack>
      </QueryProvider>
    </ThemeProvider>
  );
}
