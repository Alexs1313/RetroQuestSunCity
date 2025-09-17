import { Image, Platform, StyleSheet, View } from 'react-native';
import { useCallback, useEffect, useState } from 'react';
import Retroquestplccard from '../../retroquestcmpnts/Retroquestplccard';
import { useFocusEffect } from '@react-navigation/native';
import MapView, { Marker } from 'react-native-maps';
import { retroquestplcdta } from '../../retroquestcnsts/retroquestplcdta';
import Orientation from 'react-native-orientation-locker';
import { useRetroQuestStore } from '../../retroqueststore/retroquestcntx';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Sound from 'react-native-sound';

const retroQuestCstMapStyles = [
  {
    elementType: 'geometry',
    stylers: [{ color: '#2a003f' }],
  },
  {
    elementType: 'labels.text.fill',
    stylers: [{ color: '#a14fff' }],
  },
  {
    elementType: 'labels.text.stroke',
    stylers: [{ color: '#220033' }],
  },
  {
    featureType: 'road',
    elementType: 'geometry',
    stylers: [{ color: '#6a1b9a' }],
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry',
    stylers: [{ color: '#9c27b0' }],
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry.stroke',
    stylers: [{ color: '#7b1fa2' }],
  },
  {
    featureType: 'poi',
    elementType: 'geometry',
    stylers: [{ color: '#4a0072' }],
  },
  {
    featureType: 'water',
    elementType: 'geometry',
    stylers: [{ color: '#311b92' }],
  },
  {
    featureType: 'transit',
    elementType: 'geometry',
    stylers: [{ color: '#512da8' }],
  },
  {
    featureType: 'administrative',
    elementType: 'geometry',
    stylers: [{ color: '#8e24aa' }],
  },
];

