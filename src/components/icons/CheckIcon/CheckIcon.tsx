import * as React from 'react';
import Icon, { IconProps } from '../Icon';

const CheckIcon: React.FC<IconProps> = (props) => (
  <Icon viewBox="0 0 16 11" {...props}>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M1.5 5.5L6 10M14.5 2L13.5 1L6 8L1.5 3.5L0.5 4.5L6 10M14.5 2.5Z"
      fill="currentColor"
    />
  </Icon>
);

export default CheckIcon;
