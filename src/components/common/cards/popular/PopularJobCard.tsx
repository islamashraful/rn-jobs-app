import React from "react";
import { View, Text, Pressable, Image } from "react-native";

import stylesFunc from "./popularjobcard.style";
import { checkImageURL } from "@/utils";

const DEFAULT_IMG_URL =
  "https://t4.ftcdn.net/jpg/05/05/61/73/360_F_505617309_NN1CW7diNmGXJfMicpY9eXHKV4sqzO5H.jpg";

interface PopularJob {
  selectedJob: string;
  jobId: string;
  image: string;
  companyTitle: string;
  position: string;
  country: string;
  onPress?: () => void;
}

const PopularJobCard = ({
  selectedJob,
  jobId,
  image,
  companyTitle,
  position,
  country,
  onPress,
}: PopularJob) => {
  const styles = stylesFunc(selectedJob, jobId);

  return (
    <Pressable style={styles.container} onPress={onPress}>
      <Pressable style={styles.logoContainer}>
        <Image
          source={{
            uri: image || DEFAULT_IMG_URL,
          }}
          resizeMode="contain"
          style={styles.logoImage}
        />
      </Pressable>
      <Text style={styles.companyName} numberOfLines={1}>
        {companyTitle}
      </Text>
      <View style={styles.infoContainer}>
        <Text style={styles.jobName} numberOfLines={1}>
          {position}
        </Text>
        <Text style={styles.location}>{country}</Text>
      </View>
    </Pressable>
  );
};

export default PopularJobCard;
