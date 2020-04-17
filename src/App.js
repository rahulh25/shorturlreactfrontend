import React, { Component } from 'react'
import { withAuthenticator } from 'aws-amplify-react'
import URLShortner from './urlShortner'
import FileShortner from './fileshortner'
class App extends Component {
  constructor () {
    super()
    this.state = {
      data: ''
    }
  }
  render () {
    return (
      <div className='App'>
        <div className='container'>
          <div className='row'>
            <URLShortner />
            <FileShortner />
          </div>
        </div>
      </div>
    )
  }
}

export default withAuthenticator(App, true)
