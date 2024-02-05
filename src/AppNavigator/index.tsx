import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { AppStackParamList } from "./types";
import * as Screens from "@/screens";
import { COLORS, icons, images } from "@/constants";
import { ScreenHeaderBtn } from "@/components";

const AppStack = createStackNavigator<AppStackParamList>();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <AppStack.Navigator>
        <AppStack.Screen
          name="Home"
          component={Screens.Home}
          options={{
            headerStyle: {
              backgroundColor: COLORS.lightWhite,
            },
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
        <AppStack.Screen
          name="JobDetails"
          component={Screens.JobDetails}
          options={({ navigation }) => ({
            headerStyle: { backgroundColor: COLORS.lightWhite },
            headerShadowVisible: false,
            headerBackTitleVisible: false,
            headerTitle: "",
            headerLeft: () => (
              <ScreenHeaderBtn
                iconUrl={icons.left}
                dimension="60%"
                onPress={() => navigation.goBack()}
              />
            ),
            headerRight: () => (
              <ScreenHeaderBtn iconUrl={icons.share} dimension="60%" />
            ),
          })}
        />
        <AppStack.Screen
          name="Search"
          component={Screens.Search}
          options={({ navigation }) => ({
            headerStyle: { backgroundColor: COLORS.lightWhite },
            headerShadowVisible: false,
            headerLeft: () => (
              <ScreenHeaderBtn
                iconUrl={icons.left}
                dimension="60%"
                onPress={() => navigation.goBack()}
              />
            ),
            headerTitle: "",
          })}
        />
      </AppStack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
