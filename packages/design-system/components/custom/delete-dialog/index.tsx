import { Loader, Trash } from 'lucide-react';
import pluralize from 'pluralize-esm';
import React from 'react';
import { useBreakpoint } from '../../../hooks/use-media-query';
import { useToast } from '../../../hooks/use-toast';
import { Badge } from '../../ui/badge';
import { Button } from '../../ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../../ui/dialog';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '../../ui/drawer';

export type DeleteDialogProps<T> = {
  data: T[];
  showTrigger?: boolean;
  label: string;
  handleDelete: (data: T[]) => Promise<void>;
  onSuccess?: () => void;
} & React.ComponentPropsWithoutRef<typeof Dialog>;

const DeleteDialogDescription = ({
  count,
  label,
}: {
  count: number;
  label: string;
}) => {
  const labelDisplay = pluralize(label, count);
  return (
    <DrawerDescription>
      This action cannot be undone. This will permanently delete{' '}
      <span className="font-bold">{count}</span> {labelDisplay} from our
      servers.
    </DrawerDescription>
  );
};

export const DeleteDialog = <T,>({
  label,
  data,
  showTrigger,
  onSuccess,
  handleDelete,
  ...props
}: DeleteDialogProps<T>) => {
  const [isDeletePending, startDeleteTransition] = React.useTransition();

  const { toast } = useToast();

  const onDelete = () => {
    startDeleteTransition(async () => {
      try {
        await handleDelete(data);
        toast({
          title: 'Success',
          description: `Deleted ${data.length} ${label}`,
          variant: 'success',
        });
        props.onOpenChange?.(false);
        onSuccess?.();
      } catch (error) {
        toast({
          title: 'Error',
          description: 'An error occurred while deleting the selected rows',
          variant: 'destructive',
        });
      }
    });
  };

  const { isDesktop } = useBreakpoint();
  if (isDesktop) {
    return (
      <Dialog {...props}>
        {showTrigger ? (
          <DialogTrigger asChild>
            <Button variant="outline" size="sm">
              <Trash className="mr-2 size-4" aria-hidden="true" />
              Delete ({data.length})
            </Button>
          </DialogTrigger>
        ) : null}
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you absolutely sure?</DialogTitle>
            <DeleteDialogDescription count={data.length} label={label} />
          </DialogHeader>
          <DialogFooter className="gap-2 sm:space-x-0">
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button
              aria-label="Delete selected rows"
              variant="destructive"
              onClick={onDelete}
              disabled={isDeletePending}
            >
              {isDeletePending && (
                <Loader
                  className="mr-2 size-4 animate-spin"
                  aria-hidden="true"
                />
              )}
              Delete <Badge variant={'destructiveOutline'}>{data.length}</Badge>
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer {...props}>
      {showTrigger ? (
        <DrawerTrigger asChild>
          <Button variant="outline" size="sm">
            <Trash className="mr-2 size-4" aria-hidden="true" />
            Delete ({data.length})
          </Button>
        </DrawerTrigger>
      ) : null}
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Are you absolutely sure?</DrawerTitle>
          <DeleteDialogDescription count={data.length} label={label} />
        </DrawerHeader>
        <DrawerFooter className="gap-2 sm:space-x-0">
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
          <Button
            aria-label="Delete selected rows"
            variant="destructive"
            onClick={onDelete}
            disabled={isDeletePending}
          >
            {isDeletePending && (
              <Loader className="mr-2 size-4 animate-spin" aria-hidden="true" />
            )}
            Delete <Badge variant={'destructiveOutline'}>{data.length}</Badge>
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};
