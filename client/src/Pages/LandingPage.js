import React, { useState, useContext, useEffect} from 'react'
import { EmailUser } from '../Helper/EmailUserProvider'
import { RoleUser } from '../Helper/RoleUserProvider'
import { useNavigate } from 'react-router-dom'
import Axios from 'axios'
import {
  Button
} from '@chakra-ui/react';
import '../Component/Profile/CreateProfile.css'
import CreateProfile from '../Component/Profile/CreateProfile';



const LandingPage = () => {
  
  Axios.defaults.withCredentials = true;

  let navigate = useNavigate();

  const { emailLog, setEmailLog } = useContext(EmailUser);
  const { roleUser, setRoleUser } = useContext(RoleUser);
  const [ isHide, setIsHide ] = useState(true);
  const [ dataProfileUser, setDataProfileUser ] = useState([]);



  const getProfileUser = async () => {
    await Axios.get("https://bsi-portal-service-production.up.railway.app/getprofile").then((response) => {
      setDataProfileUser(response.data);
    })
  }

  useEffect(() => {
   getProfileUser();
  }, [])
  

  return (
    <div className='wrapperCreateProfile'>
        <div className='profileContent-1'>
            <h1>Welcome to BSI Supplier Portal</h1>
            <p> 
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse dignissim porttitor ipsum ut cursus. Integer ante orci, porta vel odio et, rutrum fringilla nulla. Nunc elementum sapien at fermentum sollicitudin. Aliquam vel volutpat nunc. Pellentesque accumsan velit nec molestie maximus. Praesent eu enim efficitur, euismod massa vitae, faucibus lacus. Mauris sodales metus a tortor viverra feugiat.
              Integer sed rutrum dolor, non feugiat urna. Suspendisse justo lorem, euismod nec sagittis non, malesuada sit amet libero. Donec ac est ac tortor fermentum lacinia nec nec erat. Donec gravida justo tristique, ultricies sem quis, scelerisque leo. Morbi sed malesuada quam. Donec eget varius odio. Maecenas pellentesque ut massa ut convallis.
              Sed hendrerit diam nec felis sollicitudin dapibus. Morbi elementum est non mi egestas rutrum. Nunc non velit id nibh malesuada fringilla et ut ipsum. Curabitur posuere rutrum leo, quis vehicula leo sollicitudin non. Duis erat dolor, condimentum nec dignissim ut, eleifend at sem. Pellentesque ullamcorper eget sapien et dictum. Aenean sed fringilla tellus. Integer eu ligula convallis, iaculis purus in, blandit elit. In ut tincidunt sapien.
              Nam dictum erat odio, commodo gravida lorem venenatis non. Morbi diam dolor, interdum ut felis condimentum, rhoncus congue sem. Pellentesque et sagittis massa. Nullam pulvinar scelerisque dolor ut ultricies. Curabitur eget mauris pharetra, faucibus nisl eget, molestie risus. Suspendisse pharetra, justo non faucibus volutpat, dolor tortor auctor lacus, non fringilla ipsum massa a nulla. Donec gravida blandit varius.
              Nam tempor venenatis cursus. In ullamcorper nec eros eu cursus. Pellentesque in mauris tempus, molestie lorem id, porttitor lectus. Cras eget neque nec enim rutrum pulvinar vel quis ex. Donec maximus at augue ut blandit. Morbi fermentum justo magna, ac facilisis est efficitur et. Aliquam erat volutpat. In rutrum ipsum a rhoncus ultrices. Morbi sollicitudin varius urna ac dapibus. Etiam euismod leo lacus, in malesuada odio pretium eget. Aenean aliquet felis nisl, quis tempus purus eleifend eu. Vestibulum in molestie quam. Curabitur quis diam sed nunc porttitor eleifend. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </p>
            <div style={{display : "flex", justifyContent : "center", alignItems : "center"}}> 
            
                {dataProfileUser.CompanyName === "" || dataProfileUser.length <= 0  ? 
                <Button width={150} onClick={() => setIsHide(false)}>Create Profile</Button>
                :
                null
                }
                {dataProfileUser.CompanyName === "" || dataProfileUser.length <= 0 ?
                null
                :
                  <a href="/home">
                    <Button width={150}>Home</Button>
                  </a>
                }
              
            </div>
        </div>
        
        {isHide === false ? 
        <div className='profileContent-2'>
          <CreateProfile />
        </div>
        :
        null
        }
    </div>
  )
}

export default LandingPage