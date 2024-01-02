# GIT

## 一、配置

### 1. 全局配置

- git config --global user.name "wyw"
- git config --global user.email "740484522@qq.com"

### 2. 创建仓库

| 命令 | 作用 |
|------|------|
| git init | 初始化 |
| touch README.md | 创建 README 文件 |
| git add README.md | 暂存 README 文件 |
| git commit -m "first commit" | 提交到本地仓库 |
| git remote add origin url | 连接到远程仓库地址 |
| git push -u origin master | 推送到远程仓库 |

### 3. 已有仓库?

| 命令 | 作用 |
|------|------|
| git clone `url` | 克隆远程仓库到本地 |
| git clone `url` myLibName | 克隆远程仓库到本地并自定义本地仓库的名字 |
| git remote -v | 查看连接的远程仓库列表 |
| git remote set-url origin `url` | 改变连接的远程仓库地址 |
| git remot |  |
| git remote add origin `url` |  |

## 二、终端命令

### 1. 保存提交代码

| 命令 | 作用 |
|------|------|
| git stash save '`message`' | 能够将所有未提交的修改（工作区和暂存区）保存至堆栈中 |
| git stash list | 查看stash列表 |
| git stash pop | 应用最近一次的stash并删除该记录 |
| git stash clear | 清除堆栈中的所有内容 |
| git pull | 拉取远程分支与本地合并 |
| git status | 查看当前项目文件的状态信息 |
| git add . | 暂存已修改的文件 |
| git commit -m 'message' | 提交更新保存到本地 |
| git commit -m 'message' --no-verify | 跳过校验规则提交更新保存到本地 |
| git reset --soft HEAD^ | 恢复最近一次 commit |
| git reset `version` | 版本回退 |
| git reset `version` --hard | 强制版本回退 |
| git push | 直接推送到远程仓库 |

### 2. Husky 钩子

| 命令 | 作用 |
|------|------|
| git commit -m 'feat: `message`' | 新功能、新特性 |
| git commit -m 'fix: ' | 修改 Bug |
| git commit -m 'docs: ' | 文档修改 |
| git commit -m 'style: ' | 代码格式修改，注意不是css修改（例如分号修改） |
| git commit -m 'test: ' | 测试用例新增、修改 |
| git commit -m 'build: ' | 影响项目构建或依赖项修改 |
| git commit -m 'perf: ' | 更改代码以提高性能（在不影响代码内部行为的前提下，对程序性能优化）|
| git commit -m 'refactor: ' | 代码重构（重构，在不影响代码内部行为、功能下的代码修改） |
| git commit -m 'workflow: ' | 工作流相关文件修改 |

### 3. 分支

| 命令 | 作用 |
|------|------|
| git branch | 查看当前所处分支 |
| git branch -a | 查看本地与远程仓库的所有分支 |
| git branch `branchname` | 创建分支 |
| git checkout `branchname` | 切换所在的分支 |
| git branch -d `branchname` | 删除已有分支 |
| git merge `branchname` | 在本地将子分支合并到主分支 |
| git push -u origin `branchname` | 将子分支推送到码云 |

### 4. 标签

| 命令 | 作用 |
|------|------|
| git tag | 查看本地创建的所有标签 |
| git tag `tagname` | 创建标签 |
| git checkout `tagname` | 切换所在的标签 |
| git tag -d `tagname` | 删除已有标签 |
| git push origin <`tagname`> | 将本地标签推送到码云 |
| git push --tags | 将本地所有不在远程仓库的标签都推送到码云 |
