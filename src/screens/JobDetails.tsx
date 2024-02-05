import { StackScreenProps } from "@react-navigation/stack";
import { AppStackParamList } from "App";
import { useCallback, useEffect, useState } from "react";
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
import useApi from "@/hook/useApi";
import { JobDetails as IJobDetails } from "@/models/jobs";
import jobsApi from "@/api/jobs";

const tabs = ["About", "Qualifications", "Responsibilities"];

const JobDetails = ({
  route,
}: StackScreenProps<AppStackParamList, "JobDetails">) => {
  const jobDetailsApi = useApi<IJobDetails[]>(
    jobsApi.details(route.params.jobId)
  );

  const [refreshing, setRefershing] = useState(false);
  const [activeTab, setActiveTab] = useState(tabs[0]);

  useEffect(() => {
    jobDetailsApi.request();
  }, []);

  const onRefresh = useCallback(() => {
    setRefershing(true);
    jobDetailsApi.request();
    setRefershing(false);
  }, []);

  const displayTabContent = () => {
    switch (activeTab) {
      case "Qualifications":
        return (
          <Specifics
            title="Qualifications"
            points={
              jobDetailsApi.data?.[0]?.job_highlights?.Qualifications ?? ["N/A"]
            }
          />
        );

      case "About":
        return (
          <JobAbout
            info={
              jobDetailsApi.data?.[0]?.job_description ?? "No data provided"
            }
          />
        );

      case "Responsibilities":
        return (
          <Specifics
            title="Responsibilities"
            points={
              jobDetailsApi.data?.[0].job_highlights?.Responsibilities ?? [
                "N/A",
              ]
            }
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
        {jobDetailsApi.loading ? (
          <ActivityIndicator size="large" color={COLORS.primary} />
        ) : jobDetailsApi.error ? (
          <Text>Something went wrong!</Text>
        ) : !jobDetailsApi.data ? (
          <Text>No Data</Text>
        ) : (
          <View style={{ padding: SIZES.medium, paddingBottom: 100 }}>
            <Company
              companyLogo={jobDetailsApi.data[0].employer_logo}
              jobTitle={jobDetailsApi.data[0].job_title}
              companyName={jobDetailsApi.data[0].employer_name}
              location={jobDetailsApi.data[0].job_country}
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
          jobDetailsApi.data?.[0]?.job_google_link ||
          "https://careers.google.com/jobs/results/"
        }
      />
    </SafeAreaView>
  );
};

export default JobDetails;
