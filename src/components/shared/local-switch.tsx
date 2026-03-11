"use client";
import { Globe} from "lucide-react";


import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { routing } from "@/i18n/routing";
import { usePathname, useRouter } from "@/i18n/navigation";
import { useSearchParams } from "next/navigation";
import { Locale } from "next-intl";

const lagnuages={
  en:"English",
  ar:"العربية"
}


export function LocalSwitch() {

const router = useRouter()
const pathName = usePathname()
const searchParams = useSearchParams()



function handleSwitchLocal(locale:Locale){
router.push(`${pathName}?${searchParams.toString()}`,{locale})
}

  return (
    <>
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          {/* Trigger */}
          <button aria-label="Open menu">
            <Globe />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-40 z-[60]" align="end">
          <DropdownMenuGroup>
           {routing.locales.map(loc=><DropdownMenuItem onClick={()=>handleSwitchLocal(loc)} key={loc}>{lagnuages[loc]}</DropdownMenuItem>)}
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}



