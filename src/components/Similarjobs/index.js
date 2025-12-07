import {IoIosStar} from 'react-icons/io'
import {MdLocationOn} from 'react-icons/md'
import {FaShoppingBag} from 'react-icons/fa'
import './index.css'

const Similarjobs = props => {
  const {jobs} = props
  const {companyLogo, title, location, rating, employmentType, jobDescription} =
    jobs
  return (
    <div className="similarJob-Container">
      <div className="companyContainer">
        <div>
          <img
            src={companyLogo}
            className="companyLogo"
            alt="similar job company logo"
          />
        </div>
        <div className="titleAndRating-container">
          <h1 className="jobTitle-similar">{title}</h1>
          <div className="ratingContainer">
            <IoIosStar size={24} color={'#fbbf24'} />
            <p className="ratingSimilar">{rating}</p>
          </div>
        </div>
      </div>
      <h1 className="descriptionTitle-similar">Description</h1>
      <p className="description-Similar">{jobDescription}</p>
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
    </div>
  )
}

export default Similarjobs
