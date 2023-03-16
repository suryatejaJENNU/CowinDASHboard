import {Component} from 'react'

import Loader from 'react-loader-spinner'

import App from '../VaccinationCoverage/index'

import Chintu from '../VaccinationByGender'

import Chintuu from '../VaccinationByAge/index'

import './index.css'

class CowinDashboard extends Component {
  state = {name: [], age: [], gender: [], isLoading: true}

  componentDidMount() {
    this.apiCall()
  }

  apiCall = async () => {
    console.log('surya')
    const apiUrl = 'https://apis.ccbp.in/covid-vaccination-data'
    const options = {
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const fetchedData = await response.json()
      console.log(fetchedData)
      const Last7daysvaccination = fetchedData.last_7_days_vaccination
      const Vaccinationbyage = fetchedData.vaccination_by_age
      const Vaccinationbygender = fetchedData.vaccination_by_gender
      const Last7 = Last7daysvaccination.map(each => ({
        vaccinedate: each.vaccine_date,
        dose1: each.dose_1,
        dose2: each.dose_2,
      }))
      const byage = Vaccinationbyage.map(e => ({
        age: e.age,
        count: e.count,
      }))
      const bygender = Vaccinationbygender.map(e => ({
        count: e.count,
        gender: e.gender,
      }))
      this.setState({
        name: Last7,
        age: byage,
        gender: bygender,
        isLoading: false,
      })
    }
  }

  render() {
    const {name, age, gender, isLoading} = this.state
    console.log(name)
    return (
      <div className="bg-container">
        <div className="small">
          <img
            src="https://assets.ccbp.in/frontend/react-js/cowin-logo.png"
            alt="website logo"
            className="logo-image"
          />
          <h1 className="main-heading">Co-WIN</h1>
        </div>
        <h1 className="para">CoWIN Vaccination in India</h1>
        {isLoading && (
          <div data-testid="loader">
            <Loader type="ThreeDots" color="#ffffff" height={80} width={80} />
          </div>
        )}
        {!isLoading && (
          <>
            <App name={name} />
            <Chintu gender={gender} />
            <Chintuu age={age} />
          </>
        )}
      </div>
    )
  }
}

export default CowinDashboard
