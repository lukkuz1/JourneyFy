import React from 'react';
import { render } from '@testing-library/react-native';
import TransactionItem from '../../../src/components/Transactions/TransactionItem';
import { Colors, Fonts } from '../../../src/constants/styles';

describe('TransactionItem', () => {
  const baseItem = {
    id: 1,
    title: 'Salary',
    date: '2025-05-01',
    amount: '100.00 €',
    isIncome: true,
  };



  it('renders amount in red for expense', () => {
    const expense = { ...baseItem, title: 'Lunch', amount: '-5.00 €', isIncome: false };
    const { getByText } = render(
      <TransactionItem item={expense} isLast={false} />
    );
    const amount = getByText(expense.amount);
    expect(amount.props.style).toMatchObject(Fonts.redColor16SemiBold);
  });

});
