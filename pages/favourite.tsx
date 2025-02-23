import ResponsiveDrawer from "@/components/ResponsiveDrawer/ResponsiveDrawer";
import { SongsSec } from "@/components/Songs/SongsSec";

const favourite = () => {
  return (
    <ResponsiveDrawer>
      <SongsSec title="List of" subTitle="Favourites" />
    </ResponsiveDrawer>
  );
};

export default favourite;