const Retroquestmapscr = ({ route }) => {
  const {
    getRetroQuestplc,
    retroQuestSavedList,
    setIsEnblRetroQuestVibr,
    setIsEnblRetroQuestNot,
    isEnblRetroQuestMus,
    setIsEnblRetroQuestMus,
    volume,
  } = useRetroQuestStore();
  const selectedRetroQuestLoc = route.params;
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [sound, setSound] = useState(null);
  const [retroQuestTrackIdx, setRetroQuestTrackIdx] = useState(0);
  const retroQuestTrcks = [
    'jazz-restaurant-cafe-music-370262.mp3',
    'jazz-restaurant-cafe-music-370262.mp3',
  ];

  useEffect(() => {
    playDesertEnigmaTrack(retroQuestTrackIdx);

    return () => {
      if (sound) {
        sound.stop(() => {
          sound.release();
        });
      }
    };
  }, [retroQuestTrackIdx]);

  useEffect(() => {
    if (sound) {
      sound.setVolume(volume);
    }
  }, [volume]);

  const playDesertEnigmaTrack = index => {
    if (sound) {
      sound.stop(() => {
        sound.release();
      });
    }

    const trackPath = retroQuestTrcks[index];

    const newPartyDareSound = new Sound(trackPath, Sound.MAIN_BUNDLE, error => {
      if (error) {
        console.log('error ', error);
        return;
      }

      newPartyDareSound.setVolume(volume);

      newPartyDareSound.play(success => {
        if (success) {
          setRetroQuestTrackIdx(
            prevIndex => (prevIndex + 1) % retroQuestTrcks.length,
          );
        } else {
          console.log('error');
        }
      });
      setSound(newPartyDareSound);
    });
  };

  useEffect(() => {
    loadRetroQuestMusic();
    loadRetroQuestNot();
    loadRetroQuestVibr();
  }, []);

  const loadRetroQuestMusic = async () => {
    try {
      const retroQuestMusicValue = await AsyncStorage.getItem(
        'retroQuestMusicOn',
      );

      const isRetMusicOn = JSON.parse(retroQuestMusicValue);
      setIsEnblRetroQuestMus(isRetMusicOn);
      if (sound) {
        sound.setVolume(isRetMusicOn ? volume : 0);
      }
    } catch (error) {
      console.error('Error loading settings:', error);
    }
  };

  const loadRetroQuestNot = async () => {
    try {
      const retroQuestNtfValue = await AsyncStorage.getItem(
        'retroQuestNotificationsOn',
      );

      const isRetrNotOn = JSON.parse(retroQuestNtfValue);
      setIsEnblRetroQuestNot(isRetrNotOn);
    } catch (error) {
      console.error('Error loading settings:', error);
    }
  };

  const loadRetroQuestVibr = async () => {
    try {
      const retroQuestVibrValue = await AsyncStorage.getItem(
        'retroQuestVibrationOn',
      );

      const isRetrVibrOn = JSON.parse(retroQuestVibrValue);
      setIsEnblRetroQuestVibr(isRetrVibrOn);
    } catch (error) {
      console.error('Error loading settings:', error);
    }
  };

  useEffect(() => {
    const setVolumeBasedOnPartydareMusic = async () => {
      try {
        const retroQuestMusicValue = await AsyncStorage.getItem(
          'retroQuestMusicOn',
        );

        const isRetrMusicOn = JSON.parse(retroQuestMusicValue);
        setIsEnblRetroQuestMus(isRetrMusicOn);
        if (sound) {
          sound.setVolume(isRetrMusicOn ? volume : 0);
        }
      } catch (error) {
        console.error('Error', error);
      }
    };

    setVolumeBasedOnPartydareMusic();
  }, [sound, volume]);

  useEffect(() => {
    if (sound) {
      sound.setVolume(isEnblRetroQuestMus ? volume : 0);
    }
  }, [volume, isEnblRetroQuestMus]);

  useFocusEffect(
    useCallback(() => {
      getRetroQuestplc();
    }, []),
  );

  useFocusEffect(
    useCallback(() => {
      Orientation.lockToPortrait();

      return () => Orientation.unlockAllOrientations();
    }, []),
  );

  return (
    <View>
      <View style={styles.retroquestcontainer}>
        <MapView
          customMapStyle={retroQuestCstMapStyles}
          provider={Platform.OS === 'ios' ? 'google' : undefined}
          style={{ width: '100%', height: '100%' }}
          initialRegion={{
            latitude: 52.1065,
            longitude: 11.6421,
            latitudeDelta: 0.1,
            longitudeDelta: 0.1,
          }}
        >
          {selectedRetroQuestLoc === undefined ? (
            <>
              {retroquestplcdta.map(marker => (
                <Marker
                  key={marker.retroquestplcid}
                  coordinate={{
                    latitude: marker.retroquestplclat,
                    longitude: marker.retroquestplclong,
                  }}
                  onPress={() =>
                    selectedMarker !== null
                      ? setSelectedMarker(null)
                      : setSelectedMarker(marker)
                  }
                >
                  {Platform.OS === 'ios' ? (
                    <>
                      {marker.retroquestplcat === 'Bar' && (
                        <>
                          {retroQuestSavedList.some(
                            plc =>
                              plc.retroquestplcid === marker.retroquestplcid,
                          ) ? (
                            <Image
                              source={require('../../../assets/images/retroquuestpointbaract.png')}
                              style={
                                selectedMarker?.retroquestplcid ===
                                  marker.retroquestplcid &&
                                styles.retroquestselmarker
                              }
                            />
                          ) : (
                            <Image
                              source={require('../../../assets/images/retroquuestpointbar.png')}
                              style={
                                selectedMarker?.retroquestplcid ===
                                  marker.retroquestplcid &&
                                styles.retroquestselmarker
                              }
                            />
                          )}
                        </>
                      )}
                      {marker.retroquestplcat === 'Café' && (
                        <>
                          {retroQuestSavedList.some(
                            plc =>
                              plc.retroquestplcid === marker.retroquestplcid,
                          ) ? (
                            <Image
                              source={require('../../../assets/images/retroquuestpointcafeact.png')}
                              style={
                                selectedMarker?.retroquestplcid ===
                                  marker.retroquestplcid &&
                                styles.retroquestselmarker
                              }
                            />
                          ) : (
                            <Image
                              source={require('../../../assets/images/retroquuestpointcafe.png')}
                              style={
                                selectedMarker?.retroquestplcid ===
                                  marker.retroquestplcid &&
                                styles.retroquestselmarker
                              }
                            />
                          )}
                        </>
                      )}
                      {marker.retroquestplcat === 'Restaurant' && (
                        <>
                          {retroQuestSavedList.some(
                            plc =>
                              plc.retroquestplcid === marker.retroquestplcid,
                          ) ? (
                            <Image
                              source={require('../../../assets/images/retroquuestpointrestact.png')}
                              style={
                                selectedMarker?.retroquestplcid ===
                                  marker.retroquestplcid &&
                                styles.retroquestselmarker
                              }
                            />
                          ) : (
                            <Image
                              source={require('../../../assets/images/retroquuestpointrest.png')}
                              style={
                                selectedMarker?.retroquestplcid ===
                                  marker.retroquestplcid &&
                                styles.retroquestselmarker
                              }
                            />
                          )}
                        </>
                      )}
                    </>
                  ) : null}
                </Marker>
              ))}
            </>
          ) : (
            <>
              <Marker
                coordinate={{
                  latitude: selectedRetroQuestLoc.retroquestplclat,
                  longitude: selectedRetroQuestLoc.retroquestplclong,
                }}
                onPress={() =>
                  selectedMarker !== null
                    ? setSelectedMarker(null)
                    : setSelectedMarker(selectedRetroQuestLoc)
                }
              >
                {Platform.OS === 'ios' ? (
                  <>
                    {selectedRetroQuestLoc.retroquestplcat === 'Bar' && (
                      <>
                        {retroQuestSavedList.some(
                          plc =>
                            plc.retroquestplcid ===
                            selectedRetroQuestLoc.retroquestplcid,
                        ) ? (
                          <Image
                            source={require('../../../assets/images/retroquuestpointbaract.png')}
                            style={
                              selectedMarker?.retroquestplcid ===
                                selectedRetroQuestLoc.retroquestplcid &&
                              styles.retroquestselmarker
                            }
                          />
                        ) : (
                          <Image
                            source={require('../../../assets/images/retroquuestpointbar.png')}
                            style={
                              selectedMarker?.retroquestplcid ===
                                selectedRetroQuestLoc.retroquestplcid &&
                              styles.retroquestselmarker
                            }
                          />
                        )}
                      </>
                    )}
                    {selectedRetroQuestLoc.retroquestplcat === 'Café' && (
                      <>
                        {retroQuestSavedList.some(
                          plc =>
                            plc.retroquestplcid ===
                            selectedRetroQuestLoc.retroquestplcid,
                        ) ? (
                          <Image
                            source={require('../../../assets/images/retroquuestpointcafeact.png')}
                            style={
                              selectedMarker?.retroquestplcid ===
                                selectedRetroQuestLoc.retroquestplcid &&
                              styles.retroquestselmarker
                            }
                          />
                        ) : (
                          <Image
                            source={require('../../../assets/images/retroquuestpointcafe.png')}
                            style={
                              selectedMarker?.retroquestplcid ===
                                selectedRetroQuestLoc.retroquestplcid &&
                              styles.retroquestselmarker
                            }
                          />
                        )}
                      </>
                    )}
                    {selectedRetroQuestLoc.retroquestplcat === 'Restaurant' && (
                      <>
                        {retroQuestSavedList.some(
                          plc =>
                            plc.retroquestplcid ===
                            selectedRetroQuestLoc.retroquestplcid,
                        ) ? (
                          <Image
                            source={require('../../../assets/images/retroquuestpointrestact.png')}
                            style={
                              selectedMarker?.retroquestplcid ===
                                selectedRetroQuestLoc.retroquestplcid &&
                              styles.retroquestselmarker
                            }
                          />
                        ) : (
                          <Image
                            source={require('../../../assets/images/retroquuestpointrest.png')}
                            style={
                              selectedMarker?.retroquestplcid ===
                                selectedRetroQuestLoc.retroquestplcid &&
                              styles.retroquestselmarker
                            }
                          />
                        )}
                      </>
                    )}
                  </>
                ) : null}
              </Marker>
            </>
          )}
        </MapView>

        {selectedMarker && (
          <View
            style={{
              position: 'absolute',
              zIndex: 120,
              top: 54,
              alignItems: 'center',
              width: '100%',
            }}
          >
            <Retroquestplccard
              questplace={selectedMarker}
              style={{ width: '95%' }}
            />
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  retroquestcontainer: {
    alignItems: 'center',
  },
  retroquestselmarker: {
    width: 75,
    height: 110,
  },
});

export default Retroquestmapscr;
