#! /bin/bash
cd ../
#svn checkout svn://192.168.31.221/WEB/share/node_modules
#tar -zxvf node_modules.tar.gz  
#tar -zcvf node_modules.tar.gz  liunx下 先npm rebuild node-sass  然后再打包 则ok 在 svn add commit
#npm --registry http://registry.cnpmjs.org info underscore


ln -s /opt/local/node_modules 

echo $PATH
env
# chmod -R 777 node_modules
npm run build
