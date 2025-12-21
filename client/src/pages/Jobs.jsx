/* eslint-disable react-hooks/set-state-in-effect */
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { jobsData, assets } from '../assets/assets';

const Jobs = () => {
  const { id } = useParams();
  const [job, setJob] = useState(null);

  useEffect(() => {
    if (id) {
      // Ensure strictly equal comparison if IDs are strings, or loose if mixed. 
      // Based on assets.js, ids are content strings '1', '2' etc. but let's be safe.
      const foundJob = jobsData.find((j) => j._id === id);
      setJob(foundJob);
    }
  }, [id]);

  if (!job) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-gray-500 text-lg">Loading job details or job not found...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="container mx-auto px-[5%]">

        {/* Back Button */}
        <Link to="/" className="inline-flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors mb-6">
          <img src={assets.left_arrow_icon || ''} alt="Back" className="w-4 h-4" />
          Back to Jobs
        </Link>

        {/* Main Content Wrapper - Removed card styling (shadow, border, rounded-xl) */}
        <div>

          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-8 text-white rounded-lg mb-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
              <div className="flex items-center gap-4">
                <div className="bg-white p-3 rounded-lg shadow-sm">
                  {/* Handle potentially nested companyId object based on data structure */}
                  <img
                    src={job.companyId?.image || assets.company_icon}
                    alt={job.companyId?.name || "Company"}
                    className="w-12 h-12 object-contain"
                  />
                </div>
                <div>
                  <h1 className="text-2xl md:text-3xl font-bold">{job.title}</h1>
                  <div className="flex items-center gap-2 mt-1 opacity-90">
                    <span className="font-medium">{job.companyId?.name}</span>
                    <span className="text-xs px-2 py-0.5 bg-white/20 rounded-full">{job.level}</span>
                  </div>
                </div>
              </div>

              <button className="bg-white text-blue-600 px-8 py-3 rounded font-bold hover:bg-blue-50 transition-colors shadow-lg">
                Apply Now
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

            {/* Main Description */}
            <div className="lg:col-span-2">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Job Description</h2>
              <div
                className="prose prose-blue max-w-none text-gray-600"
                dangerouslySetInnerHTML={{ __html: job.description }}
              ></div>
            </div>

            {/* Sidebar Info */}
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <h3 className="font-bold text-gray-800 mb-4">Job Overview</h3>

                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <img src={assets.location_icon} alt="" className="w-5 h-5 mt-0.5 opacity-60" />
                    <div>
                      <p className="text-sm text-gray-500">Location</p>
                      <p className="font-medium text-gray-800">{job.location}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <img src={assets.money_icon} alt="" className="w-5 h-5 mt-0.5 opacity-60" />
                    <div>
                      <p className="text-sm text-gray-500">Salary</p>
                      <p className="font-medium text-gray-800">${job.salary}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <img src={assets.suitcase_icon} alt="" className="w-5 h-5 mt-0.5 opacity-60" />
                    <div>
                      <p className="text-sm text-gray-500">Job Type</p>
                      <p className="font-medium text-gray-800">{job.level}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <img src={assets.person_icon} alt="" className="w-5 h-5 mt-0.5 opacity-60" />
                    <div>
                      <p className="text-sm text-gray-500">Category</p>
                      <p className="font-medium text-gray-800">{job.category}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <h3 className="font-bold text-blue-800 mb-2">Interested?</h3>
                <p className="text-gray-600 text-sm mb-4">Don't miss out on this opportunity.</p>
                <button className="w-full bg-blue-600 text-white py-2 rounded font-medium hover:bg-blue-700 transition-colors">
                  Apply Now
                </button>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Jobs;