# React Native AR Integration Tutorial with @reactvision/react-viro

This guide provides step-by-step instructions to integrate AR functionality into a React Native project using the `@reactvision/react-viro` library.

---

## Steps

### Step 1: Install the Library
Run the following command to install `@reactvision/react-viro`:
```bash
npm install --save @reactvision/react-viro
```

### Step 2: Update `app.json`
Add the following configuration to the `plugins` array in your `app.json` file:

```json
[
  "@reactvision/react-viro",
  {
    "android": {
      "xRMode": ["AR"]
    },
    "ios": {
      "cameraUsagePermission": "$(PRODUCT_NAME) uses your camera for AR experiences. This is a custom InfoPlist string!",
      "microphoneUsagePermission": "$(PRODUCT_NAME) uses your microphone for AR experiences. This is a custom InfoPlist string!",
      "photosPermission": "$(PRODUCT_NAME) would like to read photos for AR experiences. This is a custom InfoPlist string!",
      "savephotosPermission": "$(PRODUCT_NAME) would like to save photos to your library during AR experiences. This is a custom InfoPlist string!"
    }
  }
]
```

### Step 3: Generate Android Folder
Run the following command to generate the `android` folder:

```bash
npx expo prebuild --clean -p android --no-install
```

### Step 4: Create and Modify `metro.config.js`
Create the `metro.config.js` file using the following command:

```bash
npx expo customize metro.config.js
```

Modify the file to include the following configuration:

```javascript
Copier le code
const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

config.resolver.assetExts.push(
  // Adds support for `glb` files
  'glb'
);

module.exports = config;
```

### Step 5: Create an AR Component
Create an AR component (e.g., `ArComponent.js`) with the following code:

```javascript
import React, { useState } from "react";
import {
  ViroARScene,
  ViroTrackingStateConstants,
  Viro3DObject,
  ViroAmbientLight
} from "@reactvision/react-viro";

const ArComponent = (props) => {
  const [trackingInitialized, setTrackingInitialized] = useState(false);
  const [duckScale, setDuckScale] = useState([0.1, 0.1, 0.1]);

  function onInitialized(state, reason) {
    console.log("guncelleme", state, reason);
    if (state === ViroTrackingStateConstants.TRACKING_NORMAL) {
      setTrackingInitialized(true);
    }
  }

  function handleClick() {
    console.log("Clicking on duck!");
  }

  function handleDrag(dragToPos) {
    console.log("Dragged to position:", dragToPos);
  }

  function handlePinch(pinchState, scaleFactor, source) {
    if (pinchState === 3) { // Pinch end
      setDuckScale([
        duckScale[0] * scaleFactor,
        duckScale[1] * scaleFactor,
        duckScale[2] * scaleFactor
      ]);
    }
  }

  return (
    <ViroARScene onTrackingUpdated={onInitialized}>
      <ViroAmbientLight color="#FFFFFF" />
      {trackingInitialized && (
        <Viro3DObject
          source={{
            uri: "https://github.com/KhronosGroup/glTF-Sample-Models/blob/main/2.0/Duck/glTF-Binary/Duck.glb?raw=true"
          }}
          position={[0, 0, -1]}
          scale={duckScale}
          type="GLB"
          onClick={handleClick}
          onDrag={handleDrag}
          onPinch={handlePinch}
        />
      )}
    </ViroARScene>
  );
};

export default ArComponent;
```


### Step 6: Create an AR Screen
Create an AR screen (e.g., `ARScreen.js`) with the following code:

```javascript
import React from "react";
import { ViroARSceneNavigator } from "@reactvision/react-viro";
import ArComponent from "../components/ar/ArComponent";

export default function ARScreen() {
  return (
    <ViroARSceneNavigator
      initialScene={{ scene: ArComponent }}
      style={{ flex: 1 }}
    />
  );
}
```

### Step 7: Add AR Screen to Routes
Add the AR screen to your routes and use a router to launch it. Example code:

```javascript
<Stack.Screen name="ar" options={{ headerShown: false }} />

const router = useRouter();

const handleArScene = () => {
  router.push("/ar");
};
```

### Step 8: Build the App
Run the following command to build the app:

```bash
eas build --profile development --platform android
```


### Step 9: Start the Development Server
Finally, start the development server using:

```bash
npx expo start
```
