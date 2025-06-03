import Image from "next/image";

export interface ZapCell {
  boxType: "Action" | "Trigger";
  index: number;
  name: string;
  onClick: () => void;
}

const ZapCell = ({ name, index, boxType, onClick }: ZapCell) => {
  return (
    <div
      onClick={onClick}
      className="p-3 border border-dashed rounded-md shadow-lg w-80 md:w-96 bg-stone-50 hover:bg-stone-100 hover:border hover:border-dashed hover:border-blue-700"
    >
      <div className="flex justify-between">
        <h1 className="flex gap-1 justify-center font-semibold rounded-sm px-3 h-6 text-sm border border-stone-900 bg-stone-200">
          <Image src="/thunderIcon.svg" alt=":" width={14} height={14} />
          {boxType}
        </h1>
        <div className="flex justify-center hover:shadow-lg hover:bg-slate-100 p-1 hover:border hover:border-gray-300">
          <Image src="/optionIcon.svg" alt=":" width={14} height={14} />
        </div>
      </div>

      <h1 className="font-bold mt-2">
        <span className="font-bold text-black">{index}. </span>
        {name}
      </h1>
    </div>
  );
};

export default ZapCell;
