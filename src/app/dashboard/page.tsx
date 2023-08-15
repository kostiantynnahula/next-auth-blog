'use client'
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation";
import useSWR, { Fetcher } from 'swr';
import styles from './page.module.css';
import { Post } from "../blog/models";
import Image from 'next/image';

const Dashboard = () => {
  const session = useSession();
  const router = useRouter();

  const username = session.data?.user?.name || '';

  const fetcher = async (url: string) => {
    const result = (await fetch(url)).json();
    return result;
  }
  const { data, mutate, error, isLoading } = useSWR(
    `/api/posts?username=${username}`,
    fetcher,
  );

  if (session.status === 'loading') {
    return <p>Loading...</p>;
  }

  if (!session || session.status === 'unauthenticated') {
    router.push('/dashboard/login');
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const title = e.target[0].value;
    const desc = e.target[1].value;
    const img = e.target[2].value;
    const content = e.target[3].value;
    try {
      await fetch("/api/posts", {
        method: "POST",
        body: JSON.stringify({
          title,
          desc,
          img,
          content,
          username: session.data.user.name,
        }),
      });
      mutate();
      e.target.reset();
    } catch (error) {
      console.log(error);
    }
  }

  const handleDelete = async (id: string) => {
    try {
      await fetch(`/api/posts/${id}`, {
        method: "DELETE",
      });
      mutate();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.posts}>
        {isLoading ? "Loading" : data.map((post: Post) => (
          <div className={styles.post} key={post._id}>
            <div className={styles.imgContainer}>
              <Image src={post.img} alt={post.title} width={200} height={100}/>
            </div>
            <h2 className={styles.postTitle}>{post.title}</h2>
            <span className={styles.delete} onClick={() => handleDelete(post._id)}>X</span>
          </div>
        ))}
      </div>
      <form className={styles.new} onSubmit={handleSubmit}>
          <h1>Add New Post</h1>
          <input
            name="title"
            type="text" 
            placeholder="Title" 
            className={styles.input} 
          />
          <input
            name="desc"
            type="text" 
            placeholder="Desc" 
            className={styles.input} 
          />
          <input 
            name="image"          
            type="text" 
            placeholder="Image" 
            className={styles.input} 
          />
          <textarea 
            name="content"
            cols="30"
            rows="10"
            className={styles.textArea}
          />
          <button className={styles.button}> Send</button>
        </form>
    </div>
  )
}

export default Dashboard