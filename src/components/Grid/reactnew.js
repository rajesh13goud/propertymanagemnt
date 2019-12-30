const { Component, forwardRef, Fragment, PureComponent } = React;
const { css, injectGlobal, keyframes, default: styled } = window.styled;

getHasPassiveEventSupport = () => {
  let hasPassiveSupport = false;
  try {
    const opts = Object.defineProperty({}, 'passive', {
      get() {
        hasPassiveSupport = true;
        return hasPassiveSupport;
      },
    });

    window.addEventListener('test', null, opts);
  } catch (e) {
    hasPassiveSupport = false;
  }

  return hasPassiveSupport;
};

const LAUREL_SAMPLES = [{
  src: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/476907/laurel.m4a',
  type: 'audio/mp4'
}, {
  src: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/476907/laurel.wav',
  type: 'audio/wav'
}];

const Audio = forwardRef(({sources, ...rest}, ref) => (
  <audio {...rest} ref={ref}>
    {sources.map(s => <source src={s.src} type={s.type} />)}
    Your browser does not support the audio element.
  </audio>
));

const Layer = styled(({value, z, ...props}) => <div {...props} />).attrs({
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

const Text = styled.div`
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

const Wrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
`;

const HelpText = styled.div`
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
  pointer-events: none;
`;

class FullscreenSlider extends PureComponent {
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
          crossorigin="anonymous"
          loop
          ref={this.registerAudioRef}
          sources={LAUREL_SAMPLES}
         />
      </Fragment>
    )
  }
}

const app = document.createElement('div');
document.body.appendChild(app);
ReactDOM.render(<App />, app);