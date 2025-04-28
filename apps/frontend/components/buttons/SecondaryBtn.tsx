"use client";
import { useRouter } from "next/navigation";

export interface CustomButton {
  name: string;
  path: string;
}
export const SecondaryBtn = ({ name, path }: CustomButton) => {
  const router = useRouter();
  const onClick = () => {
    router.push(`/${path}`);
  };
  return (
    <div className="hover:cursor-pointer">
      <button onClick={onClick}>{name}</button>
    </div>
  );
};