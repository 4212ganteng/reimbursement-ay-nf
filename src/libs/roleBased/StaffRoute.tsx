

// Component Imports
import type { getDictionary } from '@/utils/getDictionary'
import { MenuItem, SubMenu } from '@menu/vertical-menu'


type Tmenu = {
  locale: string | string[] | undefined,
  dictionary: Awaited<ReturnType<typeof getDictionary>>
}

const StaffRoute = (props: Tmenu) => {

  const { locale, dictionary } = props


  return (
    <>

      <MenuItem href='/home' icon={<i className='tabler-smart-home' />}>
        Home
      </MenuItem>

      <SubMenu label={dictionary['navigation'].reimbursement} icon={<i className='tabler-shopping-cart' />}>
        <MenuItem href={`/${locale}/apps/reimbursement/list/all-status`}>{dictionary['navigation'].list}</MenuItem>
        <MenuItem href={`/${locale}/apps/reimbursement/add`}>{dictionary['navigation'].add}</MenuItem>
      </SubMenu>

      <MenuItem href='/about' icon={<i className='tabler-info-circle' />}>
        About
      </MenuItem>
    </>
  )
}

export default StaffRoute
