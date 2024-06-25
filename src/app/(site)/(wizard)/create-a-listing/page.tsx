import { startWizardProcess } from '@/lib/cimi/api/host';
import { redirect } from 'next/navigation';

async function Page() {
  const data = await startWizardProcess();
  if (data.result) {
    redirect(`/create-a-listing/${data.result}`);
  }

  return (
    <>
      <div>Spinner here</div>
    </>
  );
}

export default Page;
