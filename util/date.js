import Moment from "moment";
import { Platform, NativeModules } from "react-native";

const deviceLanguage =
  Platform.OS === "ios"
    ? NativeModules.SettingsManager.settings.AppleLocale ||
      NativeModules.SettingsManager.settings.AppleLanguages[0] //iOS 13
    : NativeModules.I18nManager.localeIdentifier;

class ParsedDate {
  constructor(date) {
    this.date = Moment(date);
  }

  get locale() {
    try {
      return deviceLanguage;
    } catch (e) {
      return "en-US";
    }
  }

  toString() {
    return this.date.format("MMM D, YYYY, hh:mm:ss A");
  }
}

export default ParsedDate;
