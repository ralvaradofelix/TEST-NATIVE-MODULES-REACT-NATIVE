import {check , request, PERMISSIONS , RESULTS} from 'react-native-permissions';
import { Platform } from 'react-native'

const PLATFORM_FINE_LOCATION_PERMISSIONS = {
    android:  PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION
}

const REQUEST_PERMISSION_TYPE = {
    location: PLATFORM_FINE_LOCATION_PERMISSIONS
}

const PERMISSION_TYPE = {
    location: 'location'
}

class AppPermissions {

    checkPermission = async (type): Promise<boolean> => {
        console.log("checkPermission type: "+type)
        const permissions = REQUEST_PERMISSION_TYPE[type][Platform.OS]
        console.log("checkPermission permission: "+permissions)
        if (!permissions) {
            return false
        }
        try {
            const result = await check(permissions)
            console.log("checkPermission result: "+(result === RESULTS.GRANTED))
            if (result === RESULTS.GRANTED) return true
            return this.requestPermission(permissions)
        } catch (error) {
            return false
        }

    }

    requestPermission = async (type): Promise<boolean> => {
        console.log("requestPermission permissions : "+type)
        const permission = REQUEST_PERMISSION_TYPE[type][Platform.OS]
        if (permission){
            try{
                const result = await request(permission)
                console.log("requestPermission result: "+(result === RESULTS.GRANTED))
    
                return (result === RESULTS.GRANTED)
            } catch (error) {
                return false
            }
        }
        return false
    }

    requestMultiple = async (types) : Promise<boolean> => {
        console.log("requestMultiple types: "+ types)
        const results = []

        for(const type of types){
            const permission = REQUEST_PERMISSION_TYPE[type][Platform.OS]
            if (permission){
                const result = await this.requestPermission(type)
                console.log("requestMultiple result: "+result)
                results.push(result)
            }
        }

        for (const result of results){
            if (!result) return false
        }

        return true
    }

}

const Permission = new AppPermissions()
export { Permission, PERMISSION_TYPE }