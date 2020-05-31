import React, {Component} from 'react';
import {connect} from 'react-redux'
import {dateOptions} from '../components/Footer'

class User extends Component {
  
  formatDate = (date) => {
    let formatDate = new Date(date)
    return formatDate.toLocaleTimeString('en-GB', dateOptions);
  }
  componentDidMount(){
    
  }

  

  render(){
    const {users} = this.props
    const {id} = this.props.location.state
    const user = users.find(user=>user.login.uuid === id)
    
    return (
      <div className="user">
        <header>
          <h3>User details</h3>
        </header>
        <div className='user-details'>
          <img src={user.picture.large}/>
          <div className='user-details-text'>
            <div className='user-details-text-name'>{`${user.name.first} ${user.name.last}`}</div>
            <div className='user-details-text-item'>
              <span>Address:&nbsp;</span>
              <span>{`${user.location.city} ${user.location.state} ${user.location.country} ${user.location.postcode}`}</span>
            </div>
            <div className='user-details-text-item'>
              <span>Email:&nbsp;</span>
              <span>{user.email}</span>
            </div>
            <div className='user-details-text-item'>
              <span>Gender:&nbsp;</span>
              <span>{user.gender}</span>
            </div>
            <div className='user-details-text-item'>
              <span>Date of birth:&nbsp;</span>
              <span>{this.formatDate(user.dob.date)}</span>
            </div>
            <div className='user-details-text-item'>
              <span>Phone:&nbsp;</span>
              <span>{user.phone}</span>
            </div>
          </div>
        </div>
        
        
      </div>
    )
  }
}

export default connect(
  state=>({
    users: state.users
  }),
  dispatch =>({})
)(User);