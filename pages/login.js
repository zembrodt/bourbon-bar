import Head from "next/head";
import {Button, Link, TextField} from "@material-ui/core";
import {createRef, useState} from "react";

export default function Login() {
  const loginRef = createRef();
  const passwordRef = createRef();
  const [message, setMessage] = useState(null);

  async function handleLogin() {
    const res = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        login: loginRef.current?.value,
        password: passwordRef.current?.value
      })
    });
    const json = await res.json();
    setMessage(json);
  }

  return (
    <>
      <Head>
        <title>Login</title>
      </Head>
      <main>
        <h1>Bourbon Bar Login</h1>
        {message ? (<p>{JSON.stringify(message)}</p>) : ''}
        <form autoComplete="off">
          <TextField id="standard-basic" label="Username/Email" inputRef={loginRef} /><br/>
          <TextField id="standard-basic" type="password" label="Password" inputRef={passwordRef} /><br/>
          <Button onClick={handleLogin} variant="contained" color="primary">Login</Button>
        </form>
        <Link href="/signup">Don't have an account?</Link><br/>
        <Link href="/reset-password">Forgot password?</Link>
      </main>
    </>
  );
}
