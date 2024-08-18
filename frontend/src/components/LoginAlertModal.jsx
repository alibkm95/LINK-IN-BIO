import React from 'react'
import { Link } from 'react-router-dom'

const LoginAlertModal = ({ onCancel }) => {
  return (
    <dialog
      id="loginAlertModal"
      className="modal modal-open modal-bottom sm:modal-middle"
    >
      <div className="modal-box">
        <h3 className="font-bold text-lg text-center">You are not logedin!</h3>
        <p className="py-4 text-center">Would you like to login with your account?</p>
        <div className="modal-action">
          <div>
            <Link to='/login' className="btn btn-primary mx-1">Go to login</Link>
            <button className="btn btn-error mx-1" onClick={onCancel}>Cancel</button>
          </div>
        </div>
      </div>
    </dialog>
  )
}

export default LoginAlertModal