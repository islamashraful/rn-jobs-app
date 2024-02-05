import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  TouchableOpacity,
  View,
} from "react-native";
import { Text, SafeAreaView } from "react-native";

import { NearbyJobCard } from "@/components";
import { COLORS, icons, SIZES } from "@/constants";
import styles from "@/styles/search";
import { AppStackParamList } from "App";
import { StackScreenProps } from "@react-navigation/stack";
import jobsApi from "@/api/jobs";
import useApi from "@/hook/useApi";
import { Job } from "@/models/jobs";

const Search = ({
  route: {
    params: { searchTerm },
  },
  navigation: { navigate },
}: StackScreenProps<AppStackParamList, "Search">) => {
  const searchJobsApi = useApi<Job[]>(jobsApi.search(searchTerm));
  const [page, setPage] = useState(1);

  const handlePagination = (direction: "left" | "right") => {
    if (direction === "left" && page > 1) {
      setPage(page - 1);
      // Request with new page data
    } else if (direction === "right") {
      setPage(page + 1);
      // Request with new page data
    }
  };

  useEffect(() => {
    searchJobsApi.request();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
      <FlatList
        data={searchJobsApi.data || []}
        renderItem={({ item }) => (
          <NearbyJobCard
            jobId={item.job_id}
            image={item.employer_logo}
            jobTitle={item.job_title}
            jobType={item.job_employment_type}
            onPress={() => navigate("JobDetails", { jobId: item.job_id })}
          />
        )}
        keyExtractor={(item) => item.job_id}
        contentContainerStyle={{ padding: SIZES.medium, rowGap: SIZES.medium }}
        ListHeaderComponent={() => (
          <>
            <View style={styles.container}>
              <Text style={styles.searchTitle}>{searchTerm}</Text>
              <Text style={styles.noOfSearchedJobs}>Job Opportunities</Text>
            </View>
            <View style={styles.loaderContainer}>
              {searchJobsApi.loading ? (
                <ActivityIndicator size="large" color={COLORS.primary} />
              ) : searchJobsApi.error ? (
                <Text>{searchJobsApi.error}</Text>
              ) : null}
            </View>
          </>
        )}
        ListFooterComponent={() => (
          <View style={styles.footerContainer}>
            <TouchableOpacity
              style={styles.paginationButton}
              onPress={() => handlePagination("left")}
            >
              <Image
                source={icons.chevronLeft}
                style={styles.paginationImage}
                resizeMode="contain"
              />
            </TouchableOpacity>
            <View style={styles.paginationTextBox}>
              <Text style={styles.paginationText}>{page}</Text>
            </View>
            <TouchableOpacity
              style={styles.paginationButton}
              onPress={() => handlePagination("right")}
            >
              <Image
                source={icons.chevronRight}
                style={styles.paginationImage}
                resizeMode="contain"
              />
            </TouchableOpacity>
          </View>
        )}
      />
    </SafeAreaView>
  );
};

export default Search;
