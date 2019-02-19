# web hooks

github 或者 gitlab 在触发事件后,会发送请求到目标 jenkins服务器(需要配置web hooks)

请求body的内容大概如下

```json
    {
        "ref": "refs/heads/test/jenkins",
        "before": "0436b16e5e7dc8c9583b9ed1949761dec7235e7d",
        "after": "4199ccb4b840c50eb39bb7a87068fa26289aaa71",
        "created": false,
        "deleted": false,
        "forced": false,
        "base_ref": null,
        "compare": "https://github.com/ruixinMRK/webpackConfig/compare/0436b16e5e7d...4199ccb4b840",
        "commits": [
            {
            "id": "4199ccb4b840c50eb39bb7a87068fa26289aaa71",
            "tree_id": "b6eff7ca737131bfdc513889a4a911a08b14f10f",
            "distinct": true,
            "message": "update run.sh & get git version",
            "timestamp": "2019-02-19T14:00:13+08:00",
            "url": "https://github.com/ruixinMRK/webpackConfig/commit/4199ccb4b840c50eb39bb7a87068fa26289aaa71",
            "author": {
                "name": "maruokun",
                "email": "270197698@qq.com",
                "username": "ruixinMRK"
            },
            "committer": {
                "name": "GitHub",
                "email": "noreply@github.com",
                "username": "web-flow"
            },
            "added": [

            ],
            "removed": [

            ],
            "modified": [
                "cmd/run.sh"
            ]
            }
        ],
        "head_commit": {
            "id": "4199ccb4b840c50eb39bb7a87068fa26289aaa71",
            "tree_id": "b6eff7ca737131bfdc513889a4a911a08b14f10f",
            "distinct": true,
            "message": "update run.sh & get git version",
            "timestamp": "2019-02-19T14:00:13+08:00",
            "url": "https://github.com/ruixinMRK/webpackConfig/commit/4199ccb4b840c50eb39bb7a87068fa26289aaa71",
            "author": {
            "name": "maruokun",
            "email": "270197698@qq.com",
            "username": "ruixinMRK"
            },
            "committer": {
            "name": "GitHub",
            "email": "noreply@github.com",
            "username": "web-flow"
            },
            "added": [

            ],
            "removed": [

            ],
            "modified": [
            "cmd/run.sh"
            ]
        },
        "repository": {
            "id": 154927149,
            "node_id": "MDEwOlJlcG9zaXRvcnkxNTQ5MjcxNDk=",
            "name": "webpackConfig",
            "full_name": "ruixinMRK/webpackConfig",
            "private": false,
            "owner": {
            "name": "ruixinMRK",
            "email": "maruokun@aliyun.com",
            "login": "ruixinMRK",
            "id": 20150403,
            "node_id": "MDQ6VXNlcjIwMTUwNDAz",
            "avatar_url": "https://avatars1.githubusercontent.com/u/20150403?v=4",
            "gravatar_id": "",
            "url": "https://api.github.com/users/ruixinMRK",
            "html_url": "https://github.com/ruixinMRK",
            "followers_url": "https://api.github.com/users/ruixinMRK/followers",
            "following_url": "https://api.github.com/users/ruixinMRK/following{/other_user}",
            "gists_url": "https://api.github.com/users/ruixinMRK/gists{/gist_id}",
            "starred_url": "https://api.github.com/users/ruixinMRK/starred{/owner}{/repo}",
            "subscriptions_url": "https://api.github.com/users/ruixinMRK/subscriptions",
            "organizations_url": "https://api.github.com/users/ruixinMRK/orgs",
            "repos_url": "https://api.github.com/users/ruixinMRK/repos",
            "events_url": "https://api.github.com/users/ruixinMRK/events{/privacy}",
            "received_events_url": "https://api.github.com/users/ruixinMRK/received_events",
            "type": "User",
            "site_admin": false
            },
            "html_url": "https://github.com/ruixinMRK/webpackConfig",
            "description": "随时体检最新的webpack",
            "fork": false,
            "url": "https://github.com/ruixinMRK/webpackConfig",
            "forks_url": "https://api.github.com/repos/ruixinMRK/webpackConfig/forks",
            "keys_url": "https://api.github.com/repos/ruixinMRK/webpackConfig/keys{/key_id}",
            "collaborators_url": "https://api.github.com/repos/ruixinMRK/webpackConfig/collaborators{/collaborator}",
            "teams_url": "https://api.github.com/repos/ruixinMRK/webpackConfig/teams",
            "hooks_url": "https://api.github.com/repos/ruixinMRK/webpackConfig/hooks",
            "issue_events_url": "https://api.github.com/repos/ruixinMRK/webpackConfig/issues/events{/number}",
            "events_url": "https://api.github.com/repos/ruixinMRK/webpackConfig/events",
            "assignees_url": "https://api.github.com/repos/ruixinMRK/webpackConfig/assignees{/user}",
            "branches_url": "https://api.github.com/repos/ruixinMRK/webpackConfig/branches{/branch}",
            "tags_url": "https://api.github.com/repos/ruixinMRK/webpackConfig/tags",
            "blobs_url": "https://api.github.com/repos/ruixinMRK/webpackConfig/git/blobs{/sha}",
            "git_tags_url": "https://api.github.com/repos/ruixinMRK/webpackConfig/git/tags{/sha}",
            "git_refs_url": "https://api.github.com/repos/ruixinMRK/webpackConfig/git/refs{/sha}",
            "trees_url": "https://api.github.com/repos/ruixinMRK/webpackConfig/git/trees{/sha}",
            "statuses_url": "https://api.github.com/repos/ruixinMRK/webpackConfig/statuses/{sha}",
            "languages_url": "https://api.github.com/repos/ruixinMRK/webpackConfig/languages",
            "stargazers_url": "https://api.github.com/repos/ruixinMRK/webpackConfig/stargazers",
            "contributors_url": "https://api.github.com/repos/ruixinMRK/webpackConfig/contributors",
            "subscribers_url": "https://api.github.com/repos/ruixinMRK/webpackConfig/subscribers",
            "subscription_url": "https://api.github.com/repos/ruixinMRK/webpackConfig/subscription",
            "commits_url": "https://api.github.com/repos/ruixinMRK/webpackConfig/commits{/sha}",
            "git_commits_url": "https://api.github.com/repos/ruixinMRK/webpackConfig/git/commits{/sha}",
            "comments_url": "https://api.github.com/repos/ruixinMRK/webpackConfig/comments{/number}",
            "issue_comment_url": "https://api.github.com/repos/ruixinMRK/webpackConfig/issues/comments{/number}",
            "contents_url": "https://api.github.com/repos/ruixinMRK/webpackConfig/contents/{+path}",
            "compare_url": "https://api.github.com/repos/ruixinMRK/webpackConfig/compare/{base}...{head}",
            "merges_url": "https://api.github.com/repos/ruixinMRK/webpackConfig/merges",
            "archive_url": "https://api.github.com/repos/ruixinMRK/webpackConfig/{archive_format}{/ref}",
            "downloads_url": "https://api.github.com/repos/ruixinMRK/webpackConfig/downloads",
            "issues_url": "https://api.github.com/repos/ruixinMRK/webpackConfig/issues{/number}",
            "pulls_url": "https://api.github.com/repos/ruixinMRK/webpackConfig/pulls{/number}",
            "milestones_url": "https://api.github.com/repos/ruixinMRK/webpackConfig/milestones{/number}",
            "notifications_url": "https://api.github.com/repos/ruixinMRK/webpackConfig/notifications{?since,all,participating}",
            "labels_url": "https://api.github.com/repos/ruixinMRK/webpackConfig/labels{/name}",
            "releases_url": "https://api.github.com/repos/ruixinMRK/webpackConfig/releases{/id}",
            "deployments_url": "https://api.github.com/repos/ruixinMRK/webpackConfig/deployments",
            "created_at": 1540615808,
            "updated_at": "2019-02-01T08:59:44Z",
            "pushed_at": 1550556014,
            "git_url": "git://github.com/ruixinMRK/webpackConfig.git",
            "ssh_url": "git@github.com:ruixinMRK/webpackConfig.git",
            "clone_url": "https://github.com/ruixinMRK/webpackConfig.git",
            "svn_url": "https://github.com/ruixinMRK/webpackConfig",
            "homepage": "",
            "size": 361,
            "stargazers_count": 1,
            "watchers_count": 1,
            "language": "JavaScript",
            "has_issues": true,
            "has_projects": true,
            "has_downloads": true,
            "has_wiki": true,
            "has_pages": false,
            "forks_count": 0,
            "mirror_url": null,
            "archived": false,
            "open_issues_count": 0,
            "license": null,
            "forks": 0,
            "open_issues": 0,
            "watchers": 1,
            "default_branch": "master",
            "stargazers": 1,
            "master_branch": "master"
        },
        "pusher": {
            "name": "ruixinMRK",
            "email": "maruokun@aliyun.com"
        },
        "sender": {
            "login": "ruixinMRK",
            "id": 20150403,
            "node_id": "MDQ6VXNlcjIwMTUwNDAz",
            "avatar_url": "https://avatars1.githubusercontent.com/u/20150403?v=4",
            "gravatar_id": "",
            "url": "https://api.github.com/users/ruixinMRK",
            "html_url": "https://github.com/ruixinMRK",
            "followers_url": "https://api.github.com/users/ruixinMRK/followers",
            "following_url": "https://api.github.com/users/ruixinMRK/following{/other_user}",
            "gists_url": "https://api.github.com/users/ruixinMRK/gists{/gist_id}",
            "starred_url": "https://api.github.com/users/ruixinMRK/starred{/owner}{/repo}",
            "subscriptions_url": "https://api.github.com/users/ruixinMRK/subscriptions",
            "organizations_url": "https://api.github.com/users/ruixinMRK/orgs",
            "repos_url": "https://api.github.com/users/ruixinMRK/repos",
            "events_url": "https://api.github.com/users/ruixinMRK/events{/privacy}",
            "received_events_url": "https://api.github.com/users/ruixinMRK/received_events",
            "type": "User",
            "site_admin": false
        }
        }
```

