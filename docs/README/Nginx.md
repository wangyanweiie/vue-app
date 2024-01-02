# Nginx

## 一、简介

### 1. 概述

Nginx 是一款轻量级的 Web 服务器/反向代理服务器及电子邮件（IMAP/POP3）代理服务器，在 BSD-like 协议下发行。其特点是占有内存少，并发能力强，事实上 nginx 的并发能力在同类型的网页服务器中表现较好。

### 2. 特点

- 更快：单次请求响应更快，高并发可以更快的处理响应
- 高拓展性：设计极具扩展性，由多个不同功能、不同层次、不同类型且耦合度极低的模块组成
- 高可靠性：很多高流量网站都在核心服务器上大规模使用 Nginx
- 低内存消耗：一般1万个非活跃的 HTTP Keep-Alive 连接在 Nginx 中仅消耗2.5MB内存
- 高并发：单机支持10万以上的并发连接
- 热部署：master 管理进程与 worker 工作进程的分离设计，使得 Nginx 能够支持热部署
- 开源协议：使用 BSD 许可协议，免费使用，且可修改源码

### 3. 应用场景

- HTTP 服务器  
Nginx 本身也是一个静态资源的服务器，当只有静态资源的时候，就可以使用 Nginx 来做服务器，如果一个网站只是静态页面的话，那么就可以通过这种方式来实现部署。

- 静态资源服务  
静态服务器，通常会提供一个上传的功能，其他应用如果需要静态资源就从该静态服务器中获取。

- 反向代理服务  
反向代理 (Reverse Proxy) 方式是指以代理服务器来接受 Internet 上的连接请求，然后将请求转发给内部网络上的服务器，并将从服务器上得到的结果返回给 Internet 上请求连接的客户端，此时代理服务器对外就表现为一个反向代理服务器。

- 负载均衡  
负载均衡也是 Nginx 常用的一个功能，负载均衡其意思就是分摊到多个操作单元上进行执行，例如 Web 服务器、FTP 服务器、企业关键应用服务器和其它关键任务服务器等，从而共同完成工作任务。

- 动静分离  
动静分离是让动态网站里的动态网页根据一定规则把不变的资源和经常变的资源区分开来，动静资源做好了拆分以后，我们就可以根据静态资源的特点将其做缓存操作，这就是网站静态化处理的核心思路。

## 二、安装与部署

### 1. [官网](https://nginx.org/en/download.html)  

### 2. 安装

- 可以选择 Stable version 版本下载到本地，下载完成后直接在本地解压后放入 linux 系统中；
- 或者直接在 linux 环境中使用命令下载；

``` shell
# 安装依赖包：
yum -y install gcc zlib zlib-devel pcre-devel openssl openssl-devel

# 切换目录
cd /usr/local

# 创建存放目录 nginx
mkdir  nginx

# 切换到 nginx 目录下
cd nginx

# 下载 nginx 安装包
wget http://nginx.org/download/nginx-1.22.0.tar.gz

# 解压安装包
tar -xvf nginx-1.22.0.tar.gz

# 解压完成后，进入 nginx 下的目录
cd /usr/local/nginx/nginx-1.22.0

# 执行 make 命令
make

# 执行安装命令
make install

# 查看是否安装完成（查看是否有 nginx 进程）
ps -ef | grep nginx

# 若存在进程则代表安装成功，则可以切换到 /sbin 目录下
cd /usr/local/nginx/sbin

# 启动 nginx 服务
./nginx -c  /usr/local/nginx/conf/nginx.conf

# 启动成功后再次查看 nginx 进程
ps -ef | grep nginx
```

### 3. 部署

- 配置 nginx.conf 文件；

``` shell
# 跳转到 conf 文件所在的路径
cd /usr/local/nginx/conf

# 编辑配置文件
vi nginx.conf

# 添加 server 对象
server {
    # 端口号
    listen 5000;  
    # IP 地址 / 域名
    server_name 192.168.3.81;
    location / {
        # 打包后的静态文件路径
        root  /home/static/yongjing/dist;
        # 静态资源入口文件
        index  index.html index.htm;
        try_files $uri $uri/ /index.html;
    }
}
```

