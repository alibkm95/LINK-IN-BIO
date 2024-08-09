import React from 'react'
import { Link } from 'react-router-dom';

import { FaLink } from "react-icons/fa";
import { MdAddBox } from "react-icons/md";

const UserLinksPanel = () => {

  const domain = 'fb.com'

  return (
    <div className='p-4 flex flex-col h-full'>
      <h2 className="text-2xl font-bold flex items-center gap-2 mb-8 px-6 py-4">
        <FaLink className='text-amber-500' />
        All my links
      </h2>
      <div className="mx-auto">
        <span className="loading loading-lg loading-bars"></span>
      </div>
      {/* for no links in user account component down below will used */}
      {/* <div className="flex items-center justify-center flex-1">
        <div className="flex flex-col items-center justify-center gap-4">
          <span className='text-3xl opacity-35'>¯\_(ツ)_/¯</span>
          <span className='opacity-35'>no link added yet!</span>
          <Link to='/panel?AS=newLink' className='btn btn-success'>
            <MdAddBox className='text-xl' />
            Add a link now!
          </Link>
        </div>
      </div> */}
      <div>
        <div className="overflow-x-auto">
          <table className="table bg-base-100">
            <thead>
              <tr className='border-b-base-content'>
                <th>#</th>
                <th>title</th>
                <th>Original URL</th>
                <th>Stats</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr className='border-b-base-content hover'>
                <td>1</td>
                <td className='max-w-40'>
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 min-w-10 min-h-10 rounded-full overflow-hidden border border-primary flex items-center justify-center p-1 bg-white">
                      <img
                        className='max-w-full max-h-full'
                        src={`https://www.google.com/s2/favicons?domain=${domain}&sz=256`}
                        alt="icon"
                      />
                    </div>
                    <div className="flex-1 text-nowrap overflow-hidden">
                      <div className="font-semibold overflow-hidden text-ellipsis">
                        domain or title
                      </div>
                    </div>
                  </div>
                </td>
                <td className='max-w-40'>
                  <div className="flex-1 text-nowrap overflow-hidden">
                    <div className="font-semibold overflow-hidden text-ellipsis">
                      https://recharts.org/en-US/examples/SimpleAreaChart
                    </div>
                  </div>
                </td>
                <td>
                  <div className="badge badge-primary">Active</div>
                  {/* <div className="badge badge-error">Disabled</div> */}
                </td>
                <td>
                  <Link to='/stats/linkId' className='btn btn-sm btn-success rounded-md'>
                    Detailes
                  </Link>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default UserLinksPanel