export default {
  "expo": {
    "name": "goaly-app",
    "slug": "goaly-app",
    "version": "1.0.0",
    "orientation": "portrait",
    "icon": "./assets/images/icon.png",
    "scheme": "myapp",
    "userInterfaceStyle": "automatic",
    "splash": {
      "image": "./assets/images/splash.png",
      "resizeMode": "contain",
      "backgroundColor": "#ffffff"
    },
    "ios": {
      "splash": {
        "image": "./assets/images/splash.png",
      },
      "supportsTablet": true,
      "bundleIdentifier": "com.goaly.goalyapp",
      "googleServicesFile": process.env.GOOGLESERVICE_INFO_PLIST ?? "./ios/GoogleService-Info.plist",
    },
    "android": {
      "adaptiveIcon": {
        "foregroundImage": "./assets/images/adaptive-icon.png",
        "backgroundColor": "#ffffff",
      },
      "splash": {
        "image": "./assets/images/splash.png",
        "resizeMode": "contain",
        "backgroundColor": "#ffffff"
      },
      "package": "com.goaly.goalyapp",
      "googleServicesFile": process.env.GOOGLE_SERVICES_JSON ?? "./android/app/google-services.json",
    },
    "web": {
      "bundler": "metro",
      "output": "static",
      "favicon": "./assets/images/favicon.png"
    },
    "plugins": [
      "expo-router",
      "expo-font",
      "@react-native-firebase/app",
      "@react-native-firebase/auth",
      "@react-native-google-signin/google-signin",
      [
        "expo-build-properties",
        {
          "ios": {
            "useFrameworks": "static"
          }
        }
      ],
    ],
    "experiments": {
      "typedRoutes": true
    },
    "extra": {
      "router": {
        "origin": false
      },
      "updates": {
        "url": "https://u.expo.dev/94796673-4adc-425b-8f86-1b64dc46d00e"
      },
      "runtimeVersion": {
        "policy": "appVersion"
      },
      "eas": {
        "projectId": "94796673-4adc-425b-8f86-1b64dc46d00e"
      }
    }
  }
}
