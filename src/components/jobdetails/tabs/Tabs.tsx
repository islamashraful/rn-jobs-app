import React, { Dispatch } from "react";
import { View, Text, FlatList, Pressable } from "react-native";

import getStyles from "./tabs.style";
import { SIZES } from "@/constants";

interface Props {
  tabs: string[];
  activeTab: string;
  setActiveTab: Dispatch<React.SetStateAction<string>>;
}

interface TabButtonProps {
  name: string;
  activeTab: string;
  onPress: () => void;
}
const TabButton = ({ name, activeTab, onPress }: TabButtonProps) => {
  const styles = getStyles(name, activeTab);

  return (
    <Pressable style={styles.btn} onPress={onPress}>
      <Text style={styles.btnText}>{name}</Text>
    </Pressable>
  );
};

const Tabs = ({ tabs, activeTab, setActiveTab }: Props) => {
  const styles = getStyles("", activeTab);
  return (
    <View style={styles.container}>
      <FlatList
        data={tabs}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <TabButton
            name={item}
            activeTab={activeTab}
            onPress={() => setActiveTab(item)}
          />
        )}
        contentContainerStyle={{ columnGap: SIZES.small / 2 }}
        keyExtractor={(item) => item}
      />
    </View>
  );
};

export default Tabs;
