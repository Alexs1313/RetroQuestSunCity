import { createStackNavigator } from '@react-navigation/stack';
import Retroquesttabs from '../retroquestnav/Retroquesttabs';
import Retroquestwlcscr from '../retroquestscrns/retroqueststackscr/Retroquestwlcscr';
import Retroquestcarddet from '../retroquestscrns/retroqueststackscr/Retroquestcarddet';

const Stack = createStackNavigator();

const Retroqueststacknv = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Retroquestwlcscr" component={Retroquestwlcscr} />
      <Stack.Screen name="Retroquesttabs" component={Retroquesttabs} />
      <Stack.Screen name="Retroquestcarddet" component={Retroquestcarddet} />
    </Stack.Navigator>
  );
};

export default Retroqueststacknv;
