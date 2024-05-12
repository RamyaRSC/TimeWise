import { Picker } from "@react-native-picker/picker";
import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Button, Platform } from "react-native";

export default Timer = () => {

    const [selectedHours, setSelectedHours] = useState(0);
    const [selectedMinutes, setSelectedMinutes] = useState(0);
    const [selectedSeconds, setSelectedSeconds] = useState(0);
    const [isRunning, setIsRunning] = useState(false);
    const [showButtons, setShowButtons] = useState(false);

    const creatArray = length => {
        const arr =[];
        let i = 0;
        while(i<length){
            arr.push(i.toString());
            i += 1;
        }
        return arr;
    };

    const AVAILABLE_HOURS = creatArray(24);
    const AVAILABLE_MINUTES = creatArray(60);
    const AVAILABLE_SECONDS = creatArray(60);

    useEffect(() => {
        let interval;
    
        if (isRunning) {
            interval = setInterval(() => {
                if (selectedSeconds === 0 && selectedMinutes === 0 && selectedHours === 0) {
                    clearInterval(interval);
                    setIsRunning(false);
                } else {
                    let hours = selectedHours;
                    let minutes = selectedMinutes;
                    let seconds = selectedSeconds;
    
                    if (seconds === 0) {
                        if (minutes === 0) {
                        hours -= 1;
                        minutes = 59;
                        } else {
                        minutes -= 1;
                        }
                        seconds = 59;
                    } else {
                        seconds -= 1;
                    }
            
                    setSelectedHours(hours);
                    setSelectedMinutes(minutes);
                    setSelectedSeconds(seconds);
                }
            }, 10);
        }
    
        return () => clearInterval(interval);
      }, [selectedSeconds, isRunning]);

    useEffect(() => {
        // Check if any of the time values are non-zero
        const anyNonZero = selectedSeconds !== 0 || selectedMinutes !== 0 || selectedHours !== 0;
    
        // Update showButtons state based on timer values
        // setShowButtons(anyNonZero);
    }, [selectedSeconds, selectedMinutes, selectedHours]);

    const handleButton = () => {
        setIsRunning(!isRunning);
    }

    function selectedTime(hours, minutes, seconds) {
        setShowButtons(true)
        if (hours !== 'NA' && minutes === 'NA' && seconds === 'NA') {
            setSelectedHours(hours);
            if (hours === '0' && selectedMinutes === '0' && selectedSeconds === '0')
                setShowButtons(false)
        } else if (hours === 'NA' && minutes !== 'NA' && seconds === 'NA') {
            setSelectedMinutes(minutes);
            if (minutes === '0' && selectedHours === '0' && selectedSeconds === '0')
                setShowButtons(false)
        } else if (hours === 'NA' && minutes === 'NA' && seconds !== 'NA') {
            setSelectedSeconds(seconds);
            if (seconds === '0' && selectedHours === '0' && selectedMinutes === '0')
                setShowButtons(false)
        }

        // if (hours === '0') {
        //     setShowButtons(false)
        //     console.log('hello')
        // }  
       
    }

    return (
        <View style={styles.container}>
            {isRunning ? (
            <View>
                <Text>{selectedHours}:{selectedMinutes}:{selectedSeconds}</Text>
            </View>
            ) 
            : 
            (
            <View style={styles.pickerContainer}>
                <Picker
                    style={styles.picker}
                    itemStyle={styles.pickerItem}
                    selectedValue={selectedHours}
                    onValueChange={itemValue => {
                        selectedTime(itemValue, 'NA', 'NA');
                        // setSelectedHours(itemValue);
                        // setShowButtons(false);
                        // if (itemValue === '0') {
                        //     console.log('False')
                        // } else {
                        //     console.log('True')
                        //     setShowButtons(true)
                        // }
                        // console.log(itemValue)
                    }}
                    mode = "dropdown"
                >
                {
                    AVAILABLE_HOURS.map(value => (
                        <Picker.Item key={value} label={value} value={value} />
                    ))
                }
                </Picker>
                <Text style={styles.pickerItem}>:</Text>
                <Picker
                    style={styles.picker}
                    itemStyle={styles.pickerItem}
                    selectedValue={selectedMinutes}
                    onValueChange={itemValue => {
                        // setSelectedMinutes(itemValue);
                        selectedTime('NA', itemValue, 'NA');
                    }}
                    mode = "dropdown"
                >
                {
                    AVAILABLE_MINUTES.map(value => (
                        <Picker.Item key={value} label={value} value={value} />
                    ))
                }
                </Picker>
                <Text style={styles.pickerItem}>:</Text>
                <Picker
                    style={styles.picker}
                    itemStyle={styles.pickerItem}
                    selectedValue={selectedSeconds}
                    onValueChange={itemValue => {
                        // setSelectedSeconds(itemValue);
                        selectedTime('NA', 'NA', itemValue);
                    }}
                    mode = "dropdown"
                >
                {
                    AVAILABLE_SECONDS.map(value => (
                        <Picker.Item key={value} label={value} value={value} />
                    ))
                }
                </Picker> 
            </View>
            )}
            
            
            {showButtons && (
                <View style={{ flexDirection: "row" }}>
                    <Button title={isRunning ? "Pause" : "Start"} onPress={handleButton} />
                    <Button
                        title="Reset"
                        onPress={() => {
                            setSelectedHours(0);
                            setSelectedMinutes(0);
                            setSelectedSeconds(0);
                            setIsRunning(false);
                        }}
                    />
                </View>
            )}
        </View>
    );
}

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