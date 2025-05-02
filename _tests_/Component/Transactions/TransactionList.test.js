import React from 'react';
import { render } from '@testing-library/react-native';
import TransactionList from '../../../src/components/Transactions/TransactionList';

describe('TransactionList', () => {
  const transactions = [
    { id: 1, title: 'Salary', date: '2025-05-01', amount: '100.00 €', isIncome: true },
    { id: 2, title: 'Coffee', date: '2025-05-02', amount: '-3.50 €', isIncome: false },
  ];

  it('renders the correct number of items', () => {
    const { getByText } = render(<TransactionList transactions={transactions} />);
    // Each title should appear
    expect(getByText('Salary')).toBeTruthy();
    expect(getByText('Coffee')).toBeTruthy();
  });

  it('renders subtitle for each transaction', () => {
    const { getByText } = render(<TransactionList transactions={transactions} />);
    expect(getByText('Jenny wilsom | 2025-05-01')).toBeTruthy();
    expect(getByText('Jenny wilsom | 2025-05-02')).toBeTruthy();
  });
});
