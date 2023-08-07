import styles from './button.module.css';
import Link from 'next/link';

type Props = {
  text: string;
  url: string;
}

const Button = ({text, url}: Props) => {
  return (
    <Link href={url}>
      <button className={styles.container}>{text}</button>
    </Link>
  )
}

export default Button