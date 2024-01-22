import { exec } from "child_process";
export async function checkData(item) {
  try {
    const result = await runCommand(`ndnpeek ${item} -p -f `);
    console.log("Output:", result);
    return result;
  } catch (error) {
    console.error("Error:", error.message);
    return false;
  }
}

function runCommand(command) {
  return new Promise((resolve, reject) => {
    exec(command, (error, stdout, stderr) => {
      if (error) {
        reject(error);
        return;
      }
      if (stderr) {
        reject(new Error(stderr));
        return;
      }
      resolve(stdout.trim());
    });
  });
}
