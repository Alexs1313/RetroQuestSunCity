import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, useContext, useEffect, useState } from 'react';

export const StoreContext = createContext();

export const RetroQuestLocProvider = ({ children }) => {
  const [retroQuestSavedList, setRetroQuestSavedList] = useState([]);
  const [soundLevel, updateSoundLevel] = useState(1.0);
  const [isEnblRetroQuestMus, setIsEnblRetroQuestMus] = useState(false);
  const [isEnblRetroQuestNot, setIsEnblRetroQuestNot] = useState(false);
  const [isEnblRetroQuestVibr, setIsEnblRetroQuestVibr] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const fetchedVol = await AsyncStorage.getItem('volume');
        if (fetchedVol !== null && !isNaN(parseFloat(fetchedVol))) {
          updateSoundLevel(parseFloat(fetchedVol));
        }
      } catch (err) {
        console.log('Error retrieving stored volume data:', err);
      }
    })();
  }, []);

  const adjustRetroQuestVolumeLevel = async newLevel => {
    try {
      const stringifiedLevel = `${newLevel}`;
      await AsyncStorage.setItem('volume', stringifiedLevel);
      updateSoundLevel(newLevel);
    } catch (err) {
      console.log('Error while storing volume:', err);
    }
  };

  const saveRetroQuestplc = async selPlc => {
    try {
      const stored = await AsyncStorage.getItem('retro_quest_saved_places');
      let places = stored !== null ? JSON.parse(stored) : [];

      const updatedPlaces = [...places, selPlc];

      await AsyncStorage.setItem(
        'retro_quest_saved_places',
        JSON.stringify(updatedPlaces),
      );
    } catch (e) {
      console.error('❌ Failed', e);
    }
  };

  const getRetroQuestplc = async () => {
    try {
      const savedData = await AsyncStorage.getItem('retro_quest_saved_places');
      const parsed = JSON.parse(savedData);

      if (parsed != null) {
        setRetroQuestSavedList(parsed);
      }
    } catch (error) {
      console.log('❌ Failed', error);
    }
  };

  const delRetroQuestplc = async selPlc => {
    const jsonValue = await AsyncStorage.getItem('retro_quest_saved_places');
    let data = jsonValue != null ? JSON.parse(jsonValue) : [];

    const filtered = data.filter(
      item => item.retroquestplcid !== selPlc.retroquestplcid,
    );

    setRetroQuestSavedList(filtered);
    await AsyncStorage.setItem(
      'retro_quest_saved_places',
      JSON.stringify(filtered),
    );
  };

  const value = {
    saveRetroQuestplc,
    getRetroQuestplc,
    delRetroQuestplc,
    retroQuestSavedList,
    volume: soundLevel,
    setVolume: adjustRetroQuestVolumeLevel,
    isEnblRetroQuestNot,
    setIsEnblRetroQuestNot,
    isEnblRetroQuestMus,
    setIsEnblRetroQuestMus,
    isEnblRetroQuestVibr,
    setIsEnblRetroQuestVibr,
  };

  return (
    <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
  );
};

export const useRetroQuestStore = () => {
  return useContext(StoreContext);
};
