export const managerialRoles = ["manager", "msppManager"];

export const userRoles = [
  { key: "voiceOver", text: "Kontribitè vokal" }, // can provide voice version of articles
  { key: "writer", text: "Kontribitè" }, // can create articles
  { key: "manager", text: "Manadjè" },
  { key: "mspp", text: "MSPP Kontribitè" }, // needs this to create official communication - only for MSPP
  { key: "msppManager", text: "Manadjè MSPP" },
];

export const userRolesKeyText = userRoles.reduce((acc, current) => {
  const nextRound = { ...acc };
  nextRound[current.key] = current.text;
  return nextRound;
}, {});

/**
 * Map roles that a user can assign to another user
 *
 */
export const userRoleSupervision = {
  manager: ["voiceOver", "writer", "manager"],
  msppManager: ["mspp", "msppManager"],
};

export const roleCheck = (roles) =>
  roles.filter((r) => managerialRoles.includes(r)).length;

export const managerRoleCheck = (roles) =>
  roles.filter((r) => managerialRoles.includes(r)).length;

export const findTransferableRoles = (isAdmin = false, roles = []) => {
  const transferableRoles = [];
  if (isAdmin) {
    userRoles.forEach((el) => {
      transferableRoles.push(el.key);
    });
    return [...new Set(transferableRoles)];
  }

  if (Array.isArray(roles)) {
    managerialRoles.forEach((m) => {
      if (roles.includes(m)) {
        userRoleSupervision[m].forEach((el) => {
          transferableRoles.push(el);
        });
      }
    });
    return [...new Set(transferableRoles)];
  }
};
