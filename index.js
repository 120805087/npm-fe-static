#!/usr/bin/env node
// 使用node开发命令行工具所执行的js脚本必须在顶部加入 #!/usr/bin/env node

// 引入fs模块
import fs from "fs";

// 给字体添加颜色
import chalk from "chalk";

// 命令行界面
import { program } from "commander";

// 命令行交互
import inquirer from "inquirer";

// 下载模板
import download from "download-git-repo";

// 处理模版
import handlebars from "handlebars";

// loading
import ora from "ora";

// 设置脚手架版本，默认选项为 -V 和 --version, 更改为 -v 和 --version
program.version("0.0.1", "-v, --version");

// [project-name] 中括号为可选参数 <project-name> 为必填参数
program
  .command("create [project-name]")
  .description("初始化项目模版")
  .action((name) => {
    // 初始化项目
    inquirer
      .prompt([
        {
          type: "input",
          name: "projectName",
          message: "请输入项目名称：",
          when: function () {
            return !name;
          },
        },
        {
          type: "list",
          message: "请选择要下载的项目模板:",
          name: "template",
          choices: ["static-next", "admin-react"],
        },
        {
          type: "confirm",
          message: "是否部署在域名的根路径下？",
          name: "isRoot",
          when: function (answers) {
            return answers.template === "static-next";
          },
        },
      ])
      .then((answers) => {
        const { projectName, template } = answers;
        name = name || projectName;

        // 打印空行
        console.log("");

        const spinner = ora("正在下载模版...").start();

        // 下载模版, #{my-branch} 表示分支名称
        const templates = `direct:https://github.com/120805087/npm-felicity.git#${template}`;
        download(templates, name, { clone: true }, (err) => {
          if (err) {
            console.log(err);
            spinner.fail();
            console.log(chalk.red("下载模版失败，请稍后重试！"));
            return;
          } else {
            // 处理模版
            // 读取模版中的package.json文件
            const packageStr = fs.readFileSync(`${name}/package.json`, "utf-8");
            // 通过handlebars处理 package.json文件中的变量
            const handleTemplate = handlebars.compile(packageStr)({
              name,
            });
            // 重新写入 package.json文件
            fs.writeFileSync(`${name}/package.json`, handleTemplate);

            // static-next 项目需要处理 next.config.mjs 文件 和 image/loader.js
            if (template === "static-next") {
              const nextConfigStr = fs.readFileSync(
                `${name}/next.config.mjs`,
                "utf-8"
              );
              const handleNextConfig = handlebars.compile(nextConfigStr)({
                name,
                ...answers,
              });

              fs.writeFileSync(`${name}/next.config.mjs`, handleNextConfig);

              const loaderStr = fs.readFileSync(
                `${name}/image/loader.js`,
                "utf-8"
              );

              const handleLoader = handlebars.compile(loaderStr)({
                name,
                ...answers,
              });

              fs.writeFileSync(`${name}/image/loader.js`, handleLoader);
            }

            spinner.text = "下载成功";
            spinner.color = "#13A10E";
            spinner.succeed();
            console.log("");
            // 提示进入下载的目录
            console.log(" # cd into Project");
            console.log(chalk.gray("   $ ") + chalk.blue(`cd ${name}`));
            console.log("");
            // 提示安装依赖
            console.log(" # Project setup");
            console.log(chalk.gray("   $ ") + chalk.blue(`npm install`));
            console.log("");
            // 提示运行开发环境
            console.log(" # Compiles and hot-reloads for development");
            console.log(chalk.gray("   $ ") + chalk.blue(`npm run dev`));
            console.log("");
            // 提示打包生产环境代码
            console.log(" # Compiles and minifies for production");
            console.log(chalk.gray("   $ ") + chalk.blue(`npm run build`));
            console.log("");
          }
        });
      });
  });

program.parse();
