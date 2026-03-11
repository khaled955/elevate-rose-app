"use client"
import { ReactNode } from "react";
import { Button } from "../ui/button";
import { useRouter } from "@/i18n/navigation";
import { useLocale } from "next-intl";

type ActionBtnProps={
    children:ReactNode;
}
export default function ActionBtn({children}:ActionBtnProps) {
const router = useRouter()
const locale = useLocale()

function handleNavigateToProducts(){
    router.push("/products",{locale})
}

  return <Button onClick={handleNavigateToProducts} className="w-fit p-6" variant={"secondary"}>{children}</Button>
}
