import React from "react";
import { StyleSheet, View } from "react-native";
import { ViroARSceneNavigator } from "@reactvision/react-viro";
import InitialARScene from "./screens/InitialARScene"; 

const App = () => {
  return (
    <View style={styles.flexContainer}>
      <ViroARSceneNavigator
        initialScene={{
          scene: InitialARScene,
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  flexContainer: {
    flex: 1,
  },
});

export default App;



// import * as React from 'react';
// import { NavigationContainer } from '@react-navigation/native';
// import { createStackNavigator } from '@react-navigation/stack';
// import HomeScreen from './screens/HomeScreen';
// import ARScreen from './screens/ARScreen';

// const Stack = createStackNavigator();
// function App() {





//   // return (
//   //   <NavigationContainer>
//   //     <Stack.Navigator initialRouteName="Home">
//   //       <Stack.Screen name="Home" component={HomeScreen} />
//   //       {/* <Stack.Screen name="AR" component={ARScreen} /> */}
//   //     </Stack.Navigator>
//   //   </NavigationContainer>
//   // );
// }

// export default App;
