import {createSelector} from 'reselect';

const userSelector = state => state.user

export const selectCurrentUser = createSelector(
    userSelector,
    (user) => user.currentUser
)

export const selectNewUser = createSelector(
    userSelector,
    (user) => user.isNewUser
)