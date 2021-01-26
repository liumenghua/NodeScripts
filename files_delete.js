// 删除某个文件夹下的所有文件和文件夹

const chalk = require('chalk');
const child_process = require('child_process');
const inquirer = require('inquirer');
const args = process.argv.slice(2);

if (args.length <= 0) {
    console.log(chalk.red("请输入目标文件地址！----> 例如：node delete_files.js /User/xxx/code_js"));
    return;
} 

deleteDirFiles(args[0]);

var questions = [
    {
      type: 'input',
      name: 'name',
      message: "即将删除文件夹下的所有文件，是否继续？ Y/N"
    }
]

function deleteDirFiles(filePath) {
    console.log(chalk.yellow(`即将删除 ${filePath} 下的所有文件和文件夹:\n`));

    child_process.exec('ls -l', {cwd: filePath}, function (error, stdout, stderr) {
        if (error) {
            console.log(chalk.red('exec cmd error: ' + error));
        } else {
            console.log(chalk.white(stdout));

            

            inquirer.prompt(questions).then(answers => {
                if (answers['name'] == "Y") {
                    console.log(chalk.yellow('\n 开始删除...'));

                    child_process.exec('rm -rf *', {cwd: filePath}, function (error, stdout, stderr) {
                        if (error) {
                            console.log(chalk.red('exec cmd error: ' + error));
                        } else {
                            console.log(chalk.white(stdout));
                            console.log(chalk.green(`删除 ${filePath} 文件夹下的所有文件成功！`));
                        }
                    })
                } else {
                    return;
                }
            })
        }
    })
}




