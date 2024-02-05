import React, { useEffect } from "react";
import { View, Text, Pressable, ActivityIndicator } from "react-native";

import styles from "./nearbyjobs.style";
import { COLORS } from "@/constants";
import NearbyJobCard from "@/components/common/cards/nearby/NearbyJobCard";
import { StackScreenProps } from "@react-navigation/stack";

import { useNavigation } from "@react-navigation/native";
import useApi from "@/hook/useApi";
import { Job } from "@/models/jobs";
import jobsApi from "@/api/jobs";
import { AppStackParamList } from "@/AppNavigator/types";

const Nearbyjobs = () => {
  const nearbyJobsApi = useApi<Job[]>(jobsApi.nearby);

  const { navigate } =
    useNavigation<StackScreenProps<AppStackParamList, "Home">["navigation"]>();

  useEffect(() => {
    nearbyJobsApi.request();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Nearby Jobs</Text>
        <Pressable>
          <Text style={styles.headerBtn}>Show All</Text>
        </Pressable>
      </View>

      <View style={styles.cardsContainer}>
        {nearbyJobsApi.loading ? (
          <ActivityIndicator size="large" color={COLORS.primary} />
        ) : nearbyJobsApi.error ? (
          <Text>{nearbyJobsApi.error}</Text>
        ) : (
          nearbyJobsApi.data?.map((item) => (
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
