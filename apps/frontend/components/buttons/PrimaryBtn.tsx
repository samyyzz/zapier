"use client";
import { useRouter } from "next/navigation";

export interface CustomButton {
  name: string;
  path: string;
  className?:string
}
export const PrimaryBtn = ({ name, path, className }: CustomButton) => {
  const router = useRouter();
  const onClick = () => {
    router.push(`/${path}`);
  };
  return (
    <div className={`${className} text-white bg-orange-600 px-4 py-2 rounded-full hover:cursor-pointer`}>
      <button className="hover:cursor-pointer" onClick={onClick}>{name}</button>
    </div>
  );
};
