import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default StopWatch = () => {
    const [time, setTime] = useState(0);
    const [running, setRunning] = useState(false);

    useEffect(() => {
        let interval = null;
        if (running) {
            interval = setInterval(() => {
            setTime(prevTime => prevTime + 10); // Increment by 10ms
            }, 10);
        } else {
            clearInterval(interval);
        }
        return () => clearInterval(interval);
    }, [running]);

    const startStopwatch = () => {
        setRunning(true);
    };

    const stopStopwatch = () => {
        setRunning(false);
    };

    const resetStopwatch = () => {
        setTime(0);
        setRunning(false);
    };

    const formatTime = milliseconds => {
        const minutes = Math.floor(milliseconds / 60000);
        const seconds = Math.floor((milliseconds % 60000) / 1000);
        const millisecondsFormatted = Math.floor((milliseconds % 1000) / 10);

        return `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}:${millisecondsFormatted < 10 ? '0' : ''}${millisecondsFormatted}`;
    };

    return (
        <View style={styles.container}>
            <Text>StopWatch</Text>
            <Text style={styles.time}>{formatTime(time)}</Text>
            <TouchableOpacity style={styles.button} onPress={running ? stopStopwatch : startStopwatch}>
                <Text style={styles.buttonText}>{running ? 'Stop' : 'Start'}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={resetStopwatch}>
                <Text style={styles.buttonText}>Reset</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    time: {
        fontSize: 48,
        textAlign: 'center',
        margin: 20,
    },
    button: {
        backgroundColor: '#7AB2B2',
        padding: 10,
        margin: 10,
        borderRadius: 50,
    },
});