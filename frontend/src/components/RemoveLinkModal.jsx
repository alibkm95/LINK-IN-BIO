import React from 'react'

const RemoveLinkModal = ({ onAccept, onCancel, loading }) => {
  return (
    <dialog id="my_modal_5" className="modal modal-open modal-bottom sm:modal-middle">
      <div className="modal-box">
        <h3 className="font-bold text-lg">Are you sure?</h3>
        <p className="py-4">You are about to remove the link and this action cannot be undone. proceed?</p>
        <div className="modal-action">
          <button className="btn btn-sm btn-error flex items-center gap-2" onClick={onAccept}>
            Yes
            {
              loading && <span className="loading loading-spinner loading-sm"></span>
            }
          </button>
          <button className="btn btn-sm btn-neutral" onClick={onCancel}>No</button>
        </div>
      </div>
    </dialog>
  )
}

export default RemoveLinkModal