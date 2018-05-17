import React, { forwardRef } from 'react';

export const Audio = forwardRef(({sources, ...rest}, ref) => (
  <audio {...rest} ref={ref}>
    {sources.map(s => <source key={s.src} src={s.src} type={s.type} />)}
    Your browser does not support the audio element.
  </audio>
));

export default Audio;
