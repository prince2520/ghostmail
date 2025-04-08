import * as React from "react"

import { ChevronsUpDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { useSelector } from "react-redux";
import { ScrollArea } from "@/components/ui/scroll-area";
import { RootState, useAppDispatch } from "@/redux/store";

import { Mail } from "@/types/mail.d";
import { MailActions } from "@/redux/slices/mailSlice";

const AllMails = () => {
  const [value, setValue] = React.useState<Mail>();
  const [open, setOpen] = React.useState<boolean>(false)

  const { mails } = useSelector((state:RootState) => state.mail);

  const dispatch = useAppDispatch();

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-fit justify-between"
        >
          {value && mails.some((m) => m.id === value.id)
            ? mails.find((m) => m.id === value.id)?.address
            : "Select Temp Mail..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className=" p-0">
        <Command>
          <CommandInput placeholder="Search Temp Mail..." />
          <CommandList>
            <CommandEmpty>No Temp Mail found.</CommandEmpty>
            <ScrollArea className="h-[180px] rounded-md px-4 py">
              <CommandGroup>
                {mails.map((m: Mail) => (
                  <CommandItem
                    key={`${m.id}`}
                    onSelect={() => {
                      if (value?.id !== m.id) {
                        dispatch(MailActions.updateCurrentMailId(m.id));
                        setValue(m);
                      }
                      setOpen(false);
                    }}
                  >
                    {m.address}
                  </CommandItem>
                ))}
              </CommandGroup>
            </ScrollArea>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>)
};

export default AllMails;