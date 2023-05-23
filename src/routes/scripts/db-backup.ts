import { exec, execSync } from "child_process";

export const handler = async (req, res) => {
  const scriptPath = await execSync(
    "realpath ./db-backups/script.sh"
  ).toString();
  const permissionsResult = await execSync(`chmod +x ${scriptPath}`).toString();
  const scriptResult = await execSync(`${scriptPath}`).toString();

  return {
    success: true,
    data: {
      message: "executed correctly",
      scriptPath,
      permissionsResult,
      scriptResult,
    },
  };
};
