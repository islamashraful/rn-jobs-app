import React from "react";
import { View, Text, Pressable, ActivityIndicator } from "react-native";

import styles from "./nearbyjobs.style";
import { COLORS } from "@/constants";
import NearbyJobCard from "@/components/common/cards/nearby/NearbyJobCard";
import useFetch from "@/hook/useFetch";

const Nearbyjobs = () => {
  const { jobs, isLoading, error } = useFetch("search", {
    query: "Python developer in Texas, USA",
    page: "1",
    num_pages: "1",
  });

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
              image={item.employer_logo}
              jobTitle={item.job_title}
              jobType={item.job_employment_type}
            />
          ))
        )}
      </View>
    </View>
  );
};

export default Nearbyjobs;
