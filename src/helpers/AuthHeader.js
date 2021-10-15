import { authService } from '../services/Authentication/AuthService'

export function authHeader() {

    const currentUser = authService.currentUserValue;
    if (currentUser && currentUser.token) {
        return { Authorization: `Bearer ${currentUser.token}` };
    } else {
        return {};
    }

}