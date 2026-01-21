# git 操作

## 添加仓库

git init
git add .
git commit -m "first commit"
git branch -M main
git remote add origin git@github.com:cjf717/music2026.git
git push -u origin main

### 提交上传

```

git add .
git commit -m "提交消息"
# git remote add origin git@github.com:cjf717/music2026.git
git push -u origin "main"

```

### 分支管理

#### 创建分支

```
git checkout -b 基本功能20230810备份
git push -u origin 基本功能20230810备份
git checkout master
```

#### 合并分支

- 可以使用以下命令将其他分支的代码合并到当前分支：`git merge <branch>`
- 如果想将 A 分支合并到 B 分支，就要先切换到 B 分支，然后执行命令：`git merge A`

### 标签

#### 创建标签

```
# git tag -a <tagname> -m "<message>"
git tag -a v1.2.0 -m "基本功能20230810备份"
# git push origin --tags
git push origin v1.2.0
```

### 远程服务器覆盖本地版本

```
git fetch --all
git reset --hard origin/master
git pull
```

## 上传

- 更新到服务器
  windows下rsync命令需要使用git bash

```bash
# 公司网络p2p点对点
rsync -avz --chmod=755 --delete -e 'D:\tools\cwrsync_6.4.2_x64_free\bin\ssh.exe -p 6000 -i ~/.ssh/id_ed25519' dist/ jeff@127.0.0.1:/var/www/html/fanhao111/fanhao-html/`date +%Y%m%d-%H%M%S`/

# 远程网络
rsync -avz --chmod=755 --delete -e 'D:\tools\cwrsync_6.4.2_x64_free\bin\ssh.exe -p 38059 -i ~/.ssh/id_ed25519' dist/ jeff@8.134.209.242:/var/www/html/fanhao111/fanhao-html/`date +%Y%m%d-%H%M%S`/
scp -r -P 38059 dist jeff@8.134.209.242:/var/www/html/music/`date +%Y%m%d-%H%M%S`

# 家庭网络同一网段
rsync -avz --chmod=755 --delete -e 'D:\tools\cwrsync_6.4.2_x64_free\bin\ssh.exe -p 3822 -i ~/.ssh/id_ed25519' dist/ jeff@192.168.199.59:/var/www/html/fanhao111/fanhao-html/`date +%Y%m%d-%H%M%S`/

scp -r -P 3822 dist jeff@192.168.199.59:/var/www/html/music/`date +%Y%m%d-%H%M%S`
```
