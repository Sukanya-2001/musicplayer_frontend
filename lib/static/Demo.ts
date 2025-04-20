import assest from "@/json/assest";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import CollectionsOutlinedIcon from "@mui/icons-material/CollectionsOutlined";
import ExploreIcon from "@mui/icons-material/Explore";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import HomeIcon from "@mui/icons-material/Home";
import LibraryAddOutlinedIcon from "@mui/icons-material/LibraryAddOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import ManageSearchIcon from "@mui/icons-material/ManageSearch";
import PersonSearchOutlinedIcon from "@mui/icons-material/PersonSearchOutlined";
import PlaylistPlayOutlinedIcon from "@mui/icons-material/PlaylistPlayOutlined";
import React from "react";

// Define the type for the sidebar items
interface SidebarItem {
  name: string;
  route: string;
  icon: React.ElementType;
}

export const sideFirstItems: SidebarItem[] = [
  { name: "Home", route: "/", icon: HomeIcon },
  { name: "Albums", route: "/albums", icon: CollectionsOutlinedIcon },
  { name: "Artists", route: "/artists", icon: PersonSearchOutlinedIcon },
  { name: "Discover", route: "/discover", icon: PlaylistPlayOutlinedIcon }

  // { name: "More", route: "/language", icon: PlaylistPlayOutlinedIcon }
];

export const sideSecondItems: SidebarItem[] = [
  { name: "Add Songs", route: "/add-songs", icon: LibraryAddOutlinedIcon },
  {
    name: "Find People",
    route: "/find-people",
    icon: ManageSearchIcon
  },
  { name: "Explore", route: "/explore", icon: ExploreIcon }
];

export const othersItems: SidebarItem[] = [
  {
    name: "About us",
    route: "javascript:void(0)",
    icon: AccountCircleOutlinedIcon
  },
  { name: "Contact us", route: "/contact-us", icon: LogoutOutlinedIcon },
  { name: "Premium", route: "javascript:void(0)", icon: LogoutOutlinedIcon }
];

export const authenticationItems: SidebarItem[] = [
  {
    name: "Favourite",
    route: "/dashboard/favourite",
    icon: FavoriteOutlinedIcon
  },
  {
    name: "My Profile",
    route: "/dashboard",
    icon: AccountCircleOutlinedIcon
  },
  { name: "Logout", route: "javascript:void(0)", icon: LogoutOutlinedIcon }
];

export const authItems: SidebarItem[] = [
  {
    name: "Sign in",
    route: "/auth/sign-in",
    icon: AccountCircleOutlinedIcon
  }
];

export const AlbumListData = [
  {
    title: "The local train",
    subtitle: "Song ans lyrics by Glamtown",
    img: assest?.album_img
  },
  {
    title: "The local train",
    subtitle: "Song ans lyrics by Glamtown",
    img: assest?.album_img
  },
  {
    title: "The local train",
    subtitle: "Song ans lyrics by Glamtown",
    img: assest?.album_img
  },
  {
    title: "The local train",
    subtitle: "Song ans lyrics by Glamtown",
    img: assest?.album_img
  },
  {
    title: "The local train",
    subtitle: "Song ans lyrics by Glamtown",
    img: assest?.album_img
  },
  {
    title: "The local train",
    subtitle: "Song ans lyrics by Glamtown",
    img: assest?.album_img
  },
  {
    title: "The local train",
    subtitle: "Song ans lyrics by Glamtown",
    img: assest?.album_img
  },
  {
    title: "The local train",
    subtitle: "Song ans lyrics by Glamtown",
    img: assest?.album_img
  }
];
