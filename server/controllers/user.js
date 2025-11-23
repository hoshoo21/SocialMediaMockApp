import User from "../models/user.js";

export const getUser = async (req,res)=>{
    try{
        const {id} = req.params;
        const user = await User.findById(id);
        res.status(200).json(user);    
    }
    catch(err){
        res.status(500).json({'error': err.error });
    }
};

export const getUserFriends = async (req, res)=>{
    try {
        const {id} = req.params;
        const user = User.findById(id);
        const friends = await Promise.all(
            user.friends.map((id)=>User.findById(id))
        );
        const formattedFriends= friends.map((
            {_id, firstName, lastName, occupation, location,picturePath})=>{
                return {_id, firstName, lastName, occupation, location, picturePath}
            });
        return res.status(200).json({"friends":formattedFriends});
    }
    catch(err){
        res.status(500).json({"error":err.error});
    }
}
/*update */
export const addRemoveFriend=async (req,res)=>{
    try{
        const {id, friendid}= req.params;
        const user = await User.findById(id);
        const friend = await User.findById(friendid);
        if (user.friends.includes(friendid)){
            user.friends = user.friends.filter((id)=> id != friendid);
            friend.friends = friend.friends.filter((id)=> id != id);
        
        }
        else {
            user.friends.push(friend.id);
            friend.friends.push(user.id);
        }
        await user.save()
        await friend.save();
        const friends = await Promise.all(
            user.friends.map((id)=>User.findById(id))
        );
        const formattedFriends= friends.map((
            {_id, firstName, lastName, occupation, location,picturePath})=>{
                return {_id, firstName, lastName, occupation, location, picturePath}
            });
        return res.status(200).json({"friends":formattedFriends});
    }
    catch(err){
        res.status(500).json({"error":err.error});
    }
}