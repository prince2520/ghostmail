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
import { fetchMailDetail } from "../../store/mailSlice";
import { useDispatch } from "react-redux"


const AllMails = () => {
  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState("");

  const user = useSelector((state) => state.user);
  const authCtx = useContext(AuthContext);

  const mails = useSelector(state => state.mail.mails);
  const dispatch = useDispatch();

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          {value
            ? user.mails.find((m) => m.address === value).address
            : "Select Temp Mail..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Command>
          <CommandInput placeholder="Search Temp Mail..." />
          <CommandList>
            <CommandEmpty>No Temp Mail found.</CommandEmpty>
            <CommandGroup>
              {user.mails.map((m) => (
                <CommandItem
                  key={m.id}
                  value={m.address}
                  onSelect={(currentValue) => {
                    const foundMail = mails?.find(x => x.address === currentValue);
                    if (!foundMail) {
                      const argsObj = { token: authCtx.token, mailId: m.id };
                      console.log("argsObj -> ", argsObj);

                      dispatch(fetchMailDetail(argsObj));
                    }
                    setValue(currentValue === value ? "" : currentValue)
                    setOpen(false)
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === m.address ? "opacity-100" : "opacity-0"
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