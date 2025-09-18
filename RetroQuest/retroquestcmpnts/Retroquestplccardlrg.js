import Retroquestcardbtn from '../retroquestcmpnts/Retroquestcardbtn';
import { useRetroQuestStore } from '../retroqueststore/retroquestcntx';
import { useCallback, useRef, useState } from 'react';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { retroquesttsks } from '../retroquestcnsts/retroquesttsks';
import {
  Alert,
  Image,
  Share,
  StyleSheet,
  Text,
  TouchableOpacity,
  Vibration,
  View,
} from 'react-native';
import Toast from 'react-native-toast-message';
import Video from 'react-native-video';

const Retroquestplccardlrg = ({ questplace }) => {
  const {
    saveRetroQuestplc,
    getRetroQuestplc,
    delRetroQuestplc,
    isEnblRetroQuestVibr,
    isEnblRetroQuestNot,
  } = useRetroQuestStore();
  const retroquestnv = useNavigation();
  const [toggleRetroQuestIcn, setToggleRetroQuestIcn] = useState(false);
  const [randomItem, setRandomItem] = useState(null);
  const videoRef = useRef(null);

  const filteredTasks = retroquesttsks.find(
    task => task.retroquestcat === questplace.retroquestplcat,
  );

  const getRandomItem = () => {
    if (isEnblRetroQuestVibr) {
      Vibration.vibrate(500);
      console.log('✅ vibro');
    }

    const randomIndex = Math.floor(
      Math.random() * filteredTasks.retroquesttask.length,
    );
    setRandomItem(filteredTasks.retroquesttask[randomIndex]);
  };

  useFocusEffect(
    useCallback(() => {
      renderRetroQuestLoc(questplace);
      getRetroQuestplc();
    }, []),
  );

  const toggleRetroQuestSaved = selectedPlace => {
    if (isEnblRetroQuestNot) {
      Toast.show({
        text1: !toggleRetroQuestIcn
          ? 'Added to favorites!'
          : 'Removed from favorites',
      });
    }

    if (toggleRetroQuestIcn)
      delRetroQuestplc(selectedPlace), setToggleRetroQuestIcn(false);
    else saveRetroQuestplc(selectedPlace), setToggleRetroQuestIcn(true);
  };

  const renderRetroQuestLoc = async item => {
    const jsonValue = await AsyncStorage.getItem('retro_quest_saved_places');

    const favoritesList = JSON.parse(jsonValue);

    if (favoritesList != null) {
      let data = favoritesList.find(
        fav => fav.retroquestplcid === item.retroquestplcid,
      );

      return data == null
        ? setToggleRetroQuestIcn(false)
        : setToggleRetroQuestIcn(true);
    }
  };

  const shareRetroQuestCrdDetails = async () => {
    try {
      await Share.share({
        message: `${questplace.retroquestplcname}
${questplace.retroquestplclat}, ${questplace.retroquestplclong}
${questplace.retroquestplcdesc}
Menu: ${questplace.retroquestplcmenu}
        `,
      });
    } catch (error) {
      Alert.alert(error.message);
    }
  };

  return (
    <View style={styles.retroquestwlccnt}>
      <View style={{ flexDirection: 'row', gap: 8 }}>
        <Image
          source={questplace.retroquestplcimg}
          style={{ width: '40%', height: 160, borderRadius: 22 }}
        />
        <View style={{}}>
          <Text style={styles.retroquestttl}>
            {questplace.retroquestplcname}
          </Text>

          <View style={styles.retroquestcoordwrap}>
            <Image
              source={require('../../assets/images/retroquuestpoint.png')}
            />
            <Text style={styles.retroquestsbt}>
              {questplace.retroquestplclat}, {questplace.retroquestplclong}
            </Text>
            <Image
              source={require('../../assets/images/retroquuestpoint.png')}
            />
          </View>

          <View style={styles.retroquestpricewrap}>
            {Array.from({ length: 3 }, (_, index) => {
              const starNumber = index + 1;
              return (
                <Image
                  key={index}
                  source={
                    starNumber <= questplace.retroquestplcprice
                      ? require('../../assets/images/retroquestactrating.png')
                      : require('../../assets/images/retroquestinactivrat.png')
                  }
                  style={styles.star}
                />
              );
            })}
          </View>

          <Text style={styles.retroquestdesctxt}>
            {questplace.retroquestplcdesc}
          </Text>
        </View>
      </View>

      <View style={{ alignItems: 'center' }}>
        <Text style={[styles.retroquestttlmn]}>Menu</Text>
        <Text style={[styles.retroquestttlmntxt]}>
          {questplace.retroquestplcmenu}
        </Text>
        <View style={styles.retroquestvideowrap}>
          {questplace.retroquestplcat === 'Bar' && (
            <Video
              source={
                questplace.retroquestplcat === 'Bar' &&
                require('../../assets/videos/retroquestbars.mp4')
              }
              style={styles.retroquestvideo}
              resizeMode="cover"
              repeat
              ref={videoRef}
            />
          )}
          {questplace.retroquestplcat === 'Café' && (
            <Video
              source={
                questplace.retroquestplcat === 'Café' &&
                require('../../assets/videos/retroquestcafe.mp4')
              }
              style={styles.retroquestvideo}
              resizeMode="cover"
              repeat
              ref={videoRef}
            />
          )}
          {questplace.retroquestplcat === 'Restaurant' && (
            <Video
              source={
                questplace.retroquestplcat === 'Restaurant' &&
                require('../../assets/videos/retroquestrest.mp4')
              }
              style={styles.retroquestvideo}
              resizeMode="cover"
              repeat
              ref={videoRef}
            />
          )}
        </View>
        <TouchableOpacity
          activeOpacity={0.7}
          style={{ alignItems: 'center', justifyContent: 'center' }}
          onPress={getRandomItem}
          disabled={randomItem}
        >
          <Image
            source={require('../../assets/images/retroquestboard.png')}
            style={{ borderRadius: 12, marginTop: 8 }}
          />
          {randomItem ? (
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                position: 'absolute',
              }}
            >
              {questplace.retroquestplcat === 'Café' && (
                <Image
                  source={require('../../assets/images/retroquestcafe.png')}
                />
              )}
              {questplace.retroquestplcat === 'Bar' && (
                <Image
                  source={require('../../assets/images/retroquestbar.png')}
                />
              )}
              {questplace.retroquestplcat === 'Restaurant' && (
                <Image
                  source={require('../../assets/images/retroquestrest.png')}
                />
              )}
              <Text style={styles.retroquesttasktxt}>{randomItem}</Text>
            </View>
          ) : (
            <Text style={styles.retroquesttasktext}>{`Tap to get
 your task`}</Text>
          )}
        </TouchableOpacity>
      </View>

      <View
        style={{
          flexDirection: 'row',
          gap: '22%',
          justifyContent: 'center',
          marginTop: 12,
        }}
      >
        <TouchableOpacity
          activeOpacity={0.6}
          onPress={() => toggleRetroQuestSaved(questplace)}
        >
          {toggleRetroQuestIcn ? (
            <Image
              source={require('../../assets/images/retroquestsaved.png')}
            />
          ) : (
            <Image source={require('../../assets/images/retroquestsave.png')} />
          )}
        </TouchableOpacity>
        <Retroquestcardbtn
          retroquestLabel={'MAP'}
          fontSize={18}
          onPress={() =>
            retroquestnv.navigate('Retroquesttabs', {
              screen: 'Retroquestmapscr',
              params: questplace,
            })
          }
        />
        <TouchableOpacity
          activeOpacity={0.6}
          onPress={shareRetroQuestCrdDetails}
        >
          <Image source={require('../../assets/images/retroquestshare.png')} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  retroquestwlccnt: {
    paddingHorizontal: 10,
    paddingVertical: 15,
    backgroundColor: '#1D0F0F',
    borderRadius: 10,
    width: '100%',
    borderWidth: 2,
    borderColor: '#FCDA0C',
    marginBottom: 20,
  },
  retroquestvideowrap: {
    overflow: 'hidden',
    borderRadius: 14,
    width: 202,
    height: 186,
    marginBottom: 10,
  },
  retroquestvideo: {
    width: '100%',
    height: '100%',
  },
  retroquestttl: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 18,
    color: '#FFD542',
    marginBottom: 8,
    width: 180,
    left: 18,
    textAlign: 'center',
  },
  retroquestttlmn: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 18,
    color: '#FFD542',
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 11,
  },
  retroquestsbt: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 14,
    color: '#fff',
    textAlign: 'center',
  },
  retroquestdesctxt: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 14,
    color: '#fff',
    textAlign: 'center',
    width: 200,
  },
  retroquestttlmntxt: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 14,
    color: '#fff',
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 11,
  },
  retroquestcoordwrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
    left: 25,
  },
  retroquestpricewrap: {
    flexDirection: 'row',
    marginBottom: 8,
    left: 50,
  },
  retroquesttasktext: {
    fontFamily: 'Cormorant-Bold',
    color: '#000',
    fontSize: 25,
    lineHeight: 25,
    position: 'absolute',
  },
  retroquesttasktxt: {
    fontFamily: 'Cormorant-SemiBold',
    color: '#000',
    fontSize: 14,
    width: 103,
    textAlign: 'center',
  },
});

export default Retroquestplccardlrg;
