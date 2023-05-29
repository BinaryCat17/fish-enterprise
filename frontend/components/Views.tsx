import React from 'react';
import { StyleSheet} from 'react-native';
import { View } from './Themed';

export function GridView({children}: {children: React.ReactNode }) {
    return (
        <View style={styles.borderStyle}>
            {children}
        </View>
    )
}

const styles = StyleSheet.create({
    borderStyle: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        gap: 20,
        rowGap: 20
    }
});