- 重启 nginx

``` shell
# 跳转回上层路径
cd /usr/local/nginx

# 查看当前 nginx 的进程号
ps -ef|grep nginx

# 终止进程号
kill 进程号

# 重启 nginx
./sbin/nginx -c conf/nginx.conf
```

## 三、.conf 配置详解

### 1. 主要配置区域

- worker_processes  
Nginx 服务器并发处理服务的关键配置，值越大，可以支持的并发处理数量也就越多，但是会受到硬件、软件等设备的制约。

- events  
主要影响 Nginx 服务器与用户的网络连接，常用设置包括：是否开启对多个 work progress 下的网络连接进行序列化、是否允许同时接收多个网络连接、选取哪种事件驱动模型来处理连接请求、每个 wordprocess 可以同时支持的最大连接数等。

- http  
配置最频繁的部分，代理、缓存、日志等多数功能和第三方模块的配置都在这里。

### 2. server 配置

- server  
一个虚拟主机，一个http中可以配置多个server，一个server就是一个虚拟主机。

> server_name：指定 IP 地址或域名，多个配置之间用空格分开。  
> root：整个 server 虚拟主机内的根目录，所有当前主机中的 web 项目的根目录。  
> index：用户访问 web 网站时的全局首页，入口文件。  

``` shell
#user  nobody;
worker_processes  1;

#error_log  logs/error.log;
#error_log  logs/error.log  notice;
#error_log  logs/error.log  info;

#pid       logs/nginx.pid;

events {
    worker_connections  1024;
}

http {
    include       mime.types;
    default_type  application/octet-stream;

    #log_format  main  '$remote_addr - $remote_user [$time_local] "$request" '
    #                  '$status $body_bytes_sent "$http_referer" '
    #                  '"$http_user_agent" "$http_x_forwarded_for"';

    #access_log  logs/access.log  main;

    sendfile        on;
    #tcp_nopush     on;

    #keepalive_timeout  0;
    keepalive_timeout  65;

    #gzip  on;

    server {
        listen       80;
        server_name  localhost;

        #charset koi8-r;
        #access_log  logs/host.access.log  main;

        location / {
            root   html;
            index  index.html index.htm;
        }

        #error_page  404              /404.html;
        # redirect server error pages to the static page /50x.html

        error_page   500 502 503 504  /50x.html;
        location = /50x.html {
            root   html;
        }

        # proxy the PHP scripts to Apache listening on 127.0.0.1:80
        #
        #location ~ \.php$ {
        #    proxy_pass   http://127.0.0.1;
        #}

        # pass the PHP scripts to FastCGI server listening on 127.0.0.1:9000
        #
        #location ~ \.php$ {
        #    root           html;
        #    fastcgi_pass   127.0.0.1:9000;
        #    fastcgi_index  index.php;
        #    fastcgi_param  SCRIPT_FILENAME  /scripts$fastcgi_script_name;
        #    include        fastcgi_params;
        #}

        # deny access to .htaccess files, if Apache's document root
        # concurs with nginx's one

        #location ~ /\.ht {
        #    deny  all;
        #}
    }


    # another virtual host using mix of IP-, name-, and port-based configuration
    server {
        listen 5000;
        server_name 192.168.3.38 
        location / {
            root  /home/static/yongjing/dist;
            index  index.html index.htm;
            try_files $uri $uri/ /index.html;
        }
    }

    # HTTPS server
    #server {
    #    listen       443 ssl;
    #    server_name  localhost;

    #    ssl_certificate      cert.pem;
    #    ssl_certificate_key  cert.key;

    #    ssl_session_cache    shared:SSL:1m;
    #    ssl_session_timeout  5m;

    #    ssl_ciphers  HIGH:!aNULL:!MD5;
    #    ssl_prefer_server_ciphers  on;

    #    location / {
    #        root   html;
    #        index  index.html index.htm;
    #    }
    #}
}
```
