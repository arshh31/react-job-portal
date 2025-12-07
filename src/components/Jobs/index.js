import {Component} from 'react'
import {BsSearch} from 'react-icons/bs'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import FiltersGroup from '../FiltersGroup'
import Header from '../Header'
import Jobcard from '../Jobcard'

import './index.css'

const apiStatusContent = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failed: 'FAILED',
  inProgress: 'INPROGRESS',
}

class Jobs extends Component {
  state = {
    searchInput: '',
    userProfileData: '',
    profileApiStatus: apiStatusContent.initial,
    jobApiStatus: apiStatusContent.initial,
    activeSalaryRangeId: '',
    employmentTypesChecked: [],
    jobsList: [],
  }

  onChangeSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  componentDidMount() {
    this.onSearchProfile()
    this.getJobs()
  }

  updateEmploymentTypesChecked = typeId => {
    const {employmentTypesChecked} = this.state
    let updatedList = employmentTypesChecked
    if (employmentTypesChecked.includes(typeId)) {
      updatedList = employmentTypesChecked.filter(
        eachType => eachType !== typeId,
      )
    } else {
      updatedList = [...updatedList, typeId]
    }

    this.setState({employmentTypesChecked: updatedList}, this.getJobs)
  }

  updateSalaryRangeId = activeSalaryRangeId =>
    this.setState({activeSalaryRangeId}, this.getJobs)

  getJobs = async () => {
    this.setState({jobApiStatus: apiStatusContent.inProgress})

    const {activeSalaryRangeId, employmentTypesChecked, searchInput} =
      this.state
    const employTypes = employmentTypesChecked.join()
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/jobs?employment_type=${employTypes}&minimum_package=${activeSalaryRangeId}&search=${searchInput}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }

    const response = await fetch(apiUrl, options)
    const data = await response.json()
    if (response.ok === true) {
      const {jobs} = data
      const updatedData = jobs.map(eachJob => ({
        companyLogoUrl: eachJob.company_logo_url,
        employmentType: eachJob.employment_type,
        id: eachJob.id,
        jobDescription: eachJob.job_description,
        location: eachJob.location,
        salary: eachJob.package_per_annum,
        rating: eachJob.rating,
        title: eachJob.title,
      }))

      this.setState({
        jobsList: updatedData,
        jobApiStatus: apiStatusContent.success,
      })
    } else {
      this.setState({jobApiStatus: apiStatusContent.failed})
    }
  }

  onSearchProfile = async () => {
    this.setState({profileApiStatus: apiStatusContent.inProgress})
    const apiUrl = 'https://apis.ccbp.in/profile'
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }

    const response = await fetch(apiUrl, options)
    const data = await response.json()
    if (response.ok === true) {
      const updatedData = {
        name: data.profile_details.name,
        imgUrl: data.profile_details.profile_image_url,
        bio: data.profile_details.short_bio,
      }
      this.setState({
        userProfileData: updatedData,
        profileApiStatus: apiStatusContent.success,
      })
    } else {
      this.setState({profileApiStatus: apiStatusContent.failed})
    }
  }

  renderProfileContainer = () => {
    const {
      userProfileData,
      activeSalaryRangeId,
      employmentTypesChecked,
      profileApiStatus,
    } = this.state
    const {name, bio, imgUrl} = userProfileData
    return (
      <div className="profileContainerContents">
        <div className="profileContent">
          <img src={imgUrl} alt="profile" />
          <h1 className="name-heading">{name}</h1>
          <p className="profile-description">{bio} </p>
        </div>
        <hr className="horizontaLine4" />
        <FiltersGroup
          updateSalaryRangeId={this.updateSalaryRangeId}
          activeSalaryRangeId={activeSalaryRangeId}
          updateEmploymentTypesChecked={this.updateEmploymentTypesChecked}
          employmentTypesChecked={employmentTypesChecked}
        />
      </div>
    )
  }

  renderSearchBar = searchBarId => {
    const {searchInput} = this.state
    return (
      <div className="jobsListContainer">
        <div className="searchElements">
          <input
            type="search"
            className="inputSearchElement"
            placeholder="Search"
            onChange={event => this.setState({searchInput: event.target.value})}
            value={searchInput}
          />
          <button
            className="searchButton"
            type="button"
            data-testid="searchButton"
            onClick={() => this.getJobs()}
          >
            <BsSearch color={'#f1f5f9'} />
          </button>
        </div>
      </div>
    )
  }

  renderNoJobsView = () => {
    return (
      <div className="noJobsContainer">
        <img
          src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
          alt="no jobs"
        />
        <h1>No Jobs Found</h1>
        <p>We could not find any jobs. Try other filters</p>
      </div>
    )
  }

  renderJobLoader = () => {
    return (
      <div className="loader-container" data-testid="loader">
        <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
      </div>
    )
  }

  renderJobFailureView = () => {
    return (
      <div>
        <img
          src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
          alt="failure view"
        />
        <h1>Oops! Something Went Wrong</h1>
        <p>We cannot seem to find the page you are looking for.</p>
        <button onClick={() => this.getJobs()}>Retry</button>
      </div>
    )
  }

  renderJobsList = () => {
    const {jobsList} = this.state
    return (
      <>
        {jobsList.length > 0 ? (
          <ul className="unOrder-jobsList">
            {jobsList.map(eachJob => (
              <Jobcard key={eachJob.id} jobDetails={eachJob} />
            ))}
          </ul>
        ) : (
          this.renderNoJobsView()
        )}
      </>
    )
  }

  renderJobsContainer = () => {
    const {jobApiStatus} = this.state

    switch (jobApiStatus) {
      case apiStatusContent.success:
        return this.renderJobsList()
      case apiStatusContent.failed:
        return this.renderJobFailureView()
      case apiStatusContent.inProgress:
        return this.renderJobLoader()
      default:
        return null
    }
  }

  renderProfileFailureContainer = () => {
    return (
      <div>
        <button>Retry</button>
      </div>
    )
  }

  renderProfileLoaderView = () => {
    return (
      <div className="loader-container" data-testid="loader">
        <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
      </div>
    )
  }

  renderProfileContainers = () => {
    const {profileApiStatus} = this.state
    switch (profileApiStatus) {
      case apiStatusContent.success:
        return this.renderProfileContainer()
      case apiStatusContent.failed:
        return this.renderProfileFailureContainer()
      case apiStatusContent.inProgress:
        return this.renderProfileLoaderView()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="jobsContainer">
        <Header />
        <div className="jobs-page">
          {this.renderProfileContainers()}
          <div className="profileContainer">
            {this.renderSearchBar()}
            {this.renderJobsContainer()}
          </div>
        </div>
      </div>
    )
  }
}

export default Jobs
