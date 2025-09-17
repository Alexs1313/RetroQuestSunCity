import { Image, StyleSheet, Text, View } from 'react-native';
import Retroquestapplayout from '../retroquestcmpnts/Retroquestapplayout';
import { useCallback } from 'react';
import Retroquestplccard from '../retroquestcmpnts/Retroquestplccard';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { retroquestplcdta } from '../retroquestcnsts/retroquestplcdta';
import { useRetroQuestStore } from '../retroqueststore/retroquestcntx';
import Retroquestmnbt from './Retroquestmnbt';
import LinearGradient from 'react-native-linear-gradient';

const Retroquestplslst = ({ retroQuestPropScreen }) => {
  const { getRetroQuestplc, retroQuestSavedList } = useRetroQuestStore();
  const retroquestnv = useNavigation();

  useFocusEffect(
    useCallback(() => {
      getRetroQuestplc();
    }, []),
  );

  let retroquestdta;

  retroQuestPropScreen === 'retroquestfav'
    ? (retroquestdta = retroQuestSavedList)
    : (retroquestdta = retroquestplcdta);

  return (
    <Retroquestapplayout>
      <View style={styles.retroquestcnt}>
        {retroQuestPropScreen === 'retroquestfav' &&
          retroQuestSavedList.length === 0 && (
            <>
              <View style={styles.retroquestwlccnt}>
                <Image
                  source={require('../../assets/images/retroquestempt.png')}
                  style={{ zIndex: 20 }}
                />

                <Image
                  source={require('../../assets/images/retroquestmark.png')}
                  style={{ position: 'absolute', left: 10 }}
                />
                <Image
                  source={require('../../assets/images/retroquestmark.png')}
                  style={{
                    position: 'absolute',
                    left: 10,
                    top: 100,
                    transform: [{ rotate: '45deg' }],
                  }}
                />

                <Image
                  source={require('../../assets/images/retroquestmark.png')}
                  style={{
                    position: 'absolute',
                    right: 0,
                    top: 160,
                    transform: [{ rotate: '55deg' }],
                  }}
                />

                <Image
                  source={require('../../assets/images/retroquestmark.png')}
                  style={{
                    position: 'absolute',
                    right: 0,
                    top: 10,
                    transform: [{ rotate: '5deg' }],
                  }}
                />

                <Image
                  source={require('../../assets/images/retroquestmark.png')}
                  style={{
                    position: 'absolute',
                    right: 90,
                    top: 80,
                    transform: [{ rotate: '50deg' }],
                  }}
                />

                <LinearGradient
                  colors={['#1D0F0F', '#06082bfe']}
                  style={{
                    width: '100%',
                    height: 100,
                    borderBottomLeftRadius: 12,
                    borderBottomRightRadius: 12,
                  }}
                >
                  <Text style={styles.retroquestttl}>
                    {`No favorites yet 
Add places you love and find 
Them here.`}
                  </Text>
                </LinearGradient>
              </View>
              <View style={{ alignItems: 'center', marginTop: 13 }}>
                <Retroquestmnbt
                  buttonWidth={202}
                  buttonHeight={54}
                  retroquestLabel={'EXPLORE'}
                  fontSize={18}
                  onPress={() =>
                    retroquestnv.navigate('Retroquesttabs', {
                      screen: 'Retroquestplcscr',
                    })
                  }
                />
              </View>
            </>
          )}

        {retroquestdta.map((questplace, idx) => (
          <Retroquestplccard questplace={questplace} key={idx} />
        ))}
      </View>
    </Retroquestapplayout>
  );
};

const styles = StyleSheet.create({
  retroquestcnt: {
    padding: 9,
    alignItems: 'center',
    paddingTop: 66,
    paddingBottom: 130,
  },
  retroquestwlccnt: {
    backgroundColor: '#1D0F0F',
    borderRadius: 10,
    width: '100%',
    borderWidth: 2,
    borderColor: '#FCDA0C',
    alignItems: 'center',
  },
  retroquestttl: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 20,
    color: '#fff',
    marginBottom: 8,
    textAlign: 'center',
    paddingHorizontal: 15,
  },
  retroquestsbt: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 14,
    color: '#fff',
    textAlign: 'center',
  },
});

export default Retroquestplslst;
