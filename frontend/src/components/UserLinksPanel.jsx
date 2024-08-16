import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom';

import useLinkManager from '../hooks/useLinkManager';
import toast from 'react-hot-toast';

import { FaLink } from "react-icons/fa";
import { MdAddBox } from "react-icons/md";
import { extractDomain } from '../utils/utils';

const UserLinksPanel = () => {

  const { loading, getUserLinks, links } = useLinkManager()
  const containerRef = useRef(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [paginatedLinks, setPaginatedLinks] = useState([])
  const itemPerPage = 10
  const totalPages = Math.ceil(links.length / itemPerPage)
  const endIndex = currentPage * itemPerPage
  const startIndex = endIndex - itemPerPage

  useEffect(() => {
    getUserLinks()
  }, [])

  useEffect(() => {
    const pageItems = links.slice(startIndex, endIndex)
    setPaginatedLinks(pageItems)
    containerRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [currentPage, links])

  const handleNextPage = () => {
    if (currentPage === totalPages) {
      return toast('no more pages available!', { icon: '🤔' })
    }

    setCurrentPage(prev => {
      return prev + 1
    })
  }

  const handlePrevPage = () => {
    if (currentPage === 1) {
      return toast('this is first page!', { icon: '🤔' })
    }

    setCurrentPage(prev => {
      return prev - 1
    })
  }

  return (
    <div className='p-4 flex flex-col h-full' ref={containerRef}>
      <h2 className="text-2xl font-bold flex items-center gap-2 mb-8 px-6 py-4">
        <FaLink className='text-amber-500' />
        All my links
      </h2>
      {
        loading &&
        <div className="mx-auto">
          <span className="loading loading-lg loading-bars"></span>
        </div>
      }
      {
        paginatedLinks.length == 0 &&
        <div className="flex items-center justify-center flex-1">
          <div className="flex flex-col items-center justify-center gap-4">
            <span className='text-3xl opacity-35'>¯\_(ツ)_/¯</span>
            <span className='opacity-35'>no link added yet!</span>
            <Link to='/panel?AS=newLink' className='btn btn-success'>
              <MdAddBox className='text-xl' />
              Add a link now!
            </Link>
          </div>
        </div>
      }
      {
        paginatedLinks.length > 0 &&
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
                {
                  paginatedLinks.map((link, index) => (
                    <tr className={`hover ${(index + 1) === paginatedLinks.length ? '' : 'border-b-base-content'}`} key={link._id}>
                      <td>{(currentPage - 1) * itemPerPage + index + 1}</td>
                      <td className='max-w-40'>
                        <div className="flex items-center gap-2">
                          <div className="w-10 h-10 min-w-10 min-h-10 rounded-full overflow-hidden border border-primary flex items-center justify-center p-1 bg-white">
                            <img
                              className='max-w-full max-h-full'
                              src={`https://www.google.com/s2/favicons?domain=${extractDomain(link.longLink)}&sz=256`}
                              alt="icon"
                            />
                          </div>
                          <div className="flex-1 text-nowrap overflow-hidden">
                            <div className="font-semibold overflow-hidden text-ellipsis">
                              {link.title ? link.title : extractDomain(link.longLink)}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className='max-w-40'>
                        <div className="flex-1 text-nowrap overflow-hidden">
                          <div className="font-semibold overflow-hidden text-ellipsis">
                            {link.longLink}
                          </div>
                        </div>
                      </td>
                      <td>
                        {
                          link.isActive && !link.isBanned ?
                            (
                              <div className="badge badge-primary">Active</div>
                            ) : (
                              <div className="badge badge-error">Disabled</div>
                            )
                        }
                      </td>
                      <td>
                        <Link to={`/stats/${link._id}`} className='btn btn-sm btn-success rounded-md'>
                          Detailes
                        </Link>
                      </td>
                    </tr>
                  ))
                }
              </tbody>
            </table>
          </div>
          {
            totalPages > 1 &&
            <div className="my-6 mx-auto w-max">
              <div className="join">
                <button
                  className="join-item btn bg-base-100"
                  onClick={handlePrevPage}
                  disabled={currentPage === 1 ? true : false}
                >«</button>
                <button className="join-item btn bg-base-100">Page {currentPage} of {totalPages}</button>
                <button
                  className="join-item btn bg-base-100"
                  onClick={handleNextPage}
                  disabled={currentPage === totalPages ? true : false}
                >»</button>
              </div>
            </div>
          }
        </div>
      }
    </div>
  )
}

export default UserLinksPanel