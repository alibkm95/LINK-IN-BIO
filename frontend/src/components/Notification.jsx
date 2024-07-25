import React, {useState} from 'react'

const Notification = () => {

  const [showMessage, setShowMessage] = useState(false)

  return (
    <div className="bg-base-300 rounded-box shadow-md">
          <div role="alert" className="alert bg-base-300 border-none">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="stroke-info h-6 w-6 shrink-0">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            <span>notification subject</span>
            <div>
              <button className="btn btn-sm btn-primary ms-1" onClick={() => setShowMessage(prev => !prev)}>
                {showMessage ? 'Hide' : 'Show'}
              </button>
              <button className="btn btn-sm btn-error ms-1">Remove</button>
            </div>
          </div>
          <div className={`collapse ${showMessage ? 'collapse-open' : ''}`}>
            <div className="collapse-content">
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus error distinctio, voluptates voluptas corrupti quibusdam iusto culpa tenetur officia cupiditate non ut, vero neque totam eos deserunt autem corporis rem, quod minus adipisci. Labore quas deserunt odio nam. Consequuntur sequi aspernatur neque suscipit iure, ipsam, inventore, nisi fugit ratione totam amet voluptates velit nihil? Ullam magni quis obcaecati quae ducimus dolorum sapiente sed similique, quo sint explicabo repudiandae, libero doloribus nostrum, atque suscipit aperiam? Unde laborum dolorum eveniet aliquid fugit provident iusto adipisci sapiente pariatur dolore consequatur dolorem quasi voluptatum aspernatur, veniam nemo eius, eos nobis in blanditiis hic quos.
              </p>
            </div>
          </div>
        </div>
  )
}

export default Notification