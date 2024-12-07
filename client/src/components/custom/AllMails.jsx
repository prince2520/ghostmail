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
import { mailData } from "../../api/mail"
import AuthContext from "../../context/authContext";
import { useContext } from "react"


const AllMails = () => {
  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState("");

  const user = useSelector((state) => state.user);
  const authCtx = useContext(AuthContext);

  const mail = useSelector(state => state.mail);

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
            ? user.mails.find((mail) => mail.address === value).address
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
              {user.mails.map((mail) => (
                <CommandItem
                  key={mail.id}
                  value={mail.address}
                  onSelect={(currentValue) => {
                    console.log('currentValue', currentValue);
                    if (!mail.mails.find(m => m.address === currentValue)) {
                      mailData(authCtx.token, currentValue).then(result => {
                        console.log('Get mail Data', result)
                      }).catch(err => console.log(err));
                    }
                    setValue(currentValue === value ? "" : currentValue)
                    setOpen(false)
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === mail.address ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {mail.address}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>)
};

export default AllMails;