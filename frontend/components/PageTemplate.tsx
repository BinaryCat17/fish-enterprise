import React, { useState, useEffect } from 'react';
import { StyleSheet, Image } from 'react-native';
import { View } from '../components/Themed';

export default function PageTemplate({imageSource}: {imageSource: string}) {
    const [imageSize, setImageSize] = useState({width:0, height:0});

    useEffect(() => {
        Image.getSize(imageSource, (width, height) => {
            setImageSize({width, height})
        });
    }, []);
    
    return (
        <View style={styles.container}>
            <Image source={{uri: imageSource}} style={{
                height: 200,
                width: 200 / (imageSize.height / imageSize.width)
            }}/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginTop: 26,
        flexDirection: "column",
        alignItems: "center",
    }
});