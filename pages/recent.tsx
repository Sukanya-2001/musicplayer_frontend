import ResponsiveDrawer from "@/components/ResponsiveDrawer/ResponsiveDrawer";
import { SongsSec } from "@/components/Songs/SongsSec";

const recent = () => {
  return (
    <ResponsiveDrawer>
      <SongsSec title="Recently" subTitle="Added" />
    </ResponsiveDrawer>
  );
};

export default recent;
