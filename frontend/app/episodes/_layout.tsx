import { StyleSheet } from 'react-native';
import { View, Text } from '../../components/Themed';
import { Slot } from 'expo-router';

export default function Layout() {
  return (
    <View style={styles.container}>
      <Slot/>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
      flex: 1
    }
});
