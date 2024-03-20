import { execSync } from "child_process";

// 获取git diff的结果，只包含修改和新增的文件
const getModifiedFiles = () => {
  try {
    const result = execSync("git diff --name-only --cached --diff-filter=d", {
      encoding: "utf-8",
    });

    return result
      .split("\n")
      .filter((diffFile) => /(\.ts|\.js)x(\n|$)/gi.test(diffFile));
  } catch (error) {
    console.error("Error getting modified files:", error);
    return [];
  }
};

// 运行 ESLint 检查
const runEslint = (files) => {
  console.log('Checking in ', files);
  if (files.length === 0) {
    console.log("No JavaScript files to lint.");
    return;
  }
  try {
    execSync(`./node_modules/.bin/eslint  ./src/List.tsx --ext ts,tsx --report-unused-disable-directives --max-warnings 0`, {
      stdio: "inherit",
    });
    console.log("Linting passed!");
  } catch (error) {
    console.error(
      "Linting errors found. Please fix the errors and try committing again."
    );
    process.exit(1); // 退出脚本并返回错误状态
  }
};

const modifiedFiles = getModifiedFiles();

runEslint(modifiedFiles);
