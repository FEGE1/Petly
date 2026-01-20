import { Stack } from "expo-router";
import { useFonts } from "expo-font";
import { Text } from "react-native";

export default function RootLayout() {
  const [loaded] = useFonts({
    "Inter-Thin": require("../assets/fonts/Inter_18pt-Thin.ttf"),
    "Inter-Light": require("../assets/fonts/Inter_18pt-Light.ttf"),
    "Inter-ExtraLight": require("../assets/fonts/Inter_18pt-ExtraLight.ttf"),
    "Inter-Regular": require("../assets/fonts/Inter_18pt-Regular.ttf"),
    "Inter-Medium": require("../assets/fonts/Inter_18pt-Medium.ttf"),
    "Inter-SemiBold": require("../assets/fonts/Inter_18pt-SemiBold.ttf"),
    "Inter-Bold": require("../assets/fonts/Inter_18pt-Bold.ttf"),
    "Inter-ExtraBold": require("../assets/fonts/Inter_18pt-ExtraBold.ttf"),
    "Inter-Black": require("../assets/fonts/Inter_18pt-Black.ttf"),

    "Inter-Italic": require("../assets/fonts/Inter_18pt-Italic.ttf"),
    "Inter-MediumItalic": require("../assets/fonts/Inter_18pt-MediumItalic.ttf"),
    "Inter-BoldItalic": require("../assets/fonts/Inter_18pt-BoldItalic.ttf"),
  });

  if (!loaded) {
    return null; 
  }
  const AnyText = Text as any;

  AnyText.defaultProps = AnyText.defaultProps || {};
  AnyText.defaultProps.style = [
    { fontFamily: "Inter-Regular" },
    AnyText.defaultProps.style,
  ];

  return <Stack screenOptions={{ headerShown: false }} />;
}
