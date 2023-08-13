import Image from 'next/image'
import styles from './page.module.css'
import { Post } from '@/app/blog/models';
import { Metadata } from 'next';

type Props = {
  params: {
    id: number;
  }
}

const getData = async (id: number): Promise<Post> => {
  const res = await fetch(`${process.env.API_PATH}/api/posts/${id}`, {
    cache: 'no-cache'
  });

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  return res.json();
}

export async function generateMetadata({params}: Props): Promise<Metadata> {
  const post = await getData(params.id);
  return {
    title: post.title,
    description: post.desc,
  }
}

const BlogId = async ({params}: Props) => {
  
  const data = await getData(params.id);

  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <div className={styles.info}>
          <h1 className={styles.title}>{data.title}</h1>
          <p className={styles.desc}>
            {data.desc}
          </p>
          <div className={styles.author}>
            <Image
              src={data.img}
              alt=""
              width={40}
              height={40}
              className={styles.avatar}
            />
            <span className={styles.username}>{data.username}</span>
          </div>
        </div>
        <div className={styles.imageContainer}>
          <Image
            src={data.img}
            alt=""
            fill={true}
            className={styles.image}
          />
        </div>
      </div>
      <div className={styles.content}>
        <p className={styles.text}>
        {data.content}
        </p>
      </div>
    </div>
  )
}

export default BlogId