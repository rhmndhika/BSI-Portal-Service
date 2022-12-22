import React from 'react';
import Appbar from '../Component/Appbar/Appbar.tsx';
import { Flex, Heading, Text } from '@chakra-ui/react';

const NewsDetails = () => {
  return (
   <>
   <Appbar />
   <Flex flexDirection="column" justifyContent="center" alignItems="center">
    <Flex width="620px" heigh="110px" border="1px solid" mt="50px">
        <Heading>滕王阁序</Heading>
    </Flex>

    <Flex width="620px" heigh="110px" border="1px solid" mt="10px">
        <Text>Desember 2022, Health, Education, Gaming </Text>
    </Flex>

    <Flex flexDirection="column" width="620px" heigh="110px" border="1px solid" mt="80px" alignItems="flex-start">
        <Text textAlign="justify" letterSpacing="1px" overflowWrap="break-word">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas porta augue nec nibh sagittis, vel feugiat dolor venenatis. 
        Vivamus ut scelerisque lacus. Nam est neque, rutrum nec pulvinar id, maximus a eros. Curabitur dictum hendrerit venenatis. 
        Fusce mattis, sapien vel vestibulum iaculis, est augue vehicula diam, at ullamcorper ante enim et mauris. Donec pretium bibendum euismod. 
        Sed condimentum ex vitae tellus tincidunt ultrices. Nunc suscipit auctor odio, a lacinia sem posuere ut. 
        Integer pellentesque pretium sem, sed hendrerit ipsum mattis non. Aliquam arcu sem, pretium non auctor in, tempor auctor turpis. A
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas porta augue nec nibh sagittis, vel feugiat dolor venenatis. 
        Vivamus ut scelerisque lacus. Nam est neque, rutrum nec pulvinar id, maximus a eros. Curabitur dictum hendrerit venenatis. 
        Fusce mattis, sapien vel vestibulum iaculis, est augue vehicula diam, at ullamcorper ante enim et mauris. Donec pretium bibendum euismod. 
        Sed condimentum ex vitae tellus tincidunt ultrices. Nunc suscipit auctor odio, a lacinia sem posuere ut. 
        Integer pellentesque pretium sem, sed hendrerit ipsum mattis non. Aliquam arcu sem, pretium non auctor in, tempor auctor turpis. 
        </Text> 
    </Flex>
   </Flex>
   </>
  )
}

export default NewsDetails