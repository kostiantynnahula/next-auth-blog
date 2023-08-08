import Button from '@/components/button/Button';
import styles from './page.module.css';
import Image from 'next/image';
import { items } from './data';
import { notFound } from 'next/navigation';

type Props = {
  params: {
    category: string
  }
};

const getData = (category: string) => {
  const data = items[category];
  if (data) {
    return data;
  }

  return notFound();
}

const Category = ({ params }: Props) => {
  const data = getData(params.category);
  return (
    <div className={styles.container}>
      <h1 className={styles.catTitle}>{params.category}</h1>
      {data.map((item, key) => (
        <div className={styles.item} key={key}>
        <div className={styles.content}>
          <h1 className={styles.title}>{item.title}</h1>
          <p className={styles.desc}>{item.desc}</p>
          <Button text="See More" url="#" />
        </div>
        <div className={styles.imgContainer}>
          <Image
            className={styles.img}
            fill={true}
            src={item.image}
            alt=""
          />
        </div>
      </div>
      ))}
    </div>
  )
}

export default Category