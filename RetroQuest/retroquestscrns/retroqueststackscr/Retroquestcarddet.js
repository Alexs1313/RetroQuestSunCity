import { StyleSheet, View } from 'react-native';
import Retroquestapplayout from '../../retroquestcmpnts/Retroquestapplayout';
import Retroquestplccardlrg from '../../retroquestcmpnts/Retroquestplccardlrg';

const Retroquestcarddet = ({ route }) => {
  const questplace = route.params;

  return (
    <Retroquestapplayout>
      <View style={styles.retroquestcnt}>
        <Retroquestplccardlrg questplace={questplace} />
      </View>
    </Retroquestapplayout>
  );
};

const styles = StyleSheet.create({
  retroquestcnt: {
    padding: 9,
    alignItems: 'center',
    paddingTop: 54,
  },
});

export default Retroquestcarddet;
