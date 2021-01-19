const chalk = require('chalk');
const child_process = require('child_process');

const args = process.argv.slice(2);

if (args.length <= 0) {
    console.log(chalk.red("请输入目标文件地址！----> 例如：node git_deletejs /User/xxx/code_js dev/1.0.0"));
    return;
} else if (args.length < 2) {
    console.log(chalk.red("请输入分支名称前缀！----> 例如：node git_deletejs /User/xxx/code_js dev/1.0.0"));
    return;
}

searchAndDeleteBranchs(args[0], args[1]);

function searchAndDeleteBranchs(projectPath, branchPrefix) {
    console.log(chalk.yellow('查询本地git分支：'))
    seachBrnach(projectPath, (output) => {
        console.log(chalk.white(output));
        
        // 获取分支
        let originsBranchs = output.split(/[(\r\n)\r\n]+/);
        
        // 读取符合前缀的分支
        var branchs = [];
        originsBranchs.forEach((item) => {
            const branchName = item.trim();
            if (branchName.startsWith(branchPrefix)) {
                branchs.push(branchName);
                }
        })
        
        if (branchs.length == 0) {
            console.log(chalk.yellow(`\n分支查询完成，无前缀为 ${branchPrefix} 的分支!`));
            return;
        }
        
        console.log(chalk.green(`\n分支查询完成，开始删除前缀为 ${branchPrefix} 的分支, 一共 ${branchs.length} 个...\n`));
                
        deleteBranchs(projectPath, branchs, () => {
            console.log(chalk.green('\n删除完成!'));
            console.log(chalk.green('\n剩余本地分支:'));
            seachBrnach(projectPath, (output) => {
                console.log(chalk.white(output));
            });
        });
    })
} 

function seachBrnach(projectPath, successCallback) {
    const cmd = 'git branch';
    child_process.exec(cmd, {cwd: projectPath}, function (error, stdout, stderr) {
        if (error) {
            console.log(chalk.red(`exec command ${cmd} error: ` + error));
        } else {
            successCallback(stdout);
        }
    })
}

function deleteBranchs(projectPath, branchsArray, successCallback) {
    let asyncFunc = [];
    branchsArray.forEach((item) => {
        let func = new Promise((resolve) => {
            deleteBranch(projectPath, item, resolve);
        }) 
        asyncFunc.push(func);
    });

    Promise.all(asyncFunc).then(successCallback);
}

function deleteBranch(projectPath, branchName, successCallback) {
    const cmd = `git branch -D ${branchName}`;
    child_process.exec(cmd, {cwd: projectPath}, function (error, stdout, stderr) {
        if (error) {
            console.log(chalk.red('exec error: ' + error));   
        } else {
            console.log(chalk.white(stdout));
            successCallback();
        }
    })
}


