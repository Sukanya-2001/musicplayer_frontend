import DiscoverSongList from "@/components/Discover/DiscoverSongList";
import ResponsiveDrawer from "@/components/ResponsiveDrawer/ResponsiveDrawer";

const discover = () => {
  return (
    <ResponsiveDrawer>
      <DiscoverSongList />
    </ResponsiveDrawer>
  );
};

export default discover;
