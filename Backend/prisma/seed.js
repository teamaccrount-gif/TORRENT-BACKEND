import { prisma } from "../lib/prisma.js";

const roles = ["super_admin", "admin", "manager", "engineer", "operator"];

const permissions = [
  { name: "create_user", description: "Create new users" },
  { name: "edit_user", description: "Edit existing users" },
  { name: "delete_user", description: "Delete users" },
  { name: "edit_pid", description: "Change P&ID values" },
  { name: "view_pid", description: "View P&ID values" },
  { name: "create_schedule", description: "Create schedules" },
  { name: "view_schedule", description: "View schedules" },
  { name: "edit_schedule", description: "Edit schedules" },
  { name: "view_maintenance", description: "View maintenance" },
  { name: "edit_maintenance", description: "Edit maintenance" },
  { name: "generate_emergency", description: "Generate emergency" },
  {
    name: "update_location",
    description: "Update GIS coordinates for stations, areas and regions",
  },
];

// which permissions each role gets
const rolePermissionMap = {
  super_admin: "*", // all
  admin: ["create_user", "edit_user", "delete_user", "update_location"],
  manager: [
    "edit_pid",
    "create_schedule",
    "view_schedule",
    "edit_schedule",
    "view_maintenance",
    "generate_emergency",
  ],
  engineer: [
    "view_pid",
    "view_schedule",
    "view_maintenance",
    "edit_maintenance",
  ],
  operator: ["view_pid", "view_schedule", "view_maintenance"],
};

async function seed() {
  // 1. Insert permissions
  await prisma.permission.createMany({
    data: permissions,
    skipDuplicates: true,
  });

  // 2. Insert roles
  await prisma.role.createMany({
    data: roles.map((name) => ({ name })),
    skipDuplicates: true,
  });

  // 3. Fetch all inserted roles and permissions
  const allRoles = await prisma.role.findMany();
  const allPermissions = await prisma.permission.findMany();

  const permissionMap = new Map(allPermissions.map((p) => [p.name, p.id]));
  const roleMap = new Map(allRoles.map((r) => [r.name, r.id]));

  // 4. Assign permissions to roles
  for (const [roleName, perms] of Object.entries(rolePermissionMap)) {
    const role_id = roleMap.get(roleName);

    const permissionNames =
      perms === "*" ? allPermissions.map((p) => p.name) : perms;

    await prisma.rolePermission.createMany({
      data: permissionNames.map((permName) => ({
        role_id,
        permission_id: permissionMap.get(permName),
      })),
      skipDuplicates: true,
    });
  }

  console.log("Seed complete.");
  await prisma.$disconnect();
}

seed();
