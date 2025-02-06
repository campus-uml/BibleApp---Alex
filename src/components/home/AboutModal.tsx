import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { AboutMe } from "../AboutMe";
import { DialogTitle } from "@radix-ui/react-dialog";

export const AboutModal = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className={`flex items-center gap-2 dark:text-slate-50`}>
          ?
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-transparent border-none">
        <DialogTitle className="text-2xl font-semibold text-center text-white">
          Acerca del Desarrollador
        </DialogTitle>
        <AboutMe />
      </DialogContent>
    </Dialog>
  );
};
