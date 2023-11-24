import React from 'react'
import { Outlet } from 'react-router-dom'
import Footer from '../Footer'
import UserHeader from './UserHeader'

export default function UserMaster() {
  return (
    <div>
      <UserHeader/>
      <Outlet/>
      <Footer/>
    </div>
  )
}
