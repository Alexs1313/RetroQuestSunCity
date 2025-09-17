import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ImageBackground,
  Image,
} from 'react-native';

const Retroquestcardbtn = ({
  retroquestLabel,
  onPress,
  buttonWidth = 89,
  buttonHeight = 49,
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
        source={require('../../assets/images/retroquestcardbtn.png')}
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
    fontFamily: 'Cormorant-Bold',
    color: '#000',
    fontSize: 18,
    lineHeight: 22,
  },
});

export default Retroquestcardbtn;
