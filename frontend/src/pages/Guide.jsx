import React from 'react'

import FAQ from '../components/FAQ'

import { FaListCheck } from "react-icons/fa6";
import { FaBookOpen } from "react-icons/fa";

import CreateLinkImage from '../assets/createLink.svg'
import DataImage from '../assets/data.svg'
import TOSImage from '../assets/terms.svg'

const Guide = () => {
  return (
    <section className='max-w-7xl mx-auto my-6 p-2 min-h-dvh'>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="relative">
          <div className="sticky top-0 bg-base-200 rounded-box p-4 shadow-md">
            <span className='text-xl font-semibold'>You will read in this page:</span>
            <ul className="flex flex-col gap-4 mt-4 ps-4 ms-4 list-disc">
              <li>
                <a href="#create" className="font-semibold link link-hover hover:text-blue-500">
                  How to create new Link?
                </a>
              </li>
              <li>
                <a href="#edit" className="font-semibold link link-hover hover:text-blue-500">
                  How to edit or check link details?
                </a>
              </li>
              <li>
                <a href="#terms" className="font-semibold link link-hover hover:text-blue-500">
                  Terms of use.
                </a>
              </li>
              <li>
                <a href="#faqs" className="font-semibold link link-hover hover:text-blue-500">
                  FAQs.
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="md:col-span-2">
          <div className="bg-base-200 rounded-box p-4 flex flex-col gap-4 shadow-md">
            <div className="py-2 px-4" id='create'>
              <p className="text-2xl font-bold flex items-center gap-2">
                <FaBookOpen className='text-accent' />
                How to create new Link?
              </p>
              <div>
                <img className='max-w-2xl mx-auto drop-shadow-md' src={CreateLinkImage} alt="new link img" />
              </div>
              <ul className="flex flex-col gap-4 list-decimal ps-4 leading-8">
                <li>
                  In order to create a new link you need to create a new account in <span className='font-semibold text-emerald-600 text-nowrap'>Link in Bio</span> or login with an existing account.
                </li>
                <li>
                  After login, you can click on <span className='p-1 bg-neutral/30 rounded text-nowrap'>New link</span> button in top navigation menu or <span className='p-1 bg-neutral/30 rounded text-nowrap'>Add new Link</span> button in user actions menu in top Navigation bar. (it also available in your panels menu). By clicking on one of these buttons you will redirect to create new link page.
                </li>
                <li>
                  In the create new link page you will find new link creation form. Fill up the form and set the primary setting on your link. after that hit the <span className='p-1 bg-neutral/30 rounded text-nowrap'>Add Link</span> button and wait to new link generating.
                </li>
                <li>
                  After link creation, you can see a success message and your new link under link creation form. Also you will access to link details and editing options in your <span className='p-1 bg-neutral/30 rounded text-nowrap'>Panel {`>`} My Links</span>.
                </li>
              </ul>
            </div>
            <div className="py-2 px-4" id='edit'>
              <p className="text-2xl font-bold flex items-center gap-2">
                <FaBookOpen className='text-accent' />
                How to edit or check link details?
              </p>
              <div>
                <img className='max-w-2xl mx-auto drop-shadow-md' src={DataImage} alt="new link img" />
              </div>
              <ul className="flex flex-col gap-4 list-decimal ps-4 leading-8">
                <li>
                  In your <span className='p-1 bg-neutral/30 rounded text-nowrap'>Panel {`>`} My Links</span>, you can find all your links in one table. Select the link whose information or settings you want to edit, or the link whose analytics data you want to view.
                </li>
                <li>
                  After selecting the link, you can find a <span className='p-1 bg-neutral/30 rounded text-nowrap'>Details</span> button in the end of each row of table. Click on the button and you will be redirect to link details and analytics page.
                </li>
                <li>
                  On the link details and analysis page, you can find graphs of analyzed link data and a link edit form. On that page you can view link data and records or update your link data or set new rules for your link.
                </li>
              </ul>
            </div>
            <div className="py-2 px-4" id='terms'>
              <p className="text-2xl font-bold flex items-center gap-2">
                <FaListCheck className='text-indigo-500' />
                Terms of Service
              </p>
              <div>
                <img className='max-w-2xl mx-auto drop-shadow-md' src={TOSImage} alt="new link img" />
              </div>
              <p>Our terms of service are listed below. Please read them and keep in mind that violation of these rules will result in banning of links or your account.</p>
              <ul className="flex flex-col gap-4 list-decimal ps-4 leading-8">
                <li>
                  Shortening shortened links, including shortened links with free and non-free services, is prohibited.
                </li>
                <li>
                  The use of hot links and hyperlinks is prohibited.
                </li>
                <li>
                  Setting the age restriction for links containing adult content is mandatory.
                </li>
                <li>
                  You must be at least 16 years old to use our services.
                </li>
                <li>
                  With 15 reports of your links per 24 hours, your link will be automatically disabled and must be reviewed by admins.
                </li>
                <li>
                  With 50 reports of your links in 24 hours, your account will be automatically banned and must be reviewed by admins.
                </li>
                <li>
                  Links with political content, obscenity and slander, spread of lies and terror and rumours, moral and religious topics, torture or disgusting things, etc. are prohibited and if seen, your user account will be closed forever.
                </li>
              </ul>
            </div>
            <div id="faqs" className='bg-base-100 rounded-box'>
              <FAQ />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Guide