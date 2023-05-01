export const mainHeaderLink = {
  url: "/dasboard",
  name: "User",
};

export const createLinks = [
  {
    url: "/dashboard",
    name: "Branch Management",
  },
  {
    url: "/dashboard/create",
    name: "Create User",
  },
];

export const manageLinks = (id) => [
  {
    url: "/dashboard",
    name: "Back to users",
  },
  {
    url: `/branch-management/${id}`,
    name: "",
  },
];


