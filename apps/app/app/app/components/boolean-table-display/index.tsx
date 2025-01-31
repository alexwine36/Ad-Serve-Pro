import { Checkbox } from '@repo/design-system/components/ui/checkbox';

type BooleanTableDisplayProps = {
  value: boolean;
};
export const BooleanTableDisplay = ({ value }: BooleanTableDisplayProps) => {
  return (
    <div className="flex items-center justify-center">
      <Checkbox checked={value} disabled />
    </div>
  );
};
