import I18n from "i18n-js";
import * as Localization from "expo-localization";
import en from "../locales/en";
import lt from "../locales/lt";

I18n.fallbacks = true;
I18n.translations = { en, lt };

const locales = Localization.getLocales();
const locale = locales.length > 0 ? locales[0].languageTag : "en";

I18n.locale = locale;

export default I18n;
