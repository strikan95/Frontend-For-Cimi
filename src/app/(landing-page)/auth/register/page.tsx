'use client';

import { FormEvent } from 'react';
import { Button } from '@/components/ui/button';

export default function Home() {
  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    let form = document.forms[0];
    let formData = new FormData(form);
    let data = JSON.stringify(Object.fromEntries(formData));

    try {
      const res = await fetch(`http://localhost:8080/api/v1/register`, {
        method: 'POST',
        body: data,
        headers: {
          'Content-Type': 'application/json',
        },
        referrer: 'no-referrer',
        cache: 'no-cache',
      });

      if (!res.ok) {
        return { error: 'There was an error', result: null };
      }
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <form id="registrationForm" onSubmit={handleSubmit}>
        <label htmlFor="email">Email:</label>
        <br />
        <input
          type="email"
          id="email"
          name="email"
          placeholder="john@mail.com"
        />
        <br />

        <label htmlFor="password">Password:</label>
        <br />
        <input type="password" id="password" name="password" placeholder="" />
        <br />

        <label htmlFor="firstName">First name:</label>
        <br />
        <input type="text" id="firstName" name="firstName" placeholder="John" />
        <br />

        <label htmlFor="lastName">Last name:</label>
        <br />
        <input type="text" id="lastName" name="lastName" placeholder="Doe" />
        <br />
        <br />

        <Button type="submit">Register</Button>
      </form>
    </main>
  );
}
