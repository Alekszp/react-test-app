import React from 'react';
import {connect} from 'react-redux'
import {Link} from "react-router-dom";

const Header = (props)=> (
  
    <div className="header">
      { props.isUserSelected && (<Link to='/'><button className='backToListBtn' onClick={props.clearSelectedUser}>Back</button></Link>)}
      <h2>Header</h2>
    </div>
)
  
export default connect(
  state=>({
    isUserSelected: state.isUserSelected
  }),
  dispatch =>({
    clearSelectedUser: ()=>{
      dispatch({type: 'SELECT_USER', payload: false})
    }
  })
)(Header);