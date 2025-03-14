import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, View, Image, TouchableOpacity, ViewStyle } from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import DashedLine from "react-native-dashed-line";
import { Colors, Sizes, Fonts, CommonStyles } from "../../constants/styles";
import MyStatusBar from "../../components/myStatusBar";

type RideItem = {
  id: string;
  profile: any;
  name: string;
  date: string;
  time: string;
  pickup: string;
  drop: string;
};

type NavigationProps = {
  push: (screen: string, params?: object) => void;
};

type RouteParams = {
  id?: string;
};

type JourneyProps = {
  navigation: NavigationProps;
  route: { params?: RouteParams };
};

const ridesList: RideItem[] = [
  {
    id: "1",
    profile: require("../../assets/images/user/user8.png"),
    name: "Jenny Wilsom",
    date: "Today",
    time: "9:00 am",
    pickup: "Mumbai,2464 Royal Lnord",
    drop: "Pune, 2464 Royal Ln. Mesa",
  },
  {
    id: "2",
    profile: require("../../assets/images/user/user3.png"),
    name: "Devon Lane",
    date: "22 jan 2023",
    time: "9:00 am",
    pickup: "Mumbai,2464 Royal Lnord",
    drop: "Pune, 2464 Royal Ln. Mesa",
  },
];

const Journey: React.FC<JourneyProps> = ({ navigation, route }) => {
  const [rides, setRides] = useState<RideItem[]>(ridesList);

  useEffect(() => {
    if (route.params?.id) {
      const updatedRides = rides.filter((item) => item.id !== route.params.id);
      setRides(updatedRides);
    }
  }, [route.params?.id]);

  const renderRideItem = ({ item }: { item: RideItem }) => (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => {
        // Add menu action
      }}
      style={styles.rideWrapper}
    >
      <Image source={item.profile as any} style={styles.profileImage} />
      <View style={styles.rideDetailWrapper}>
        <Text style={Fonts.blackColor15SemiBold}>{item.name}</Text>
        <DashedLine
          axis="vertical"
          dashLength={2}
          dashThickness={1}
          dashGap={1.5}
          dashColor={Colors.grayColor}
          style={styles.dashedLine}
        />
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={{ flex: 1, backgroundColor: Colors.bodyBackColor }}>
      <MyStatusBar />
      <View style={{ flex: 1 }}>
        {header()}
        {rides.length === 0 ? noRidesInfo() : ridesInfo()}
      </View>
    </View>
  );

  function noRidesInfo() {
    return (
      <View style={styles.emptyPage}>
        <Image source={require("../../assets/images/empty_ride.png")} style={styles.emptyRideImage} />
        <Text style={styles.emptyText}>Tuščias kelionių sąrašas</Text>
      </View>
    );
  }

  function ridesInfo() {
    return (
      <FlatList
        data={rides}
        keyExtractor={(item) => `${item.id}`}
        renderItem={renderRideItem}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.flatListContent}
      />
    );
  }

  function header() {
    return (
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Mano kelionės</Text>
        <View style={styles.accountIconWrapper}>
          <MaterialIcons
            name="account-circle"
            color={Colors.whiteColor}
            size={29}
            onPress={() => {
              // Add menu action
            }}
          />
          <View style={styles.headerAccountBadge}></View>
        </View>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  emptyPage: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    margin: Sizes.fixPadding * 2.0,
  },

  header: {
    ...CommonStyles.rowAlignCenter,
    justifyContent: "center",
    backgroundColor: Colors.primaryColor,
    padding: Sizes.fixPadding * 2.0,
    flexDirection: "row",
    alignItems: "center",
  },

  profileImage: {
    width: 82.0,
    height: 82.0,
    borderRadius: Sizes.fixPadding - 5.0,
  },

  rideDetailWrapper: {
    flex: 1,
    marginLeft: Sizes.fixPadding,
    height: 82.0,
    justifyContent: "space-between",
  },

  dashedLine: {
    height: 5.0,
    marginLeft: Sizes.fixPadding - 4.0,
  },

  rideWrapper: {
    backgroundColor: Colors.whiteColor,
    ...CommonStyles.rowAlignCenter,
    ...CommonStyles.shadow,
    borderRadius: Sizes.fixPadding,
    padding: Sizes.fixPadding,
    marginHorizontal: Sizes.fixPadding * 2.0,
    marginBottom: Sizes.fixPadding * 2.0,
    shadowColor: "black",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    elevation: 5,
  } as ViewStyle,

  emptyRideImage: {
    width: 50.0,
    height: 50.0,
    resizeMode: "contain",
  },

  emptyText: {
    ...Fonts.grayColor16SemiBold,
    marginTop: Sizes.fixPadding,
  },

  flatListContent: {
    paddingTop: Sizes.fixPadding * 2.0,
  },

  headerTitle: {
    ...Fonts.whiteColor20SemiBold,
    maxWidth: "85%",
    textAlign: "center",
  },

  accountIconWrapper: {
    position: "absolute",
    right: 20,
  },

  headerAccountBadge: {
    position: "absolute",
    top: 0,
    right: 0,
    width: 10.0,
    height: 10.0,
    borderRadius: 5.0,
    backgroundColor: Colors.redColor,
  },
});

export default Journey;
