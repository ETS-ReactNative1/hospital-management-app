import React from 'react';
import { Animated, View, Text } from 'react-native';
import PropTypes from 'prop-types';

import styles from './BarcodeMaskStyles';
import GradientButton from '../GradientButton';
import Typography from '../Typography';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default class BarcodeMask extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      top: new Animated.Value(10),
      maskCenterViewHeight: 0
    };
  }

  componentDidMount() {
    this.startLineAnimation();
  }

  componentDidUpdate(prevProps) {
    const { showAnimatedLine } = this.props;
    if (showAnimatedLine !== prevProps.showAnimatedLine && showAnimatedLine) {
      this.startLineAnimation();
    }
  }

  componentWillUnmount() {
    if (this.animation) {
      this.animation.stop();
    }
  }

  startLineAnimation = () => {
    const intervalId = setInterval(() => {
      if (this.state.maskCenterViewHeight > 0) {
        this.animateLoop();
        clearInterval(this.state.intervalId);
      }
    }, 500);
    this.setState({
      intervalId
    });
  };

  animateLoop = () => {
    this.animation = Animated.loop(
      Animated.sequence([
        Animated.timing(this.state.top, {
          toValue: this.state.maskCenterViewHeight - 10,
          duration: this.props.lineAnimationDuration
        }),
        Animated.timing(this.state.top, {
          toValue: 10,
          duration: this.props.lineAnimationDuration
        })
      ])
    );
    this.animation.start();
  };

  onMaskCenterViewLayoutUpdated = ({ nativeEvent }) => {
    this.setState({
      maskCenterViewHeight: nativeEvent.layout.height
    });
  };

  applyMaskFrameTransparency = () => {
    let transparency = 0.6;
    if (
      this.props.transparency &&
      Number(this.props.transparency) &&
      (this.props.transparency >= 0 || this.props.transparency <= 1)
    ) {
      transparency = this.props.transparency;
    }
    return { backgroundColor: `rgba(0,0,0,${transparency})` };
  };

  renderEdge = edgePosition => {
    const defaultStyle = {
      width: this.props.edgeWidth,
      height: this.props.edgeHeight,
      borderColor: this.props.edgeColor
    };
    const edgeBorderStyle = {
      topRight: {
        borderRightWidth: this.props.edgeBorderWidth,
        borderTopWidth: this.props.edgeBorderWidth
      },
      topLeft: {
        borderLeftWidth: this.props.edgeBorderWidth,
        borderTopWidth: this.props.edgeBorderWidth
      },
      bottomRight: {
        borderRightWidth: this.props.edgeBorderWidth,
        borderBottomWidth: this.props.edgeBorderWidth
      },
      bottomLeft: {
        borderLeftWidth: this.props.edgeBorderWidth,
        borderBottomWidth: this.props.edgeBorderWidth
      }
    };
    return (
      <View style={[defaultStyle, styles[`${edgePosition}Edge`], edgeBorderStyle[edgePosition]]} />
    );
  };

  onPressFlashOn = () => {
    const { switchFlashState, flashState } = this.props;
    switchFlashState(!flashState);
  };

  render() {
    const {
      flashState,
      width,
      height,
      showAnimatedLine,
      animatedLineColor,
      animatedLineHeight,
      hintText
    } = this.props;
    return (
      <View style={[styles.container]}>
        <View style={[styles.finder, { width, height }]}>
          {this.renderEdge('topLeft')}
          {this.renderEdge('topRight')}
          {this.renderEdge('bottomLeft')}
          {this.renderEdge('bottomRight')}

          {showAnimatedLine ? (
            <Animated.View
              style={[
                styles.animatedLine,
                {
                  backgroundColor: animatedLineColor,
                  height: animatedLineHeight,
                  top: this.state.top
                }
              ]}
            />
          ) : null}
        </View>

        <View style={styles.maskOuter}>
          <View style={[styles.maskRow, styles.maskFrame, this.applyMaskFrameTransparency()]}>
            <GradientButton style={styles.flashButtonStyle} onPress={this.onPressFlashOn} border>
              <Icon
                name={flashState ? 'flash-off' : 'flash'}
                size={16}
                color="white"
                style={{ paddingRight: 2 }}
              />
              <Typography white center>
                {flashState ? 'Tắt flash' : 'Bật flash'}
              </Typography>
            </GradientButton>
          </View>
          <View
            style={[{ height }, styles.maskCenter]}
            onLayout={this.onMaskCenterViewLayoutUpdated}
          >
            <View style={[styles.maskFrame, this.applyMaskFrameTransparency()]} />
            <View style={[styles.maskInner, { width, height }]} />
            <View style={[styles.maskFrame, this.applyMaskFrameTransparency()]} />
          </View>
          <View style={[styles.maskRow, styles.maskFrame, this.applyMaskFrameTransparency()]}>
            <Text style={styles.hintTextStyle}>{hintText}</Text>
          </View>
        </View>
      </View>
    );
  }
}

BarcodeMask.propTypes = {
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  edgeWidth: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  edgeHeight: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  edgeColor: PropTypes.string,
  edgeBorderWidth: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  transparency: PropTypes.number,
  showAnimatedLine: PropTypes.bool,
  animatedLineColor: PropTypes.string,
  animatedLineHeight: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  lineAnimationDuration: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  hintText: PropTypes.string
};

BarcodeMask.defaultProps = {
  width: 350,
  height: 350,
  edgeWidth: 30,
  edgeHeight: 30,
  edgeColor: '#e3e3e3',
  edgeBorderWidth: 2,
  transparency: 0.6,
  showAnimatedLine: true,
  animatedLineColor: '#FF0000',
  animatedLineHeight: 2,
  lineAnimationDuration: 2000,
  hintText: 'Di chuyển camera để thấy rõ mã QR'
};
