import React, { useEffect, useState } from 'react';
import { getUserPosts } from '../../services/postservices';
import UserPostCard from './UserPostCard';
import OtherUserPostCard from './OtherUserPostCard';

export default function UserPosts({ userId,flag }) {
  const [userPost, setUserPost] = useState([]);

  const fetchUserPosts = () => {
    getUserPosts(userId)
      .then((res) => {
        setUserPost(res);
      })
      .catch((err) => console.log(err.message));
  };

  useEffect(() => {
    fetchUserPosts();
  }, [userId]);


  return (
    <div className="grid grid-cols-3 gap-1">
      {userPost.map((data) => (
          flag===true ? <UserPostCard key={data._id} data={data}/> : <OtherUserPostCard key={data._id} data={data}/>
      ))}
    </div>
  );
}
