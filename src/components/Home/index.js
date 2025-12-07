import {Link} from 'react-router-dom'
import Header from '../Header'
import './index.css'

const Home = () => {
  return (
    <div className="homeContainer">
      <Header />
      <div className="whole-cont">
        <div className="jobDescriptionContainer">
          <h1>Find The Job That Fits Your Life</h1>
          <p>
            Millions of people are searching for jobs, salary, information,
            company reviews.Find the job that fits your abilities
          </p>
          <Link to="/jobs">
            <button className="jobButton">Find Jobs</button>
          </Link>
        </div>
        <img
          src="https://assets.ccbp.in/frontend/react-js/home-lg-bg.png"
          className="homeImage"
        />
      </div>
    </div>
  )
}
export default Home
