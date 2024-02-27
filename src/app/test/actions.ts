'use server';

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function loadTest() {
  await delay(3000);
  return { data: ['1', '2', '3', '4'] };
}