上述内容包含了大量的用户此次提交的详细内容以及仓库的详细信息
通过上述信息 我们也可以自己做一个发布系统

# jenkins

jenkins 接受到请求后会进行几部操作

```js
    1. 首先切换到你的项目目录  大概是 这样 /var/lib/jenkins/workspace/test
    
    之后会运行 以下 git 命令：
        1.git rev-parse --is-inside-work-tree 检测你当前的目录是否是gi仓库
        2.git config remote.origin.url https://github.com/ruixinMRK/webpackConfig.git   设置你远程仓库的地址
        3.git --version  检测Git 版本
        4.git fetch --tags --progress https://github.com/ruixinMRK/webpackConfig.git +refs/heads/*:refs/remotes/origin/*  拉取代码.并更新本地的命名空间 refs/heads/*
        5.git rev-parse refs/remotes/origin/master^{commit}  获取本地的master分支的最新的commit的hash
        6.git rev-parse refs/remotes/origin/origin/master^{commit} 获取远程的master分支的最新的commit的hash,并对比本地的commit，hash
        7.git config core.sparseCheckout 配置Git稀疏检出模式
        8.git checkout -f 0436b16e5e7dc8c9583b9ed1949761dec7235e7d 切换到最新的提交位置
        9.git rev-list --no-walk 0436b16e5e7dc8c9583b9ed1949761dec7235e7d 排除指定commit  暂时不理解
```

如果配置sh脚本,jenkins会临时新建一个sh脚本执行你写的sh脚本
一般在这个阶段执行 项目的打包 以及 项目的发布到目标CDN上或者触发会员服务器
