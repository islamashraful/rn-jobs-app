import { DimensionValue, StyleSheet } from "react-native";

import { COLORS, SIZES } from "../../../constants";

const styles = StyleSheet.create({
  btnContainer: {
    width: 40,
    height: 40,
    backgroundColor: COLORS.white,
    borderRadius: SIZES.small / 1.25,
    justifyContent: "center",
    alignItems: "center",
  },
  btnImg: {
    width: "100%",
    height: "100%",
    borderRadius: SIZES.small / 1.25,
  },
});

export const scaleBtnImg = (dimension: DimensionValue) => {
  return {
    ...styles.btnImg,
    width: dimension,
    height: dimension,
  };
};

export default styles;
