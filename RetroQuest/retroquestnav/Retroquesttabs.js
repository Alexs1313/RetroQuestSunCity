import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image, StyleSheet, View } from 'react-native';
import Retroquestmapscr from '../retroquestscrns/retroquesttabsscr/Retroquestmapscr';
import Retroquestplcscr from '../retroquestscrns/retroquesttabsscr/Retroquestplcscr';
import Retroquestfavscr from '../retroquestscrns/retroquesttabsscr/Retroquestfavscr';
import Retroquestsettscr from '../retroquestscrns/retroquesttabsscr/Retroquestsettscr';
import LinearGradient from 'react-native-linear-gradient';

const Tab = createBottomTabNavigator();

const Retroquesttabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: styles.tabBar,
        tabBarIconStyle: styles.tabBarIcon,
        tabBarActiveTintColor: '#FF2FB6',
        tabBarInactiveTintColor: '#000',
        tabBarBackground: () => (
          <View style={{ flex: 1 }}>
            <LinearGradient
              colors={['#1D5EBF', '#002E73']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.tabBarBg}
            ></LinearGradient>
          </View>
        ),
      }}
    >
      <Tab.Screen
        name="Retroquestmapscr"
        component={Retroquestmapscr}
        options={{
          tabBarIcon: ({ color, focused }) => (
            <View
              style={[styles.bgIcon, focused && { backgroundColor: '#0B2A4A' }]}
            >
              <Image
                source={require('../../assets/icons/retroquestloc.png')}
                style={{ tintColor: color }}
              />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Retroquestplcscr"
        component={Retroquestplcscr}
        options={{
          tabBarIcon: ({ color, focused }) => (
            <View
              style={[styles.bgIcon, focused && { backgroundColor: '#0B2A4A' }]}
            >
              <Image
                source={require('../../assets/icons/retroquestpls.png')}
                style={{ tintColor: color }}
              />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Retroquestfavscr"
        component={Retroquestfavscr}
        options={{
          tabBarIcon: ({ color, focused }) => (
            <View
              style={[styles.bgIcon, focused && { backgroundColor: '#0B2A4A' }]}
            >
              <Image
                source={require('../../assets/icons/retroquestsvd.png')}
                style={{ tintColor: color }}
              />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Retroquestsettscr"
        component={Retroquestsettscr}
        listeners={({ navigation }) => ({
          blur: () => navigation.setParams({ screen: undefined }),
        })}
        options={{
          tabBarIcon: ({ color, focused }) => (
            <View
              style={[styles.bgIcon, focused && { backgroundColor: '#0B2A4A' }]}
            >
              <Image
                source={require('../../assets/icons/retroquestsett.png')}
                style={{ tintColor: color }}
              />
            </View>
          ),
          unmountOnBlur: true,
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    paddingTop: 16,
    justifyContent: 'center',
    position: 'absolute',
    bottom: 40,
    height: 76,
    borderRadius: 10,
    marginHorizontal: 68,
    borderTopWidth: 0,
  },
  tabBarBg: { height: 71, borderRadius: 10 },
  bgIcon: {
    borderRadius: 10,
    paddingTop: 5,
    paddingBottom: 9,
    paddingHorizontal: 11,
    alignItems: 'center',
  },
});

export default Retroquesttabs;
