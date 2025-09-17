import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ImageBackground,
  Image,
} from 'react-native';

const Retroquestmnbt = ({
  retroquestLabel,
  onPress,
  buttonWidth,
  buttonHeight,
  fontSize = 24,
  retroQuestIcon,
  isDisabled,
}) => {
  return (
    <TouchableOpacity
      onPress={() => {
        onPress();
      }}
      activeOpacity={0.8}
      disabled={isDisabled}
    >
      <ImageBackground
        source={require('../../assets/images/retroquestbtn.png')}
        style={[
          styles.retroquestbtn,
          { width: buttonWidth, height: buttonHeight },
        ]}
        resizeMode="stretch"
      >
        {retroQuestIcon && <Image source={retroQuestIcon} />}
        <Text style={[styles.retroquestbtntxt, { fontSize }]}>
          {retroquestLabel}
        </Text>
      </ImageBackground>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  retroquestbtn: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 12,
    flexDirection: 'row',
    gap: 6,
  },
  retroquestbtntxt: {
    fontWeight: '800',
    color: '#000',
    fontSize: 18,
    lineHeight: 30,
    letterSpacing: 3,
  },
});

export default Retroquestmnbt;
