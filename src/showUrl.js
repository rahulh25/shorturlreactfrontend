import React from 'react'
import axios from 'axios'

let refreshPage=()=> {
  window.location.reload(false);
}
let deleteData = (e,id) => {
  e.preventDefault()
  axios
    .delete('http://localhost:5000/api/delete_url/' + id)
    .then(response => {
      if (response.status === 200) {
        console.log('Success')
        refreshPage()
      } else {
        console.log('Error')
        refreshPage()
      }
    })
    .catch(error => console.log('Server Error'))
}
const ShowURL = props => {
  let arrayString = ''
  props.urldata.map(s => (arrayString += s[1]))
  if (arrayString !== 'No Data') {
    const listItems = props.urldata.map(s => (
      <li
        key={s[0]}
        className='list-group-item d-flex justify-content-between align-items-center'
      >
        <a href={s[1]} target='_blank' rel='noopener noreferrer'>
          {s[0]}
        </a>
        <button
          className='badge badge-danger badge-pill'
          onClick={e=>deleteData(e,s[0])}
        >
          X
        </button>
      </li>
    ))
    return (
      <ul className='list-group' style={{ marginTop: '5px' }}>
        {listItems}
      </ul>
    )
  } else {
    return (
      <ul className='list-group' style={{ marginTop: '5px' }}>
        <li className='list-group-item'>
          <b className='text-danger'>No Data</b>
        </li>
      </ul>
    )
  }
}

export default ShowURL
