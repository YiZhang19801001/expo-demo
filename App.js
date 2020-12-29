import React from "react";
import { Button } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Login, Scanner, Notification } from "./pages";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen
          name="Scanner"
          options={({ navigation }) => ({
            headerLeft: () => (
              <Button
                title="Logout"
                onPress={async () => {
                  await AsyncStorage.setItem("loggedIn", "false");
                  navigation.navigate("Login");
                }}
              />
            ),
          })}
          component={Scanner}
        />
        <Stack.Screen name="Notification" component={Notification} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
