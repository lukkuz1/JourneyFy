
import React from 'react'
import { Text } from 'react-native'
import { render, waitFor } from '@testing-library/react-native'


jest.mock('firebase/firestore', () => ({
  getFirestore: jest.fn(),
  collection: jest.fn(),
  query: jest.fn(),
  where: jest.fn(),
  onSnapshot: jest.fn(),
}))
jest.mock('firebase/auth', () => ({
  getAuth: jest.fn(),
}))


import { getAuth } from 'firebase/auth'
import { onSnapshot } from 'firebase/firestore'
import { useFetchVehicles } from '../../src/hooks/useFetchVehicles'


const TestComponent = () => {
  const { vehicles, loading, error } = useFetchVehicles()
  return (
    <>
      <Text testID="loading">{String(loading)}</Text>
      <Text testID="vehicles">{JSON.stringify(vehicles)}</Text>
      <Text testID="error">{error ? 'error' : 'null'}</Text>
    </>
  )
}

describe('useFetchVehicles integration', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('returns empty list and not loading when no user is signed in', async () => {

    getAuth.mockReturnValue({ currentUser: null })

    const { getByTestId } = render(<TestComponent />)

    await waitFor(() => {
      expect(getByTestId('loading').props.children).toBe('false')
    })
    expect(getByTestId('vehicles').props.children).toBe('[]')
    expect(getByTestId('error').props.children).toBe('null')
  })

  it('subscribes and updates vehicles when user is signed in', async () => {

    getAuth.mockReturnValue({ currentUser: { uid: 'user123' } })


    const fakeDocs = [
      { id: 'v1', data: () => ({ make: 'Toyota' }) },
      { id: 'v2', data: () => ({ make: 'Honda' }) },
    ]

    onSnapshot.mockImplementation((_, onNext) => {
      onNext({ docs: fakeDocs })
      return () => {}
    })

    const { getByTestId } = render(<TestComponent />)

    await waitFor(() => {
      expect(getByTestId('loading').props.children).toBe('false')
    })


    const vehiclesText = getByTestId('vehicles').props.children
    const vehicles = JSON.parse(vehiclesText)
    expect(Array.isArray(vehicles)).toBe(true)
    expect(vehicles).toHaveLength(2)
    expect(vehicles[0]).toMatchObject({ id: 'v1', make: 'Toyota' })
    expect(vehicles[1]).toMatchObject({ id: 'v2', make: 'Honda' })

    expect(getByTestId('error').props.children).toBe('null')
  })
})
