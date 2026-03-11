import { Loader } from "lucide-react";

export default function Spinner() {
  return (
    <div className="flex justify-center items-center w-full h-screen">
      <Loader size={50} className="animate-spin"/>
    </div>
  )
}
