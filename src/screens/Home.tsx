import { View, SafeAreaView, ScrollView } from "react-native";

import { COLORS, SIZES } from "@/constants";
import { Nearbyjobs, Popularjobs, Welcome } from "@/components";

export default function HomeScreen() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ flex: 1, padding: SIZES.medium }}>
          <Welcome />
          <Popularjobs />
          <Nearbyjobs />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
