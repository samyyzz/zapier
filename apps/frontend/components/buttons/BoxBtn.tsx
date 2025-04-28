"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";

export interface CustomButton {
  name: string;
  path: string;
  className?: string;
  icon?:string
}
export const BoxBtn = ({ name, path, className,icon }: CustomButton) => {
  const router = useRouter();
  const onClick = () => {
    router.push(`/${path}`);
  };
  return (
    <div
      className={`${className} justify-center flex gap-2 rounded-sm px-4 py-2 hover:cursor-pointer`}
    >
      {icon && <Image src={icon} className="" width={20} height={20} alt="+" />}

      <button className="hover:cursor-pointer font-bold" onClick={onClick}>
        {name}
      </button>
    </div>
  );
};
