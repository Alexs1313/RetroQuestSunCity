import { ImageBackground, ScrollView } from 'react-native';

const Retroquestapplayout = ({ children }) => {
  return (
    <ImageBackground
      style={{ flex: 1 }}
      source={require('../../assets/images/retroquestbg.png')}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1 }}
      >
        {children}
      </ScrollView>
    </ImageBackground>
  );
};

export default Retroquestapplayout;
