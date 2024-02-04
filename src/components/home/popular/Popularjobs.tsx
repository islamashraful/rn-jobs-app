import React, { useState } from "react";
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
import useFetch from "@/hook/useFetch";
import { useNavigation } from "@react-navigation/native";
import { StackScreenProps } from "@react-navigation/stack";
import { AppStackParamList } from "App";

const Popularjobs = () => {
  const { jobs, isLoading, error } = useFetch("search", {
    query: "Python developer in Texas, USA",
    page: "1",
    num_pages: "1",
  });
  const [selectedJob, setSelectedJob] = useState("");

  const { navigate } =
    useNavigation<StackScreenProps<AppStackParamList, "Home">["navigation"]>();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Popular Jobs</Text>
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
          <FlatList
            data={jobs}
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
