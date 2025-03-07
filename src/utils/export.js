import { Share } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import RNFS from "react-native-fs";

export const exportHistory = async () => {
  const data = await AsyncStorage.getItem("timers");
  if (!data) return;

  const historyData = JSON.stringify(JSON.parse(data).history, null, 2);
  const path = `${RNFS.DocumentDirectoryPath}/history.json`;

  await RNFS.writeFile(path, historyData, "utf8");

  Share.share({
    url: `file://${path}`,
    message: "Here is the timer history",
  });
};
