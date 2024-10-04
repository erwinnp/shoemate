import { deleteShoe } from "@/service/apiShoe";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";

export default function DialogDeleteShoe({
  userId,
  shoeId,
}: {
  userId: string;
  shoeId: string;
}) {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  // Hapus data dan refetch data sepatu untuk update tampilan data sepatu
  const removeShoe = useMutation({
    mutationFn: () => deleteShoe(userId, shoeId),
    onSuccess: () => {
      toast({
        title: "Shoe deleted!",
        description: "Delete shoe successfully!",
      });
      return queryClient.invalidateQueries({ queryKey: ["shoes"] });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to create shoe",
        variant: "destructive",
      });
    },
  });

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="destructive" size={"sm"}>
          Delete
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Delete shoe</DialogTitle>
          <DialogDescription>
            Are you sure to delete this shoe?
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Close
            </Button>
          </DialogClose>
          <DialogClose asChild>
            <Button variant={"destructive"} onClick={() => removeShoe.mutate()}>
              Delete
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
