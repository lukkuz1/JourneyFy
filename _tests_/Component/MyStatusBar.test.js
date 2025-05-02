import React from 'react';
import { render } from '@testing-library/react-native';
import MyStatusBar from '../../src/components/myStatusBar';
import { SafeAreaView, StatusBar } from 'react-native';
import { Colors } from '../src/constants/styles';

describe('MyStatusBar', () => {
  it('renders SafeAreaView and StatusBar with correct props', () => {
    const { getByType } = render(<MyStatusBar />);
    const sa = getByType(SafeAreaView);
    expect(sa.props.style).toMatchObject({ backgroundColor: Colors.primaryColor });

    const sb = getByType(StatusBar);
    expect(sb.props.translucent).toBe(false);
    expect(sb.props.backgroundColor).toBe(Colors.primaryColor);
    expect(sb.props.barStyle).toBe('light-content');
  });
});
