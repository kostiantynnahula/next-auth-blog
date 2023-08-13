'use client'

import { useState } from 'react';
import styles from './page.module.css';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const Register = () => {

  const [error, setError] = useState(null);
  const router = useRouter();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    
    const name = e.target.username.value;
    const email = e.target.email.value;
    const password = e.target.password.value;

    try {

      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password })
      });

      res.status === 201 && router.push('/dashboard/login?success=Account has been created')
    } catch (error: any) {
      setError(error);
      console.log(error);
    }
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Create an Account</h1>
      <h2 className={styles.subtitle}>Please sign up to see the dashboard.</h2>
      <form className={styles.form} onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          name='username'
          required
          className={styles.input}
        />
        <input
          type="text"
          placeholder="Email"
          name='email'
          required
          className={styles.input}
        />
        <input
          type="password"
          placeholder="Password"
          name='password'
          required
          className={styles.input}
        />
        <button className={styles.button}>Register</button>
        {error && 'Something went wrong!'}
      </form>
      <span className={styles.or}>- OR -</span>
      <Link className={styles.link} href="/dashboard/login">
        Login with an existing account
      </Link>
    </div>
  )
}

export default Register