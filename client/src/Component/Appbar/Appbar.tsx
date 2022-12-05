import React, { useContext } from 'react';
import {
  Box,
  Flex,
  Text,
  IconButton,
  Stack,
  Collapse,
  Icon,
  Link,
  Popover,
  PopoverTrigger,
  PopoverContent,
  useColorModeValue,
  useBreakpointValue,
  useDisclosure,
  useColorMode,
  Menu,
  MenuButton,
  Avatar,
  MenuList,
  MenuItem,
  MenuDivider,
  Center,
  Button
} from '@chakra-ui/react';
import {
  HamburgerIcon,
  CloseIcon,
  ChevronDownIcon,
  ChevronRightIcon,
  SettingsIcon
} from '@chakra-ui/icons';
import { EmailUser } from '../../Helper/EmailUserProvider';
import { RoleUser } from '../../Helper/RoleUserProvider';
import { useNavigate } from 'react-router-dom';
import Axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Appbar() {

  Axios.defaults.withCredentials = true;

 
  const {emailLog, setEmailLog } = useContext(EmailUser);
  const { roleUser, setRoleUser } = useContext(RoleUser);
  const { isOpen, onToggle } = useDisclosure();
  const { colorMode, toggleColorMode } = useColorMode();


  const showToastSucces = () => {
    toast.success('Logging out', {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      });
  }

  const logout =  () => {
    Axios.get('https://bsi-portal-service-production.up.railway.app/logout').then(() => {
    })
    showToastSucces();
    setTimeout(() => window.location.assign("http://localhost:3000"), 1000);
  }

  
  return (
    <Box>
      <Flex
        bg={useColorModeValue('white', 'gray.800')}
        color={useColorModeValue('gray.600', 'white')}
        minH={'60px'}
        py={{ base: 2 }}
        px={{ base: 4 }}
        borderBottom={1}
        borderStyle={'solid'}
        borderColor={useColorModeValue('gray.200', 'gray.900')}
        p={5}
        shadow='md'
        align={'center'}>

       <Flex
          flex={{ base: 1, md: 'auto' }}
          ml={{ base: -2 }}
          display={{ base: 'flex', md: 'none' }}>
          <IconButton
            onClick={onToggle}
            marginLeft={3}
            icon={
              isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />
            }
            variant={'ghost'}
            aria-label={'Toggle Navigation'}
          />
        </Flex>
        <Flex flex={{ base: 1 }} justify={{ base: 'center', md: 'start' }}>
          <a href="/home">
          <Text
            textAlign={useBreakpointValue({ base: 'center', md: 'left' })}
            fontFamily={'heading'}
            fontWeight={'500'}
            color={useColorModeValue('gray.600', 'gray.200')}
            >
           BSI Supplier Portal
          </Text>
          </a>

          <Flex display={{ base: 'none', md: 'flex' }} flex={{base : 1}} ml={10} justify="flex-end" justifyContent={'flex-end'}>
            <DesktopNav />
          </Flex>
        </Flex>

        <Stack
          flex={{ base: 1, md: 0 }}
          justify={'flex-end'}
          direction={'row'}
          spacing={6}
          marginLeft={5}>
          {/* <IconButton
            aria-label=''
            colorScheme="gray"
            onClick={logout}
            icon={<IoLogOutSharp />}
          /> */}
         <Menu>
                <MenuButton
                  as={Button}
                  rounded={'full'}
                  variant={'link'}
                  cursor={'pointer'}
                  minW={0}>
                <IconButton aria-label='btn-Logout' variant={'ghost'}>  
                  <SettingsIcon />
                </IconButton>
                </MenuButton>
                <MenuList alignItems={'center'}>
                  <br />
                  <Center>
                    <Avatar
                      size={'md'}
                      src={'https://avatars.dicebear.com/api/male/username.svg'}
                    />
                  </Center>
                  <br />
                  <Center>
                    <Flex flexDirection="column" >
                      <Flex>
                        <Text>{emailLog}</Text><br></br>
                      </Flex>
                      <Flex justifyContent="center">
                        <Text>{roleUser}</Text>
                      </Flex>
                    </Flex>
                  </Center>
                  <br />
                  <MenuDivider />
                  <a>
                  <MenuItem>Account Settings</MenuItem>
                  </a>
                  <a onClick={logout}>
                  <MenuItem>Logout</MenuItem>
                  </a>

                </MenuList>
              </Menu>
        </Stack>
      </Flex>
      <Collapse in={isOpen} animateOpacity>
        <MobileNav />
      </Collapse>
    </Box>
  );
}

const DesktopNav = () => {
  const linkColor = useColorModeValue('gray.600', 'gray.200');
  const linkHoverColor = useColorModeValue('gray.800', 'white');
  const popoverContentBgColor = useColorModeValue('white', 'gray.800');

  return (
    <Stack direction={'row'} spacing={10}>
      {NAV_ITEMS.map((navItem) => (
        <Box key={navItem.label}>
          <Popover trigger={'hover'} placement={'bottom-start'}>
            <PopoverTrigger>
              <Link
                p={2}
                href={navItem.href ?? '#'}
                fontSize={'sm'}
                fontWeight={500}
                color={linkColor}
                borderBottom="2px"
                borderBottomColor={'blue.300'}
                _hover={{
                  textDecoration: 'none',
                  color: linkHoverColor,
                }}>
                {navItem.label}
              </Link>
            </PopoverTrigger>

            {navItem.children && (
              <PopoverContent
                border={0}
                boxShadow={'xl'}
                bg={popoverContentBgColor}
                p={4}
                rounded={'xl'}
                minW={'sm'}>
                <Stack>
                  {navItem.children.map((child) => (
                    <DesktopSubNav key={child.label} {...child} />
                  ))}
                </Stack>
              </PopoverContent>
            )}
          </Popover>
        </Box>
      ))}
    </Stack>
  );
};

