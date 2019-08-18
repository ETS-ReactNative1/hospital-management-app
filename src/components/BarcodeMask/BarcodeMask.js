import React from 'react';
import { Animated, View, Text } from 'react-native';
import PropTypes from 'prop-types';

import styles from './BarcodeMaskStyles';
import CustomButton from '../CustomButton/CustomButton';

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
    // Icon.getImageSource('user', 20, 'red');
    return (
      <View style={[styles.container]}>
        <View
          style={[
            styles.finder,
            {
              width: this.props.width,
              height: this.props.height
            }
          ]}
        >
          {this.renderEdge('topLeft')}
          {this.renderEdge('topRight')}
          {this.renderEdge('bottomLeft')}
          {this.renderEdge('bottomRight')}

          {this.props.showAnimatedLine && (
            <Animated.View
              style={[
                styles.animatedLine,
                {
                  backgroundColor: this.props.animatedLineColor,
                  height: this.props.animatedLineHeight,
                  top: this.state.top
                }
              ]}
            />
          )}
        </View>

        <View style={styles.maskOuter}>
          <View style={[styles.maskRow, styles.maskFrame, this.applyMaskFrameTransparency()]}>
            <CustomButton
              onPress={this.onPressFlashOn}
              title={this.props.flashState ? 'Tắt flash' : 'Bật flash'}
              iconName={this.props.flashState ? 'flash-off' : 'flash-on'}
            />
          </View>
          <View
            style={[{ height: this.props.height }, styles.maskCenter]}
            onLayout={this.onMaskCenterViewLayoutUpdated}
          >
            <View style={[styles.maskFrame, this.applyMaskFrameTransparency()]} />
            <View
              style={[
                styles.maskInner,
                {
                  width: this.props.width,
                  height: this.props.height
                }
              ]}
            />
            <View style={[styles.maskFrame, this.applyMaskFrameTransparency()]} />
          </View>
          <View style={[styles.maskRow, styles.maskFrame, this.applyMaskFrameTransparency()]}>
            <Text style={styles.hintTextStyle}>{this.props.hintText}</Text>
          </View>
        </View>
      </View>
    );
  }
}

const propTypes = {
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

const defaultProps = {
  width: 250,
  height: 250,
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

BarcodeMask.propTypes = propTypes;
BarcodeMask.defaultProps = defaultProps;
