import React from 'react';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';

function FormWrapper({
  onNext,
  onBack,
  isLoading,
  disabled = false,
  children,
}: {
  onNext: () => void;
  onBack?: () => void;
  isLoading: boolean;
  disabled?: boolean;
  children: React.ReactNode;
}) {
  return (
    <>
      <div className={'pb-16'}>{children}</div>
      <div
        className={`fixed bottom-0 left-0 z-50 flex h-16 w-full items-center justify-center gap-8
          border-t border-gray-300 bg-white shadow-border`}
      >
        {onBack && (
          <Button
            className={'w-32'}
            type={'button'}
            //disabled={isLoading}
            onClick={() => {
              console.log('going back');
              onBack?.();
            }}
          >
            Previous
          </Button>
        )}
        <Button
          className={'w-32'}
          type={'submit'}
          disabled={disabled || isLoading}
          onClick={onNext}
        >
          {isLoading ? <Loader2 className={'animate-spin'} /> : 'Next'}
        </Button>
      </div>
    </>
  );
}

export default FormWrapper;
