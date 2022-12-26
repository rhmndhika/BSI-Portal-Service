import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import Appbar from '../Component/Appbar/Appbar.tsx';
import { Flex, Heading, Text } from '@chakra-ui/react';
import moment from 'moment';
import parse from 'html-react-parser';

const NewsDetails = () => {

  Axios.defaults.withCredentials = true

  let navigate = useNavigate();

  const { id } = useParams();

  const [ newsDetails, setNewsDetails ] = useState([]);

  const getNewsById = async () => {
    try {
        await Axios.get(`https://bsi-portal-service-production.up.railway.app/news/details/${id}`).then((response) => {
            setNewsDetails(response.data);
        })
    } catch (err) {
        console.log(err);
    }
  }

  useEffect(() => {
    getNewsById();
  }, [id])
  
  return (
   <>
   <Appbar />
   {newsDetails.map((i) => {
   return (
   <Flex flexDirection="column" justifyContent="center" alignItems="center">
    <Flex width="620px" heigh="110px" border="1px solid" mt="50px">
        <Heading>{i.Title}</Heading>
    </Flex>

    <Flex width="620px" heigh="110px" border="1px solid" mt="10px">
        <Text>{moment(i.createdAt).format("DD MMMM YYYY")}, {Object.values(i.Tags).join(", ")}</Text>
    </Flex>

    <Flex flexDirection="column" width="620px" heigh="110px" border="1px solid" mt="80px" alignItems="flex-start">
        <Text textAlign="justify" letterSpacing="1px" overflowWrap="break-word">
        {parse(i.Content)}
        </Text> 
    </Flex>
   </Flex>
   )
   })}
   </>
  )
}

export default NewsDetails