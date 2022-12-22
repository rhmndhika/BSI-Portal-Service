import React from 'react';
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
  Image
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';

export default function blogPostWithImage() {
  return (
    <Center py={6}>
      <Box
        maxW={'345px'}
        w={'full'}
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
            src=
              'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
          />
        </Box>
        <Stack>
          <Tag
            colorScheme={'teal'}
            variant='solid'
            textTransform={'uppercase'}
            fontWeight={500}
            fontSize={'sm'}
            letterSpacing={1.1}
            mt={'10px'}
            width="max-content">
            Tag
          </Tag>
          <Heading
            fontSize={'2xl'}
            fontFamily={'body'}>
            Boost your conversion rate
          </Heading>
          <Link to="/news/details">
            <Text color='teal.400' href='#' cursor="pointer">
              Continue Reading
            </Text>
          </Link>
        </Stack>
        <Stack mt={6} direction={'row'} spacing={4} align={'center'}>
          <Stack direction={'column'} spacing={0} fontSize={'sm'}>
            <Text fontWeight={600}>Achim Rolle</Text>
            <Text color={'gray.500'}>Feb 08, 2021</Text>
          </Stack>
        </Stack>
      </Box>
    </Center>
  );
}