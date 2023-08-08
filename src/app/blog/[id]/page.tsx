import Image from 'next/image'
import styles from './page.module.css'
import { Post } from '@/app/blog/models';

type Props = {
  params: {
    id: number;
  }
}

const getData = async (id: number): Promise<Post> => {
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  return res.json();
}

const BlogId = async ({params}: Props) => {
  
  const data = await getData(params.id);

  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <div className={styles.info}>
          <h1 className={styles.title}>{data.title}</h1>
          <p className={styles.desc}>
            {data.body}
          </p>
          <div className={styles.author}>
            <Image
              src=''
              alt=""
              width={40}
              height={40}
              className={styles.avatar}
            />
            <span className={styles.username}>username</span>
          </div>
        </div>
        <div className={styles.imageContainer}>
          <Image
            src=''
            alt=""
            fill={true}
            className={styles.image}
          />
        </div>
      </div>
      <div className={styles.content}>
        <p className={styles.text}>
        desc
        </p>
      </div>
    </div>
  )
}

export default BlogId