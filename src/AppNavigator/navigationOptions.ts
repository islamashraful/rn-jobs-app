import { COLORS, icons, images } from "@/constants";
import { ImageSourcePropType } from "react-native";
import { StackNavigationOptions } from "@react-navigation/stack";
import { AppStackParamList } from "./types";

export const navigationOptions: StackNavigationOptions = {
  headerStyle: { backgroundColor: COLORS.lightWhite },
  headerShadowVisible: false,
  headerBackTitleVisible: false,
  headerTitle: "",
};
