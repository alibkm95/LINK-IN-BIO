import React from 'react'

const Steps = ({ activeStep, steps }) => {
  return (
    <div>
      <ul className="steps w-full">
        {
          steps.map(step => (
            <li key={step.id} className={`step ${activeStep >= step.stepNumber ? 'step-primary' : ''}`}>
              <span className="text-sm">{step.stepName}</span>
            </li>
          ))
        }
      </ul>
    </div>
  )
}

export default Steps