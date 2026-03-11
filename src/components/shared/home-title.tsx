
type Props = {
    children:string[] | string;
}
export default function HomeTitle({children}:Props) {
  return <h2 className="font-bold text-center md:text-start uppercase tracking-[4px] text-soft-pink-500 dark:text-maroon-400">{children}</h2>
}
