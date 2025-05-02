// __tests__/HomeScreen.test.js
import React from 'react';
import renderer, { act } from 'react-test-renderer';
import HomeScreen from '../../../src/screens/Main/homeScreen';
import RideInfoCard from '../../../src/components/Home/RideInfoCard';

jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({ navigate: jest.fn() }),
}));

// mock your hooks
jest.mock('../src/hooks/useCreateJourney');
jest.mock('../src/hooks/useFindMatchingJourneys');
jest.mock('../src/hooks/useLocation');

import { useCreateJourney } from '../src/hooks/useCreateJourney';
import { useFindMatchingJourneys } from '../src/hooks/useFindMatchingJourneys';
import { useLocation } from '../src/hooks/useLocation';

describe('HomeScreen', () => {
  let mockNavigate;
  beforeEach(() => {
    jest.clearAllMocks();
    // override navigation passed as prop
    mockNavigate = jest.fn();
    // hook mocks
    useLocation.mockReturnValue('FakeLocation');
  });

  function createTree(routeParams = {}) {
    return renderer.create(
      <HomeScreen
        navigation={{ navigate: mockNavigate }}
        route={{ params: routeParams }}
      />
    );
  }

  it('shows pickAlert when required fields are missing', () => {
    const tree = createTree();
    // find RideInfoCard and call onSubmit with no inputs
    const card = tree.root.findByType(RideInfoCard);

    act(() => {
      card.props.onSubmit();
    });

    // after calling onSubmit with no pickup/destination/time
    // pickAlert prop should become true
    expect(card.props.pickAlert).toBe(true);
  });

  it('navigates to AvailableRidesScreen when in search tab and matches found', async () => {
    // make findMatchingJourneys return a non-empty list
    const mockFind = jest.fn().mockResolvedValue([{ id: 'ride1' }]);
    useFindMatchingJourneys.mockReturnValue({ findMatchingJourneys: mockFind });

    const tree = createTree({
      address: 'A',
      addressFor: 'pickup'
    });
    const card = tree.root.findByType(RideInfoCard);

    // fill required fields by simulating route updates
    act(() => {
      tree.update(
        <HomeScreen
          navigation={{ navigate: mockNavigate }}
          route={{
            params: {
              address: 'Start',
              addressFor: 'pickup'
            }
          }}
        />
      );
    });
    // now also set destination and date/time & seat via props
    act(() => {
      card.props.setSelectedTabIndex(1);                    // search tab
      card.props.pickupAddress = 'Start';
      card.props.destinationAddress = 'End';
      card.props.selectedDateAndTime = '2025-01-01 10:00';
      card.props.selectedSeat = 2;
    });

    await act(async () => {
      await card.props.onSubmit();
    });

    expect(mockFind).toHaveBeenCalledWith({
      pickupAddress: 'Start',
      destinationAddress: 'End',
      journeyDateTime: '2025-01-01 10:00',
      seats: 2
    });
    expect(mockNavigate).toHaveBeenCalledWith('AvailableRidesScreen', {
      journeys: [{ id: 'ride1' }]
    });
  });

  it('navigates to OfferRideScreen when in offer tab and creation succeeds', async () => {
    // mock creation
    const mockCreate = jest.fn().mockResolvedValue('newJourneyId');
    useCreateJourney.mockReturnValue({ createJourney: mockCreate });

    const tree = createTree({
      address: 'Pickup',
      addressFor: 'pickup'
    });
    const card = tree.root.findByType(RideInfoCard);

    // simulate filling in values
    act(() => {
      card.props.setselectedTabIndex(2);                     // offer tab
      card.props.pickupAddress = 'Pickup';
      card.props.destinationAddress = 'Dropoff';
      card.props.selectedDateAndTime = '2025-02-02 14:30';
      card.props.selectedSeat = 3;
    });

    await act(async () => {
      await card.props.onSubmit();
    });

    expect(mockCreate).toHaveBeenCalledWith({
      pickupAddress: 'Pickup',
      destinationAddress: 'Dropoff',
      journeyDateTime: '2025-02-02 14:30',
      seats: 3,
      journeyType: 'offer'
    });
    expect(mockNavigate).toHaveBeenCalledWith('OfferRideScreen', {
      journeyId: 'newJourneyId',
      pickupAddress: 'Pickup',
      destinationAddress: 'Dropoff',
      journeyDateTime: '2025-02-02 14:30',
      seats: 3,
      journeyType: 'offer'
    });
  });
});
