export const baseUrl = process.env.NEXT_APP_BASE_URL;
export const baseUrlApi = `${process.env.NEXT_APP_BASE_URL}/`;
export const baseUrlMedia = process.env.NEXT_APP_BASE_URL;

// api doc => https://militarymoves-admin.dedicateddevelopers.us/apidoc

export const mediaUrl = (url: string) => {
  return `${baseUrlMedia}/uploads/${url}`;
};

export const endpoints = {
  auth: {
    signup: "user/register",
    signUpProfile: "user/signup",
    login: "user/login",
    forgotEmail: "",
    otpValidation: "",
    resetPassword: "",
    profileDetails: "user/profile",
    profileUpdate: "user/profile/update"
  },
  home: {
    getHomePageDetails: "user/home/get-home-details",
    support: ""
  },
  songs: {
    songsByType: "user/home/get-all-details",
    allSongs: "admin/song/get-songs"
  },
  artist: {
    artistInfo: "admin/artist/get-artist-info",
    allArtists: "admin/artist/get-artists",
    songsByArtist: "admin/song/get-songs-of-artist"
  },
  album: {
    albumInfo: "admin/album/get-album-info",
    allAlbums: "admin/album/get-albums",
    songsByAlbum: "admin/song/get-songs-of-album"
  },
  cms: {
    about: "aboutpolicy/details",
    faq: "faq/all"
  },
  discover: {
    allDetails: "admin/song/get-discover-genres",
    songsByGenre: "admin/song/get-genres-songs"
  },
  favoutite: {
    getAllFavoriteIds: "user/wishlist/get-ids",
    makeFavourite: "user/wishlist/add-favourite",
    getAllFavourite: "user/wishlist/get-favourite"
  },
  userManage: {
    addSong: "user/add-song",
    allUser: "user/explore-songs"
  }
};

export const sucessNotificationEndPoints = [
  // endpoints.auth.signup,
  endpoints.auth.signUpProfile,
  endpoints.auth.login,
  endpoints.auth.profileUpdate,
  endpoints.favoutite.makeFavourite,

  endpoints.userManage.addSong
];
