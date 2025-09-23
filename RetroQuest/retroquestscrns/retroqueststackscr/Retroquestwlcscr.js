import { Image, Platform, StyleSheet, Text, View } from 'react-native';
import Retroquestapplayout from '../../retroquestcmpnts/Retroquestapplayout';
import { useState } from 'react';
import Retroquestmnbt from '../../retroquestcmpnts/Retroquestmnbt';
import { useNavigation } from '@react-navigation/native';

export const retroquestwldta = [
  {
    retroquestimg: require('../../../assets/images/retroquestwl1.png'),
    retroquestttl:
      Platform.OS === 'android'
        ? 'Welcome to Dragon Quest Sun City'
        : 'Welcome to Retro Quest Sun City',
    retroquestsbt:
      'A neon-styled guide to Magdeburg’s best cafés, bars, and restaurants—mapped, rated, and gamified.',
    retroquestbtntxt: 'NEXT',
  },
  {
    retroquestimg: require('../../../assets/images/retroquestwl2.png'),
    retroquestttl: 'Navigate with the Map',
    retroquestsbt:
      'See nearby spots, filter by category, price, and rating, then tap a pin for photos, video, and details.',
    retroquestbtntxt: 'NEXT',
  },
  {
    retroquestimg: require('../../../assets/images/retroquestwl3.png'),
    retroquestttl: 'Curated Places',
    retroquestsbt: `Learn what makes each venue special, check price icons and star reviews, and browse menu highlights.`,
    retroquestbtntxt: 'NEXT',
  },
  {
    retroquestimg: require('../../../assets/images/retroquestwl4.png'),
    retroquestttl: 'Challenges at Every Stop',
    retroquestsbt:
      'Draw a random task for the category, complete it, mark it done, and track your progress.',
    retroquestbtntxt: 'NEXT',
  },
  {
    retroquestimg: require('../../../assets/images/retroquestwl5.png'),
    retroquestttl: 'Save Your Favorites',
    retroquestsbt:
      'Bookmark the places you love for quick access and easy planning next time.',
    retroquestbtntxt: 'START',
  },
];

const Retroquestwlcscr = () => {
  const [currentRetroQuestWlcSlide, setCurrentRetroQuestWlcSlide] = useState(0);
  const retroquestnv = useNavigation();

  return (
    <Retroquestapplayout>
      <View style={styles.retroquestcnt}>
        <Image
          source={retroquestwldta[currentRetroQuestWlcSlide].retroquestimg}
          style={[
            currentRetroQuestWlcSlide !== 0 && {
              marginBottom: 30,
              marginTop: 53,
            },
          ]}
        />

        <View style={styles.retroquestwlccnt}>
          <Text style={styles.retroquestttl}>
            {retroquestwldta[currentRetroQuestWlcSlide].retroquestttl}
          </Text>
          <Text style={styles.retroquestsbt}>
            {retroquestwldta[currentRetroQuestWlcSlide].retroquestsbt}
          </Text>
        </View>
        <View style={{ top: -25 }}>
          <Retroquestmnbt
            buttonWidth={187}
            buttonHeight={50}
            retroquestLabel={
              retroquestwldta[currentRetroQuestWlcSlide].retroquestbtntxt
            }
            fontSize={18}
            onPress={() =>
              currentRetroQuestWlcSlide === 4
                ? retroquestnv.replace('Retroquesttabs')
                : setCurrentRetroQuestWlcSlide(currentRetroQuestWlcSlide + 1)
            }
          />
        </View>
      </View>
    </Retroquestapplayout>
  );
};

const styles = StyleSheet.create({
  retroquestcnt: { padding: 30, alignItems: 'center' },
  retroquestwlccnt: {
    padding: 17,
    paddingBottom: 40,
    backgroundColor: '#1D0F0F',
    borderRadius: 10,
    width: '100%',
    borderWidth: 2,
    borderColor: '#FCDA0C',
    height: 240,
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
});

export default Retroquestwlcscr;
