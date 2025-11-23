import Posts from "../models/posts.js";
import User from "../models/user.js";

/*create */

export const createPost = async(req,res)=>{
    try{
        const {userId, description, picturePath} = req.body;
        const user = User.findById(userId);
        const newPost = new Posts({
            userId,
            firstName :user.firstName,
            lastName :user.lastName,
            location :user.location,
            description,
            userPicturePath:user.picturePath,
            picturePath,
            likes :{},
            comments:[],
        })
        await newPost.save();
        const posts = await Posts.find();
        return res.status(201).json(posts);
    }
    catch(err){
        res.status(500).json({'error': err.error});
    }
}

export const getFeedPosts = async(req, res)=>{
    try{
        const fetchedPosts = await Posts.find()
        res.status(201).json({fetchedPosts});
    }  
    catch(err){
        res.status(404).json({'error' :err.error});
    }
}

export const getUserPosts = async(req, res)=>{
    try{
        const {userId} = req.params;
        const fetchedPosts = await Posts.find({userId});
        res.status(200).json(fetchedPosts);
    }
    catch(err){
        res.status(404).json({'error':err.error})
    }
}

export const likePost = async(req,res)=>{
    try{
        const {id} = req.params;
        const {userId} = req.body;
        const post = await Posts.findById(id);
        const isLiked = post.likes.get(userId);
        if (isLiked){
            post.likes.delete(userId);
        }
        else {
            post.likes.set(userId,true)
        }
        const updatedPost = await Posts.findByIdAndUpdate(
            id,
            {likes : post.likes},
            {new : true},
        );
        res.status(200).json(updatedPost);
    }
    catch(err){
        req.status(404).json({'error':err.error});
    }
}