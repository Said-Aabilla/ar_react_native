import React, { useState } from "react";
import { StyleSheet } from "react-native";
import {
  ViroARScene,
  ViroTrackingStateConstants,
  Viro3DObject,
  Viro360Image,
  ViroText,
  ViroAmbientLight
} from "@reactvision/react-viro";

const InitialARScene = () => {
  const [trackingInitialized, setTrackingInitialized] = useState(false);

  function onInitialized(state, reason) {
    console.log("guncelleme", state, reason);
    if (state === ViroTrackingStateConstants.TRACKING_NORMAL) {
      setTrackingInitialized(true);
    } else if (state === ViroTrackingStateConstants.TRACKING_UNAVAILABLE) {
      // Handle loss of tracking
    }
  }

  return (

    <ViroARScene onTrackingUpdated={onInitialized}>

     <ViroAmbientLight color="#FFFFFF" />


      {trackingInitialized && (


          // <ViroText
          // text="Heeeey!!"
          // scale={[0.5, 0.5, 0.5]}
          // position={[0, 0, -1]}
          // style={styles.helloWorldTextStyle}
          // />


          // <Viro360Image source={require('../assets/test.jpg')} />

         //local
        <Viro3DObject
          source={require('../assets/bugatti/bugatti.obj')} 
          position={[0, 0,-1]}
          scale={[0.05, 0.05, 0.05]}
          type="obj"
        />

           //local
        //    <Viro3DObject
        //    source={require('../assets/lanternglb.glb')} 
        //    position={[0, 0,0]}
        //    scale={[0.01, 0.01, 0.01]}
        //    type="glb"
        //  />

         //distant
          // <Viro3DObject
          //   source={{ uri: "https://github.com/KhronosGroup/glTF-Sample-Models/raw/master/2.0/Duck/glTF-Binary/Duck.glb"}} 
          //   position={[0, 0, -1]}
          //   scale={[0.1, 0.1, 0.1]}
          //   type="GLB"
          // />

      
      )}
    </ViroARScene>
  );
};

const styles = StyleSheet.create({
  helloWorldTextStyle: {
    fontFamily: "Arial",
    fontSize: 30,
    color: "#ffffff",
    textAlignVertical: "center",
    textAlign: "center",
  },
});

export default InitialARScene;
