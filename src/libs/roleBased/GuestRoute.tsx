

// Component Imports
import { MenuItem } from '@menu/vertical-menu'


const GuestRoute = () => {



  return (
    <>

      <MenuItem href='/home' icon={<i className='tabler-smart-home' />}>
        Home
      </MenuItem>

      <MenuItem href='/about' icon={<i className='tabler-info-circle' />}>
        About
      </MenuItem>
      <MenuItem href='/faq' icon={<i className='tabler-info-circle' />}>
        FAQ
      </MenuItem>
    </>
  )
}

export default GuestRoute
