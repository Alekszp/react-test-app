import React, {Component} from 'react';
import {cloneDeep} from 'lodash'
import {connect} from 'react-redux'
import '../Style.scss';
import ItemList from './ItemList.js'
import logo from '../logo.svg';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {toastOptions} from '../const/toastify.js'
import axios from 'axios'

function UserList ({markedUsers, users, tabs}) {
  if(tabs[0].isActive) {
    return <ItemList users={users} />
  }
  
  if(tabs[1].isActive){
    return <ItemList users={markedUsers} />
  }
}

class Users extends Component {

  componentDidMount(){
    this.props.getUsers();
  }

  selectTab = (name) => {
    let tabs = cloneDeep(this.props.tabs)
    tabs.forEach(tab=>{
      if(tab.name === name) {
        tab.isActive = true
      } else {
        tab.isActive = false
      }
    })
    this.props.selectTab(tabs)
  }

  findUsers = (e) => {
    this.props.onFindUsers(e.target.value)
  }

  render(){
    return (
      <div className="users">
        <div className='tabs'>
          <div className='tab-items'>
            {
              this.props.tabs.map(tab=>{
                return <div className={`tab-item ${tab.isActive ? 'selected-tab-item' : 'inactive-tab-item'}`} onClick={()=>this.selectTab(tab.name)} key={tab.name}>{tab.name}</div>
              })
            }
          </div>
          <div className='tabs-content'>
            <input className='search-field' type='text' placeholder="Search user" onChange={(e)=>this.props.onFindUsers(e.target.value)} />
            {
              !this.props.loading && <UserList users={this.props.users} markedUsers={this.props.markedUsers} tabs={this.props.tabs}/>
            }
            {
              this.props.loading && (
                <div className='loader'>
                 <img src={logo}/> 
                </div>
              )
            }
            
            <button className='more-users-btn' onClick={this.props.getUsers}>Download next 20</button>
            <ToastContainer />
          </div>
        </div>
      </div>
    )
  }
}

export default connect(
  state=>({
    tabs: state.tabs,
    loading: state.loading,
    users: state.users.filter(user => {
      return user.name.first.toLowerCase().includes(state.filteredUsers) || user.name.last.toLowerCase().includes(state.filteredUsers)
    }),
    markedUsers: state.users.filter(user => {
      return user.isMarked && (user.name.first.toLowerCase().includes(state.filteredUsers) || user.name.last.toLowerCase().includes(state.filteredUsers))
    }),
    selectedUser: state.selectedUser
  }),

  dispatch =>({
    selectTab: (tabs)=>{
      dispatch({type: 'SELECT_TAB', payload: tabs})
    },
    getUsers: () => {
      const asyncGetUsers = () => {
        return async dispatch => {
          dispatch({type: 'LOADING', payload: true})
          await axios('https://randomuser.me/api/?results=20')
            .then((res)=>{
              let newList = []
              res.data.results.forEach((user)=>{
                user.isMarked = false
                newList.push(user)
              })
              dispatch({type: 'GET_USERS', payload: newList})
              toast.success("20 users were received!", toastOptions)
          }).catch((e)=>{
            toast.error("Ooops! Something went wrong...", toastOptions)
          }).finally(()=>dispatch({type: 'LOADING', payload: false}))
        }
      }
      dispatch(asyncGetUsers())
    },
    onFindUsers: (searchText) => {
      setTimeout(()=>dispatch({type: 'FILTER_USERS', payload: searchText}), 250)
    }
  })
)(Users);