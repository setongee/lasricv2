import {UserActionTypes} from './user.types'

export const setCurrentUser = user => ({
    type : UserActionTypes.SET_CURRENT_USER,
    payload : user
})

export const newUser = () => ({
    type : UserActionTypes.SET_NEW_USER,
})

