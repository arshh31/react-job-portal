import {Component} from 'react'
import {IoIosStar} from 'react-icons/io'
import {MdLocationOn} from 'react-icons/md'
import {FaShoppingBag} from 'react-icons/fa'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import Skillset from '../Skillset'
import Similarjobs from '../Similarjobs'
import Header from '../Header'
import './index.css'

const apiStatusContent = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILED',
  inProgress: 'INPROGRESS',
}

class JobItemDetails extends Component {
  state = {
    detailedJobDetails: null,
    similarJobData: [],
    apiStatus: apiStatusContent.initial,
  }

  componentDidMount() {
    this.getJobItemFullDetails()
  }

  formattedJobDetails = job_details => ({
    companyLogo: job_details.company_logo_url,
    companyWebsite: job_details.company_website_url,
    title: job_details.title,
    employmentType: job_details.employment_type,
    id: job_details.id,
    jobDescription: job_details.job_description,
    location: job_details.location,
    salary: job_details.package_per_annum,
    rating: job_details.rating,
    lifeAtCompany: {
      description: job_details.life_at_company.description,
      imageUrl: job_details.life_at_company.image_url,
    },
    skills: job_details.skills.map(eachItem => ({
      name: eachItem.name,
      imageUrl: eachItem.image_url,
    })),
  })

  formattedCompany = eachJob => ({
    companyLogo: eachJob.company_logo_url,
    employmentType: eachJob.employment_type,
    id: eachJob.id,
    jobDescription: eachJob.job_description,
    location: eachJob.location,
    rating: eachJob.rating,
    title: eachJob.title,
  })

  getJobItemFullDetails = async () => {
    this.setState({apiStatus: apiStatusContent.inProgress})
    const {match} = this.props
    const {params} = match
    const {id} = params

    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/jobs/${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    const fetchedData = await response.json()

    if (response.ok === true) {
      const updatedData = {
        jobDetails: this.formattedJobDetails(fetchedData.job_details),
      }
      const similarCompany = {
        similarJobs: fetchedData.similar_jobs.map(eachJob =>
          this.formattedCompany(eachJob),
        ),
      }
      this.setState({
        detailedJobDetails: updatedData,
        similarJobData: similarCompany,
        apiStatus: apiStatusContent.success,
      })
    } else {
      this.setState({apiStatus: apiStatusContent.failure})
    }
  }

  renderCompanyDetails = () => {
    const {detailedJobDetails} = this.state
    if (!detailedJobDetails) {
      return <p>loading</p>
    }

    const {jobDetails} = detailedJobDetails
    const {
      companyLogo,
      salary,
      companyWebsite,
      employmentType,
      id,
      jobDescription,
      location,
      rating,
      lifeAtCompany,
      skills,
      title,
    } = jobDetails
    const {description, imageUrl} = lifeAtCompany
    return (
      <div className="detailedJob-Container">
        <div className="jobDetailscompanyAboutContainer">
          <div>
            <img
              src={companyLogo}
              className="companyLogo"
              alt="job details company logo"
            />
          </div>
          <div className="nameandratinginJobContainer">
            <h1 className="jobTitle">{title}</h1>
            <div className="jobRatings">
              <IoIosStar size={24} color={'#fbbf24'} />
              <p className="jobRating"> {rating}</p>
            </div>
          </div>
        </div>
        <div className="addressContainer">
          <div className="detailsContainer">
            <div className="locationContainer">
              <MdLocationOn size={24} color={'#f1f5f9'} />
              <p className="location"> {location}</p>
            </div>

            <div className="shoppingContainer">
              <FaShoppingBag size={24} color={'#f1f5f9'} />
              <p className="location"> {employmentType}</p>
            </div>
          </div>
          <div>
            <p className="salary">{salary}</p>
          </div>
        </div>
        <hr className="horizontalLine" />
        <div className="descriptionContainer">
          <h1 className="description-title">Description</h1>
          <a className="visitLink" href={companyWebsite}>
            Visit
          </a>
        </div>
        <p className="description">{jobDescription}</p>
        <h1 className="description-title">Skills</h1>
        <ul className="skillsContainer">
          {skills.map(eachSkill => (
            <Skillset skill={eachSkill} key={eachSkill.name} />
          ))}
        </ul>
        <h1 className="description-title">Life at Company</h1>
        <div className="lifeCompanyContainer">
          <div className="paragraphContainer">
            <p className="companyDescription">{description}</p>
          </div>
          <img src={imageUrl} className="companyImage" alt="life at company" />
        </div>
      </div>
    )
  }

  renderSimilarJob = () => {
    const {similarJobData} = this.state
    const {similarJobs} = similarJobData
    if (!similarJobs) {
      return <p>loading</p>
    }
    return (
      <div>
        <h1 className="similarJobs-Title">Similar Jobs</h1>
        <ul className="similarJobsContainer">
          {similarJobs.map(eachJob => (
            <Similarjobs jobs={eachJob} key={eachJob.id} />
          ))}
        </ul>
      </div>
    )
  }

  renderWholeContainers = () => {
    return (
      <div className="jobItemDetails-Container">
        <Header />
        <div className="containers">{this.renderCompanyDetails()}</div>
        <div className="containers2">{this.renderSimilarJob()}</div>
      </div>
    )
  }

  renderLoaderView = () => {
    return (
      <div className="loader-container" data-testid="loader">
        <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
      </div>
    )
  }

  renderFailedContent = () => {
    return (
      <div>
        <img
          src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
          alt="failure view"
        />
        <h1>Oops! Something Went Wrong</h1>
        <p>We cannot seem to find the page you are looking for</p>
        <button>Retry</button>
      </div>
    )
  }

  renderFinalContainer = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusContent.success:
        return this.renderWholeContainers()
      case apiStatusContent.failure:
        return this.renderFailedContent()
      case apiStatusContent.inProgress:
        return this.renderLoaderView()
      default:
        return null
    }
  }

  render() {
    return this.renderFinalContainer()
  }
}
export default JobItemDetails
