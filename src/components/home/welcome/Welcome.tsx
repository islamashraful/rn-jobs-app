import React, { Dispatch, useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  Image,
  FlatList,
} from "react-native";
import { icons, SIZES } from "@/constants";

import styles, { getTabStyles } from "./welcome.style";
import { JobTypes } from "./types";

const AllJobs: JobTypes[] = ["Full-Time", "Part-Time", "Contractor"];

interface Props {
  searchTerm: string;
  setSearchTerm: Dispatch<React.SetStateAction<string>>;
  onPressSearch: () => void;
}

const Welcome = ({ searchTerm, setSearchTerm, onPressSearch }: Props) => {
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
            value={searchTerm}
            onChangeText={(text) => setSearchTerm(text)}
            placeholder="What are you looking for?"
          />
        </View>

        <Pressable style={styles.searchBtn} onPress={onPressSearch}>
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
