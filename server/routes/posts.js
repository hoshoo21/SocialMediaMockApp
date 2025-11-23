import express from 'express';
import {getFeedPosts, getUserPosts, likePost} from '../controllers/posts.js';
import { verifyToken } from '../middlewares/auth.js';

const router = express.Router();

router.use((req, res, next) => {
    console.log("Matched route:", req.path);
    next();
  });

/* Router */

router.get('/',verifyToken, getFeedPosts);
router.get("/:userid/posts", verifyToken, getUserPosts );

router.patch("/:id/like", verifyToken, likePost);



export default router;