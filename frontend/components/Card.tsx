import React from 'react';
import { StyleSheet, Image } from 'react-native';
import { Link } from "expo-router";
import { View, Text } from '../components/Themed';

export default function Card({imageName, imageWidth, imageHeight, title, children, entity, id}:
        {imageName?: string, id?: string, title: string, children: React.ReactNode, entity?: string, imageWidth?: number, imageHeight?: number}) {
    let image = <View/>
    if (imageName) {
        image = <Image source={{uri: '/assets/images/' + imageName + '.png'}} style={[styles.cardImage, {width: imageWidth, height: imageHeight}]}/>
    }

    return (
      <Link href={'/'+entity+'/'+id} style={styles.card}>
        <View style={styles.cardView}>
          {image}
          <View style={styles.cardTextBlock}>
            <Text style={styles.cardName}>{title}</Text>
            <View>
              {children}
            </View>
          </View>
        </View>
      </Link>
    )
  }

  const styles = StyleSheet.create({
    characterContainer: {
      marginTop: 25
    },
    container: {
      marginTop: 20
    },
    cardImage: {
      borderTopLeftRadius: 15,
      borderTopRightRadius: 15
    },
    card: {
        flexDirection: 'column',
        shadowColor: "rgba(0, 0, 0, 0.2)",
        shadowOffset: {width: -2, height: 3},
        shadowRadius: 3,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: "rgba(0, 0, 0, 0.1)"
      },
      cardTextBlock: {
        margin: 16,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },
      cardName: {
        fontFamily: 'Roboto',
        fontStyle: 'normal',
        fontWeight: "500",
        fontSize: 20,
        lineHeight: 30
      },
      cardView: {
        flex:1,
        width:'100%',
        borderRadius: 20,
      }
  })