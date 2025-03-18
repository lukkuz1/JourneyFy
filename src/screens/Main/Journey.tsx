import React, { useEffect, useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ViewStyle,
  Alert,
} from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import DashedLine from "react-native-dashed-line";
import { Colors, Sizes, Fonts, CommonStyles } from "../../constants/styles";
import MyStatusBar from "../../components/myStatusBar";
import { getFirestore, collection, getDocs } from "firebase/firestore";

type RideItem = {
  id: string;
  profile: string; // Placeholder or static image for now
  name: string; // Derived from userEmail
  date: string; // Derived from journeyDateTime
  time: string; // Derived from journeyDateTime
  pickup: string; // pickupAddress
  drop: string; // destinationAddress
  journeyType: string; // Added for journey type (e.g., "offer")
  seats: number; // Number of seats
};

type NavigationProps = {
  push: (screen: string, params?: object) => void;
  navigate: (screen: string, params?: object) => void;
};

type RouteParams = {
  id?: string;
};

type JourneyProps = {
  navigation: NavigationProps;
  route: { params?: RouteParams };
};

const Journey: React.FC<JourneyProps> = ({ navigation, route }) => {
  const [rides, setRides] = useState<RideItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchJourneys = async () => {
    setLoading(true);
    try {
      const db = getFirestore();
      const journeysRef = collection(db, "journeys");
      const snapshot = await getDocs(journeysRef);

      const fetchedRides: RideItem[] = snapshot.docs.map((doc) => {
        const data = doc.data();
        const [date, time] = data.journeyDateTime.split(" "); // Split journeyDateTime into date and time
        return {
          id: doc.id,
          profile: "https://via.placeholder.com/82", // Replace with a real profile image if available
          name: data.userEmail.split("@")[0], // Derive name from email
          date: date,
          time: time,
          pickup: data.pickupAddress,
          drop: data.destinationAddress,
          journeyType: data.journeyType,
          seats: data.seats,
        };
      });

      setRides(fetchedRides);
    } catch (error) {
      console.error("Error fetching journeys:", error);
      Alert.alert("Error", "Failed to fetch journeys. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJourneys();
  }, []);

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
        navigation.navigate("RideDetailScreen");
      }}
      style={styles.rideWrapper}
    >
      <Image source={{ uri: item.profile }} style={styles.profileImage} />
      <View style={styles.rideDetailWrapper}>
        <Text style={Fonts.blackColor15SemiBold}>{item.name}</Text>
        <Text
          style={Fonts.grayColor14Medium}
        >{`${item.date}, ${item.time}`}</Text>
        <DashedLine
          axis="vertical"
          dashLength={2}
          dashThickness={1}
          dashGap={1.5}
          dashColor={Colors.grayColor}
          style={styles.dashedLine}
        />
        <Text style={Fonts.grayColor14Medium}>Pickup: {item.pickup}</Text>
        <Text style={Fonts.grayColor14Medium}>Drop: {item.drop}</Text>
        <Text style={Fonts.grayColor14Medium}>Seats: {item.seats}</Text>
        <Text style={Fonts.grayColor14Medium}>Type: {item.journeyType}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={{ flex: 1, backgroundColor: Colors.bodyBackColor }}>
      <MyStatusBar />
      <View style={{ flex: 1 }}>
        {header()}
        {loading
          ? loadingIndicator()
          : rides.length === 0
          ? noRidesInfo()
          : ridesInfo()}
      </View>
    </View>
  );

  function loadingIndicator() {
    return (
      <View style={styles.emptyPage}>
        <Text style={Fonts.grayColor16SemiBold}>Loading...</Text>
      </View>
    );
  }

  function noRidesInfo() {
    return (
      <View style={styles.emptyPage}>
        <Image
          source={require("../../assets/images/empty_ride.png")}
          style={styles.emptyRideImage}
        />
        <Text style={styles.emptyText}>No journeys found</Text>
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
        <Text style={styles.headerTitle}>My Journeys</Text>
        <View style={styles.accountIconWrapper}>
          <MaterialIcons
            name="account-circle"
            color={Colors.whiteColor}
            size={29}
            onPress={() => {
              navigation.navigate("RideDetailScreen");
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
