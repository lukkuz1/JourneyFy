// __tests__/ProfileInputField.test.js
import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import ProfileInputField, {
  validateName,
  validatePhoneNumber,
  validateDateOfBirth,
} from "../../../src/components/Profile/ProfileInputField";

describe("validateName", () => {
  it("rejects empty or invalid names", () => {
    expect(validateName("")).toBe("This field is required");
    expect(validateName("123")).toBe("Only letters and spaces are allowed");
    expect(validateName("John Doe")).toBe("");
  });
});

describe("validatePhoneNumber", () => {
  it("rejects empty or malformed numbers", () => {
    expect(validatePhoneNumber("")).toBe("Phone number is required");
    expect(validatePhoneNumber("abcd")).toBe("Enter a valid phone number");
    expect(validatePhoneNumber("+37012345678")).toBe("");
  });
});

describe("validateDateOfBirth", () => {
  it("rejects empty or badly formatted dates", () => {
    expect(validateDateOfBirth("")).toBe("Date of birth is required");
    expect(validateDateOfBirth("2020-13-01")).toMatch(/Enter a valid date/);
    expect(validateDateOfBirth("1800-01-01")).toMatch(/Enter a year/);
    const today = new Date();
    const yyyy = today.getFullYear().toString();
    const valid = `${yyyy}-01-01`;
    expect(validateDateOfBirth(valid)).toBe("");
  });
});

describe("<ProfileInputField />", () => {
  const onChange = jest.fn();
  const simpleValidate = text =>
    text.length < 3 ? "Too short" : "";

  it("renders label, placeholder and handles input + validation", () => {
    const { getByText, getByPlaceholderText } = render(
      <ProfileInputField
        label="Test Label"
        value=""
        setter={onChange}
        placeholder="Type here"
        validate={simpleValidate}
      />
    );
    expect(getByText("Test Label")).toBeTruthy();
    const input = getByPlaceholderText("Type here");
    // initial empty triggers validation on mount
    expect(getByText("Too short")).toBeTruthy();
    fireEvent.changeText(input, "Hello");
    expect(onChange).toHaveBeenCalledWith("Hello");
    // After typing long enough, error disappears
    expect(() => getByText("Too short")).toThrow();
  });
});
