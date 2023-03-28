import React, {useState} from 'react'
import './navbar.css'
import logo from '../../assets/logo-no-background.png'
import { Searchbar } from '../'
import { AiOutlineMenu } from 'react-icons/ai'
import { BiExit } from 'react-icons/bi'
import { Link } from 'react-router-dom'
const NavItem = (props) =>{

  const [open, setOpen] = useState(false);
  console.log(open)
  return (
    <li className={open ? 'dropdownElems' : ''}>
      <a className={`ml-2`} href="#" onClick={() => setOpen(prev => (!prev))} >{props.text}</a>
      
      {open && props.children}
      
    </li>
  )
}

const navElements = ['xd', 'xd', 'xd'];

const PrimaryNavItem = ({title, elements}) => (
  <div className='dropdown z-[10000] relative block'>
    <p className='dropbtn font-bold tracking-widest text-[24px] cursor-default hover:text-brownSandy'>{title}</p>
    <div className='dropdown-content text-[20px] min-w-[200px] hidden flex-col absolute top:50px bg-black text-whitePowder gap-2 p-4'>
      {elements.map((elem, index) => (
        <a key={elem + index} className='hover:text-brownSandy cursor-pointer' href='#'>{elem}</a>
      ))}
      
    </div>
  </div>
)

const Navbar = () => {

  const [openMenu, setOpenMenu] = useState(false);

  return (
    <div className='w-full bg-black flex justify-center'>
      <nav className='w-full max-w-[1800px] flex flex-row bg-black text-whitePowder font-poppins text-[28px] h-[50px] items-center justify-between px-2'>
        <Link to='/'>
        <div className='ss:w-[120px] w-[100px] h-[40px] flex justify-center items-center'>
          <img src={logo} alt='logo' className='cursor-pointer' />
        </div>
        </Link>
        <div className='md:flex hidden flex-row gap-10'>
          <PrimaryNavItem title='MOVIES' elements={['TEST', 'TEST']} />
          <PrimaryNavItem title='TV SHOWS' elements={['TEST', 'TEST', 'TEST']} />
          <PrimaryNavItem title='CELEBS' elements={[]} />
        </div>
        <Searchbar />
        <div className='flex md:hidden flex-row justify-center items-center'>
          <div className='flex flex-row justify-center items-center' onClick={() => setOpenMenu(prev => !prev)}>
          { openMenu ? <BiExit className='text-brownSandy' /> : <AiOutlineMenu className='text-brownSandy'/>}
            <p className='ml-1'>Menu</p>
          </div>
          
          {openMenu && 
          <div className='absolute top-[50px] right-0 bg-black z-[1000]'>
            <ul className='flex flex-col gap-2 min-w-[200px]'>
              <NavItem text='Movies' >
                <DropdownMenu elements={['TEST', 'TEST']}/>
              </NavItem>
              <NavItem text='TV SHOWS' >
                <DropdownMenu elements={['TEST', 'TEST', 'TEST']} />
              </NavItem>
              <NavItem text='CELEBS' >

              </NavItem>
            </ul>
          </div> }
          
        </div>
        
        
        
      </nav>
    </div>
  )
}


const DropdownMenu = ({elements}) =>{

  return(
    <div className='pl-4'>
        {elements.map((elem, index) =>(
          <p className='text-[20px] bg-black' key={index+elem}><a href='#'>{elem}</a></p>
        ))}
    </div>
  )

}
export default Navbar