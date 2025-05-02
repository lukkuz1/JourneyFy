import React from 'react';
import { render } from '@testing-library/react-native';
import LoadingIndicator from '../../src/components/LoadingIndicator';
import { ActivityIndicator } from 'react-native';
import { Colors } from '../src/constants/styles';

describe('LoadingIndicator', () => {
  it('renders ActivityIndicator with correct size and color', () => {
    const { getByType } = render(<LoadingIndicator />);
    const ai = getByType(ActivityIndicator);
    expect(ai.props.size).toBe('large');
    expect(ai.props.color).toBe(Colors.primaryColor);
  });
});
