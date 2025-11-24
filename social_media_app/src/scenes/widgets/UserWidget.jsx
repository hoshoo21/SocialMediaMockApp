import {useState, useEffect} from 'react';
import { 
    ManageAccountsOutlined, 
    LocationOnOutlined,
    EditOutlined,
    WorkOutlineOutlined,

} from "@mui/icons-material";

import { Box, Typography, Divider,useTheme } from "@mui/material";
import UserImage from "../../components/UserImage";
import FlexBetween from "../../components/FlexBetween";
import WidgetWrapper from "../../components/WidgetWrapper";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";


const UserWidget =({userId, picturePath})=>{
    console.log(useTheme());
    const [user,setUser] = useState(null);
    const {palette} = useTheme();
    const navigate = useNavigate();
    const token = useSelector((state)=> state.token);
    console.log(token);
    const dark = palette.neutral.dark;
    const medium = palette.neutral.medium;
    const main = palette.neutral.main;
    const getUser = async ()=>{
       console.log(`http://localhost:3001/users/${userId}`);
       const response= await fetch(`http://localhost:3001/users/${userId}`,
            {
                method :'GET',
                headers: { Authorization: `Bearer ${token}` },
            }
        );
        const data = await response.json();
        setUser(data)

    }
    useEffect(()=>{
        getUser();
    },[])
    if (!user){
        return null;
    }
    const {firstName, 
        lastName,
         location, 
         occupation,
         viewedProfile, 
         imppressions, 
         friends 
        }= user;

    return (
        <WidgetWrapper>
            <FlexBetween
                gap = "0.5rem"
                pb = "1.1rem"
                onClick={()=>navigate(`/profile/${userId}`)}

            >
                <FlexBetween  gap="1rem">
                        <UserImage image = {picturePath} />
                        <Box>
                            <Typography variant='h4' 
                                fontWeight="500"
                                color={dark}
                                sx={{
                                    "&:hover":{
                                        color :palette.primary.light,
                                        cursor:"pointer"
                                    }
                                }}
                            >
                                {firstName} {lastName}
                                </Typography> 
                                <Typography color={medium}>
                                    {friends.length} friends
                                </Typography>
                               
                        </Box>
                        </FlexBetween>
                    
                        <ManageAccountsOutlined/> 
                        
                </FlexBetween>

                <Divider />
                <Box p="1rem 0">
                    <Box display="flex" alignItems="center" gap="1rem" mb="o.5rem" >
                        <LocationOnOutlined fontSize='large' sx={{
                            color:main
                        }}/>
                        <Typography color={medium} >{occupation} </Typography>

                    </Box>
                </Box>
                <Box p="1rem 0">
                    <FlexBetween mb="0.5rem">
                        <Typography color={medium}> Who's viewed your profile </Typography>
                        <Typography color ={main} fontWeight="500" > {viewedProfile} </Typography>
                    </FlexBetween>
                    <FlexBetween mb="0.5rem">
                        <Typography color={medium}> Impressions </Typography>
                        <Typography color ={main} fontWeight="500" > {imppressions} </Typography>
                    </FlexBetween>
                </Box>
                <Box p="1rem 0">
                <Typography fontSize="1rem" color={main} fontWeight="500" mb="5rem">
                    Social Profiles </Typography>
                <FlexBetween gap="1rem" mb="0.5rem">
                    <FlexBetween gap = "1rem">
                        <img src="../images/twitter.png" alt="twitter" />
                        <Box>
                            <Typography color={main} fontWeight="500">
                                Twitter
                            </Typography>
                            <Typography color ={medium} >Social Network</Typography>
                        </Box>                      

                    </FlexBetween>
                    <EditOutlined />
                </FlexBetween>
                <FlexBetween gap="1rem" mb="0.5rem">
                    <FlexBetween gap = "1rem">
                        <img src="../images/linkedin.png" alt="linkendin" />
                        <Box>
                            <Typography color={main} fontWeight="500">
                                Twitter
                            </Typography>
                            <Typography color ={medium} >Social Network</Typography>
                        </Box>                      

                    </FlexBetween>
                    <EditOutlined />
                </FlexBetween>
                </Box>
          
        </WidgetWrapper>
    )
}

export default UserWidget;