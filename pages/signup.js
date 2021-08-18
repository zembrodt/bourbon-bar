import Head from "next/head";
import {Button, Link, TextField} from "@material-ui/core";
import {createRef, useState} from "react";

export default function Login() {
  const emailRef = createRef();
  const usernameRef = createRef();
  const passwordRef = createRef();
  const firstNameRef = createRef();
  const lastNameRef = createRef();
  const [message, setMessage] = useState(null);

  async function handleSignup() {
    const res = await fetch('/api/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: emailRef.current?.value,
        username: usernameRef.current?.value,
        password: passwordRef.current?.value,
        firstName: firstNameRef.current?.value,
        lastName: lastNameRef.current?.value
      })
    });
    const json = await res.json();
    setMessage(json);
  }

  return (
    <>
      <Head>
        <title>Signup</title>
      </Head>
      <main>
        <h1>Bourbon Bar Signup</h1>
        {message ? (<p>{JSON.stringify(message)}</p>) : ''}
        <form autoComplete="off">
          <TextField id="standard-basic" label="Email" inputRef={emailRef} /><br/>
          <TextField id="standard-basic" label="Username" inputRef={usernameRef} /><br/>
          <TextField id="standard-basic" type="password" label="Password" inputRef={passwordRef} /><br/>
          <TextField id="standard-basic" label="First Name" inputRef={firstNameRef} /><br/>
          <TextField id="standard-basic" label="Last Name" inputRef={lastNameRef} /><br/>
          <Button onClick={handleSignup} variant="contained" color="primary">Signup</Button>
        </form>
        <Link href="/login">Already have an account?</Link>
      </main>
    </>
  );
}
