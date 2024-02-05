import { COLORS } from "@/constants";
import { StackNavigationOptions } from "@react-navigation/stack";

export const navigationOptions: StackNavigationOptions = {
  headerStyle: { backgroundColor: COLORS.lightWhite },
  headerShadowVisible: false,
  headerBackTitleVisible: false,
  headerTitle: "",
};
