import React from 'react';
import { TextInput, Text } from 'react-native';
import renderer from 'react-test-renderer';
import { render, fireEvent } from '@testing-library/react-native';
import EntryInputField from '../../../src/components/Entry/EntryInputField';
import { MaterialCommunityIcons } from '@expo/vector-icons';

describe('EntryInputField', () => {
  it('renders headerText and placeholder correctly', () => {
    const { getByText, getByPlaceholderText } = render(
      <EntryInputField
        headerText="Email"
        placeholderText="Enter your email"
        isPassword={false}
        onChangeText={() => {}}
      />
    );

    // Header label
    expect(getByText('Email')).toBeTruthy();
    // TextInput placeholder
    expect(getByPlaceholderText('Enter your email')).toBeTruthy();
  });

  it('calls onChangeText when typing in the TextInput', () => {
    const onChangeText = jest.fn();
    const { getByPlaceholderText } = render(
      <EntryInputField
        headerText="Email"
        placeholderText="Enter email"
        isPassword={false}
        onChangeText={onChangeText}
      />
    );

    fireEvent.changeText(getByPlaceholderText('Enter email'), 'foo@bar.com');
    expect(onChangeText).toHaveBeenCalledWith('foo@bar.com');
  });

  it('toggles secureTextEntry and icon when isPassword is true', () => {
    const { getByPlaceholderText, getByTestId, queryByProps } = render(
      <EntryInputField
        headerText="Password"
        placeholderText="Enter password"
        isPassword={true}
        onChangeText={() => {}}
      />
    );

    const input = getByPlaceholderText('Enter password');
    // initially secureTextEntry should be true
    expect(input.props.secureTextEntry).toBe(true);

    // find the eye icon button by testID or by querying the icon component
    // Note: we can assign a testID to the Pressable in your component for easier querying.
    // For now, locate the MaterialCommunityIcons and press its parent.
    const icon = renderer
      .create(<MaterialCommunityIcons name="eye-off-outline" size={24} color="gray" />)
      .toJSON();

    // Simulate pressing the toggle button
    const toggle = getByTestId('password-toggle-button');
    fireEvent.press(toggle);

    // After toggle, secureTextEntry should be false
    expect(input.props.secureTextEntry).toBe(false);
  });

  it('shows postfix text when provided and isPassword is false', () => {
    const { getByText } = render(
      <EntryInputField
        headerText="Amount"
        placeholderText="0"
        isPassword={false}
        postfix="USD"
        onChangeText={() => {}}
      />
    );

    // Postfix rendered with a leading space
    expect(getByText(' USD')).toBeTruthy();
  });

  it('applies margin and custom style to the container', () => {
    const customStyle = { borderWidth: 2 };
    const tree = renderer.create(
      <EntryInputField
        headerText="Test"
        placeholderText="T"
        isPassword={false}
        margin={[5, 6, 7, 8]}
        style={customStyle}
        onChangeText={() => {}}
      />
    );
    const container = tree.toJSON();
    // flattened style object
    expect(container.props.style).toMatchObject({
      marginTop: 5,
      marginBottom: 6,
      marginLeft: 7,
      marginRight: 8,
      borderWidth: 2,
      width: 310,
      height: 70,
      borderRadius: 18,
    });
  });
});
