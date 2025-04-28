import { render, fireEvent } from '@testing-library/react-native';
import { Text, TouchableOpacity } from 'react-native';

function MyButton({ title, onPress }: { title: string; onPress: () => void }) {
  return (
    <TouchableOpacity onPress={onPress} testID="my-button">
      <Text>{title}</Text>
    </TouchableOpacity>
  );
}

describe('MyButton', () => {
  it('calls onPress when pressed', () => {
    const onPressMock = jest.fn();
    const { getByTestId } = render(<MyButton title="Click Me" onPress={onPressMock} />);

    fireEvent.press(getByTestId('my-button'));

    expect(onPressMock).toHaveBeenCalledTimes(1);
  });
});