import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, Button, Image } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";

const initResult = "No Data";

export default function App() {
  const [hasPermission, setHasPermission] = useState(null);
  const [result, setResult] = useState(initResult);
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    // alert(`Bar code with type ${type} and data ${data} has been scanned!`);
    setResult(data);
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  const scannerFrameSrc = require("../../assets/scanner-frame.png");

  return (
    <View style={styles.container}>
      {!scanned && (
        <View style={styles.cancelButton}>
          <Button
            title={"Cancel"}
            color="#fff"
            onPress={() => {
              setScanned(true);
              setResult(initResult);
            }}
          />
        </View>
      )}

      {!scanned && (
        <Image style={styles.scannerFrame} source={scannerFrameSrc} />
      )}

      {!scanned && (
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          style={StyleSheet.absoluteFillObject}
        />
      )}
      {scanned && (
        <Button
          title={"Tap to Scan Again"}
          onPress={() => {
            setScanned(false);
            setResult(initResult);
          }}
        />
      )}
      {scanned && <Text>{result}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  inputbox: {
    // borderWidth: 1,
    // borderColor: "red",
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    width: "50%",
  },
  scannerFrame: {
    position: "absolute",
    zIndex: 999,
    top: "10%",
  },
  cancelButton: {
    position: "absolute",
    zIndex: 999,
    bottom: "10%",
  },
});
