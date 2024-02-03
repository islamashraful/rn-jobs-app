import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  Image,
  FlatList,
} from "react-native";
import { useRouter } from "expo-router";
import { icons, SIZES } from "@/constants";

import styles, { getTabStyles } from "./welcome.style";
import { JobTypes } from "./types";

const AllJobs: JobTypes[] = ["Full-Time", "Part-Time", "Contractor"];

const Welcome = () => {
  const router = useRouter();

  const [activeJobType, setActiveJobType] = useState<JobTypes>("Full-Time");

  return (
    <View>
      <View style={styles.container}>
        <Text style={styles.userName}>Hello Ashraful</Text>
        <Text style={styles.welcomeMessage}>Find your perfect job</Text>
      </View>

      <View style={styles.searchContainer}>
        <View style={styles.searchWrapper}>
          <TextInput
            style={styles.searchInput}
            value=""
            onChange={() => {}}
            placeholder="What are you looking for?"
          />
        </View>

        <Pressable style={styles.searchBtn}>
          <Image
            source={icons.search}
            resizeMode="contain"
            style={styles.searchBtnImage}
          />
        </Pressable>
      </View>

      <View style={styles.tabsContainer}>
        <FlatList
          data={AllJobs}
          renderItem={({ item }) => (
            <Pressable
              style={getTabStyles(activeJobType, item).tab}
              onPress={() => {
                setActiveJobType(item);
                router.push(`/search/${item}`);
              }}
            >
              <Text style={getTabStyles(activeJobType, item).tabText}>
                {item}
              </Text>
            </Pressable>
          )}
          keyExtractor={(item) => item}
          contentContainerStyle={{ columnGap: SIZES.small }}
          horizontal
        />
      </View>
    </View>
  );
};

export default Welcome;
