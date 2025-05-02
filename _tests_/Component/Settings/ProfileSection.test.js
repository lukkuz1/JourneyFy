import React from 'react';
import { render } from '@testing-library/react-native';
import ProfileSection from '../../../src/components/Settings/ProfileSection';
import * as useUserProfileHook from '../../../src/hooks/useUserProfile';
import { Image, Text } from 'react-native';

// Provide a fake hook implementation
jest.spyOn(useUserProfileHook, 'useUserProfile').mockReturnValue({
  user: { firstName: 'Jonas', lastName: 'Jonaitis', photoURL: 'https://avatar.test/me.png' },
  fetchUserProfile: jest.fn(),
});

describe('ProfileSection', () => {
  it('renders user photo and full name', () => {
    const { getByRole, getByText } = render(<ProfileSection />);
    // find image via accessibilityRole
    const img = getByRole('image');
    expect(img.props.source).toEqual({ uri: 'https://avatar.test/me.png' });

    expect(getByText('Jonas Jonaitis')).toBeTruthy();
  });
});
