// __tests__/LogoutDialog.test.js
import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import LogoutDialog from "../../../src/components/Profile/LogoutDialog";
import { Overlay } from "@rneui/themed";

jest.mock("@rneui/themed", () => ({
  Overlay: ({ children, isVisible }) =>
    isVisible ? <>{children}</> : null,
}));

describe("<LogoutDialog />", () => {
  const onClose = jest.fn();
  const onLogout = jest.fn();

  it("shows prompt and both buttons when visible", () => {
    const { getByText } = render(
      <LogoutDialog
        isVisible
        onClose={onClose}
        onLogout={onLogout}
      />
    );

    expect(
      getByText("Ar tikrai norite atsijungti nuo šios paskyros?")
    ).toBeTruthy();

    expect(getByText("Atsijungti")).toBeTruthy();
    expect(getByText("Atšaukti")).toBeTruthy();
  });

  it("calls onLogout when 'Atsijungti' pressed", () => {
    const { getByText } = render(
      <LogoutDialog
        isVisible
        onClose={onClose}
        onLogout={onLogout}
      />
    );
    fireEvent.press(getByText("Atsijungti"));
    expect(onLogout).toHaveBeenCalled();
  });

  it("calls onClose when 'Atšaukti' pressed", () => {
    const { getByText } = render(
      <LogoutDialog
        isVisible
        onClose={onClose}
        onLogout={onLogout}
      />
    );
    fireEvent.press(getByText("Atšaukti"));
    expect(onClose).toHaveBeenCalled();
  });
});
