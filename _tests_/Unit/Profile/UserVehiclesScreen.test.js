import React from "react";
import { Text } from "react-native";
import { render, fireEvent } from "@testing-library/react-native";
import UserVehiclesScreen from "../../../src/screens/TemplateProfile/userVehicles/userVehiclesScreen";
import { useUserVehicles } from "../../../src/hooks/useUserVehicles";

jest.mock("../../../components/myStatusBar",         () => () => <Text testID="status-bar" />);
jest.mock("../../../components/header",              () => ({ title }) => <Text testID="header">{title}</Text>);
jest.mock("../../../components/UserVehicleScreen/VehiclesList", () => (props) => (
  <Text testID="vehicles-list" onPress={() => props.openStatusModal("msg")}>
    {props.vehicles.length}
  </Text>
));
jest.mock("../../../components/UserVehicleScreen/AddVehicleButton", () => (props) => (
  <Text testID="add-btn" onPress={() => props.navigation.navigate("AddVehicle")}/>
));
jest.mock("../../../components/UserVehicleScreen/StatusModal", () => (props) =>
  props.modalVisible ? <Text testID="status-modal" onPress={() => props.setModalVisible(false)}/> : null
);
jest.mock("../../../components/UserVehicleScreen/SnackBarComponent", () => (props) =>
  props.showSnackBar ? <Text testID="snackbar" onPress={() => props.setShowSnackBar(false)} /> : null
);

jest.mock("../../../hooks/useUserVehicles");

describe("UserVehiclesScreen", () => {
  const navigation = { navigate: jest.fn() };

  beforeEach(() => {
    jest.clearAllMocks();
    useUserVehicles.mockReturnValue({
      vehicles: [{ id: "v1" }],
      deleteVehicle: jest.fn(),
      showSnackBar: true,
      setShowSnackBar: jest.fn(),
      modalVisible: true,
      setModalVisible: jest.fn(),
      modalMessage: "Hello",
      openStatusModal: jest.fn(),
    });
  });

  it("renders vehicles and opens modals", () => {
    const { getByTestId, queryByTestId } = render(
      <UserVehiclesScreen navigation={navigation} />
    );
    expect(getByTestId("status-bar")).toBeTruthy();
    expect(getByTestId("header").props.children).toBe("Mano automobilis");

    const list = getByTestId("vehicles-list");
    expect(list.props.children).toBe(1);

    // open status modal
    fireEvent.press(list);
    expect(getByTestId("status-modal")).toBeTruthy();
    fireEvent.press(getByTestId("status-modal"));
    expect(useUserVehicles().setModalVisible).toHaveBeenCalledWith(false);

    // snackbar present
    expect(getByTestId("snackbar")).toBeTruthy();
    fireEvent.press(getByTestId("snackbar"));
    expect(useUserVehicles().setShowSnackBar).toHaveBeenCalledWith(false);

    // add button navigates
    fireEvent.press(getByTestId("add-btn"));
    expect(navigation.navigate).toHaveBeenCalledWith("AddVehicle");
  });
});
