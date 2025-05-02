import React from 'react';
import { render } from '@testing-library/react-native';
import { Image } from 'react-native';
import WalletImage from '../../../src/components/AddAndSendMoney/WalletImage';
import { screenWidth, Sizes } from '../src/constants/styles';

describe('WalletImage', () => {
  it('renders a centered image with correct dimensions', () => {
    const { getByType } = render(<WalletImage />);
    const img = getByType(Image);
    // style props
    const style = img.props.style;
    expect(style.width).toBe(screenWidth / 2);
    expect(style.height).toBe(screenWidth / 2);
    expect(style.resizeMode).toBe('contain');
    expect(style.alignSelf).toBe('center');
    expect(style.marginHorizontal).toBe(Sizes.fixPadding * 2);
    expect(style.marginTop).toBe(Sizes.fixPadding * 2);
  });
});
