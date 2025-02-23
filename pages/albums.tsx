import { AlbumList } from "@/components/Album/AlbumList";
import ResponsiveDrawer from "@/components/ResponsiveDrawer/ResponsiveDrawer";

const albums = () => {
  return (
    <ResponsiveDrawer>
      <AlbumList title="List of" subTitle="Albums" />
    </ResponsiveDrawer>
  );
};

export default albums;
