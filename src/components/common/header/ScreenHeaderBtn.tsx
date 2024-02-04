import React from "react";
import {
  Pressable,
  Image,
  ImageSourcePropType,
  DimensionValue,
} from "react-native";

import styles, { scaleBtnImg } from "./screenheader.style";

interface Props {
  iconUrl: ImageSourcePropType;
  dimension: DimensionValue;
  onPress?: () => void;
}

const ScreenHeaderBtn = ({ iconUrl, dimension, onPress }: Props) => {
  return (
    <Pressable style={styles.btnContainer} onPress={onPress}>
      <Image
        source={iconUrl}
        resizeMode="cover"
        style={scaleBtnImg(dimension)}
      />
    </Pressable>
  );
};

export default ScreenHeaderBtn;
