import React from 'react';
import Nav from '../components/nav.client';

export default function MainLayout({ children }) {
  return (
    <>
      <Nav />
      <main>{children}</main>
    </>
  );
}
