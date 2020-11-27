import Link from 'next/link';
import { isAuth, signout } from '../actions/auth';
import { useState } from 'react';
import { APP_NAME } from '../config';

import {
  Collapse,
  Navbar,
  NavbarToggler,
  Nav,
  NavItem,
  NavLink,
} from 'reactstrap';
import Router from 'next/router';

const Header = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <Navbar color='light' light expand='md'>
        <Link href='/'>
          <NavLink className='font-weight-bold'>{APP_NAME}</NavLink>
        </Link>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className='ml-auto' navbar>
            {!isAuth() && (
              <>
                {' '}
                <NavItem>
                  <Link href='/signin'>
                    <NavLink>Sign In</NavLink>
                  </Link>
                </NavItem>
                <NavItem>
                  <Link href='/signup'>
                    <NavLink>Sign up</NavLink>
                  </Link>
                </NavItem>
              </>
            )}
            {isAuth() && (
              <NavItem>
                <NavLink
                  style={{ cursor: 'pointer' }}
                  onClick={() => signout(() => Router.replace(`/signin`))}
                >
                  Sign Out
                </NavLink>
              </NavItem>
            )}
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
};

export default Header;
