import Image from "next/image";

export interface FeatureCard {
  name: string;
  iconPath: string;
}

export const featJson = [
  { name: "Email follow-ups for lead", iconPath: "./gmail.svg" },
  { name: "Analyse and Research", iconPath: "./research.svg" },
  { name: "AI data Insights on WA", iconPath: "./wsapp.svg" },
];

export const Features = () => {
  return (
    <div className="flex flex-col md:flex-row   justify-center items-center gap-2 md:gap-6  mx-4">
      {featJson.map((feat) => (
        <FeatureCard
          key={feat.name}
          name={feat.name}
          iconPath={feat.iconPath}
        />
      ))}
    </div>
  );
};

export const FeatureCard = ({ name, iconPath }: FeatureCard) => {
  return (
    <div className=" min-w-56 cursor-pointer rounded-full text-sm flex gap-2 md:justify-center items-center border-2 px-4 py-3 font-semibold border-gray-100">
      <Image src={iconPath} alt="wsapp-svg" width={20} height={20} />
      {name}
    </div>
  );
};
