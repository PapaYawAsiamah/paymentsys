import React from 'react';
import Link from 'next/link';

const Navbar = () => {
  return (
    <ul>
    <li>
      <Link href="/" >
        <a>Members</a>
      </Link>
    </li>
    <li >
      <Link href="/MembersHistory" >
        <a>Payment History</a>
      </Link>
    </li>
   
  </ul>
  )
}

export default Navbar