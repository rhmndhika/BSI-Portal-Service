import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import {
  Box,
  Center,
  Heading,
  Text,
  Stack,
  Avatar,
  useColorModeValue,
  Tag,
  TagLabel,
  TagLeftIcon,
  TagRightIcon,
  TagCloseButton,
  Image,
  Button,
  HStack,
  Flex
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import parse from 'html-react-parser';
import moment from 'moment';

const BlogPostWithImage = (props) => {

  Axios.defaults.withCredentials = true;

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
  {allNews.filter(i => 
  i.Title.toLowerCase().includes(props.search) || 
  i.Tags[0].toLowerCase().includes(props.search)
  ).map((i) => { 
    return (
    <Center py={6} key={i._id}>
      <Box
        maxW={'345px'}
        w={'345px'}
        maxHeight={'450px'}
        height={'450px'}
        boxShadow={'2xl'}
        rounded={'md'}
        p={6}
        overflow={'hidden'}>
        <Box
          h={'210px'}
          bg={'gray.100'}
          mt={-6}
          mx={-6}
          mb={6}
          pos={'relative'}>
          <Image
            // src=
            // 'none'
            src=
            'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
          />
        </Box>
        <Flex height="max-content" flexDirection="row" alignItems="center" width="fit-content" gap="10px">
          {i.Tags.map((x) => {
            return (
            <Flex flexDirection="row" justifyContent={"center"} mt="20px">
            <Tag
              colorScheme={'teal'}
              variant='solid'
              textTransform={'uppercase'}
              fontWeight={500}
              fontSize={'sm'}
              letterSpacing={1.1}
              key={x._id}
              >
              {x}
            </Tag>
            </Flex>
              )
            })}
        </Flex>
        <Stack mt={"20px"}>
        <Heading
            fontSize={'2xl'}
            fontFamily={'body'}>
           {i.Title}
          </Heading>
          <Link to={`/news/details/${i._id}`}>
            <Text color='teal.400' href='#' cursor="pointer">
              Continue Reading
            </Text>
          </Link>
        </Stack>
        <Stack mt={"6"} direction={'row'} spacing={4} align={'center'}>
          <Stack direction={'column'} spacing={0} fontSize={'sm'}>
            <Text fontWeight={600}>{i.Username}</Text>
            <Text color={'gray.500'}>{moment(i.createdAt).format("DD MMMM YYYY, h:mm:ss a")}</Text>
          </Stack>
        </Stack>
      </Box>
    </Center>
    )
  })}
  </>
  );
}

export default BlogPostWithImage