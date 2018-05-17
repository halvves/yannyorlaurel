import styled from 'styled-components';

export const Text = styled.div`
  position: absolute;
  top: 50vh;
  left: 50vw;
  font-size: 25vmin;
  transform: translate3d(-50%, -50%, 0);
  user-select: none;
  font-family: 'IBM Plex Mono', monospace;
  text-transform: lowercase;
  font-weight: 200;
  font-style: italic;
`;

export default Text;
