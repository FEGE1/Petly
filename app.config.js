import "dotenv/config";

export default ({ config }) => ({
  ...config,
  expo: {
    ...config.expo,

    name: "Petly",
    slug: "App01",
    version: "1.0.1",
    orientation: "portrait",
    icon: "./assets/images/icon.png",
    scheme: "app01",
    userInterfaceStyle: "automatic",
    newArchEnabled: true,

    ios: {
      ...config.expo?.ios,
      supportsTablet: true,
      buildNumber: "2",
      bundleIdentifier: "com.anonymous.App01",
      config: {
        googleMapsApiKey: process.env.MAPS_IOS_API_KEY,
      },
    },

    android: {
      ...config.expo?.android,
      versionCode: 2,
      adaptiveIcon: {
        backgroundColor: "#E6F4FE",
        foregroundImage: "./assets/images/android-icon-foreground.png",
        backgroundImage: "./assets/images/android-icon-background.png",
        monochromeImage: "./assets/images/android-icon-monochrome.png",
      },
      edgeToEdgeEnabled: true,
      predictiveBackGestureEnabled: false,
      package: "com.anonymous.App01",
      config: {
        googleMaps: {
          apiKey: process.env.MAPS_ANDROID_API_KEY,
        },
      },
    },

    web: {
      output: "static",
      favicon: "./assets/images/favicon.png",
    },

    plugins: [
      "expo-router",
      [
        "expo-splash-screen",
        {
          image: "./assets/images/splash-icon.png",
          imageWidth: 200,
          resizeMode: "contain",
          backgroundColor: "#ffffff",
          dark: { backgroundColor: "#000000" },
        },
      ],
      "expo-font",
    ],

    experiments: {
      typedRoutes: true,
      reactCompiler: true,
    },
  },
});
