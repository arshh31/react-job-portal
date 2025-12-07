import {Link} from 'react-router-dom'
import {IoIosStar} from 'react-icons/io'
import {MdLocationOn} from 'react-icons/md'
import {FaShoppingBag} from 'react-icons/fa'
import './index.css'

const Jobcard = props => {
  const {jobDetails} = props
  const {
    id,
    title,
    jobDescription,
    location,
    salary,
    companyLogoUrl,
    employmentType,
    rating,
  } = jobDetails
  return (
    <Link to={`/jobs/${id}`} className="linkItems">
      <div className="jobDetailsContainer">
        <div className="companyAboutContainer">
          <div>
            <img
              src={companyLogoUrl}
              className="companyLogo"
              alt="company logo"
            />
          </div>
          <div className="nameandratingContainer">
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
        <hr />
        <h1 className="description-title">Description</h1>
        <p className="description">{jobDescription}</p>
      </div>
    </Link>
  )
}
export default Jobcard
