# NodeScripts
node.js 写的一些脚本小工具

- 批量删除本地git分支

## 批量删除本地git分支

开发的时候，分支名都比较固定，比如dev/v1.0.0/feature1、dev/v1.0.0/feature2、dev/v1.0.0/feature3...，
当多个迭代后，会存在很多不用的git分支，挨个删除较繁琐，使用git_delete.js一键删除特定前缀的分支：

比如删除dev/v1.0.0开头的分支：

```js
node git_delete.js /User/xxx/code_js/projects dev/1.0.0
```