const DesktopSubNav = ({ label, href, subLabel }: NavItem) => {
  return (
    <Link
      href={href}
      role={'group'}
      display={'block'}
      p={2}
      rounded={'md'}
      >
      <Stack direction={'row'} align={'center'}>
        <Box>
          <Text
            transition={'all .3s ease'}
            fontWeight={500}>
            {label}
          </Text>
          <Text fontSize={'sm'}>{subLabel}</Text>
        </Box>
        <Flex
          transition={'all .3s ease'}
          transform={'translateX(-10px)'}
          opacity={0}
          _groupHover={{ opacity: '100%', transform: 'translateX(0)' }}
          justify={'flex-end'}
          align={'center'}
          flex={1}>
          <Icon color={'pink.400'} w={5} h={5} as={ChevronRightIcon} />
        </Flex>
      </Stack>
    </Link>
  );
};

const MobileNav = () => {
  return (
    <Stack
      bg={useColorModeValue('white', 'gray.800')}
      p={4}
      display={{ md: 'none' }}>
      {NAV_ITEMS.map((navItem) => (
        <MobileNavItem key={navItem.label} {...navItem} />
      ))}
    </Stack>
  );
};

const MobileNavItem = ({ label, children, href }: NavItem) => {
  const { isOpen, onToggle } = useDisclosure();

  return (
    <Stack spacing={4} onClick={children && onToggle}>
      <Flex
        py={2}
        as={Link}
        href={href ?? '#'}
        justify={'space-between'}
        align={'center'}
        _hover={{
          textDecoration: 'none',
        }}>
        <Text
          fontWeight={600}
          color={useColorModeValue('gray.600', 'gray.200')}>
          {label}
        </Text>
        {children && (
          <Icon
            as={ChevronDownIcon}
            transition={'all .25s ease-in-out'}
            transform={isOpen ? 'rotate(180deg)' : ''}
            w={6}
            h={6}
          />
        )}
      </Flex>

      <Collapse in={isOpen} animateOpacity style={{ marginTop: '0!important' }}>
        <Stack
          mt={2}
          pl={4}
          borderLeft={1}
          borderStyle={'solid'}
          borderColor={useColorModeValue('gray.200', 'gray.700')}
          align={'start'}>
          {children &&
            children.map((child) => (
              <Link key={child.label} py={2} href={child.href}>
                {child.label}
              </Link>
            ))}
        </Stack>
      </Collapse>
    </Stack>
  );
};

interface NavItem {
  label: string;
  subLabel?: string;
  children?: Array<NavItem>;
  href?: string;
}

const NAV_ITEMS: Array<NavItem> = [
  {
    label: 'Procurenment',
    children: [
      {
        label: 'Vendor Registration',
        subLabel: 'Vendor Registration',
        href: '/registrationhistory'
      },
      {
        label: 'Sourcing',
        subLabel: 'Sourcing',
        href: '#',
      },
      {
        label: 'PO Management',
        subLabel: 'PO Management',
        href: '#',
      },
      {
        label: 'Delivery Monitoring',
        subLabel: 'Delivery Monitoring',
        href: '#',
      },
      {
        label: 'Invoice Gateway',
        subLabel: 'Invoice Gateway ( PayG )',
        href: '/paygHome',
      },
      {
        label: 'Outsourcing Portal',
        subLabel: 'Outsourcing Portal',
        href: '/outsourcing',
      }

    ],
  },
  {
    label: 'Communication',
    children: [
      {
        label: 'Live Chat',
        subLabel: 'Find your dream design job',
        href: '#',
      },
      {
        label: 'Social Media',
        subLabel: 'An exclusive list for contract work',
        href: '/socialmedia/home',
      },
      {
        label: 'Group Forum',
        subLabel: 'An exclusive list for contract work',
        href: '#',
      }
    ],
  },
  {
    label: 'Information',
    children: [
      {
        label: 'News and Announcement',
        subLabel: 'Find your dream design job',
        href: '#',
      },
      {
        label: 'Procurement Guidance',
        subLabel: 'An exclusive list for contract work',
        href: '#',
      },
      {
        label: 'Procurement Principles',
        subLabel: 'An exclusive list for contract work',
        href: '#',
      },
      {
        label: 'Concern About Improper Conduct',
        subLabel: 'An exclusive list for contract work',
        href: '#',
      },
      {
        label: 'User Guidance',
        subLabel: 'An exclusive list for contract work',
        href: '#',
      },
      {
        label: 'Others Dashboard',
        subLabel: 'An exclusive list for contract work',
        href: '#',
      },
      {
        label: 'Tax Matters',
        subLabel: 'An exclusive list for contract work',
        href: '#',
      }
    ],
  }
];