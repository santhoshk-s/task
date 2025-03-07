import { Share } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const exportHistory = async () => {
  const data = await AsyncStorage.getItem("timers");
  if (data) {
    Share.share({
      message: JSON.stringify(JSON.parse(data).history, null, 2),
    });
  }
};
