import React from "react";
import { View, Text, Pressable, Image } from "react-native";

import styles from "./nearbyjobcard.style";
import { checkImageURL } from "@/utils";

const DEFAULT_IMG_URL =
  "https://t4.ftcdn.net/jpg/05/05/61/73/360_F_505617309_NN1CW7diNmGXJfMicpY9eXHKV4sqzO5H.jpg";

interface NearbyJob {
  jobId: string;
  image: string;
  jobTitle: string;
  jobType: string;
  onPress?: () => void;
}

const NearbyJobCard = ({ image, jobTitle, jobType, onPress }: NearbyJob) => {
  return (
    <Pressable style={styles.container} onPress={onPress}>
      <Pressable style={styles.logoContainer}>
        <Image
          source={{
            uri: checkImageURL(image) ? image : DEFAULT_IMG_URL,
          }}
          resizeMode="contain"
          style={styles.logoImage}
        />
      </Pressable>

      <View style={styles.textContainer}>
        <Text style={styles.jobName} numberOfLines={1}>
          {jobTitle}
        </Text>
        <Text style={styles.jobType}>{jobType}</Text>
      </View>
    </Pressable>
  );
};

export default NearbyJobCard;
