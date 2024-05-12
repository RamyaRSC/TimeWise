import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";

export default Clock = () => {
    const [currentDateTime, setCurrentDateTime] = useState(new Date());

  useEffect(() => {
    // Update the time every second
    const intervalId = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);

    // Cleanup the interval
    return () => clearInterval(intervalId);
  }, []);

  const formattedDateTime = currentDateTime.toLocaleString();

  return (
    <View>
      <Text>Clock</Text>
      <Text style={styles.dateTime}>{formattedDateTime}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
    dateTime: {
        fontSize: 20,
    },
});