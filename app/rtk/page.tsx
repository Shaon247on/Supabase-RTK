"use client"

import { setSession } from "@/services/authSlice";
import { useGetPostsQuery, useCreatePostMutation } from "@/services/jsonPlaceholderApi";
import { RootState } from "@/store/store";
import { supabase } from "@/supabase/supabase-client";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

export default function Home() {
  const [newPost, setNewPost] = useState<{title: string; body: string; id: number; }>({title: "", body: "", id: 9999});
  const dispatch = useDispatch()
  const session = useSelector((state: RootState) => state.auth.session);

  console.log("Session from Redux store:", session);


  const {data, error, isLoading, refetch} = useGetPostsQuery({});
  const [createPost, {isLoading: isCreating, error: createError}] = useCreatePostMutation();

  const fetchSession = async ()=>{
    const {data} = await supabase.auth.getSession()

    if (data) {
      dispatch(setSession(data.session))
    }
  }

  useEffect(()=>{
   fetchSession() 

   const {data: authListner} = supabase.auth.onAuthStateChange((_event, session)=> {
    dispatch(setSession(session))
   }
  )
  return()=> {
    authListner.subscription.unsubscribe()
  }
  },[])

  if(isLoading) return <div>Loading...</div>;

  if(createError) return <div>Error creating post</div>;
  
  if(error) return <div>Error occurred</div>;

  const handleCreatePost = async()=>{
    await createPost(newPost)
    refetch()
  }





console.log("getting data:",data)

  return (
    <div>
      <h1>Create a new post:</h1>
      
      <div>
        <input type="text" placeholder="Title...." onChange={(e)=> setNewPost((perv)=> ({...perv, title: e.target.value,}))}/>
        <input type="text" placeholder="Body...."
        onChange={(e)=> setNewPost((perv)=> ({...perv, body: e.target.value}))}/>
        <button
        onClick={handleCreatePost}
        disabled={isCreating}
        >{isCreating ? "Creating..." : "Create Post"}</button>
      </div>
      <h1>All posts are here:</h1>
      <div>
        {
          data.map((post: any) =>(
            <div key={post.id}>
              <h2>{post.title}</h2>
              <p>{post.body}</p>
            </div>
          ))
        }
      </div>
    </div>
  );
}
