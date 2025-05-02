import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import Header from '../../src/components/header';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

describe('Header', () => {
  it('renders title and back icon, and calls navigation.pop on icon press', () => {
    const pop = jest.fn();
    const navigation = { pop };
    const { getByText, getByType } = render(
      <Header title="Test Title" navigation={navigation} />
    );

    // Title
    expect(getByText('Test Title')).toBeTruthy();

    // Back icon present
    const icon = getByType(MaterialIcons);
    expect(icon).toBeTruthy();

    // Press it
    fireEvent.press(icon);
    expect(pop).toHaveBeenCalled();
  });
});
