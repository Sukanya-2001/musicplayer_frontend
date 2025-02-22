import ResponsiveDrawer from "@/components/ResponsiveDrawer/ResponsiveDrawer";
import { SongComp } from "@/components/SongComp/SongComp";

const language = () => {
  return (
    <ResponsiveDrawer>
      <SongComp title="" subTitle="Hindi Songs" />
      <SongComp title="" subTitle="English Songs" />
      <SongComp title="" subTitle="Bengali Songs" />
    </ResponsiveDrawer>
  );
};

export default language;
