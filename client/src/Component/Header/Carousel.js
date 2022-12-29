import React, { useState, useEffect, useRef } from 'react';
import {
  Box,
  IconButton,
  useBreakpointValue,
  Stack,
  Heading,
  Text,
  Container,
} from '@chakra-ui/react';
// Here we have used react-icons package for the icons
import { BiLeftArrowAlt, BiRightArrowAlt } from 'react-icons/bi';
// And react-slick as our Carousel Lib
import Slider from 'react-slick';
import Axios from 'axios';
import parse from 'html-react-parser';
import { Link } from 'react-router-dom';

// Settings for the slider
const settings = {
  dots: true,
  arrows: false,
  fade: true,
  infinite: true,
  autoplay: true,
  speed: 500,
  autoplaySpeed: 5000,
  slidesToShow: 1,
  slidesToScroll: 1,
};

export default function CaptionCarousel() {
  Axios.defaults.withCredentials = true;
  // As we have used custom buttons, we need a reference variable to
  // change the state
  const [slider, setSlider] = useState([]);

  const sliderIdRef = useRef(0);

  // These are the breakpoints which changes the position of the
  // buttons as the screen size changes
  const top = useBreakpointValue({ base: '90%', md: '50%' });
  const side = useBreakpointValue({ base: '30%', md: '40px' });

  const [ allNews, setAllNews ] = useState([]);

  
  const getAllNews = async () => {
    try {
      await Axios.get("https://bsi-portal-service-production.up.railway.app/news/allNews").then((response) => {
        setAllNews(response.data);
      })
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    getAllNews();
  }, [])


  return (
  <>
    <Box
      position={'relative'}
      height={'500px'}
      width={'full'}
      padding={"35px"}
      overflow={'hidden'}>
      {/* CSS files for react-slick */}
      <link
        rel="stylesheet"
        type="text/css"
        charSet="UTF-8"
        href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
      />
      <link
        rel="stylesheet"
        type="text/css"
        href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"
      />
      {/* Left Icon */}
      <IconButton
        aria-label="left-arrow"
        variant="ghost"
        position="absolute"
        left={side}
        top={top}
        transform={'translate(0%, -50%)'}
        zIndex={2}
        marginLeft={5}
        onClick={() => slider?.slickPrev()}>
        <BiLeftArrowAlt size="40px" />
      </IconButton>
      {/* Right Icon */}
      <IconButton
        aria-label="right-arrow"
        variant="ghost"
        position="absolute"
        right={side}
        top={top}
        transform={'translate(0%, -50%)'}
        zIndex={2}
        marginRight={5}
        onClick={() => slider?.slickNext()}>
        <BiRightArrowAlt size="40px" />
      </IconButton>
      {/* Slider */}
      <Slider {...settings} ref={(slider) => setSlider(slider)}>
      {allNews.slice(0,3).map((i, index) => { 
      return (
      <Box
        key={i._id}
        height={'6xl'}
        position="relative"
        backgroundPosition="center"
        backgroundRepeat="no-repeat"
        backgroundSize="cover"
        backgroundImage="https://images.unsplash.com/photo-1507237998874-b4d52d1dd655?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1yZWxhdGVkfDR8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=900&q=60"
        // backgroundImage={`url(${card.image})`}
        >
        {/* This is the block you need to change, to customize the caption */}
        <Container size="container.lg" height="600px" position="relative">
          <Stack
            spacing={6}
            w={'full'}
            maxW={'lg'}
            position="absolute"
            top="40%"
            transform="translate(0, -50%)">
            <Link to={`/news/details/${i._id}`}>
            <Heading fontSize={{ base: '3xl', md: '4xl', lg: '5xl' }}>
              {i.Title}
            </Heading>
            </Link>
            <Text fontSize={{ base: 'md', lg: 'lg' }} color="GrayText" whiteSpace="nowrap" overflow="hidden" textOverflow="ellipsis" height="20px">
            {parse(`${i.Content}`)}
            </Text>
          </Stack>
        </Container>
      </Box>
    )
  })}
  </Slider>
    </Box>
  </>
  );
}