import { useRouter } from 'next/router';
import {useState} from "react";
import Head from "next/head";
import styles from "../../styles/Home.module.css";
import {Button, Link} from "@material-ui/core";
import prisma from "../../lib/prisma";

export default function Bar({ initialBar }) {
  // const router = useRouter();
  // const slug = router.query.slug || [];

  const [bar, setBar] = useState(initialBar);
  return (
    <>
      <Head>
        <title>{bar.owner.firstName}'s Bar!</title>
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to {bar.owner.firstName}'s Bourbon Bar!
        </h1>

        <p>There are {bar.bourbons.length} bourbons!</p>
        <div>{displayBourbons(bar.bourbons)}</div>

        <Link href="/">Back</Link>
      </main>
    </>
  );
}

export async function getServerSideProps({ params }) {
  // Check correct slug
  if (params.slug && params.slug.length >= 2) {
    const username = params.slug[0];
    const barId = params.slug[1];
    const bar = await prisma.bar.findUnique({
      where: {
        id: barId
      },
      include: {
        owner: true,
        bourbons: true
      }
    });
    return {
      props: {
        initialBar: JSON.parse(JSON.stringify(bar))
      }
    };
  }
  console.error("Invalid path")
  return null;
}

function displayBourbons(bourbons) {
  if (bourbons.length > 0) {
    let rows = [];
    bourbons.map((bourbon, index) => {
      rows.push(displayBourbon(bourbon, index));
    });
    return <div>{rows}</div>
  }
  return <div>No bourbons!</div>
}

function displayBourbon(bourbon, id) {
  return (
    <div key={id}>
      <h3>
        <Link href={`/bourbons/${bourbon.id}`}>{bourbon.title}</Link>
      </h3>
      <p>Test text for bourbon {bourbon.id}</p>
    </div>
  );
}
