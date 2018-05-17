import React, {Fragment, PureComponent} from 'react';
import ReactDOM from 'react-dom';

import {
  Audio,
  FullscreenSlider,
  HelpText,
} from './components';

import { LAUREL_SAMPLES } from './constants';

class App extends PureComponent {
  componentDidMount() {
    this.ctx = new (window.AudioContext || window.webkitAudioContext)();
    this.source = this.ctx.createMediaElementSource(this.audioRef);

    this.bandpass = this.ctx.createBiquadFilter();
    this.bandpass.type = 'bandpass';
    this.bandpass.Q.value = 0.2;

    this.peaking = this.ctx.createBiquadFilter();
    this.peaking.type = 'peaking';
    this.peaking.Q.value = 0.2;
    this.peaking.gain.value = 10;

    this.source.connect(this.bandpass);
    this.bandpass.connect(this.peaking);

    this.peaking.connect(this.ctx.destination);
  }

  registerAudioRef = ref => {
    this.audioRef = ref;
  };

  handleFilterChange = value => {
    this.bandpass.frequency.setValueAtTime(value, this.ctx.currentTime);
    this.peaking.frequency.setValueAtTime(value, this.ctx.currentTime);
  }

  handlePlay = () => {
    this.ctx.resume();
    this.audioRef.play();
  }

  handlePause = () => {
    this.audioRef.pause();
    this.audioRef.currentTime = 0;
  }

  render() {
    return (
      <Fragment>
        <HelpText>click and hold to listen<br /><br />drag to filter</HelpText>
        <FullscreenSlider
          min="30"
          minText="Laurel"
          max="10000"
          maxText="Yanny"
          onChange={this.handleFilterChange}
          onMouseDown={this.handlePlay}
          onMouseUp={this.handlePause}
        />
        <Audio
          crossOrigin="anonymous"
          loop
          ref={this.registerAudioRef}
          sources={LAUREL_SAMPLES}
         />
      </Fragment>
    )
  }
}

const app = document.getElementById('app');
ReactDOM.render(<App />, app);
