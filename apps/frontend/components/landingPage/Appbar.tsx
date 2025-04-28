import { PrimaryBtn } from "../buttons/PrimaryBtn";
import { SecondaryBtn } from "../buttons/SecondaryBtn";

export const Appbar = () => {
  return (
    <div className="mx-10 py-2 flex justify-between">
      <div className="">
        <h1 className="text-md md:text-3xl font-extrabold font-sans text-shadow-sm text-shadow-slate-300">
          <span className="text-orange-600">_</span>
          Project
        </h1>
      </div>
      <div className="flex gap-4 text-md font-semibold justify-center items-center">
        <SecondaryBtn name="Login" path="login" />
        <PrimaryBtn name="Signup" path="signup" />
      </div>
    </div>
  );
};
