import React, { Component } from 'react'
import Messages from './messages'
import { Auth } from 'aws-amplify'
import ShowFileURL from './showFileURL'
import axios from 'axios'


class FileShortner extends Component {
  constructor () {
    super()
    this.state = {
      props: {
        issuccess: false,
        iserror: false,
        message: ''
      },
      email: '',
      data: []
    }
  }
  componentDidMount () {
    Auth.currentAuthenticatedUser().then(user => {
      axios
        .get(
          'http://aa7d8ea58f5054f5aae46d9128d4219c-2103874015.us-east-2.elb.amazonaws.com:5000/api/get_file_urls/' + user.attributes['email']
        )
        .then(result => {
          let finalResult = []
          for (var i in result.data.message)
            finalResult.push([i, result.data.message[i]])
          this.setState({ data: finalResult })
        })
    })
  }
  getURL () {
    Auth.currentAuthenticatedUser().then(user => {
      axios
        .get(
          'http://aa7d8ea58f5054f5aae46d9128d4219c-2103874015.us-east-2.elb.amazonaws.com:5000/api/get_file_urls/' + user.attributes['email']
        )
        .then(result => {
          let finalResult = []
          for (var i in result.data.message)
            finalResult.push([i, result.data.message[i]])
          this.setState({ data: finalResult })
        })
    })
  }
  
  onClick = event => {
    event.preventDefault()
    Auth.currentAuthenticatedUser()
      .then(user => {
        this.setState({ email: user.attributes['email'] })
        const data = new FormData()
        data.append('file', this.uploadInput.files[0])
        data.append('code', this.code.value)
        data.append('email', this.state.email)
        fetch('http://aa7d8ea58f5054f5aae46d9128d4219c-2103874015.us-east-2.elb.amazonaws.com:5000/api/short_file_url', {
          method: 'POST',
          body: data
        })
          .then(response => {
            response.json().then(body => {
              if (body['status'] === 200) {
                this.getURL()
                this.uploadInput.value = ''
                this.code.value = ''
                this.setState({
                  props: {
                    message: body['msg'],
                    issuccess: true,
                    iserror: false
                  }
                })
              } else {
                this.getURL()
                this.uploadInput.value = ''
                this.code.value = ''
                this.setState({
                  props: {
                    message: body['msg'],
                    issuccess: false,
                    iserror: true
                  }
                })
              }
            })
          })
          .catch(error => {
            this.uploadInput.value = ''
            this.code.value = ''
            this.setState({
              props: {
                message: error,
                issuccess: false,
                iserror: true
              }
            })
          })
      })
      .catch(err => this.setState({ email: 'No Email Found' }))
  }
  render () {
    return (
      <div className='col'>
        <Messages props={this.state.props} />
        <div className='card' style={{marginTop:'5px'}}>
          <div className='card-header'>File URL Shortner</div>
          <form method='POST' encType='multipart/form-data'>
            <div className='card-body'>
              <div className='form-group'>
                <label htmlFor='file'>File</label>
                <input
                  type='file'
                  className='form-control'
                  ref={ref => {
                    this.uploadInput = ref
                  }}
                  name='file'
                  required
                />
              </div>
              <div className='form-group'>
                <label htmlFor='code'>Short Name</label>
                <input
                  type='text'
                  className='form-control'
                  name='code'
                  required
                  ref={ref => {
                    this.code = ref
                  }}
                />
              </div>
            </div>
            <div className='card-footer'>
              <input
                type='submit'
                value='Shorten'
                className='btn btn-primary btn-lg btn-block'
                onClick={this.onClick}
              />
            </div>
          </form>
        </div>
        <ShowFileURL urldata={this.state.data} />
      </div>
    )
  }
}

export default FileShortner
