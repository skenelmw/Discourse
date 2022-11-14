import type { NextPage } from 'next'
import Image from 'next/image'
import { useSession } from "@supabase/auth-helpers-react";
import styles from '../styles/Home.module.css'
import Link from 'next/link';


const Home: NextPage = () => {
  
 const session = useSession()
  
  return (

    <div>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to Discourse!
        </h1>

        <p className={styles.description}>
          A personal project by Lily Skene
        </p>
        <p>
          User: { session && <code>{ JSON.stringify(session.user) }</code>  }
        </p>
        <Link href="/new_room">Create a new Chat room here</Link>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>

    
  )
}

export default Home
