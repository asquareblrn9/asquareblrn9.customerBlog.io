import React, { useEffect, useState } from 'react';
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { auth, db, storage } from '../config/firebase';
import Navblog from '../components/Navblog';
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const AddBlog = () => {
    const navigate = useNavigate()
    //checking if user is logged in
    useEffect(()=>{
if(!auth){
navigate('/login')
    }
    },[])
    
  const [title, setTitle] = useState('');
  const [post, setPost] = useState('');
  const [img, setImg] = useState(null);

  // Store the post in Firebase database and image in Firebase storage
  const handlePost = async (e) => {
    e.preventDefault();

    try {
      // Storing the image
      const storageRef = ref(
        storage,
        `/images/${Date.now()}${img.name}`
      );
      
      // Check image upload and upload post
      const uploadImage = await uploadBytesResumable(storageRef, img);
      //get image url
      const url = await getDownloadURL(uploadImage.ref);
        //connect to collections
      const postRef = await collection(db, "posts");
      //post into firebase storage
      await addDoc(postRef, {
        title: title,
        post: post,
        imageUrl: url,
        createdAt: Timestamp.now().toDate(),
        createdBy: auth.currentUser.uid,
        author: auth.currentUser.email
      });

      toast("Post Added Successfully", { type: "success" });
    } catch (error) {
      console.error('Error adding blog post:', error);
      toast("Error adding blog post", { type: "error" });
    }
  }

    return (
        <>
        <Navblog />
            <section className="bg-gray-50 dark:bg-dark-900">
                <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                    <a href="/" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
                        Customer App
                    </a>
                    <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                                Add blog post
                            </h1>
                            <form className="space-y-4 md:space-y-6" onSubmit={handlePost} >
                                <div>
                                    <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Post Title</label>
                                    <input type="text" name="title" id="title" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="post title" required="" onChange={(e)=>setTitle(e.target.value)} />
                                </div>
                                <div>

                                    <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Post</label>
                                    <textarea id="message" rows="4" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write your thoughts here..." onChange={(e)=>setPost(e.target.value)}></textarea>

                                </div>

                                <div>
                                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="file_input">Upload file</label>
                                    <input className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" aria-describedby="file_input_help" id="file_input" type="file" onChange={(e)=>setImg(e.target.files[0])} />
                                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-300" id="file_input_help">SVG, PNG, JPG or GIF (MAX. 800x400px).</p>
                                </div>


                                <button type="submit" className="w-full text-white bg-blue-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-blue-700 dark:focus:ring-primary-500">Post</button>
                               
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default AddBlog