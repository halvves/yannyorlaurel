import React, { PureComponent } from 'react';

import Layer from './Layer';
import Text from './Text';
import Wrapper from './Wrapper';

import getHasPassiveEventSupport from '../helpers/getHasPassiveEventSupport';

export class FullscreenSlider extends PureComponent {
  static defaultProps = {
    max: 100,
    maxText: null,
    min: 0,
    minText: null,
    onChange: null,
    onMouseDown: null,
    onMouseUp: null,
  }

  state = {
    value: 0.5,
  }

  componentDidMount() {
    this.hasPassiveSupport = getHasPassiveEventSupport();
    this.handleResize();

    window.addEventListener(
      'resize',
      this.handleResize,
      this.hasPassiveSupport ? { passive: true } : false
    );
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
  }

  updateResize = () => {
    this.viewportHeight = window.innerHeight;
    this.viewportWidth = window.innerWidth;
    this.ticking = false;
  }

  handleResize = () => {
    if (this.ticking) {
      return;
    }

    this.ticking = true;
    requestAnimationFrame(this.updateResize);
  };

  updateChange = () => {
    const { onChange } = this.props;
    const value = this.value;

    if (value !== this.state.value) {
      this.setState({
        value,
      });
    }

    if (typeof onChange === 'function') {
      onChange(this.getInputValue(value));
    }

    this.ticking = false;
  }

  handleChange = e => {
    if (this.ticking) {
      return;
    }

    this.ticking = true;
    const x = e.clientX || (e.touches && e.touches[0].clientX) || 0;
    this.value = x / this.viewportWidth;
    requestAnimationFrame(this.updateChange);
  }

  handleStart = e => {
    const { onMouseDown, onTouchStart } = this.props;
    this.handleChange(e);

    e.currentTarget.addEventListener(
      'mousemove',
      this.handleChange,
      this.hasPassiveSupport ? { passive: true } : false
    );

    e.currentTarget.addEventListener(
      'touchmove',
      this.handleChange,
      this.hasPassiveSupport ? { passive: true } : false
    );

    if (typeof onMouseDown === 'function') {
      onMouseDown();
    }

    if (typeof onTouchStart === 'function') {
      onTouchStart();
    }
  }

  handleEnd = e => {
    const { onMouseUp, onTouchEnd } = this.props;

    e.currentTarget.removeEventListener('mousemove', this.handleChange);
    e.currentTarget.removeEventListener('touchmove', this.handleChange);

    if (typeof onMouseUp === 'function') {
      onMouseUp();
    }

    if (typeof onTouchEnd === 'function') {
      onTouchEnd();
    }
  }

  getInputValue = v => {
    const {min, max} = this.props;

    return v * (max - min) + min;
  }

  ticking = false;
  hasPassiveSupport = false;

  render() {
    return (
      <Wrapper
        onMouseDown={this.handleStart}
        onMouseUp={this.handleEnd}
        onTouchStart={this.handleStart}
        onTouchEnd={this.handleEnd}
       >
        <Layer>
          <Text>{this.props.minText}</Text>
        </Layer>
        <Layer invert z={2} value={this.state.value}>
          <Text>{this.props.maxText}</Text>
        </Layer>
      </Wrapper>
    )
  }
}

export default FullscreenSlider;
