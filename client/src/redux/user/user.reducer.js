import {UserActionTypes} from './user.types'

const INITIAL_STATE = {
    currentUser : null,
    isNewUser : true
}

const userReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case UserActionTypes.SET_CURRENT_USER :
            return {
                ...state,
                currentUser : action.payload
            }

        case UserActionTypes.SET_NEW_USER : 
        return {
            ...state,
            isNewUser : !state.isNewUser
        }

        default :
        return state
    }
}

export default userReducer