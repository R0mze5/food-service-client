export const routerPaths = {
  home: "/",
  signIn: "/",
  signUp: "/create-account",
  client: {
    restaurants: "/",
    search: "/search",
    category: "/category",
    restaurant: "/restaurant",
  },
  owner: {
    restaurants: "/",
    restaurant: "/restaurant",
    createRestaurant: "/create-restaurant",
    createDish: "/create-dish",
  },
  delivery: {
    dashboard: "/",
  },
  profile: "/profile",
  orderDetails: "/order",
  editProfile: "/edit-profile",
  confirm: "/confirm",
} as const;

// function getCurrentTimezoneName() {
//   const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
//   return timezone;
// }

// function convertTimestampToTimezoneTime() {
//   const timezone = getCurrentTimezoneName();
//   const date = new Date();
//   const time = date.toLocaleTimeString("en-US", { timeZone: timezone });
//   return time;
// }

// function convertTimestampToTimezoneTime(timestamp: number) {
//   const date = new Date(timestamp);
//   const time = date.toLocaleTimeString("en-US", { timeZone: 2 });
//   return time;
// }
