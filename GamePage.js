import React, { useState, useEffect, useRef } from 'react'
import { StyleSheet, View, StatusBar, Text, TouchableOpacity, ImageBackground, Modal, Button, TextInput, TouchableWithoutFeedback, Keyboard } from 'react-native'
import { Audio } from 'expo-av';

var totalPoints = 1
var clickPoints = 1

var rodCost = 10
var rodAmount = 1

var netCost = 100
var netAmount = 0

var dynamiteCost = 1000
var dynamiteAmount = 0

var boatCost = 5000
var boatAmount = 0

var rodPicLocation = require('./assets/fishrod.png')
var netPicLocation = require('./assets/fishnet.png')
var dynaPicLocation = require('./assets/dynamite.png')
var boatPicLocation = require('./assets/boat.png')

export default function GamePage({ submitHandler, returnHandler }) {

    const [points, setPoints] = useState(totalPoints)
    const [count, setCount] = useState(60);
    const [clickEarning, setClickEarning] = useState(clickPoints)
    const [rodPic, setRodPic] = useState(rodPicLocation)
    const [netPic, setNetPic] = useState(netPicLocation)
    const [dynaPic, setDynaPic] = useState(dynaPicLocation)
    const [boatPic, setBoatPic] = useState(boatPicLocation)

    const [rodPrice, setRodPrice] = useState(rodCost)
    const [rodNumber, setRodNumber] = useState(rodAmount)
    const [netPrice, setNetPrice] = useState(netCost)
    const [netNumber, setNetNumber] = useState(netAmount)
    const [dynamitePrice, setDynamitePrice] = useState(dynamiteCost)
    const [dynamiteNumber, setDynamiteNumber] = useState(dynamiteAmount)
    const [boatPrice, setBoatPrice] = useState(boatCost)
    const [boatNumber, setBoatNumber] = useState(boatAmount)

    const [modalOpen, setModalOpen] = useState(false)
    const [text, setText] = useState('')

    Counter()

    const audioFiles = {
        buySound: require('./assets/buy-sound.wav'),
    }

    function resetStuff() {
        totalPoints = 1
        clickPoints = 1
        rodCost = 10
        rodAmount = 1
        netCost = 100
        netAmount = 0
        dynamiteCost = 1000
        dynamiteAmount = 0
        boatCost = 5000
        boatAmount = 0
        rodPicLocation = require('./assets/fishrod.png')
        netPicLocation = require('./assets/fishnet.png')
        dynaPicLocation = require('./assets/dynamite.png')
        boatPicLocation = require('./assets/boat.png')
        setCount(60)
        setPoints(totalPoints)
        setClickEarning(clickPoints)
        setRodPrice(rodCost)
        setRodNumber(rodAmount)
        setNetPrice(netCost)
        setNetNumber(netAmount)
        setDynamitePrice(dynamiteCost)
        setDynamiteNumber(dynamiteAmount)
        setBoatPrice(boatCost)
        setBoatNumber(boatAmount)
        setRodPic(rodPicLocation)
        setNetPic(netPicLocation)
        setDynaPic(dynaPicLocation)
        setBoatPic(boatPicLocation)
        setModalOpen(false)
    }

    function Counter() {
        useInterval(() => {
            if (count == 0) {
                setModalOpen(true)
            }
            setCount(count - 1)
        }, 1000)
    }

    function useInterval(callback, delay) {
        const savedCallback = useRef();

        useEffect(() => {
            savedCallback.current = callback;
        }, [callback]);

        useEffect(() => {
            function tick() {
                savedCallback.current();
            }
            if (delay !== null) {
                let id = setInterval(tick, delay);
                return () => clearInterval(id);
            }
        }, [delay]);
    }

    HandlePlaySound = async musica => {
        const soundObject = new Audio.Sound()
        try {
            let source = audioFiles[musica]
            await soundObject.loadAsync(source)
            await soundObject
                .playAsync()
                .then(async playbackStatus => {
                    setTimeout(() => {
                        soundObject.unloadAsync()
                    }, playbackStatus.playableDurationMillis)
                })
                .catch(error => {
                    console.log(error)
                })
        } catch (error) {
            console.log(error)
        }
    }

    const PointHandler = () => {
        totalPoints += clickPoints
        setPoints(totalPoints)

        rodCost = rodCost
        netCost = netCost
        dynamiteCost = dynamiteCost
        boatCost = boatCost
        setRodPrice(rodCost)
        setNetPrice(netCost)
        setDynamitePrice(dynamiteCost)
        setBoatPrice(boatCost)

        ImageSwap()
    }

    const ImageSwap = () => {

        if (totalPoints >= rodPrice) {
            rodPicLocation = require('./assets/fishrodGreen.png')
            setRodPic(rodPicLocation)
        } else {
            rodPicLocation = require('./assets/fishrod.png')
            setRodPic(rodPicLocation)
        }

        if (totalPoints >= netPrice) {
            netPicLocation = require('./assets/fishnetGreen.png')
            setNetPic(netPicLocation)
        } else {
            netPicLocation = require('./assets/fishnet.png')
            setNetPic(rodPicLocation)
        }

        if (totalPoints >= dynamitePrice) {
            dynaPicLocation = require('./assets/dynamiteGreen.png')
            setDynaPic(dynaPicLocation)
        } else {
            dynaPicLocation = require('./assets/dynamite.png')
            setDynaPic(dynaPicLocation)
        }

        if (totalPoints >= boatPrice) {
            boatPicLocation = require('./assets/boatGreen.png')
            setBoatPic(boatPicLocation)
        } else {
            boatPicLocation = require('./assets/boat.png')
            setBoatPic(boatPicLocation)
        }

    }

    const RodHandler = () => {

        if (totalPoints >= rodCost) {
            totalPoints -= rodCost
            setPoints(totalPoints)
            rodAmount += 1
            setRodNumber(rodAmount)
            rodCost *= 2
            setRodPrice(rodCost)
            clickPoints += 1 * rodAmount
            setClickEarning(clickPoints)
            ImageSwap()
            HandlePlaySound('buySound')
        } else {
            console.log('Cant afford')
        }
    }

    const NetHandler = () => {
        if (totalPoints >= netCost) {
            totalPoints -= netCost
            setPoints(totalPoints)
            netAmount += 1
            setNetNumber(netAmount)
            netCost *= 2
            setNetPrice(netCost)
            clickPoints += 5 * netAmount
            setClickEarning(clickPoints)
            ImageSwap()
            HandlePlaySound('buySound')
        } else {
            console.log('Cant afford')
        }
    }

    const DynamiteHandler = () => {
        if (totalPoints >= dynamiteCost) {
            totalPoints -= dynamiteCost
            setPoints(totalPoints)
            dynamiteAmount += 1
            setDynamiteNumber(dynamiteAmount)
            dynamiteCost *= 2
            setDynamitePrice(dynamiteCost)
            clickPoints += 100 * dynamiteAmount
            setClickEarning(clickPoints)
            ImageSwap()
            HandlePlaySound('buySound')
        } else {
            console.log('Cant afford')
        }
    }

    const BoatHandler = () => {
        if (totalPoints >= boatCost) {
            totalPoints -= boatCost
            setPoints(totalPoints)
            boatAmount += 1
            setBoatNumber(boatAmount)
            boatCost *= 2
            setBoatPrice(boatCost)
            clickPoints += 500 * boatAmount
            setClickEarning(clickPoints)
            ImageSwap()
            HandlePlaySound('buySound')
        } else {
            console.log('Cant afford')
        }
    }

    const changeHandler = (val) => {
        setText(val)
    }



    return (
        <View style={styles.screen}>
            <StatusBar hidden />

            <Modal visible={modalOpen} animationType='slide'>
                <TouchableWithoutFeedback onPress={() => {
                    Keyboard.dismiss()
                }}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalHeading}>Final fish count</Text>
                        <Text style={styles.modalText}>{totalPoints}</Text>
                        <TextInput
                            style={styles.input}
                            placeholder='enter username'
                            onChangeText={changeHandler} />
                        <Button title={'Submit'} maxLength={20} onPress={() => {
                            if (text.length <= 1) {
                                alert('Minimum of 2 characters required')
                            } else {
                                submitHandler(text, totalPoints, Math.random().toString())
                                returnHandler()
                                resetStuff()
                            }
                        }} />
                    </View>
                </TouchableWithoutFeedback>
            </Modal>

            <View style={styles.scoreSection}>
                <Text style={styles.time}>{count}</Text>
                <Text style={styles.score}>{totalPoints}</Text>
            </View>
            <View style={styles.shopSection}>
                <View style={styles.shopItemContainer}>
                    <Text style={styles.shopItemText}>Cost: {rodCost}</Text>
                    <TouchableOpacity style={styles.shopItem} onPress={RodHandler}>

                        <ImageBackground style={styles.buttonContainer} source={rodPicLocation} />

                    </TouchableOpacity>
                    <Text style={styles.shopItemText}>Rods: {rodAmount}</Text>
                </View>

                <View style={styles.shopItemContainer}>
                    <Text style={styles.shopItemText}>Cost: {netCost}</Text>
                    <TouchableOpacity style={styles.shopItem} onPress={NetHandler}>
                        <ImageBackground style={styles.buttonContainer} source={netPicLocation} />
                    </TouchableOpacity>
                    <Text style={styles.shopItemText}>Nets: {netAmount}</Text>
                </View>

                <View style={styles.shopItemContainer}>
                    <Text style={styles.shopItemText}>Cost: {dynamiteCost}</Text>
                    <TouchableOpacity style={styles.shopItem} onPress={DynamiteHandler}>
                        <ImageBackground style={styles.buttonContainer} source={dynaPicLocation} />
                    </TouchableOpacity>
                    <Text style={styles.shopItemText}>Dynamite: {dynamiteAmount}</Text>
                </View>

                <View style={styles.shopItemContainer}>
                    <Text style={styles.shopItemText}>Cost: {boatCost}</Text>
                    <TouchableOpacity style={styles.shopItem} onPress={BoatHandler}>
                        <ImageBackground style={styles.buttonContainer} source={boatPicLocation} />
                    </TouchableOpacity>
                    <Text style={styles.shopItemText}>Boats: {boatAmount}</Text>
                </View>
            </View>

            <Text style={styles.shopItemText}>Fish per Click: {clickPoints}</Text>
            <TouchableOpacity style={styles.fishingSection} onPress={PointHandler} activeOpacity={0.8}>
                <ImageBackground style={styles.clickContainer} source={require('./assets/whale.png')} />
            </TouchableOpacity>

        </View>
    )

}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
    },
    scoreSection: {
        flexDirection: 'row',
        backgroundColor: '#105bc3',
        flex: 1,
        margin: 10,
    },
    shopSection: {
        flex: 2, 
        flexDirection: 'row',
        backgroundColor: '#fff',
    },
    fishingSection: {
        flex: 7,
        backgroundColor: '#105bc3',
        margin: 10,
    },
    shopItemContainer: {
        flex: 1, 
        margin: 3,
    },
    shopItem: {
        flex: 1,
    },
    shopItemText: {
        fontSize: 12,
        color: '#797979',
        justifyContent: 'center',
        textAlign: 'center',
        textAlignVertical: "center",
    },
    buttonContainer: {
        resizeMode: 'contain',
        margin: 1,
        flex: 1,
    },
    time: {
        flex: 3,
        fontSize: 40,
        color: '#ff6a6a',
        justifyContent: 'center',
        textAlign: 'center',
        textAlignVertical: "center",
    },
    score: {
        flex: 7,
        fontSize: 40,
        color: '#00CB25',
        justifyContent: 'center',
        textAlign: 'center',
        textAlignVertical: "center",
    },
    clickContainer: {
        flex: 1,
        marginTop: '12%',
        resizeMode: 'contain',
    },
    modalContent: {
        flex: 1,
        alignContent: 'center',
        justifyContent: 'center',
        marginBottom: 200,
    },
    modalText: {
        fontSize: 30,
        textAlign: 'center',
        color: '#137FB7',
    },
    modalHeading: {
        fontSize: 20,
        textAlign: 'center',
        color: '#3AA1D7',
    },
    input: {
        borderWidth: 1,
        borderColor: '#777',
        padding: 10,
        margin: 10,
        textAlign: 'center',
    }
})
