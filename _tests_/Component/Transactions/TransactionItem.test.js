import React from 'react';
import { render } from '@testing-library/react-native';
import TransactionItem from '../../../src/components/Transactions/TransactionItem';
import { Colors, Fonts, Sizes } from '../src/constants/styles';

describe('TransactionItem', () => {
  const baseItem = {
    id: 1,
    title: 'Salary',
    date: '2025-05-01',
    amount: '100.00 €',
    isIncome: true,
  };

  it('renders title, subtitle and amount for income', () => {
    const { getByText } = render(
      <TransactionItem item={baseItem} isLast={false} />
    );
    // Title
    expect(getByText('Salary')).toBeTruthy();
    // Subtitle: Jenny wilsom | date
    expect(getByText(`Jenny wilsom | ${baseItem.date}`)).toBeTruthy();
    // Amount
    const amount = getByText(baseItem.amount);
    expect(amount).toBeTruthy();
    // Color style applied for income
    const amountStyle = amount.props.style;
    // Should include green color style from Fonts.greenColor16SemiBold
    expect(amountStyle).toMatchObject(Fonts.greenColor16SemiBold);
  });

  it('renders amount in red for expense', () => {
    const expense = { ...baseItem, title: 'Lunch', amount: '-5.00 €', isIncome: false };
    const { getByText } = render(
      <TransactionItem item={expense} isLast={false} />
    );
    const amount = getByText(expense.amount);
    expect(amount.props.style).toMatchObject(Fonts.redColor16SemiBold);
  });

  it('shows divider when isLast is false', () => {
    const { UNSAFE_getByType } = render(
      <TransactionItem item={baseItem} isLast={false} />
    );
    // The divider is a View with height 1
    const dividers = UNSAFE_getByType('View').props.children
      ? [] // skip container-level
      : [];
    // Instead, just ensure two siblings (container + divider)
    const parent = render(
      <TransactionItem item={baseItem} isLast={false} />
    ).toJSON();
    expect(parent.length).toBe(2);
  });

  it('omits divider when isLast is true', () => {
    const tree = render(
      <TransactionItem item={baseItem} isLast={true} />
    ).toJSON();
    // Only the container fragment remains
    expect(tree.length).toBe(1);
  });
});
