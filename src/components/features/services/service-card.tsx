import { ReactNode } from "react";

type ServiceCardProps = {
    icon:ReactNode;
    header:string;
    text:string;
}


export default function ServiceCard({icon,header,text}:ServiceCardProps) {
  return (
    <div className="service-box flex items-center gap-3">
      <div className="icon size-16 rounded-full bg-maroon-600 dark:bg-soft-pink-200 text-white dark:text-zinc-700 flex justify-center items-center">
        {icon}
      </div>
      <div className="text">
        <h2 className="dark:text-soft-pink-200 font-semibold">{header}</h2>
        <p>{text}</p>
      </div>
    </div>
  );
}
