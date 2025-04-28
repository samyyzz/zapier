import { PrimaryBtn } from "../buttons/PrimaryBtn";

export const Hero = () => {
  return (
    <div className="m-4 px-2 flex justify-center items-center flex-col text-center">
      <div className="flex flex-col justify-center items-center bg-gradient-to-b from-orange-50 to-white rounded-4xl pt-10 pb-14">
        <h1 className="pb-2 text-2xl md:text-6xl font-extrabold text-black font-sans md:text-shadow-sm text-shadow-slate-500">
          Run your Business
        </h1>
        <h1 className="gradient-title from bg-orange-300 to-orange-500 pb-10 text-2xl md:text-6xl font-extrabold font-sans">
          Automate without limits
        </h1>
        <p className="w-5/6 md:w-1/2 text-center text-gray-500">
          Turn chaos into smooth operations by automating workflows yourself—no
          developers, no IT tickets, no delays. The only limit is your
          imagination.
        </p>
        <div className="pt-10">
          <PrimaryBtn
            name="Get Started for free  -->"
            path="signup"
            className="px-8 py-4 bg-slate-800 font-bold shadow-lg shadow-slate-600/50"
          />
        </div>
      </div>
    </div>
  );
};
