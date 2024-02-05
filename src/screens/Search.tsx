import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  TouchableOpacity,
  View,
} from "react-native";
import { Text, SafeAreaView } from "react-native";
import axios from "axios";

import { NearbyJobCard } from "@/components";
import { COLORS, icons, SIZES } from "@/constants";
import styles from "@/styles/search";
import { AppStackParamList } from "App";
import { StackScreenProps } from "@react-navigation/stack";

interface Job {
  job_id: string;
  job_title: string;
  employer_logo: string;
  job_employment_type: string;
}

interface Response<T> {
  status: string;
  data: T;
}

const Search = ({
  route: {
    params: { searchTerm },
  },
  navigation: { navigate },
}: StackScreenProps<AppStackParamList, "Search">) => {
  const [searchResult, setSearchResult] = useState<Job[]>([]);
  const [searchLoader, setSearchLoader] = useState(false);
  const [searchError, setSearchError] = useState("");
  const [page, setPage] = useState(1);

  const handleSearch = async () => {
    setSearchLoader(true);
    setSearchResult([]);

    try {
      const options = {
        method: "GET",
        url: `https://jsearch.p.rapidapi.com/search`,
        headers: {
          "X-RapidAPI-Key": process.env.EXPO_PUBLIC_API_KEY,
          "X-RapidAPI-Host": "jsearch.p.rapidapi.com",
        },
        params: {
          query: searchTerm,
          page: page.toString(),
        },
      };

      const response = await axios.request<Response<Job[]>>(options);
      setSearchResult(response.data.data);
    } catch (error) {
      setSearchError("Something went wrong");
      console.log(error);
    } finally {
      setSearchLoader(false);
    }
  };

  const handlePagination = (direction: "left" | "right") => {
    if (direction === "left" && page > 1) {
      setPage(page - 1);
      handleSearch();
    } else if (direction === "right") {
      setPage(page + 1);
      handleSearch();
    }
  };

  useEffect(() => {
    handleSearch();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
      <FlatList
        data={searchResult}
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
              {searchLoader ? (
                <ActivityIndicator size="large" color={COLORS.primary} />
              ) : (
                searchError && <Text>Oops something went wrong</Text>
              )}
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
