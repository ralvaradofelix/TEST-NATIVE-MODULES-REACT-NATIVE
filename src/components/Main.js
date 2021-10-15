import React from 'react';
import {Permission, PERMISSION_TYPE } from '../helpers/AppPermissions'
import {
  View , NativeModules , Button , StyleSheet , Text , Image
} from 'react-native';
import { AuthContext } from '../services/Authentication/AuthContext';
import { TouchableOpacity } from 'react-native-gesture-handler';
const { FlicScanner, AlarmManager } = NativeModules;

const App = ({ navigation }) => {

  const { signOut } = React.useContext(AuthContext);
  const result = Permission.requestMultiple([PERMISSION_TYPE.location]);


  if (result){
    FlicScanner.initFlicInstance();
    FlicScanner.scanButtons();
    console.log("Scanning buttons")
  }

  return(
    <View>
      <Button
        title="Logout" onPress={() => signOut()}
        />
      <Button
        title="Details" onPress={() => {navigation.navigate('Settings')}} />
      <TouchableOpacity style={styles.alarmBtn}>
              <Text>
                panic-button
              </Text>
      </TouchableOpacity>
      <Text> button status </Text>

  </View>
  );


}

const styles = StyleSheet.create({
  alarmBtn: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#DFDFDF",
    height: "70%",
    width: "70%",
    borderRadius: 150,
    borderWidth: 3,
    borderColor: "black",
  },

})

export default App;
