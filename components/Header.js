import { useState } from 'react';
import { APP_NAME } from '../config';
import NProgress from 'nprogress';
import Link from 'next/link';
import Router from 'next/router';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText
} from 'reactstrap';
import { signout, isAuth } from '../actions/auth';
import '.././node_modules/nprogress/nprogress.css';
import Search from '../components/blog/Search';
import styled from 'styled-components';

// progress bar
Router.onRouteChangeStart = url => NProgress.start();
Router.onRouteChangeComplete = url => NProgress.done();
Router.onRouteChangeError = url => NProgress.done();

const Header = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <React.Fragment>
      <Navbar light expand="md">
        <Link href="/">
          <NavLink className="font-weight-bold" style={{ cursor: 'pointer' }}>{APP_NAME}</NavLink>
        </Link>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="ml-auto" navbar>

            <React.Fragment>

              <NavItem>
                <Link href="/contact">
                  <NavLink style={{ cursor: 'pointer' }}>Contact</NavLink>
                </Link>
              </NavItem>
            </React.Fragment>

            {!isAuth() && <React.Fragment>
              <NavItem>
                <Link href="/signin">
                  <NavLink style={{ cursor: 'pointer' }}>Connexion</NavLink>
                </Link>
              </NavItem>

              <NavItem>
                <Link href="/signup">
                  <NavLink className="mr-2" style={{ cursor: 'pointer' }}>Inscription</NavLink>
                </Link>
              </NavItem>
            </React.Fragment>}
            
            {isAuth() && isAuth().role === 0 && (
              <NavItem>
                <Link href='/user'>
                  <NavLink style={{ cursor: 'pointer' }}>{`Gestions de ${isAuth().name}`}</NavLink>
                </Link>
              </NavItem>
            )}
            
            {isAuth() && isAuth().role === 1 && (
              <NavItem>
                <Link href='/admin'>
                  <NavLink style={{ cursor: 'pointer' }}>{`Espace de ${isAuth().name}`}</NavLink>
                </Link>
              </NavItem>
            )}
            
            {isAuth() && (
              <NavItem>
                  <NavLink className="mr-2" onClick={() => signout(() => Router.replace('/signin'))} style={{ cursor: 'pointer' }}>Déconnexion</NavLink>
              </NavItem>
            )}

            <NavItem>
              <Link href="/user/crud/blog" >
                <NavLink className="btn btn-outline-info" style={{ cursor: 'pointer' }}>
                  <CustomNavLink>
                    Rédiger un article
                  </CustomNavLink>
                </NavLink>
              </Link>
            </NavItem>

          </Nav>
        </Collapse>
      </Navbar>
      <Search />
    </React.Fragment>
  );
}

export default Header;

// style

const CustomNavLink = styled.div`
  color: #17A2B8;

  &:hover {
    color: white;
  }
`;