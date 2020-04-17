import React from 'react'

const Messages = props => {
  if (props.props.issuccess) {
    return (
      <div className='alert alert-success' role='alert'>
        {props.props.message}
      </div>
    )
  } else if (props.props.iserror) {
    return (
      <div className='alert alert-danger' role='alert'>
        {props.props.message}
      </div>
    )
  }
  return null
}
export default Messages
