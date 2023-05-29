import { Slot } from "expo-router";
import { StyleSheet } from 'react-native';
import { View, Text } from '../../components/Themed';

export default function Layout() {
  return (
    <View>
        <Slot />
    </View>
  )
}

const styles = StyleSheet.create({
    container: {

    }
});
