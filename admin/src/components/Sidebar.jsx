import React from 'react'
import { assets } from '../assets/assets'

const Sidebar = ({ page, setPage }) => {
    return (
        <div className='w-[18%] min-h-screen border-r border-gray-200 bg-white py-6'>
            <div className='flex flex-col gap-2'>
                <div
                    onClick={() => setPage('AddJob')}
                    className={`flex items-center gap-3 px-3 py-2 md:px-6 md:py-3 cursor-pointer transition-all duration-200 group
                        ${page === 'AddJob' ? 'bg-indigo-50 border-r-4 border-indigo-600' : 'hover:bg-gray-50 border-r-4 border-transparent'}`}
                >
                    <img className={`w-5 h-5 group-hover:scale-110 transition-transform ${page === 'AddJob' ? 'opacity-100' : 'opacity-70'}`} src={assets.add_icon} alt="" />
                    <p className={`hidden md:block font-medium ${page === 'AddJob' ? 'text-indigo-600' : 'text-gray-600'}`}>Add Job</p>
                </div>

                <div
                    onClick={() => setPage('ManageJobs')}
                    className={`flex items-center gap-3 px-3 py-2 md:px-6 md:py-3 cursor-pointer transition-all duration-200 group
                        ${page === 'ManageJobs' ? 'bg-indigo-50 border-r-4 border-indigo-600' : 'hover:bg-gray-50 border-r-4 border-transparent'}`}
                >
                    <img className={`w-5 h-5 group-hover:scale-110 transition-transform ${page === 'ManageJobs' ? 'opacity-100' : 'opacity-70'}`} src={assets.person_tick_icon} alt="" />
                    <p className={`hidden md:block font-medium ${page === 'ManageJobs' ? 'text-indigo-600' : 'text-gray-600'}`}>Manage Jobs</p>
                </div>

                <div
                    onClick={() => setPage('ViewApplications')}
                    className={`flex items-center gap-3 px-3 py-2 md:px-6 md:py-3 cursor-pointer transition-all duration-200 group
                        ${page === 'ViewApplications' ? 'bg-indigo-50 border-r-4 border-indigo-600' : 'hover:bg-gray-50 border-r-4 border-transparent'}`}
                >
                    <img className={`w-5 h-5 group-hover:scale-110 transition-transform ${page === 'ViewApplications' ? 'opacity-100' : 'opacity-70'}`} src={assets.person_icon} alt="" />
                    <p className={`hidden md:block font-medium ${page === 'ViewApplications' ? 'text-indigo-600' : 'text-gray-600'}`}>View Applications</p>
                </div>
            </div>
        </div>
    )
}

export default Sidebar
