'use client';

import { logout } from '@/app/(auth)/actions';

const Logout = () => {
  return (
    <button className="block px-4 py-2" onClick={() => logout()}>
      Logout
    </button>
  );
};

export default Logout;
