import { NavigationContainer } from '@react-navigation/native';
import Retroqueststacknv from './RetroQuest/retroquestnav/Retroqueststacknv';
import { RetroQuestLocProvider } from './RetroQuest/retroqueststore/retroquestcntx';
import Toast from 'react-native-toast-message';
import Retroquestwlcldr from './RetroQuest/retroquestcmpnts/Retroquestwlcldr';
import { useEffect, useState } from 'react';

const App = () => {
  const [startRetroQuestWlcmscrLoader, setStartRetroQuestWlcmscrLoader] =
    useState(false);

  useEffect(() => {
    setTimeout(() => {
      setStartRetroQuestWlcmscrLoader(true);
    }, 5000);
  }, []);

  return (
    <NavigationContainer>
      <RetroQuestLocProvider>
        {startRetroQuestWlcmscrLoader ? (
          <Retroqueststacknv />
        ) : (
          <Retroquestwlcldr />
        )}
      </RetroQuestLocProvider>
      <Toast position="top" topOffset={55} />
    </NavigationContainer>
  );
};

export default App;
