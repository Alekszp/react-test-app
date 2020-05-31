import React, {Component} from 'react'
import {cloneDeep} from 'lodash'
import {connect} from 'react-redux'
import { NavLink} from "react-router-dom";

class ItemList extends Component {
 
  markUser = (e, uuid) => {
    let markedUsers = cloneDeep(this.props.users)
    markedUsers.forEach(user => {
      if(user.login.uuid === uuid) {user.isMarked = e.target.checked}
    })
    this.props.onMarkUser(markedUsers)
  }
  render(){
    const {users} = this.props
    return (
      
        <div className='user-list'>
          {
            users.length > 0 && users.map(user=>{
              return (
                <div className='user-item' key={user.login.uuid}>
                  <NavLink to={{pathname: `/user/${user.login.uuid}`, state: {id: user.login.uuid} }} onClick={this.props.selectUser}>
                    <img className='avatar' src={user.picture.thumbnail} />
                    <div className='user-item-info'>
                      <div className='user-item-id'>{`id: ${user.id.name} ${user.id.value}`}</div>
                      <div className='user-item-name'>{`${user.name.first} ${user.name.last}`}</div>
                    </div>
                  </NavLink >
                  <div className='user-item-checkbox'>
                   <input type='checkbox' checked={user.isMarked} onChange={(e)=>{this.markUser(e, user.login.uuid)}} />
                  </div>
                </div>
              )
            })
          }
          {
            users.length === 0 && (<div style={{color: "white"}}>No marked users</div>)
          }
        </div>
      
    )
  }
}


export default connect(
  state=>({}),
  dispatch =>({
    onMarkUser: (users)=>{
      dispatch({type: 'MARK_USER', payload: users})
    },
    selectUser: ()=>{
      dispatch({type: 'SELECT_USER', payload: true})
    }
  })
)(ItemList);