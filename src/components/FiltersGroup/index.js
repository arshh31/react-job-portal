import './index.css'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]
const FiltersGroup = props => {
  const renderEmploymentTypesList = () => {
    const {updateEmploymentTypesChecked} = props
    return employmentTypesList.map(eachItem => {
      const updateTypesList = () =>
        updateEmploymentTypesChecked(eachItem.employmentTypeId)
      return (
        <li key={eachItem.employmentTypeId}>
          <input
            type="checkbox"
            id={eachItem.employmentTypeId}
            onChange={updateTypesList}
          />
          <label htmlFor={eachItem.employmentTypeId}>{eachItem.label}</label>
        </li>
      )
    })
  }

  const renderEmploymentTypes = () => (
    <>
      <h1 className="employeeTitle">Type of Employment</h1>
      <ul className="employeeList">{renderEmploymentTypesList()}</ul>
    </>
  )

  const renderSalaryRangeList = () => {
    const {updateSalaryRangeId, activeSalaryRangeId} = props

    return salaryRangesList.map(eachRange => {
      const onChangeRange = () => updateSalaryRangeId(eachRange.salaryRangeId)
      const isChecked = eachRange.salaryRangeId === activeSalaryRangeId

      return (
        <li key={eachRange.salaryRangeId}>
          <input
            type="radio"
            id={eachRange.salaryRangeId}
            name="salary ranges"
            onChange={onChangeRange}
            checked={isChecked}
          />
          <label htmlFor={eachRange.salaryRangeId}> {eachRange.label}</label>
        </li>
      )
    })
  }

  const renderSalaryRange = () => (
    <div className="salaryRange-Container">
      <h1 className="rangeTitle">Salary Range</h1>
      <ul className="salaryRangeList">{renderSalaryRangeList()}</ul>
    </div>
  )

  return (
    <div>
      {renderEmploymentTypes()}
      <hr className="horizontalLine5" />
      {renderSalaryRange()}
    </div>
  )
}

export default FiltersGroup
