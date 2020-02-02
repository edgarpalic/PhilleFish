import React, { useState } from 'react'
import { StyleSheet, ImageBackground, Text, StatusBar, TouchableOpacity, FlatList, View, Modal, AsyncStorage } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'
import { Audio } from 'expo-av'

import GamePage from './GamePage'

export default function StartPage() {

    const [gamePageShow, setGamePageShow] = useState(false)
    const [music, setMusic] = useState(false)
    const [userScore, setUserScore] = useState([])


    submitHandler = (name, score, key) => {
        setUserScore((prevUserScore) => {
            return [
                { name: name, score: score, key: key },
                ...prevUserScore
            ]
        })
        saveData()
    }

    const saveData = async () => {
        if (userScore != null) {
            const arrData = userScore;
            await AsyncStorage.setItem('user', JSON.stringify(arrData));
        } else {
            alert('Score not loaded')
        }
    }

    const retrieveData = async () => {
        try {
            const valueString = await AsyncStorage.getItem('user')
            const value = JSON.parse(valueString)
            setUserScore(value)
        }
        catch (error) {
            console.log(error)
        }
    }

    function returnHandler() {
        setMusic(false)
        setGamePageShow(false)
    }

    if (music) {
        HandlePlaySound()
        setMusic(false)
    }

    HandlePlaySound = async bg => {
        const soundObject = new Audio.Sound()
        let source = require('./assets/bg-music.mp3')
        try {
            await soundObject.loadAsync(source)
            await soundObject.setVolumeAsync(0.5)
            await soundObject.playAsync()
                .catch(error => {
                    console.log(error)
                })
        } catch (error) {
            console.log(error)
        }
    }

    const pageHandler = () => {
        setGamePageShow(true)
        setMusic(true)
        saveData()
    }

    const deleteHandler = (key) => {
        setUserScore((prevScores) => {
            return prevScores.filter(item => item.key != key)
        })
        saveData()
    }

    const updateScore = () => {
        if (userScore.length < 1) {
            retrieveData()
        } else {
            saveData()
            retrieveData()
        }
    }

    if (gamePageShow) {
        return (
            <Modal animationType={'slide'}>
                <GamePage submitHandler={submitHandler} returnHandler={returnHandler} />
            </Modal>
        )
    } else {
        return (
            <ImageBackground source={require('./assets/bg.png')} style={styles.container}>
                <StatusBar hidden />
                <TouchableOpacity style={styles.touchContainer} onPress={pageHandler} activeOpacity={0.8}>
                    <View style={styles.buttonContainer}>
                        <Text style={styles.text}>Start Game</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={updateScore}>
                    <View style={styles.listHeader}>
                        <Text style={styles.headerText}>NAME</Text>
                        <Text style={styles.headerText}>SCORE</Text>
                    </View>
                </TouchableOpacity>
                <FlatList
                    data={userScore.sort(function (a, b) { return b.score - a.score })}
                    renderItem={({ item, index }) => (

                        <View style={styles.list}>
                            <Text style={styles.nameText}>{(index + 1) + '. ' + item.name}</Text>
                            <View style={styles.iconContainer}>
                                <Text style={styles.scoreText}>{item.score}</Text>
                                <TouchableOpacity onPress={() => deleteHandler(item.key)}>
                                    <MaterialIcons name='delete' color='#FFF' size={20} style={styles.deleteButton} />
                                </TouchableOpacity>
                            </View>
                        </View>
                    )}
                />
            </ImageBackground>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        resizeMode: 'cover',
    },
    touchContainer: {
        height: 100,
        marginTop: '5%',
    },
    buttonContainer: {
        backgroundColor: '#105bc3',
        borderWidth: 1,
        borderColor: '#000',
    },
    text: {
        color: 'white',
        padding: 30,
        fontSize: 30,
        textAlign: 'center',
        justifyContent: 'center',
    },
    scoreText: {
        textAlign: 'center',
        justifyContent: 'center',
        color: 'white',
        fontSize: 14,
        paddingVertical: 15,
    },
    nameText: {
        textAlign: 'center',
        justifyContent: 'center',
        color: 'white',
        fontSize: 18,
        padding: 15,
    },
    list: {
        flexDirection: 'row',
        backgroundColor: '#105bc3',
        justifyContent: 'space-between',
        margin: 1,
    },
    iconContainer: {
        flexDirection: 'row',
    },
    deleteButton: {
        paddingVertical: 15,
        paddingHorizontal: 10,
        textAlign: 'center',
        justifyContent: 'center',
    },
    headerText: {
        textAlign: 'center',
        justifyContent: 'center',
        paddingHorizontal: 20,
    },
    listHeader: {
        flexDirection: 'row',
        borderRadius: 4,
        borderWidth: 0.5,
        borderColor: '#d6d7da',
        justifyContent: 'space-between',
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#000',
        marginTop: 10,
    },
})