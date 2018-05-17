import styled from 'styled-components';

export const HelpText = styled.div`
  z-index: 100;
  position: fixed;
  top: 20vh;
  left: 50vw;
  font-size: 3vmin;
  transform: translate3d(-50%, -50%, 0);
  user-select: none;
  font-family: 'IBM Plex Mono', monospace;
  text-transform: lowercase;
  font-weight: 200;
  font-style: italic;
  color: white;
  mix-blend-mode: difference;
  text-align: center;
`;

export default HelpText;
