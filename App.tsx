import "react-native-gesture-handler";

import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { COLORS, icons, images } from "@/constants";
import { ScreenHeaderBtn } from "@/components";
import HomeScreen from "@/screens/Home";
import { Text, View } from "react-native";

type AppStackPatamList = {
  Home: undefined;
};

const AppStack = createStackNavigator<AppStackPatamList>();

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

const App = () => {
  const [loaded, error] = useFonts({
    SpaceMono: require("./src/assets/fonts/SpaceMono-Regular.ttf"),
    DMBold: require("./src/assets/fonts/DMSans-Bold.ttf"),
    DMMedium: require("./src/assets/fonts/DMSans-Medium.ttf"),
    DMRegular: require("./src/assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded || error) {
    return null;
  }

  return (
    <NavigationContainer>
      <AppStack.Navigator>
        <AppStack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            headerStyle: { backgroundColor: COLORS.lightWhite },
            headerShadowVisible: false,
            headerTitle: "",
            headerLeft: () => (
              <ScreenHeaderBtn iconUrl={icons.menu} dimension="60%" />
            ),
            headerRight: () => (
              <ScreenHeaderBtn iconUrl={images.profile} dimension="100%" />
            ),
          }}
        />
      </AppStack.Navigator>
    </NavigationContainer>
  );
};

export default App;
