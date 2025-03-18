import { StyleSheet, Text, View, FlatList } from "react-native";
import React from "react";
import { Colors, Fonts, Sizes } from "../../../constants/styles";
import MyStatusBar from "../../../components/myStatusBar";
import Header from "../../../components/header";

const faqsList = [
  {
    id: "1",
    question: "Kaip rasti kelionę?",
    answer:
      "Norėdami rasti kelionę, tiesiog įveskite savo pradinę vietą ir kelionės tikslą paieškos juostoje. Pamatysite sąrašą galimų kelionių, atitinkančių jūsų kriterijus. Galite filtruoti rezultatus pagal laiką, kainą ar vairuotojo įvertinimus.",
  },
  {
    id: "2",
    question: "Kaip užsisakyti kelionę?",
    answer:
      "Kai rasite kelionę, kuri atitinka jūsų poreikius, spustelėkite ją, kad pamatytumėte daugiau informacijos. Tada paspauskite mygtuką „Užsisakyti kelionę“ ir patvirtinkite užsakymą. Jūs gausite patvirtinimo pranešimą su vairuotojo kontaktais.",
  },
  {
    id: "3",
    question: "Kaip papildyti piniginę?",
    answer:
      "Norėdami papildyti piniginę, eikite į programėlės skiltį „Piniginė“. Pasirinkite „Papildyti pinigus“, įveskite norimą sumą ir pasirinkite mokėjimo būdą (kredito kortelė, debeto kortelė ar kitos palaikomos parinktys). Sekite ekrane pateikiamus nurodymus, kad užbaigtumėte operaciją.",
  },
  {
    id: "4",
    question: "Kaip bendrauti su vairuotoju?",
    answer:
      "Užsisakę kelionę, galite bendrauti su vairuotoju, eidami į skiltį „Mano kelionės“ ir pasirinkdami savo dabartinę kelionę. Spustelėkite mygtuką „Susirašinėti“, kad siųstumėte pranešimus tiesiogiai vairuotojui.",
  },
  {
    id: "5",
    question: "Kaip pridėti savo transporto priemonę kaip vairuotojas?",
    answer:
      "Norėdami pridėti savo transporto priemonę, eikite į skiltį „Profilis“ ir pasirinkite „Pridėti transporto priemonę“. Užpildykite reikiamą informaciją, pvz., transporto priemonės tipą, registracijos numerį ir draudimo dokumentus. Pateikus informaciją, jūsų transporto priemonė bus peržiūrėta ir patvirtinta mūsų komandos.",
  },
];

const FaqScreen = ({ navigation }) => {
  return (
    <View style={{ flex: 1, backgroundColor: Colors.bodyBackColor }}>
      <MyStatusBar />
      <View style={{ flex: 1 }}>
        <Header title={"D.U.K."} navigation={navigation} />
        {faqsInfo()}
      </View>
    </View>
  );

  function faqsInfo() {
    const renderItem = ({ item, index }) => (
      <View>
        <View style={{ marginHorizontal: Sizes.fixPadding * 2.0 }}>
          <Text style={{ ...Fonts.blackColor16SemiBold }}>{item.question}</Text>
          <Text
            style={{
              ...Fonts.grayColor15Medium,
              textAlign: "justify",
              marginTop: Sizes.fixPadding - 5.0,
            }}
          >
            {item.answer}
          </Text>
        </View>
        {index == faqsList.length - 1 ? null : (
          <View style={styles.divider}></View>
        )}
      </View>
    );
    return (
      <FlatList
        data={faqsList}
        keyExtractor={(item) => `${item.id}`}
        renderItem={renderItem}
        contentContainerStyle={{ paddingVertical: Sizes.fixPadding * 2.0 }}
      />
    );
  }
};

export default FaqScreen;

const styles = StyleSheet.create({
  divider: {
    backgroundColor: Colors.lightGrayColor,
    height: 1.0,
    marginVertical: Sizes.fixPadding * 1.5,
  },
});
