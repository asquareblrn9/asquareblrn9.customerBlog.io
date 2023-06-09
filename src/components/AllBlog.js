import React, { useEffect, useState } from 'react'
import Navblog from './Navblog'
import { auth, db } from '../config/firebase'
import { collection, doc, getDocs, onSnapshot } from "firebase/firestore";
import Spinner1 from './Spinner1'


const AllBlog = () => {
    const[allPost, setAllPost] = useState(null)
    //connect db
    const postsCollectionRef = collection(db, "posts");

    //fetch all posts
    useEffect(()=>{
     const getPosts = async () => {
      const data = await getDocs(postsCollectionRef);
      setAllPost(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    getPosts();

    
    },[])

    if(!allPost)
    return(<Spinner1 />)
  return (
    
      <>
      <Navblog />
      <main className="pt-8 pb-16 lg:pt-16 lg:pb-24 bg-white dark:bg-gray-100">
        {allPost.length == 0 ? 
        <div className='text-center text-3xl font-extrabold leading-tight text-gray-900'>No blog post </div>
        : 
        allPost.map((items)=>
            <><div className="flex justify-between px-4 mx-auto max-w-screen-xl mt-5">
                <article className="mx-auto w-full max-w-2xl format format-sm sm:format-base lg:format-lg format-blue dark:format-invert">
                    <header className="mb-4 lg:mb-6 not-format">
                        <address className="flex items-center mb-6 not-italic">
                            <div className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white">
                                <img className="mr-4 w-16 h-16 rounded-full" src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973461_1280.png" alt="avartar" />
                                <div>
                                    <p className="text-xl font-bold text-gray-900 dark:text-dark">By {items.author}</p>
                                </div>
                            </div>
                        </address>
                        <h1 className="mb-4 text-3xl font-extrabold leading-tight text-gray-900 lg:mb-6 lg:text-4xl dark:text-gray-500">{items.title}</h1>
                    </header>
                    <figure><img src={items.imageUrl} alt={items.imageUrl} />

                    </figure>
                    
                    <p>{items.post}</p>
                </article>
            </div><hr /></>
        )}
          
                      </main>
                
                 </>
   
  )
}

export default AllBlog
