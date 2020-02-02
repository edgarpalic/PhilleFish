import React from 'react'
import { StyleSheet, View, StatusBar, ImageBackground } from 'react-native'


const Tutorial = () => {
    return (
        <View>
            <StatusBar hidden />
            <ImageBackground style={styles.image} source={require('./assets/tutorial.png')} />
        </View>
    )
}

const styles = StyleSheet.create({
    image: {
        resizeMode: 'cover',
        width: '100%',
        height: '100%',
    },
})

export default Tutorial