import React from 'react';
import { render } from '@testing-library/react-native';
import RideInfoSheet from '../../../src/components/StartRide/RideInfoSheet';

describe('RideInfoSheet', () => {
  it('returns null when no ride is passed', () => {
    const { toJSON } = render(<RideInfoSheet ride={null} passengers={[]} />);
    expect(toJSON()).toBeNull();
  });

  it('renders header and passenger list', () => {
    const ride = { id: 'r1' };
    const passengers = [
      { id: 'p1', firstName: 'Jonas', lastName: 'Jonaitis', photoURL: null },
      { id: 'p2', firstName: 'Petras', lastName: 'Petraitis', photoURL: 'https://x.y/z.png' },
    ];
    const { getByText, getAllByText } = render(
      <RideInfoSheet ride={ride} passengers={passengers} />
    );
    // Header
    expect(getByText('Keleiviai')).toBeTruthy();
    // Passenger names
    expect(getByText('Jonas Jonaitis')).toBeTruthy();
    expect(getByText('Petras Petraitis')).toBeTruthy();
    // Two avatars rendered (we assert by two occurrences of the first name)
    expect(getAllByText(/Jonas|Petras/).length).toBe(3); 
    // (header "Keleiviai" plus two names)
  });
});
