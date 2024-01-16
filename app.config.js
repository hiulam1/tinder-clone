export default {
  expo: {
    plugins: [
      "@react-native-google-signin/google-signin",
    ],
    name: "test-2",
    slug: "test-2",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/icon.png",
    userInterfaceStyle: "light",
    splash: {
      image: "./assets/splash.png",
      resizeMode: "contain",
      backgroundColor: "#ffffff",
    },
    assetBundlePatterns: ["**/*"],
    ios: {
      supportsTablet: true,
      bundleIdentifier: "com.colocs.ios",
      googleServicesFile: process.env.GOOGLESERVICE_INFO_PLIST,
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/adaptive-icon.png",
        backgroundColor: "#ffffff",
      },
      googleServicesFile: process.env.GOOGLE_SERVICES_JSON,
      package: "com.colocs.android",
    },
    web: {
      favicon: "./assets/favicon.png",
    },
    extra: {
      eas: {
        projectId: "ff662efb-21ad-446a-a028-57d2bcd38b7c",
      },
    },
  },
};
