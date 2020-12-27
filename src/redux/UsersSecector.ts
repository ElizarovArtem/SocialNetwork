import {AppStateType} from "./redux-store";

export const selectUsers = (state: AppStateType) => {
    return state.usersPage.users
}
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
