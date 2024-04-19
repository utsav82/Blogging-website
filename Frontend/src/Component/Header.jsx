import React from 'react'
import {Avatar, Button, Dropdown, Navbar, TextInput }from "flowbite-react"
import { Link , useLocation } from 'react-router-dom'
import { AiOutlineSearch  } from 'react-icons/ai';
import {FaMoon} from "react-icons/fa"
import {useSelector} from "react-redux"

const Header = () => {
  const path = useLocation().pathname;
  const {currentUser}=useSelector(state=>state.user)
  return (
    <div>
 <Navbar className='border-b-2'>
    <Link to="/" className='self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white'>
        <span className="rounded-lg text-pink-500 px-1  py-1 bg-gradient-to-r from-indigo-500 to-white">My</span>
        Blog
    </Link>
    <form>
        <TextInput type='text' placeholder='Search' rightIcon={AiOutlineSearch} className='hidden lg:inline' />
    </form>
    <div className='flex gap-4 md:order-2'>
    <Button className='w-12 h-10 lg:hidden' color="gray" pill><AiOutlineSearch/></Button>
    <Button className='w-12 h-10 hidden sm:inline' color="gray" pill><FaMoon/></Button>
    {currentUser ?( <Dropdown arrowIcon={false} inline label={<Avatar alt="user" img={currentUser.profilePicture}/>}>
    <Dropdown.Header>
      <span className='block text-sm'>{currentUser.userName}</span>
      <span className='block text-sm font-medium truncate'>{currentUser.email}</span>
    </Dropdown.Header>
<Link to={'/dashboard?tab=profile'}>
  <Dropdown.Item>Profile</Dropdown.Item>
</Link>
<Dropdown.Divider/>
<Link to={'/dashboard?tab=profile'}>
  <Dropdown.Item>Sign Out</Dropdown.Item>
</Link>
    </Dropdown>):(<Link to="/sign-in">
      <Button gradientDuoTone="purpleToBlue" outline>Sign-In</Button>
    </Link>)}
    <Navbar.Toggle/>
    </div>
    <Navbar.Collapse>
      <Navbar.Link active={path==="/"} as={"div"}>
        <Link to="/">Home</Link>
      </Navbar.Link>
      <Navbar.Link active={path==="/about"} as={"div"}>
        <Link to="/about">About</Link>
      </Navbar.Link>
      <Navbar.Link  active={path==="/project"} as={"div"}>
        <Link to="/project">Projects</Link>
      </Navbar.Link>
    </Navbar.Collapse>
 </Navbar>
    </div>
  )
}

export default Header
