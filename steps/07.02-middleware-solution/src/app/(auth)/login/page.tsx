'use client';

import { useActionState } from 'react';

import TextField from '@/components/TextField';
import Button from '@/components/Button';
import Alert from '@/components/Alert';

import { login } from './../actions';

const LoginPage = () => {
  // @ts-ignore
  const [state, formAction] = useActionState<ActionState, Action>(login, { error: null } as unknown as void);

  return (
    <form action={formAction} className="w-full max-w-md m-auto">
      <h1 className="text-2xl font-bold mb-4">Welcome !</h1>
      <TextField type="text" id="username" name="username" label="Username" placeholder="Username" autoComplete="off" />
      <TextField
        type="password"
        id="password"
        name="password"
        label="Password"
        placeholder="Password"
        className="mt-4"
      />
      {state.error && <Alert className="mt-4">{state.error}</Alert>}
      <Button variant="primary" type="submit" className="mt-4">
        Login
      </Button>
    </form>
  );
};

export default LoginPage;
