import React, { useState, useEffect } from "react";
import { Text, View, Button, TextInput, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default ({ navigation }) => {
  const [userName, setuserName] = useState("");
  const [password, setPassword] = useState("");

  const login = async () => {
    if (userName === "admin" && password === "admin") {
      setuserName("");
      setPassword("");
      await AsyncStorage.setItem("loggedIn", "true");
      navigation.navigate("Scanner");
    } else {
      alert("fail, username or password incorrect!");
    }
  };

  const bootstrapAsync = async () => {
    let loggedIn = false;
    try {
      const storedData = await AsyncStorage.getItem("loggedIn");
      loggedIn = JSON.parse(storedData);
    } catch (e) {
      console.log(e);
    }

    if (loggedIn) {
      setuserName("");
      setPassword("");
      navigation.navigate("Scanner");
    }
  };

  useEffect(() => {
    bootstrapAsync();
  }, [navigation]);

  return (
    <View style={styles.container}>
      <View style={styles.field}>
        <Text style={styles.label}>User Name</Text>
        <TextInput
          onChangeText={(text) => setuserName(text)}
          autoCapitalize={"none"}
          value={userName}
          style={styles.inputBox}
        />
      </View>
      <View style={styles.field}>
        <Text style={styles.label}>Password</Text>
        <TextInput
          onChangeText={(text) => setPassword(text)}
          autoCapitalize={"none"}
          value={password}
          style={styles.inputBox}
        />
      </View>
      <Button title="Login" color="#f194ff" onPress={login} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  field: {
    width: "50%",
    alignItems: "flex-start",
    marginBottom: 24,
  },
  label: {
    marginBottom: 8,
  },
  inputBox: {
    borderWidth: 1,
    width: "100%",
    height: 32,
  },
});
