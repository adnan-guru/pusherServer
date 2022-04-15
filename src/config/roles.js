const allRoles = {
  user: ["getUsers", "manageUsers", "getFeeds", "manageFeeds"],
  admin: ["getUsers", "manageUsers"],
};

const roles = Object.keys(allRoles);
const roleRights = new Map(Object.entries(allRoles));

module.exports = {
  roles,
  roleRights,
};
