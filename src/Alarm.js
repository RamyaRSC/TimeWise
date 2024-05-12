import React, { Component } from "react";
import { Dimensions, Text, View, StyleSheet, TouchableOpacity, StatusBar, Platform } from "react-native";
import { Picker } from "@react-native-picker/picker";
// import { StatusBar } from "expo-status-bar";

const screen = Dimensions.get("window");

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
      },
      picker: {
        flex: 1,
        maxWidth: 100,
        ...Platform.select({
          android: {
            // color: "#fff",
            backgroundColor: "rgba(92, 92, 92, 0.206)",
          }
        })
      },
      pickerItem: {
        // color: "#fff",
        fontSize: 20,
        ...Platform.select({
          android: {
            marginLeft: 10,
            marginRight: 10,
          }
        })
      },
      pickerContainer: {
        flexDirection: "row",
        alignItems: "center"
      },
      timerText: {
        color: "red",
        // fontSize: 90
    },

})

const formatNumber = number => `0${number}`.slice(-2);

const getRemaining = time => {
    const minuties = Math.floor(time / 60);
    const seconds = time - minuties * 60;
    return { minuties: formatNumber(minuties), seconds: formatNumber(seconds)};
};

const creatArray = length => {
    const arr =[];
    let i = 0;
    while(i<length){
        arr.push(i.toString());
        i += 1;
    }
    return arr;
};

const AVAILABLE_MINUTES = creatArray(10);
const AVAILABLE_SECONDS = creatArray(60);

export default class Alarm extends Component {
    state = {
        remainingSeconds: 5,
        isRunning: false,
        selectedMinutes: "0",
        selectedSeconds: "5"
    }

    interval = null;

    componentDidUpdate = (prevProp, prevState) => {
        if(this.state.remainingSeconds === 0 && prevState.remainingSeconds !== 0){
            this.stop();
        }
    }

    componentWillUnmount () {
        if(this.interval){
            clearInterval(this.interval);
        }
    }

    start = () => {
        this.setState(state => ({
            remainingSeconds:
                parseInt(state.selectedMinutes, 10) * 60 +
                parseInt(state.selectedSeconds, 30),
            isRunning: true
        }));
        this.interval = setInterval(() => {
            this.setState(state => ({
                remainingSeconds: state.remainingSeconds - 1
            }));
        }, 1000);       
    }

    stop = () => {
        clearInterval(this.interval);
        this.interval = null;
        this.setState({ remainingSeconds: 5, isRunning: false });
    }

    renderPickers = () => (
        <View style={styles.pickerContainer}>
            <Picker
                style={styles.picker}
                itemStyle={styles.pickerItem}
                selectedValue={this.state.selectedMinutes}
                onValueChange={itemValue => {
                    this.setState({ selectedMinutes: itemValue });
                }}
                mode = "dropdown"
            >
                {
                    AVAILABLE_MINUTES.map(value => (
                        <Picker.Item key={value} label={value} value={value} />
                    ))
                }
            </Picker>
            <Text style={styles.pickerItem}>Minutes</Text>
            <Picker
                style={styles.picker}
                itemStyle={styles.pickerItem}
                selectedValue={this.state.selectedSeconds}
                onValueChange={itemValue => {
                    this.setState({ selectedSeconds: itemValue });
                }}
                mode = "dropdown"
            >
                {
                    AVAILABLE_SECONDS.map(value => (
                        <Picker.Item key={value} label={value} value={value} />
                    ))
                }
            </Picker>
            <Text style={styles.pickerItem}>Seconds</Text>
        </View>
    );


    render(){
        const { minutes, seconds } = getRemaining(this.state.remainingSeconds);
        return (
            <View style={styles.container}>
                <Text>Alarm</Text>
                <StatusBar barStyle="light-content" />
                {
                    this.state.isRunning ? (
                        <Text style={styles.timerText}>{`${minutes}:${seconds}`}</Text>
                    ) : (
                        this.renderPickers()
                    )
                }
                {
                    this.state.isRunning ? (
                        <TouchableOpacity
                            onPress={this.stop}
                            style={[styles.button, styles.buttonStop]}
                        >
                            <Text style={[styles.buttonText, styles.buttonTextStop]}>Stop</Text>
                        </TouchableOpacity>
                    ) : (
                        <TouchableOpacity
                            onPress={this.start}
                            style={[styles.button, styles.buttonStart]}
                        >
                            <Text style={[styles.buttonText, styles.buttonTextStart]}>Start</Text>
                        </TouchableOpacity>
                    )
                }
            </View>
        );
    };
}