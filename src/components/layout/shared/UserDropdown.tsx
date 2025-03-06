'use client'

// React Imports
import type { MouseEvent } from 'react'
import { useRef, useState } from 'react'

// Next Imports
import { useRouter } from 'next/navigation'

// MUI Imports

import Link from 'next/link'

import Avatar from '@mui/material/Avatar'
import Badge from '@mui/material/Badge'
import Button from '@mui/material/Button'
import ClickAwayListener from '@mui/material/ClickAwayListener'
import Divider from '@mui/material/Divider'
import Fade from '@mui/material/Fade'
import MenuItem from '@mui/material/MenuItem'
import MenuList from '@mui/material/MenuList'
import Paper from '@mui/material/Paper'
import Popper from '@mui/material/Popper'
import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'

// Hook Imports
import { useAtom, useAtomValue } from 'jotai'

import { RESET } from 'jotai/utils'

import { LogoutAction } from '@/app/[lang]/(blank-layout-pages)/login/action'
import { authUser } from '@/jotai/authUser'
import type { AuthPayload } from '@/libs/server-auth'
import { useSettings } from '@core/hooks/useSettings'

// Styled component for badge content
const BadgeContentSpan = styled('span')({
  width: 8,
  height: 8,
  borderRadius: '50%',
  cursor: 'pointer',
  backgroundColor: 'var(--mui-palette-success-main)',
  boxShadow: '0 0 0 2px var(--mui-palette-background-paper)'
})

const UserDropdown = () => {
  const user = useAtomValue(authUser) as AuthPayload
  const [, setLogout] = useAtom(authUser)


  // States
  const [open, setOpen] = useState(false)

  // Refs
  const anchorRef = useRef<HTMLDivElement>(null)

  // Hooks
  const router = useRouter()

  const { settings } = useSettings()

  const handleDropdownOpen = () => {
    !open ? setOpen(true) : setOpen(false)
  }

  const handleDropdownClose = (event?: MouseEvent<HTMLLIElement> | (MouseEvent | TouchEvent), url?: string) => {
    if (url) {
      router.push(url)
    }

    if (anchorRef.current && anchorRef.current.contains(event?.target as HTMLElement)) {
      return
    }

    setOpen(false)
  }

  const handleUserLogout = async () => {

    await LogoutAction()

    // Redirect to login page
    setLogout(RESET)

    // router.push('/login')
  }


  const url = `${process.env.NEXT_PUBLIC_R2_PUBLIC_URL}/reimbursement-ayu-nur-fadillah/reimbust`

  return (
    <>
      <Badge
        ref={anchorRef}
        overlap='circular'
        badgeContent={<BadgeContentSpan onClick={handleDropdownOpen} />}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        className='mis-2'
      >
        <Avatar
          ref={anchorRef}
          alt='John Doe'
          src='/images/avatars/1.png'
          onClick={handleDropdownOpen}
          className='cursor-pointer bs-[38px] is-[38px]'
        />
      </Badge>
      <Popper
        open={open}
        transition
        disablePortal
        placement='bottom-end'
        anchorEl={anchorRef.current}
        className='min-is-[240px] !mbs-3 z-[1]'
      >
        {({ TransitionProps, placement }) => (
          <Fade
            {...TransitionProps}
            style={{
              transformOrigin: placement === 'bottom-end' ? 'right top' : 'left top'
            }}
          >
            <Paper className={settings.skin === 'bordered' ? 'border shadow-none' : 'shadow-lg'}>
              <ClickAwayListener onClickAway={e => handleDropdownClose(e as MouseEvent | TouchEvent)}>
                <MenuList>
                  <div className='flex items-center plb-2 pli-6 gap-2' tabIndex={-1}>
                    <Avatar alt='John Doe' src={user.avatarUrl ? `${url}/${user?.id}/${user?.avatarUrl}` : '/images/avatars/1.png'} />
                    <div className='flex items-start flex-col'>
                      <Typography className='font-medium' color='text.primary'>
                        {user.fullName}
                      </Typography>
                      <Typography variant='caption'>{user.email}</Typography>
                    </div>
                  </div>
                  <Divider className='mlb-1' />

                  <Link href='/user'>
                    <MenuItem className='mli-2 gap-3'>

                      <i className='tabler-user' />
                      <Typography color='text.primary'>My Profile</Typography>

                    </MenuItem>
                  </Link>

                  <Link href='/about'>
                    <MenuItem className='mli-2 gap-3' href='/about'>
                      <i className='tabler-info-circle' />
                      <Typography color='text.primary'>About</Typography>
                    </MenuItem>
                  </Link>


                  <Link href='/faq'>
                    <MenuItem className='mli-2 gap-3' href='/faq'>
                      <i className='tabler-help-circle' />
                      <Typography color='text.primary'>FAQ</Typography>
                    </MenuItem>
                  </Link>

                  <div className='flex items-center plb-2 pli-3'>
                    <Button
                      fullWidth
                      variant='contained'
                      color='error'
                      size='small'
                      endIcon={<i className='tabler-logout' />}
                      onClick={handleUserLogout}
                      sx={{ '& .MuiButton-endIcon': { marginInlineStart: 1.5 } }}
                    >
                      Logout
                    </Button>
                  </div>
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Fade>
        )}
      </Popper>
    </>
  )
}

export default UserDropdown
