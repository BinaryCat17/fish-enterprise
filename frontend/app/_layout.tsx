import FontAwesome from '@expo/vector-icons/FontAwesome';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { StyleSheet } from 'react-native';
import { useFonts } from 'expo-font';
import { SplashScreen, Slot } from 'expo-router';
import { useEffect } from 'react';
import { useColorScheme } from 'react-native';
import { View } from '../components/Themed';
import { Header, Footer } from '../components/Layout';


export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: '(tabs)',
};

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  return (
    <>
      {/* Keep the splash screen open until the assets have loaded. In the future, we should just support async font loading with a native version of font-display. */}
      {!loaded && <SplashScreen />}
      {loaded && <RootLayoutNav />}
    </>
  );
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();

  return (
    <>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <View style={styles.wrap}>
          <View style={styles.header}>
            <Header style={[styles.mainPadding]}/>
          </View>
          <View style={[styles.mainPadding, styles.content]}>
            <View style={styles.nestedContent}>
              <Slot />
            </View>
          </View>
          <View style={styles.footer}>
            <Footer style={styles.mainPadding}/>
          </View>
        </View>
      </ThemeProvider>
    </>
  );
}

const styles = StyleSheet.create({
    header: {
        position: "absolute",
        top: 0,
        zIndex: 999,
        height: "60px",
        width: "100%",
        shadowColor: "rgba(0, 0, 0, 0.1)",
        shadowOffset: {width: -2, height: 4},
        shadowRadius: 3,
    },
    wrap: {
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        margin: 0
    },
    content: {
        flex: 1
    },
    nestedContent: {
        position: "absolute",
        top: "60px",
    },
    mainPadding: {
        paddingLeft: "210px",
        paddingRight: "210px",
        flex: 1,
    },
    footer: {
      width: "100%",
      height: "60px",
      zIndex: 999,
    }
});