import {AppStateType} from "./redux-store";
import {createSelector} from "reselect";

export const selectUsers = (state: AppStateType) => {
    return state.usersPage.users
}
export const getUsersSelector = createSelector(selectUsers, (users) => {
    console.log("SELECTOR")
    return users.map(u => u)
})


export const selectCurrentPage = (state: AppStateType) => {
    return state.usersPage.currentPage
}
export const selectPageSize = (state: AppStateType) => {
    return state.usersPage.pageSize
}
export const selectTotalUsersCount = (state: AppStateType) => {
    return state.usersPage.totalUsersCount
}
export const selectIsFetching = (state: AppStateType) => {
    return state.usersPage.isFetching
}
export const selectFollowingUsers = (state: AppStateType) => {
    return state.usersPage.followingUsers
}
