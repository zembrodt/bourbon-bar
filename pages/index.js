import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import {Button, Link} from "@material-ui/core";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Bourbon Bar</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to my Bourbon Bar!
        </h1>

          <Link href="/bourbon">Bourbon</Link>

        <Button variant="contained" color="primary">Hello world</Button>
      </main>

      <footer className={styles.footer}>
        (c) 2021 Bourbon App
      </footer>
    </div>
  )
}
