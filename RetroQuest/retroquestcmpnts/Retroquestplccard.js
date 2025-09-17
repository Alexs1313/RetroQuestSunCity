import Retroquestcardbtn from '../retroquestcmpnts/Retroquestcardbtn';
import { useRetroQuestStore } from '../retroqueststore/retroquestcntx';
import { useCallback, useState } from 'react';
import {
  Alert,
  Image,
  Share,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';

const Retroquestplccard = ({ questplace, style }) => {
  const {
    saveRetroQuestplc,
    getRetroQuestplc,
    delRetroQuestplc,
    isEnblRetroQuestNot,
  } = useRetroQuestStore();
  const retroquestnv = useNavigation();

  const [toggleRetroQuestIcn, setToggleRetroQuestIcn] = useState(false);

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

    console.log('favoritesList', favoritesList);

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
        `,
      });
    } catch (error) {
      Alert.alert(error.message);
    }
  };

  return (
    <View style={[styles.retroquestwlccnt, style]}>
      <Image
        source={questplace.retroquestplcimg}
        style={{ width: '35%', height: '100%', borderRadius: 22 }}
      />
      <View style={{}}>
        <Text style={styles.retroquestttl}>{questplace.retroquestplcname}</Text>

        <View style={styles.retroquestcoordwrap}>
          <Image source={require('../../assets/images/retroquuestpoint.png')} />
          <Text style={styles.retroquestsbt}>
            {questplace.retroquestplclat}, {questplace.retroquestplclong}
          </Text>
          <Image source={require('../../assets/images/retroquuestpoint.png')} />
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

        <View
          style={{
            flexDirection: 'row',
            gap: 8,
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
              <Image
                source={require('../../assets/images/retroquestsave.png')}
              />
            )}
          </TouchableOpacity>
          <Retroquestcardbtn
            retroquestLabel={'OPEN'}
            fontSize={18}
            onPress={() =>
              retroquestnv.navigate('Retroquestcarddet', questplace)
            }
          />
          <TouchableOpacity
            activeOpacity={0.6}
            onPress={shareRetroQuestCrdDetails}
          >
            <Image
              source={require('../../assets/images/retroquestshare.png')}
            />
          </TouchableOpacity>
        </View>
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
    flexDirection: 'row',
    gap: 13,
    marginBottom: 20,
  },
  retroquestttl: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 18,
    color: '#FFD542',
    marginBottom: 8,
    width: 190,
    textAlign: 'center',
  },
  retroquestsbt: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 14,
    color: '#fff',
    textAlign: 'center',
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
});

export default Retroquestplccard;
