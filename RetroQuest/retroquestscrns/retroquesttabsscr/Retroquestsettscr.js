import Retroquestapplayout from '../../retroquestcmpnts/Retroquestapplayout';
import { useRetroQuestStore } from '../../retroqueststore/retroquestcntx';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  Alert,
  Image,
  ImageBackground,
  Platform,
  Share,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';

const Retroquestsettscr = () => {
  const {
    isEnblRetroQuestNot,
    setIsEnblRetroQuestNot,
    isEnblRetroQuestMus,
    setIsEnblRetroQuestMus,
    isEnblRetroQuestVibr,
    setIsEnblRetroQuestVibr,
  } = useRetroQuestStore();

  const toggleRetroQuestMusic = async value => {
    try {
      await AsyncStorage.setItem('retroQuestMusicOn', JSON.stringify(value));
      setIsEnblRetroQuestMus(value);
    } catch (error) {
      console.log('Error', error);
    }
  };

  const toggleRetroQuestNotifications = async value => {
    try {
      await AsyncStorage.setItem(
        'retroQuestNotificationsOn',
        JSON.stringify(value),
      );
      setIsEnblRetroQuestNot(value);
    } catch (error) {
      console.log('Error', error);
    }
  };

  const toggleRetroQuestVibration = async value => {
    try {
      await AsyncStorage.setItem(
        'retroQuestVibrationOn',
        JSON.stringify(value),
      );
      setIsEnblRetroQuestVibr(value);
    } catch (error) {
      console.log('Error', error);
    }
  };

  const shareRetroQuest = async () => {
    try {
      await Share.share({
        message: `Don’t miss Retro Quest Sun City – install now and enjoy it!`,
      });
    } catch (error) {
      Alert.alert(error.message);
    }
  };

  return (
    <Retroquestapplayout>
      <View style={styles.retroquestcnt}>
        <View style={styles.retroquestwlccnt}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              gap: '28%',
            }}
          >
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() =>
                toggleRetroQuestNotifications(!isEnblRetroQuestNot)
              }
            >
              <ImageBackground
                source={require('../../../assets/images/retroquuestsettbtn.png')}
                style={styles.retroquestsettbtn}
              >
                {isEnblRetroQuestNot ? (
                  <Image
                    source={require('../../../assets/images/retroquuestnotact.png')}
                  />
                ) : (
                  <Image
                    source={require('../../../assets/images/retroquuestnot.png')}
                  />
                )}
              </ImageBackground>
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => toggleRetroQuestVibration(!isEnblRetroQuestVibr)}
            >
              <ImageBackground
                source={require('../../../assets/images/retroquuestsettbtn.png')}
                style={styles.retroquestsettbtn}
              >
                {isEnblRetroQuestVibr ? (
                  <Image
                    source={require('../../../assets/images/retroquuestvibract.png')}
                  />
                ) : (
                  <Image
                    source={require('../../../assets/images/retroquuestvibr.png')}
                  />
                )}
              </ImageBackground>
            </TouchableOpacity>
          </View>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              gap: '28%',
              marginTop: 53,
            }}
          >
            {Platform.OS === 'ios' && (
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => toggleRetroQuestMusic(!isEnblRetroQuestMus)}
              >
                <ImageBackground
                  source={require('../../../assets/images/retroquuestsettbtn.png')}
                  style={styles.retroquestsettbtn}
                >
                  {isEnblRetroQuestMus ? (
                    <Image
                      source={require('../../../assets/images/retroquuestsoundact.png')}
                    />
                  ) : (
                    <Image
                      source={require('../../../assets/images/retroquuestsound.png')}
                    />
                  )}
                </ImageBackground>
              </TouchableOpacity>
            )}

            <TouchableOpacity activeOpacity={0.7} onPress={shareRetroQuest}>
              <ImageBackground
                source={require('../../../assets/images/retroquuestsettbtn.png')}
                style={styles.retroquestsettbtn}
              >
                <Image
                  source={require('../../../assets/images/retroquuestshrapp.png')}
                />
              </ImageBackground>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Retroquestapplayout>
  );
};

const styles = StyleSheet.create({
  retroquestcnt: {
    padding: 30,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    paddingBottom: 140,
  },
  retroquestwlccnt: {
    padding: 52,
    paddingHorizontal: 67,

    backgroundColor: '#1D0F0F',
    borderRadius: 10,
    width: '100%',
    borderWidth: 2,
    borderColor: '#FCDA0C',
  },
  retroquestttl: {
    fontWeight: '800',
    fontSize: 22,
    color: '#fff',
    lineHeight: 26,
    letterSpacing: 3,
    textAlign: 'center',
    marginBottom: 23,
  },
  retroquestsbt: {
    fontWeight: '600',
    fontSize: 16,
    color: '#fff',
    lineHeight: 20,
    letterSpacing: 3,
    textAlign: 'center',
  },
  retroquestsettbtn: {
    width: 85,
    height: 85,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Retroquestsettscr;
