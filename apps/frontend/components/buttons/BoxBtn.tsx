"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { MouseEventHandler } from "react";

export interface CustomButton {
  name: string;
  path?: string;
  className?: string;
  icon?: string;
  onClick: MouseEventHandler<HTMLDivElement>
}
export const BoxBtn = ({ name, path, className, icon, onClick }: CustomButton) => {
  return (
    <div
      onClick={onClick}
      className={`${className} justify-center flex gap-2 rounded-sm px-4 py-2 hover:cursor-pointer`}
    >
      {icon && <Image src={icon} className="" width={20} height={20} alt="+" />}

      <button className="hover:cursor-pointer font-bold">{name}</button>
    </div>
  );
};
