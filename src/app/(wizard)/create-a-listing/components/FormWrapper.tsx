import React from 'react';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';

function FormWrapper({
  onNext,
  onBack,
  isLoading,
  children,
}: {
  onNext: () => void;
  onBack?: () => void;
  isLoading: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <div>{children}</div>
      {onBack && (
        <Button type={'button'} disabled={isLoading} onClick={onBack}>
          Previous
        </Button>
      )}
      <Button type={'submit'} disabled={isLoading} onClick={onNext}>
        {isLoading ? <Loader2 className={'animate-spin'} /> : 'Next'}
      </Button>
    </div>
  );
}

export default FormWrapper;
