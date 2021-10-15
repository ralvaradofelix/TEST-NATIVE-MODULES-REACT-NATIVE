import React from 'react';
import { Text,  StyleSheet, View } from 'react-native';
import { ListItem } from 'react-native-elements';
import {  TouchableOpacity } from 'react-native-gesture-handler';
import { AuthContext } from '../services/Authentication/AuthContext';

const Settings = () => {

    const { signOut } = React.useContext(AuthContext);

    const items = ["Boton bluetooth", "Histórico de alertas", "Perfil de usuario y grupo", "Opciones generales"]

    return(
        <View>
            {items.map((item , i) => (
                <TouchableOpacity key={i} onPress={() => console.log(i)}>
                    <ListItem bottomDivider>
                        <ListItem.Content>
                            <Text>{item}</Text>
                        </ListItem.Content>
                        <ListItem.Chevron/>
                    </ListItem>
                </TouchableOpacity>
            ))}
        </View>

    );

}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
})

export default Settings;