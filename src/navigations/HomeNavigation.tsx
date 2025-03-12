import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../screens/Main/homeScreen";
import AddVehicleScreen from "../screens/TemplateJourney/addVehicle/addVehicleScreen";
import AvailableRidesScreen from "../screens/TemplateJourney/availableRides/availableRidesScreen";
import ConfirmPoolingScreen from "../screens/TemplateJourney/confirmPooling/confirmPoolingScreen";
import EndRideScreen from "../screens/TemplateJourney/endRide/endRideScreen";
import HistoryRideDetailScreen from "../screens/TemplateJourney/historyRideDetail/historyRideDetailScreen";
import OfferRideScreen from "../screens/TemplateJourney/offerRide/offerRideScreen";
import OnboardingScreen from "../screens/TemplateJourney/onboarding/onboardingScreen";
import PickLocationScreen from "../screens/TemplateJourney/pickLocation/pickLocationScreen";
import RideCompleteScreen from "../screens/TemplateJourney/rideComplete/rideCompleteScreen";
import RideDetailScreen from "../screens/TemplateJourney/rideDetail/rideDetailScreen";
import RideHistoryScreen from "../screens/TemplateProfile/rideHistory/rideHistoryScreen";
import RideMapViewScreen from "../screens/TemplateJourney/rideMapView/rideMapViewScreen";
import RideRequestScreen from "../screens/TemplateJourney/rideRequest/rideRequestScreen";
import RidesScreen from "../screens/TemplateJourney/rides/ridesScreen";
import StartRideScreen from "../screens/TemplateJourney/startRide/startRideScreen";
import UserVehiclesScreen from "../screens/TemplateProfile/userVehicles/userVehiclesScreen";
import MessageScreen from "../screens/TemplateJourney/message/messageScreen";

const Stack = createStackNavigator();

export default function HomeNavigation() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animationEnabled: false,
        presentation: "modal",
      }}
      initialRouteName="HomeScreen"
    >
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="AddVehicleScreen" component={AddVehicleScreen} />
      <Stack.Screen name="AvailableRidesScreen" component={AvailableRidesScreen} />
      <Stack.Screen name="ConfirmPoolingScreen" component={ConfirmPoolingScreen} />
      <Stack.Screen name="EndRideScreen" component={EndRideScreen} />
      <Stack.Screen name="HistoryRideDetailScreen" component={HistoryRideDetailScreen} />
      <Stack.Screen name="OfferRideScreen" component={OfferRideScreen} />
      <Stack.Screen name="OnboardingScreen" component={OnboardingScreen} />
      <Stack.Screen name="PickLocationScreen" component={PickLocationScreen} />
      <Stack.Screen name="RideCompleteScreen" component={RideCompleteScreen} />
      <Stack.Screen name="RideDetailScreen" component={RideDetailScreen} />
      <Stack.Screen name="RideHistoryScreen" component={RideHistoryScreen} />
      <Stack.Screen name="RideMapViewScreen" component={RideMapViewScreen} />
      <Stack.Screen name="RideRequestScreen" component={RideRequestScreen} />
      <Stack.Screen name="RidesScreen" component={RidesScreen} />
      <Stack.Screen name="StartRideScreen" component={StartRideScreen} />
      <Stack.Screen name="UserVehiclesScreen" component={UserVehiclesScreen} />
      <Stack.Screen name="MessageScreen" component={MessageScreen} />
    </Stack.Navigator>
  );
}