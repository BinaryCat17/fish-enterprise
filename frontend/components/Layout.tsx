import { StyleSheet, Image } from 'react-native';
import { Text, View, ViewProps } from '../components/Themed';
import { Link } from "expo-router";
import { ExternalLink } from './ExternalLink';

export function Header(props: ViewProps) {
    return (
        <View {...props}>
            <View style={[styles.headerRow]}>
                <Link href="/"><Image style={styles.headerIcon} source={{uri:'assets/images/header-icon.png'}}></Image></Link> 
                <View style={styles.linksRow}>
                    <Link href="characters"><Text style={styles.linkStyle}>Characters</Text></Link>
                    <Link href="locations"><Text style={styles.linkStyle}>Locations</Text></Link>
                    <Link href="episodes"><Text style={styles.linkStyle}>Episodes</Text></Link>
                </View>
            </View>
        </View>
    )
}

export function Footer(props: ViewProps) {
    return (
        <View {...props}>
            <View style={styles.footerRow}>
                <Text style={styles.linkStyle}>Made with ❤️ by <ExternalLink style={styles.hrefStyle} href={'https://github.com/BinaryCat17/fish-enterprise'}>BinaryCat17</ExternalLink></Text>
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    headerRow: {
        flexDirection: 'row',
        justifyContent: "space-between",
        alignItems: "center",
        flex: 1,
    },
    footerRow: {
        flexDirection: 'row',
        justifyContent: "center",
        alignItems: "center",
        flex: 1,
    },
    headerIcon: {
        width:46,
        height:49
    },
    linksRow: {
        flexDirection: "row",
    },
    linkStyle: {
        fontFamily: 'Karla',
        fontStyle: "normal",
        fontWeight: '700',
        fontSize: 18,
        lineHeight: 21,
        marginLeft: 24,
    },
    hrefStyle: {
        color: 'green'
    }
});