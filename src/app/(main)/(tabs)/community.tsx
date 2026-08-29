import {
  ScrollView,
  StyleSheet,
} from "react-native";

import NgoHorizontalList from "../../../components/NgoHorizontalList";

export default function Community() {
  return (
    <ScrollView style={styles.home}>
      <NgoHorizontalList />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  home: {
    paddingHorizontal: 12,
  },
});