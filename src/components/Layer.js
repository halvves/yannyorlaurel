import React from 'react';
import styled from 'styled-components';

export const Layer = styled(({invert, value, z, ...props}) => <div {...props} />).attrs({
  style: ({ value }) => ({
    width: `${value * 100}%`
  }),
})`
  z-index: ${({ z }) => z || 1};
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  overflow: hidden;
  color: ${({ invert }) => invert ? 'white' : 'black'};
  background-color: ${({ invert }) => invert ? 'black' : 'white'};
`;

export default Layer;
