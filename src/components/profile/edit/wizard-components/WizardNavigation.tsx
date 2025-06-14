
import { Button } from '@/components/ui/button';
import { Loader2, ArrowLeft, ArrowRight, Save } from 'lucide-react';

interface WizardNavigationProps {
  currentStep: number;
  totalSteps: number;
  isLastStep: boolean;
  isSaving: boolean;
  isNewUser: boolean;
  onPrevious: () => void;
  onNext: () => void;
}

export const WizardNavigation = ({
  currentStep,
  totalSteps,
  isLastStep,
  isSaving,
  isNewUser,
  onPrevious,
  onNext
}: WizardNavigationProps) => {
  return (
    <div className="flex justify-between mt-8 pt-4 border-t">
      <Button 
        type="button" 
        variant="outline" 
        onClick={onPrevious} 
        disabled={currentStep === 0}
        size="lg"
      >
        <ArrowLeft className="mr-2 h-4 w-4" /> Previous
      </Button>
      
      {isLastStep ? (
        <Button 
          type="submit" 
          disabled={isSaving} 
          size="lg"
          className="min-w-[120px]"
        >
          {isSaving ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Saving...
            </>
          ) : (
            <>
              <Save className="mr-2 h-4 w-4" />
              {isNewUser ? 'Complete Setup' : 'Save Profile'}
            </>
          )}
        </Button>
      ) : (
        <Button 
          type="button" 
          onClick={onNext}
          size="lg"
        >
          Next <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      )}
    </div>
  );
};
