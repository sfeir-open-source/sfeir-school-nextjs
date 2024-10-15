'use client';

import { logout } from '@/app/(auth)/actions';

const Logout = ({ ...rest }) => {
  return (
    <button {...rest} onClick={() => logout()}>
      Logout
    </button>
  );
};

export default Logout;
