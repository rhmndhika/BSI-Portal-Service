import React from "react";
import { IconButton } from "@chakra-ui/button";
import { useColorMode } from "@chakra-ui/color-mode";
import { Flex, VStack, Heading, Spacer } from "@chakra-ui/layout";
import { FaSun, FaMoon, FaInstagram, FaGithub, FaLinkedin } from 'react-icons/fa';
import { useState } from 'react'
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons'

import { Link } from '@chakra-ui/react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import 'bootstrap/dist/css/bootstrap.min.css';

const Appbar = () => {
  const { colorMode, toggleColorMode } = useColorMode()
  const isDark = colorMode === 'dark'
  const [display, changeDisplay] = useState('none')
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="/home">BSI Portal</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <NavDropdown title="Application" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
            </NavDropdown>

            <NavDropdown title="Communication" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.34">Something</NavDropdown.Item>
            </NavDropdown>

            <NavDropdown title="Information" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
            </NavDropdown>

            <Nav.Link href="/login">Logout</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default Appbar

// function Navbar() {

//   const { colorMode, toggleColorMode } = useColorMode();
//   const isDark = colorMode === "dark";

//   return (
//     <VStack p={5} shadow='md'>
//       <Flex w="100%" >
//         <a href="/home">
//         <Heading ml="8" size="md" fontWeight='semibold' color="cyan.400" marginTop="8px">
//             BSI
//         </Heading>
//         </a>
//         <Spacer></Spacer>
//         <a href="https://id.linkedin.com/" target="_blank" rel="noreferrer">
//         <IconButton icon={<FaLinkedin />}></IconButton>
//         </a>
//         <a href="https://www.instagram.com/" target="_blank" rel="noreferrer">
//         <IconButton ml={2} icon={<FaInstagram />}></IconButton>
//         </a>
//         <a href="https://github.com/rhmndhika" target="_blank" rel="noreferrer">
//         <IconButton ml={2} icon={<FaGithub />}></IconButton>
//         </a>
//         <IconButton ml={8} icon={isDark ? <FaSun /> : <FaMoon />} onClick={toggleColorMode}></IconButton>
//       </Flex>
//     </VStack>
//   );
// }

// export default Navbar;