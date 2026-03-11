import Image, { StaticImageData } from "next/image";
import { Star } from "lucide-react";
import photo from "../../../../public/assets/client2.png";
import { useFormatter } from "next-intl";

type TestimonialCardProps = {
  src: string | StaticImageData;
  firstName: string;
  lastName:string;
  rateNumber: number;
  reviewText: string;
  CreatedDate: string;
};

export default function TestimonialCard({
  src = photo,
  firstName = "Khaled",
  lastName="mansour",
  rateNumber = 0,
  reviewText = "review un known",
  CreatedDate = "1January",
}: TestimonialCardProps) {


const formate = useFormatter()



  return (
    <div className="rounded-lg bg-white p-5 relative">
      <div className="avatar absolute -top-9 start-[50%] -translate-x-[50%] rtl:translate-x-[50%]  overflow-hidden">
        <Image
          className="size-24 rounded-full border-2 border-white object-cover"
          src={src}
          width={200}
          height={200}
          alt={firstName}
        />
      </div>
      <h2 className="avatar-name capitalize text-zinc-800 text-center mt-14">
        {firstName}{lastName}
      </h2>
      <div className="avatar-rate flex gap-3 my-3 text-yellow-400 justify-center">
        {Array.from({ length: rateNumber }, (_, index: number) => (
          <Star key={index} className="fill-yellow-400" />
        ))}
        {Array.from({ length: 5 - rateNumber}, (_, index: number) => (
          <Star key={index} />
        ))}
      </div>

      <div className="avatar-text line-clamp-2 font-medium text-base text-zinc-800">
        <p>{reviewText}</p>
      </div>

      <div className="avatar-rate-time flex justify-center my-4">
        <span className="text-xs font-medium text-zinc-400">
          {formate.dateTime(new Date(CreatedDate),"date-base")}
        </span>
      </div>
    </div>
  );
}
