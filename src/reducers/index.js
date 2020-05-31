import { combineReducers } from 'redux'
import users from './users'
import filteredUsers from './filteredUsers'
import loading from './loading'
import tabs from './tabs'
import isUserSelected from './selectedUser'

export default combineReducers({
    tabs,
    users,
    filteredUsers,
    loading,
    isUserSelected
})