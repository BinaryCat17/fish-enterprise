import FontAwesome from '@expo/vector-icons/FontAwesome';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { StyleSheet } from 'react-native';
import { useFonts } from 'expo-font';
import { SplashScreen, Slot } from 'expo-router';
import { useEffect } from 'react';
import { useColorScheme } from 'react-native';
import { View } from '../components/Themed';
import { Header, Footer } from '../components/Layout';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { offsetLimitPagination } from "@apollo/client/utilities";


export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          locations: offsetLimitPagination(),
          characters: offsetLimitPagination(),
          episodes: offsetLimitPagination()
        }
      }
    }
  })
});

export const unstable_settings = {
  initialRouteName: "(pages)"
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
      <ApolloProvider client={client}>
        <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
          <View style={styles.wrap}>
            <View style={styles.header}>
              <Header style={[styles.mainPadding]}/>
            </View>
            <View style={[styles.mainPadding]}>
              <View style={styles.content}>
                <View style={styles.nestedContent}>
                  <Slot />
                </View>
              </View>
            </View>
            <View style={styles.footer}>
              <Footer style={styles.mainPadding}/>
            </View>
          </View>
        </ThemeProvider>
      </ApolloProvider>
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
        shadowOffset: {width: -2, height: 2},
        shadowRadius: 3,
    },
    wrap: {
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        margin: 0
    },
    content: {
      width: "100%",
      marginBottom: 85
    },
    nestedContent: {
        top: "60px",
        flex: 1,
        width: "100%",
    },
    mainPadding: {
        paddingLeft: "10%",
        paddingRight: "10%",
        flex: 1,
    },
    footer: {
      height: "60px",
      width: "100%",
      shadowColor: "rgba(0, 0, 0, 0.1)",
      shadowOffset: {width: 2, height: -2},
      shadowRadius: 3,
      zIndex: 999
    }
});
