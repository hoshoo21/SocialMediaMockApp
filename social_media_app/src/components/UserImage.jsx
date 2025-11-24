import { Box } from "@mui/material"
const UserImage =({image,size="60px"})=>{
    console.log(image);
    console.log("Final image path:", `http://localhost:3001/assets/${image}`);
    return (
        <Box width={size} height={size}>
            <img style={{objectFit:"cover", borderRadius:"50%",}}
                 width={size} height={size}
                alt ="user" 
                src={`http://localhost:3001/assets/${image}`}
                />
            
        </Box>
    )
}

export default UserImage;