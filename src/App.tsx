import { Description } from "./Description";
import { Example } from "./Example";
import { NavBar } from "./NavBar";
import { UploadPhoto } from "./UploadPhoto";

export const App = () => {
  return (
    <div className="w-screen h-screen">
      <NavBar />
      <div className="m-3 flex flex-col gap-3">
        <Description />
        <Example />
        <UploadPhoto />
      </div>
    </div>
  );
};
