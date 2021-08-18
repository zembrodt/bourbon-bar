import Head from 'next/head';
import {Link} from '@material-ui/core';
import styles from "../../styles/Home.module.css";
import prisma from "../../lib/prisma";
import {useState} from "react";
import {useRouter} from "next/router";

export default function Bourbon({ initialBourbon }) {
  const [bourbon, setBourbon] = useState(initialBourbon);
  const router = useRouter();
  return (
    <div>
      <Head>
        <title>{bourbon.title}</title>
      </Head>
      <main className={styles.main}>
        <h1 className={styles.title}>
          {bourbon.title}
        </h1>
        <p>I hope you like this bourbon!</p>
        <p>Created at: {bourbon.createdAt}</p>
        <p>Updated at: {bourbon.updatedAt}</p>
      </main>
    </div>
  );
}

/*export async function getStaticPaths() {
  const res = await fetch('http://localhost:3000/api/bourbons');
  const bars = await res.json();

  const paths = bars.map((bourbon) => ({
    params: {bourbonId: bourbon.bourbonId.toString()},
  }));

  return { paths, fallback: false }
}*/

export async function getServerSideProps({ params }) {
  const bourbon = await prisma.bourbon.findUnique({
    where: {
      id: params.bourbonId
    }
  })
  return {
    props: {
      initialBourbon: JSON.parse(JSON.stringify(bourbon))
    }
  };
}
