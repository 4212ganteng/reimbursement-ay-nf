

// Component Imports
import type { Locale } from '@/configs/i18n'
import type { getDictionary } from '@/utils/getDictionary'
import { MenuItem, SubMenu } from '@menu/vertical-menu'


type Tmenu = {
  locale: Locale,
  dictionary: Awaited<ReturnType<typeof getDictionary>>
}

const ManagerRoute = (props: Tmenu) => {

  const { locale, dictionary } = props


  return (
    <>

      <MenuItem href='/home' icon={<i className='tabler-smart-home' />}>
        Home
      </MenuItem>
      <MenuItem href='/about' icon={<i className='tabler-info-circle' />}>
        About
      </MenuItem>


      <SubMenu label={dictionary['navigation'].user} icon={<i className='tabler-user' />}>
        <MenuItem href={`/${locale}/apps/user`}>{dictionary['navigation'].list}</MenuItem>
        <MenuItem href={`/${locale}/apps/user/view`}>{dictionary['navigation'].view}</MenuItem>
      </SubMenu>


      <SubMenu label={dictionary['navigation'].reimbursement} icon={<i className='tabler-shopping-cart' />}>
        <MenuItem href={`/${locale}/apps/reimbursement/list`}>{dictionary['navigation'].pending}</MenuItem>
        <MenuItem href={`/${locale}/apps/reimbursement/list/approved`}>{dictionary['navigation'].approved}</MenuItem>
        <MenuItem href={`/${locale}/apps/reimbursement/list/rejected`}>{dictionary['navigation'].rejected}</MenuItem>
        <MenuItem href={`/${locale}/apps/reimbursement/list/all-status`}>{dictionary['navigation'].list}</MenuItem>
        <MenuItem href={`/${locale}/apps/reimbursement/add`}>{dictionary['navigation'].add}</MenuItem>

      </SubMenu>

    </>
  )
}

export default ManagerRoute
