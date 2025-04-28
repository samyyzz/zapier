import Image from "next/image";

const AddCellBtn = ({ onClick }: { onClick: () => void }) => {
  return (
    <div onClick={onClick} className="p-1 bg-gray-200 hover:bg-blue-200 rounded-full">
      <Image src={"/plusIcon.svg"} alt="+" width={24} height={24} />
    </div>
  );
};

export default AddCellBtn;
