import Head from 'next/head'
import styles from '../styles/Home.module.css'
import {Button, Link} from '@material-ui/core';
import prisma from "../lib/prisma";
import {useState} from "react";

export default function Home({ initialBars }) {
  const [bars, setBars] = useState(initialBars);
  return (
    <div className={styles.container}>
      <Head>
        <title>Bourbon Bar</title>
        <link rel="icon" href="/favicon.ico"/>
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to the Bourbon Bar App!
        </h1>

        <Link href="/login">Login</Link>

        <p>There are {bars ? bars.length : 0} bars!</p>
        <div>{displayBars(bars)}</div>

        <Button variant="contained" color="primary">Hello world</Button>
      </main>

      <footer className={styles.footer}>
        (c) 2021 Bourbon App
      </footer>
    </div>
  )
}

export async function getServerSideProps() {
  const bars = await prisma.bar.findMany({
    include: {
      owner: true
    }
  });
  return {
    props: {
      initialBars: JSON.parse(JSON.stringify(bars))
    }
  };
}

function displayBars(bars) {
  if (bars && bars.length > 0) {
    let rows = [];
    bars.map((bar, index) => {
      rows.push(displayBar(bar, index))
    });
    return <div>{rows}</div>
  }
  return <div>No bars!</div>
}

function displayBar(bar, id) {
  if (bar.owner) {
    return (
      <div key={id}>
        <h3>
          <Link href={`/bars/${bar.owner.username}/${bar.id}`}>{bar.owner.firstName}'s Bar</Link>
        </h3>
        <p>Test text for bar {bar.id}</p>
      </div>
    );
  } else {
    return (
      <div key={id}>
        <p>Error getting bar owner info</p>
      </div>
    );
  }
}
