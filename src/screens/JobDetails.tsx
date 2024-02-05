import { useRoute } from "@react-navigation/native";
import { StackScreenProps } from "@react-navigation/stack";
import { AppStackParamList } from "App";
import { useCallback, useState } from "react";
import {
  Text,
  View,
  SafeAreaView,
  ScrollView,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import { Company, JobAbout, JobFooter, JobTabs, Specifics } from "@/components";
import { COLORS, SIZES } from "@/constants";
import useJobDetails from "@/hook/useJobDetails";

const tabs = ["About", "Qualifications", "Responsibilities"];

const JobDetails = ({
  navigation,
  route,
}: StackScreenProps<AppStackParamList, "JobDetails">) => {
  const { jobs, isLoading, error, refetch } = useJobDetails({
    job_id: route.params.jobId,
  });

  const [refreshing, setRefershing] = useState(false);
  const [activeTab, setActiveTab] = useState(tabs[0]);

  const onRefresh = useCallback(() => {
    setRefershing(true);
    refetch();
    setRefershing(false);
  }, []);

  const displayTabContent = () => {
    switch (activeTab) {
      case "Qualifications":
        return (
          <Specifics
            title="Qualifications"
            points={jobs[0]?.job_highlights?.Qualifications ?? ["N/A"]}
          />
        );

      case "About":
        return (
          <JobAbout info={jobs[0]?.job_description ?? "No data provided"} />
        );

      case "Responsibilities":
        return (
          <Specifics
            title="Responsibilities"
            points={jobs[0].job_highlights?.Responsibilities ?? ["N/A"]}
          />
        );

      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {isLoading ? (
          <ActivityIndicator size="large" color={COLORS.primary} />
        ) : error ? (
          <Text>Something went wrong!</Text>
        ) : jobs.length === 0 ? (
          <Text>No Data</Text>
        ) : (
          <View style={{ padding: SIZES.medium, paddingBottom: 100 }}>
            <Company
              companyLogo={jobs[0].employer_logo}
              jobTitle={jobs[0].job_title}
              companyName={jobs[0].employer_name}
              location={jobs[0].job_country}
            />
            <JobTabs
              tabs={tabs}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
            />

            {displayTabContent()}
          </View>
        )}
      </ScrollView>
      <JobFooter
        url={
          jobs?.[0]?.job_google_link ||
          "https://careers.google.com/jobs/results/"
        }
      />
    </SafeAreaView>
  );
};

export default JobDetails;
