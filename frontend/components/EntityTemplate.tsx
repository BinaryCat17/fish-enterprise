import React from 'react';
import { StyleSheet, TouchableHighlight } from 'react-native';
import { View, Text } from '../components/Themed';
import { FontAwesome } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function EntityTemplate({children}: {children: React.ReactNode }) {
    const router = useRouter();

    return (
        <View style={styles.container}>
            <TouchableHighlight style={styles.goBackBlock} onPress={()=>{router.back();}}>
                <View style={styles.goBackBlock}>
                    <FontAwesome size={28}  name="arrow-left" ></FontAwesome>
                    <Text style={styles.goBackText}>Go Back</Text>
                </View>
            </TouchableHighlight>
            <View style={styles.contentContainer}>
                {children}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginTop: 26,
        flexDirection: "column",
        alignItems: "center",
    },
    contentContainer: {
        marginTop: 20,
        width: "100%",
        flex: 1,
        alignItems: 'center'
    },
    goBackBlock: {
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex: 999,
        flexDirection: 'row',
        alignItems: 'center'
    },
    goBackText: {
        marginLeft: 15,
        fontFamily: 'Karla',
        fontStyle: 'normal',
        fontWeight: "700",
        fontSize: 18,
        lineHeight: 21
    }
});