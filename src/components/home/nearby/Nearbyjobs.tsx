import React from "react";
import { View, Text, Pressable, ActivityIndicator } from "react-native";

import styles from "./nearbyjobs.style";
import { COLORS } from "@/constants";
import NearbyJobCard from "@/components/common/cards/nearby/NearbyJobCard";
import useFetch from "@/hook/useFetch";
import { StackScreenProps } from "@react-navigation/stack";
import { AppStackParamList } from "App";
import { useNavigation } from "@react-navigation/native";

const Nearbyjobs = () => {
  const { jobs, isLoading, error } = useFetch("search", {
    query: "Python developer in Texas, USA",
    page: "1",
    num_pages: "1",
  });

  const { navigate } =
    useNavigation<StackScreenProps<AppStackParamList, "Home">["navigation"]>();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Nearby Jobs</Text>
        <Pressable>
          <Text style={styles.headerBtn}>Show All</Text>
        </Pressable>
      </View>

      <View style={styles.cardsContainer}>
        {isLoading ? (
          <ActivityIndicator size="large" color={COLORS.primary} />
        ) : error ? (
          <Text>Something went wrong!</Text>
        ) : (
          jobs?.map((item) => (
            <NearbyJobCard
              key={`nearby-${item.job_id}-${item.job_employment_type}`}
              jobId={item.job_id}
              image={item?.employer_logo}
              jobTitle={item.job_title}
              jobType={item.job_employment_type}
              onPress={() => navigate("JobDetails", { jobId: item.job_id })}
            />
          ))
        )}
      </View>
    </View>
  );
};

export default Nearbyjobs;
