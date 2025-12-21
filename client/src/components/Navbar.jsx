/* eslint-disable react-hooks/set-state-in-effect */
import React, { useState, useEffect } from 'react'
import { assets } from "../assets/assets.js"

const Navbar = () => {
  const [token, setToken] = useState(null)
  const [recruiterToken, setRecruiterToken] = useState(null)
  const [showModal, setShowModal] = useState(false)
  const [isLogin, setIsLogin] = useState(true)
  const [isRecruiter, setIsRecruiter] = useState(false)

  useEffect(() => {
    let tokens = localStorage.getItem("auth-token")
    let recruiterTokens = localStorage.getItem("recruitertoken")
    setToken(tokens)
    setRecruiterToken(recruiterTokens)
  }, []);

  const toggleModal = () => {
    setShowModal(!showModal)
    if (showModal) {
      setIsLogin(true)
      setIsRecruiter(false) // Reset on close
    }
  }

  const openUserModal = () => {
    setIsRecruiter(false)
    setIsLogin(true)
    setShowModal(true)
  }

  const openRecruiterModal = () => {
    setIsRecruiter(true)
    setIsLogin(true)
    setShowModal(true)
  }

  const switchMode = () => {
    setIsLogin(!isLogin)
  }

  return (
    <>
      <nav className="flex justify-between items-center py-4 px-[5%] bg-white shadow-sm sticky top-0 z-50">
        <img src={assets.logo} alt='Logo' className="h-10 w-auto cursor-pointer" />
        {
          token ? (
            <div className="flex items-center gap-6">
              <p className="text-gray-800 font-medium cursor-pointer transition-colors hover:text-indigo-600">Applied Jobs</p>
              <p className="text-gray-800 font-medium cursor-pointer transition-colors hover:text-indigo-600">Hi user</p>
            </div>
          ) : recruiterToken ? (
            <div className="flex items-center gap-6">
              <p className="text-gray-800 font-medium cursor-pointer transition-colors hover:text-indigo-600">Hi Recruiter</p>
            </div>
          ) : (
            <div className="flex items-center gap-6">
              <p
                onClick={openRecruiterModal}
                className="hidden md:block text-gray-800 font-medium cursor-pointer transition-colors hover:text-indigo-600"
              >
                Recruitment login
              </p>
              <button
                onClick={openUserModal}
                className="bg-indigo-600 text-white px-6 py-2 rounded-full font-medium cursor-pointer transition-all hover:bg-indigo-700 active:scale-95"
              >
                Login
              </button>
            </div>
          )
        }
      </nav>

      {/* Modal */}
      {showModal && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[100] flex justify-center items-center p-4"
          onClick={toggleModal}
        >
          <div
            className="bg-white p-10 rounded-2xl w-full max-w-[400px] shadow-lg relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-4 right-4 bg-transparent border-none text-2xl text-gray-500 cursor-pointer hover:text-gray-800 leading-none"
              onClick={toggleModal}
            >
              &times;
            </button>

            <div className="mb-6 text-center">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                {isRecruiter ? 'Recruiter ' : ''}{isLogin ? 'Login' : 'Sign Up'}
              </h2>
              <p className="text-gray-500 text-sm">
                {isLogin ? `Please log in to continue` : `Please sign up to create account`}
              </p>
            </div>

            <form className="flex flex-col gap-4" onSubmit={(e) => e.preventDefault()}>
              {!isLogin && (
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium text-gray-800">Username</label>
                  <input
                    type="text"
                    placeholder="Enter your username"
                    className="p-3 border border-gray-200 rounded-lg text-[0.95rem] transition-colors focus:outline-none focus:border-indigo-600 focus:ring-4 focus:ring-indigo-600/10"
                  />
                </div>
              )}

              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-gray-800">Email</label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="p-3 border border-gray-200 rounded-lg text-[0.95rem] transition-colors focus:outline-none focus:border-indigo-600 focus:ring-4 focus:ring-indigo-600/10"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-gray-800">Password</label>
                <input
                  type="password"
                  placeholder="Enter your password"
                  className="p-3 border border-gray-200 rounded-lg text-[0.95rem] transition-colors focus:outline-none focus:border-indigo-600 focus:ring-4 focus:ring-indigo-600/10"
                />
              </div>

              <button
                type="submit"
                className="bg-indigo-600 text-white p-3 rounded-lg font-semibold mt-2 cursor-pointer transition-colors hover:bg-indigo-700"
              >
                {isLogin ? 'Login' : 'Sign Up'}
              </button>
            </form>

            <div className="text-center mt-4 text-sm text-gray-500">
              {isLogin ? "Don't have an account? " : "Already have an account? "}
              <span
                onClick={switchMode}
                className="text-indigo-600 font-semibold cursor-pointer hover:underline"
              >
                {isLogin ? 'Sign Up' : 'Login'}
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default Navbar