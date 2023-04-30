export const mainHeaderLink = {
  url: "/branch-management",
  name: "Branch Management",
};

export const createLinks = [
  {
    url: "/branch-management",
    name: "Branch Management",
  },
  {
    url: "/branch-management/create",
    name: "Create Branch",
  },
];

export const manageLinks = (id) => [
  {
    url: "/branch-management",
    name: "Branch Management",
  },
  {
    url: `/branch-management/${id}`,
    name: "Manage Branch",
  },
];
