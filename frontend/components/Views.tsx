import React from 'react';
import { StyleSheet} from 'react-native';
import { View } from './Themed';

export function GridView({children, rowLen}: {children: [React.ReactNode], rowLen: number}) {
    var chunks = []
    for (let i = 0; i < children.length; i += rowLen) {
        const chunk = children.slice(i, i + rowLen).map((c, i)=><View style={{flex:1}} key={i}>{c}</View>)
        chunks.push(
            <View style={styles.rowStyle} key={i}>
                {chunk}
            </View>
        )
    }

    return (
        <View style={styles.borderStyle}>
            {chunks}
        </View>
    )
}

const styles = StyleSheet.create({
    rowStyle: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        width: "100%",
        gap: 20,
    },
    borderStyle: {
        flexDirection: "column",
        rowGap: 20,
    }
});