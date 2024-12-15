import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { useSelector } from "react-redux";
import AuthContext from "../../context/authContext";
import { useContext } from "react";
import { fetchMailDetail } from "../../store/slice/mailSlice";
import { useDispatch } from "react-redux";

const AllMails = () => {
  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState("");

  const user = useSelector((state) => state.user);
  const authCtx = useContext(AuthContext);

  const dispatch = useDispatch();

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-fit justify-between"
        >
          {value && user.mails.some((m) => m.id === value.id)
            ? user.mails.find((m) => m.id === value.id)?.address
            : "Select Temp Mail..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className=" p-0">
        <Command>
          <CommandInput placeholder="Search Temp Mail..." />
          <CommandList>
            <CommandEmpty>No Temp Mail found.</CommandEmpty>
            <CommandGroup>
              {user.mails.map((m) => (
                <CommandItem
                  key={m.id}
                  value={m}
                  onSelect={() => {
                    const argsObj = { token: authCtx.token, mailId: m.id, isNotAuth: false};
                    dispatch(fetchMailDetail(argsObj));
                    setValue(m)
                    setOpen(false)
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value.id === m.id ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {m.address}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>)
};

export default AllMails;