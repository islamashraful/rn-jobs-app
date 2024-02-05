import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Pressable,
  FlatList,
  ActivityIndicator,
} from "react-native";

import styles from "./popularjobs.style";
import { COLORS, SIZES } from "@/constants";
import PopularJobCard from "@/components/common/cards/popular/PopularJobCard";
import { useNavigation } from "@react-navigation/native";
import { StackScreenProps } from "@react-navigation/stack";

import jobsApi from "@/api/jobs";
import useApi from "@/hook/useApi";
import { Job } from "@/models/jobs";
import { AppStackParamList } from "@/AppNavigator/types";

const Popularjobs = () => {
  const popularJobsApi = useApi<Job[]>(jobsApi.popular);
  const [selectedJob, setSelectedJob] = useState("");

  const { navigate } =
    useNavigation<StackScreenProps<AppStackParamList, "Home">["navigation"]>();

  useEffect(() => {
    popularJobsApi.request();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Popular Jobs</Text>
        <Pressable>
          <Text style={styles.headerBtn}>Show All</Text>
        </Pressable>
      </View>

      <View style={styles.cardsContainer}>
        {popularJobsApi.loading ? (
          <ActivityIndicator size="large" color={COLORS.primary} />
        ) : popularJobsApi.error ? (
          <Text>{popularJobsApi.error}</Text>
        ) : (
          <FlatList
            data={popularJobsApi.data}
            renderItem={({ item }) => (
              <PopularJobCard
                selectedJob={selectedJob}
                jobId={item.job_id}
                image={item.employer_logo}
                companyTitle={item.employer_name}
                position={item.job_title}
                country={item.job_country}
                onPress={() => {
                  navigate("JobDetails", { jobId: item.job_id });
                  setSelectedJob(item.job_id);
                }}
              />
            )}
            keyExtractor={(item) => item?.job_id}
            contentContainerStyle={{ columnGap: SIZES.medium }}
            horizontal
            showsHorizontalScrollIndicator={false}
          />
        )}
      </View>
    </View>
  );
};

export default Popularjobs;
