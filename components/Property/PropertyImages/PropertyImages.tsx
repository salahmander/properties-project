"use client";
import Image from "next/image";

type PropertyImagesProp = {
  images: string[];
};

const PropertyImages = ({ images }: PropertyImagesProp) => {
  return (
    <section className="bg-blue-50 p-4">
      <div className="container mx-auto">
        <div className="grid grid-cols-2 gap-4">
          {images.map((image, index) => (
            <div
              key={index}
              className={`${images.length === 3 && index === 2 ? "col-span-2" : "col-span-1"}`}>
              <Image
                src={image}
                alt="Images of the current property"
                className="object-cover h-[400px] w-full rounded-xl"
                width={0}
                height={0}
                sizes="100vw"
                priority={true}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
export default PropertyImages;
