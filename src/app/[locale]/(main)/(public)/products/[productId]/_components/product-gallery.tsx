type ProductGalleryProps = {
    children:React.ReactNode;
}
export default function ProductGallery({children}:ProductGalleryProps) {
  return (
    <div className="w-full md:w-[50%]">
        {children}
    </div>
  )
}
