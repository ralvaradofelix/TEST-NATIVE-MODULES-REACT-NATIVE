import AsyncStorage from "@react-native-async-storage/async-storage";
import { BehaviorSubject } from "rxjs";
import { handleResponse } from '../../helpers/HandleResponse';


const currentUserSubject = new BehaviorSubject(AsyncStorage.getItem('currentUser'));

export const authService = {
    login,
    logout,
    currentUser: currentUserSubject.asObservable(),
    get currentUserValue () { return currentUserSubject.value }
}

function login(usuario, password){

    if (!usuario || !password){
        return;
    }
    
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({username: usuario , password: password})
    };
   

    return fetch('http://panic.wigilan.com:5005/api/auth/signin',
    requestOptions)
    .then(handleResponse)
    .then(user => {

       console.log(user.user.token);
        
       AsyncStorage.setItem('currentUser', user.user.token);
       AsyncStorage.getItem('currentUser')
       .then(res => {
           console.log("From async: "+res)
       })
       .catch(err => {
           console.log(err)
       });

       currentUserSubject.next(user.user);

        return user;
    })
    .catch(err => {
        console.log(err);
    });
}

function logout(){
    console.log("Logout");

    AsyncStorage.removeItem('currentUser');
    currentUserSubject.next(null);
    
    AsyncStorage.getItem('currentUser')
    .then(res => {
        console.log("From logout "+res)
    });
}