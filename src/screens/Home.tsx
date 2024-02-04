import { View, SafeAreaView, ScrollView } from "react-native";

import { COLORS, SIZES } from "@/constants";
import { Nearbyjobs, Popularjobs, Welcome } from "@/components";
import { useState } from "react";
import { StackScreenProps } from "@react-navigation/stack";
import { AppStackParamList } from "App";

export default function HomeScreen({
  navigation: { navigate },
}: StackScreenProps<AppStackParamList, "Home">) {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ flex: 1, padding: SIZES.medium }}>
          <Welcome
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            onPressSearch={() => {
              if (searchTerm) {
                navigate("Search", { searchTerm });
              }
            }}
          />
          <Popularjobs />
          <Nearbyjobs />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
