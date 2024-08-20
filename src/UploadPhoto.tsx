import { FaCamera } from "react-icons/fa";
import { MdInsertPhoto } from "react-icons/md";

export const UploadPhoto = () => {
  return (
    <div className="flex flex-row justify-center gap-3">
      <div className="cursor-pointer p-2 ring-2 ring-violet-700 text-violet-700 flex flex-col items-center">
        <FaCamera size={32} className="fill-violet-700" />
        Live camera
      </div>
      <div className="cursor-pointer p-2 ring-2 ring-sky-500 text-sky-500 flex flex-col items-center">
        <MdInsertPhoto size={32} className="fill-sky-500" />
        Pick photo
      </div>
    </div>
  );
};
