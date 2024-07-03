import { redirect } from 'next/navigation';
import { startWizardProcess } from '@/lib/cimi/api/draft';

async function Page() {
  const data = await startWizardProcess();
  if (data.result) {
    redirect(`/create-a-listing/${data.result}`);
  }

  return null;
}

export default Page;
