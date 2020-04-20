import React, { Component } from 'react'
import axios from 'axios'
import Messages from './messages'
import { Auth } from 'aws-amplify'
import ShowURL from './showUrl'

class URLShortner extends Component {
  constructor () {
    super()
    this.state = {
      formFields: { url: '', code: '' },
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
          'http://aa7d8ea58f5054f5aae46d9128d4219c-2103874015.us-east-2.elb.amazonaws.com:5000/api/get_short_urls/' + user.attributes['email']
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
          'http://aa7d8ea58f5054f5aae46d9128d4219c-2103874015.us-east-2.elb.amazonaws.com:5000/api/get_short_urls/' + user.attributes['email']
        )
        .then(result => {
          let finalResult = []
          for (var i in result.data.message)
            finalResult.push([i, result.data.message[i]])
          this.setState({ data: finalResult })
        })
    })
  }
  inputChangeHandler (e) {
    e.preventDefault()
    let formFields = { ...this.state.formFields }
    formFields[e.target.name] = e.target.value
    this.setState({
      formFields
    })
  }
  onClick = event => {
    event.preventDefault()
    Auth.currentAuthenticatedUser()
      .then(user => {
        this.setState({ email: user.attributes['email'] })
        var data = this.state.formFields
        data['email'] = this.state.email
        axios
          .post('http://aa7d8ea58f5054f5aae46d9128d4219c-2103874015.us-east-2.elb.amazonaws.com:5000/api/short_url', data)
          .then(response => {
            if (response.status === 200) {
              this.setState({
                formFields: { url: '', code: '' },
                props: {
                  message: response.data['msg'],
                  issuccess: true,
                  iserror: false
                },
              })
              this.getURL()
            } else {
              this.setState({
                formFields: { url: '', code: '' },
                props: {
                  message: response.data['msg'],
                  issuccess: false,
                  iserror: true
                }
              })
              this.getURL()
            }
          })
          .catch(error =>
            this.setState({
              formFields: { url: '', code: '' },
              props: {
                message: error,
                issuccess: false,
                iserror: true
              }
            })
          )
      })
      .catch(err => this.setState({ email: 'No Email Found' }))
  }
  render () {
    return (
      <div className='col'>
        <Messages props={this.state.props} />
        <div className='card' style={{marginTop:'5px'}}>
          <div className='card-header'>URL Shortener</div>
          <form method='POST'>
            <div className='card-body'>
              <div className='form-group'>
                <label htmlFor='url'>Website URL</label>
                <input
                  type='url'
                  className='form-control'
                  id='websiteURL'
                  name='url'
                  required
                  onChange={e => this.inputChangeHandler.call(this, e)}
                  value={this.state.formFields.url}
                />
              </div>
              <div className='form-group'>
                <label htmlFor='code'>Short Name</label>
                <input
                  type='text'
                  className='form-control'
                  id='shortCode'
                  name='code'
                  required
                  onChange={e => this.inputChangeHandler.call(this, e)}
                  value={this.state.formFields.code}
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
        <ShowURL urldata={this.state.data} />
      </div>
    )
  }
}

export default URLShortner
