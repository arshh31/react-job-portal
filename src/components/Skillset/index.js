import './index.css'

const Skillset = props => {
  const {skill} = props
  const {name, imageUrl} = skill
  return (
    <div className="skillsContainer">
      <div className="skillsContent">
        <img src={imageUrl} className="skillsImages" alt={name}/>
        <p className="skillName">{name}</p>
      </div>
    </div>
  )
}

export default Skillset
