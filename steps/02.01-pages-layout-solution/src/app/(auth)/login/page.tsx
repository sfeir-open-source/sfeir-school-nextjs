import { Metadata } from 'next';

import TextField from '@/components/TextField';
import Button from '@/components/Button';

export const metadata: Metadata = {
  title: 'SFEIR People | Login',
};

const LoginPage = () => {
  return (
    <form className="w-full max-w-md m-auto">
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
      <Button variant="primary" type="submit" className="mt-4">
        Login
      </Button>
    </form>
  );
};

export default LoginPage;
