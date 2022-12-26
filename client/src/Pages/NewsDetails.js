import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import Appbar from '../Component/Appbar/Appbar.tsx';
import { Flex, Heading, Spinner, Text } from '@chakra-ui/react';
import moment from 'moment';
import parse from 'html-react-parser';

const NewsDetails = () => {

  Axios.defaults.withCredentials = true

  let navigate = useNavigate();

  const { id } = useParams();

  const [ newsDetails, setNewsDetails ] = useState([]);
  const { isLoading, setIsLoading } = useState(false);


  useEffect(() => {
    const cancelToken = Axios.CancelToken.source();

    Axios.get(`https://bsi-portal-service-production.up.railway.app/news/details/${id}`, {
      cancelToken : cancelToken.token,
    }).then((response) => {
      setNewsDetails(response.data);
      setIsLoading(true);
    }).catch((err) => {
      if (Axios.isCancel(err)){
        console.log("canceled");
      } else {
        console.log("not canceled")
      }
    });

    return () => {
      cancelToken.cancel();
    }   
   }, [id])

  return (
   <>
   <Appbar />
   {isLoading === false ? 
    <Spinner />
    :
   <Flex flexDirection="column" justifyContent="center" alignItems="center" marginBottom="20px">
    <Flex width="620px" heigh="110px" border="1px solid" mt="50px">
        <Heading>{newsDetails.Title}</Heading>
    </Flex>

    <Flex width="620px" heigh="110px" border="1px solid" mt="10px">
        <Text>{moment(newsDetails.createdAt).format("DD MMMM YYYY, h:mm:ss a")}, {newsDetails.Tags}</Text>
    </Flex>

    <Flex flexDirection="column" width="620px" heigh="110px" border="1px solid" mt="80px" alignItems="flex-start">
        <Text textAlign="justify" letterSpacing="1px" overflowWrap="break-word">
        {parse(`${newsDetails.Content}`)}
        </Text> 
    </Flex>
   </Flex>
   }
   </>
  )
}

export default NewsDetails