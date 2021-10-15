import React from 'react';

import AsyncStorage from "@react-native-async-storage/async-storage";

import { NavigationContainer } from '@react-navigation/native';
import { authService } from './services/Authentication/AuthService';
import { createStackNavigator } from '@react-navigation/stack';
import { AuthContext } from './services/Authentication/AuthContext';

import Login from './components/Login';
import Main from './components/Main';
import Settings from './components/Settings';

const LoggedInStack = createStackNavigator();
const LoggedInScreen = () => (
    <LoggedInStack.Navigator headerMode="none">

        <LoggedInStack.Screen
                name="Main"
                component={Main}
                />
        <LoggedInStack.Screen
        name="Settings"
        component={Settings} />
    </LoggedInStack.Navigator>
);
const NotLoggedInStack = createStackNavigator();
const NotLoggedInScreen = () => (
    <NotLoggedInStack.Navigator headerMode="none">
        <NotLoggedInStack.Screen
        name="Home"
        component={Login}
        />
    </NotLoggedInStack.Navigator>
);

const RootStack = createStackNavigator();
const RootStackScreen = ({ userToken }) => (

    <RootStack.Navigator headerMode="none">
        {userToken  ? (
            <RootStack.Screen
                name="LoggedIn"
                component={LoggedInScreen}/>
        ): (
            <RootStack.Screen
                name="NotLoggedIn"
                component={NotLoggedInScreen}/>
        )
        }
    </RootStack.Navigator>
)


const getTokenData = async () => {
    
    const token = await AsyncStorage.getItem('currentUser')
    console.log("El token es : "+token)
    return token;
  
}

const App = () => {

    const [userToken, setUserToken] = React.useState(null);

    const authContext = React.useMemo(() => {
        return {
            signIn: async (username,password) => {
               console.log("Username "+username)
               console.log("Password "+password)
               setUserToken(await authService.login(username,password));
            },
            signOut: async () => {
                
                setUserToken(await authService.logout());
                AsyncStorage.getItem('currentUser')
                .then(err => {
                    console.log("From logout" +err)
                })
            }
        }
    }, []);
  


    return(

        <AuthContext.Provider value={authContext}>
            <NavigationContainer>
                    <RootStackScreen userToken={userToken} />
            </NavigationContainer>
        </AuthContext.Provider>

)
}

export default App;