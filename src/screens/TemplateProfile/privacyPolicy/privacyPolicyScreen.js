import { ScrollView, StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import { Colors, Fonts, Sizes } from "../../../constants/styles";
import MyStatusBar from "../../../components/myStatusBar";
import Header from "../../../components/header";

const privacyPolicies = [
  "Privatumo Politika",
  "Paskutinį kartą atnaujinta: 2025-03-18",
  "Mes, „JourneyFy“, gerbiame Jūsų privatumą ir įsipareigojame apsaugoti Jūsų asmens duomenis. Ši privatumo politika paaiškina, kaip renkame, naudojame, saugome ir dalijamės Jūsų informacija, kai naudojatės mūsų mobiliąja programėle.",
  "Naudodamiesi „JourneyFy“, galime rinkti šiuos Jūsų asmens duomenis:",
  "Registracijos duomenys: vardas, pavardė, el. pašto adresas, telefono numeris.",
  "Kelionių informacija: Jūsų sukurti kelionių maršrutai, kelionių datos, vietos, kurias lankote.",
  "Mokėjimų duomenys: mokėjimo kortelės informacija (tvarkoma per saugius trečiųjų šalių mokėjimų tiekėjus).",
  "Techniniai duomenys: IP adresas, įrenginio tipas, operacinė sistema, programėlės naudojimo statistika.",
  "Vietos duomenys: Jūsų buvimo vieta, jei suteikiate leidimą.",
  "Kiek laiko saugome Jūsų duomenis?",
  "Jūsų asmens duomenis saugome tik tiek, kiek būtina tikslams, dėl kurių jie buvo surinkti, arba tiek, kiek reikalauja įstatymai. Pasibaigus šiam laikotarpiui, duomenys bus saugiai ištrinti arba anonimizuoti.",
  "Pastaba:",
  "Šios privatumo politikos tekstas yra bendrinis ir turėtų būti pritaikytas pagal konkrečius „JourneyFy“ veiklos reikalavimus bei suderintas su teisininkais, kad atitiktų GDPR ir kitus teisės aktus.",
];

const PrivacyPolicyScreen = ({ navigation }) => {
  return (
    <View style={{ flex: 1, backgroundColor: Colors.bodyBackColor }}>
      <MyStatusBar />
      <View style={{ flex: 1 }}>
        <Header title={"Privatumo politika"} navigation={navigation} />
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: Sizes.fixPadding * 1.5 }}
        >
          {appIcon()}
          {privacyPolicyInfo()}
        </ScrollView>
      </View>
    </View>
  );

  function privacyPolicyInfo() {
    return (
      <View>
        {privacyPolicies.map((item, index) => (
          <Text key={`${index}`} style={styles.privacyPolicyTextStyle}>
            {item}
          </Text>
        ))}
      </View>
    );
  }

  function appIcon() {
    return (
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          margin: Sizes.fixPadding * 2.0,
        }}
      >
        <Image
          source={require("../../../assets/images/app_color_icon.png")}
          style={styles.appIcon}
        />
        <Text style={{ ...Fonts.secondaryColor24SemiBold }}>JourneyFy</Text>
      </View>
    );
  }
};

export default PrivacyPolicyScreen;

const styles = StyleSheet.create({
  appIcon: {
    height: 80.0,
    width: "100%",
    resizeMode: "contain",
    marginVertical: -Sizes.fixPadding,
  },
  privacyPolicyTextStyle: {
    ...Fonts.grayColor14Medium,
    marginVertical: Sizes.fixPadding - 5.0,
    marginHorizontal: Sizes.fixPadding * 2.0,
    textAlign: "justify",
  },
});
