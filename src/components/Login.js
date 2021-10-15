import React,{ useState } from 'react';
import { TextInput, StyleSheet, View } from 'react-native';
import { Button, Text} from 'react-native-elements';
import { TouchableOpacity, TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { AuthContext } from '../services/Authentication/AuthContext';

const Login = () => {
    
    const { signIn } = React.useContext(AuthContext);

    const [userName,setUserName] = useState('');
    const [passWord,setPassWord] = useState('');

    return (
        <View style={styles.container}>
            <Text h2 style={styles.loginTitle}>Log In</Text>
            <TextInput style={styles.input} placeholder="Usuario"
            onChangeText={username=> setUserName(username)} value={userName}/>
            <TextInput style={styles.input} placeholder="Contraseña" secureTextEntry={true}
            onChangeText={password=> setPassWord(password)} value={passWord}/>
            <Button title="Entrar" onPress={() => signIn(userName,passWord)} 
            buttonStyle={styles.loginBtn} TouchableComponent={TouchableOpacity}/>
            <Button title="¿Necesitas una cuenta?" titleStyle={{ color: 'black'}}
            buttonStyle={styles.registerBtn} TouchableComponent={TouchableOpacity}/>         
        </View>
    )

}

const styles = StyleSheet.create({
    loginTitle: {
        alignSelf: "center",
        marginBottom: 15,
        
    },
    loginBtn: {
        width: "90%",
        alignSelf: "center",
        backgroundColor: "#FF3100",
    },
    registerBtn: {
        width: "90%",
        marginTop: 15,
        backgroundColor: "white",
        alignSelf: "center"
    },
    container: {
        flex: 1,
        justifyContent:'center',

    },
    input: {
        backgroundColor: 'white',
        margin: 10,
        borderColor: "#5E5857",
        borderWidth: 2,
        width: "90%",
        alignSelf: "center"
    },
    login: {
        backgroundColor: 'white'
    }
});

export default Login;