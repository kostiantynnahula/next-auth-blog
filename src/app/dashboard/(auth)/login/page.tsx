'use client'

import { signIn, useSession } from 'next-auth/react'
import styles from './page.module.css'
import { useRouter } from 'next/navigation';

const Login = () => {
  const session = useSession();
  const router = useRouter();

  const handleSubmit = (e: any) => {
    e.preventDefault();

    const email = e.target.email.value;
    const password = e.target.password.value;
        
    signIn('credentials', {
      email, password
    });
  }

  if (session.status === 'loading') {
    return <p>Loading...</p>
  }

  if (session.status === 'authenticated') {
    router.push('/dashboard');
  }

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input 
          type="email"
          placeholder='Email'
          name='email'
          required
          className={styles.input} 
        />
        <input
          type='password'
          placeholder='Password'
          name='password'
          required
          className={styles.input}
        />
        <button className={styles.button}>Login</button>
      </form>
      <button onClick={() => signIn('google')}>Login with google</button>
    </div>
  )
}

export default Login