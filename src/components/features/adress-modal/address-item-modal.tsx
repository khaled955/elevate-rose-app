"use client";

import { Address } from "@/lib/types/addresses";
import { MapPin, PenLine, Phone, Trash2 } from "lucide-react";

type AddressItemProps = {
  city: string;
  phone: string;
  address: string;
  label?: string;
  handleUpdate: (address: Address) => void;
  allAdress: Address;
  onDelete:(id:string)=>void;
};

export function AddressItemModal({
  city,
  phone,
  address,
  label,
  allAdress,
  handleUpdate,
  onDelete,
}: AddressItemProps) {
  return (
    <li className="relative rounded-md border border-zinc-300 p-3 text-left transition w-full my-3 px-5 hover:border-maroon-600 bg-white dark:bg-gray-800">
      {/* city + phone */}
      <div className="flex items-center justify-between">
        <span className="capitalize text-xl font-semibold text-zinc-800 flex items-center gap-2">
          <MapPin className="text-emerald-500" />
          {city}
        </span>

        <p className="flex items-center gap-1">
          <Phone
            size={26}
            className="rounded-full bg-maroon-600 p-1 text-white"
          />
          <span className="text-zinc-500 text-sm">{phone}</span>
        </p>
      </div>

      {/* address */}
      <p className="mt-2 w-fit rounded-xl bg-zinc-100 p-2 text-sm capitalize text-zinc-800">
        {address}
      </p>
      {/* action-button */}

      <div className="absolute -end-3 top-[50%] -translate-y-[50%] flex flex-col gap-2">
        {/* update */}
        <button
          onClick={() => {
            handleUpdate(allAdress);
          }}
          className="bg-zinc-50 border border-zinc-400 rounded-full size-6 flex justify-center items-center"
        >
          <PenLine size={18} />
        </button>
        {/* delete */}
        <button onClick={()=> onDelete(allAdress._id)} className="bg-red-600 rounded-full size-6 flex justify-center items-center text-white">
          <Trash2 size={18} />
        </button>
      </div>

      {label && (
        <span className="absolute start-2 -top-5 bg-white dark:bg-gray-800 text-maroon-600 text-2xl capitalize">
          {label}
        </span>
      )}
    </li>
  );
}
