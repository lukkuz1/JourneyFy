import React from 'react';
import { Text } from 'react-native';
import renderer from 'react-test-renderer';
import { render, fireEvent } from '@testing-library/react-native';
import EntryButton from '../../../src/components/Entry/EntryButton';

describe('EntryButton', () => {
  it('renders the provided text with the correct textColor', () => {
    const tree = renderer.create(
      <EntryButton
        text="Click me"
        textColor="yellow"
        buttonColor="green"
      />
    );

    // find the <Text> node and verify its content & style
    const textInstance = tree.root.findByType(Text);
    expect(textInstance.props.children).toBe('Click me');
    // styles are passed as an array, we look for an object with color:'yellow'
    expect(textInstance.props.style).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ color: 'yellow' })
      ])
    );
  });

  it('applies custom margin and style to the container View', () => {
    const customStyle = { padding: 10 };
    const tree = renderer.create(
      <EntryButton
        text="Test"
        textColor="#111"
        buttonColor="#222"
        margin={[1, 2, 3, 4]}
        style={customStyle}
      />
    );

    // toJSON() flattens the style array into a single object
    const container = tree.toJSON();
    expect(container.props.style).toMatchObject({
      backgroundColor: '#222',
      marginTop: 1,
      marginBottom: 2,
      marginLeft: 3,
      marginRight: 4,
      overflow: 'hidden',
      padding: 10,            // from custom style
      width: 310,             // from the stylesheet
      height: 50,
      borderRadius: 50
    });
  });

  it('calls onPress exactly once when pressed', () => {
    const onPressMock = jest.fn();
    const { getByText } = render(
      <EntryButton
        text="Press me"
        textColor="#fff"
        buttonColor="#000"
        onPress={onPressMock}
      />
    );

    // fireEvent.press will bubble up to the underlying Pressable
    fireEvent.press(getByText('Press me'));
    expect(onPressMock).toHaveBeenCalledTimes(1);
  });
});
