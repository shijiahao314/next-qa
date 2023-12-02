'use client';

import React, { Suspense } from 'react';
import Loading from './loading';
import { useSelectedLayoutSegment } from 'next/navigation';

import './globals.css';

export default function RootLayout(props: {
  children: React.ReactNode;
  analytics: React.ReactNode;
  team: React.ReactNode;
  auth: React.ReactNode;
  modal: React.ReactNode;
}) {
  const loginSegments = useSelectedLayoutSegment('auth');
  console.log('loginSegments=');
  console.log(loginSegments);

  return (
    <html lang="en">
      <body>
        <Suspense fallback={<Loading></Loading>}>
          <h1>---RootLayout up---</h1>
          <h2>---props.children---</h2>
          {props.children}
          <h2>---props.analytics---</h2>
          {props.analytics}
          <h2>---props.team---</h2>
          {props.team}
          <h2>---props.auth---</h2>
          {props.auth}
          <h2>---props.modal---</h2>
          {props.modal}
          <h1>---RootLayout down---</h1>
        </Suspense>
      </body>
    </html>
  );
}
