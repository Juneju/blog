---
layout: post
title:  "博客搭建：Jekyll + Github"
date:   2021-02-23 18:05:18 +0800
cn: true
no-catalog: false
---

## Jekyll

Jekyll 是静态网站生成工具。Github Pages可以免费部署Jekyll生成的网站。

本博客是在jekyll minima theme的基础上改造页面样式，增加一些功能点。所以需要在本地环境安装调试Jekyll项目。

### 安装

##### 依赖环境

* Ruby version 2.4.0 or higher
* RubyGems
* GCC and Make

##### gem 安装包

``` shell
gem install jekyll bundler
```

##### 创建项目

``` shell
jekyll new blog
```

##### 启动项目

``` shell
bundle exec jekyll serve
#配置启动端口
bundle exec jekyll serve --port PORT
#配置启动主机
bundle exec jekyll serve --host HOSTNAME
```

##### 访问项目

本地项目默认地址是：http://localhost:4000

注：默认ruby gems配置的地址有时候下载速度比较慢，可以改用镜像：https://mirrors.tuna.tsinghua.edu.cn/rubygems/

### 项目结构

##### 默认主题minima路径

在项目下(Gemfile所在路径)运行：

``` shell
bundle info --path minima
```

#####　主题结构

	├─assets
	├─_includes
	├─_layouts
	└─_sass
1. _layouts

   存放页面布局文件。其他文件通过frontMatter声明来使用对应的布局文件。如果需要自定义布局，可以将文件放在此目录下。

   ```
   ├── default.html：所有layouts的基础，通过{{content}}和 frontMatter声明（layout:default）
   ├── home.html ：index.md或index.html的html布局
   ├── page.html ：除了posts，其余包含frontMatter:page的布局
   └── post.html : 发布的文章的页面布局
   ```

2. _includes

   存放能够被_layouts注入的文件。

   ```
   ├── footer.html
   ├── google-analytics.html
   ├── head.html
   ├── header.html
   ```

   注入方式：

   ``` django
   {%- include header.html -%}
   ```

3. _sass

   存放样式.scss文件。

4. assets

   存放资源文件。main.scss在此文件夹中，在_layouts/default.html 通过 _includes/head.html中引入。



##### 项目结构

除了包含上述的主题结构外，还有以下：

```
├─_site
├─_posts
├─_plugins
├─_config.yml
└─...
```

1. _site

   项目运行之后，生成的静态网页。

2. _posts

   需要发布的文章在这里面。

   Jekyll规定了post文件命名的格式如下：

   ```
   YEAR-MONTH-DAY-title.MARKUP
   ​	YEAR：年份，四位数字   
   ​	MONTH：月份，二位数字  
   ​	DAY：天，二位数字  
   ​	MARKUP：文件格式，如md  
   ```

   如果想要给文章添加category，其中一种方法是可以通过文件夹的名称。如下给文章```mysql.md```添加了```database```的分类：

   ```
   ├─posts
   	├─database
   		├─_posts
   			├─mysql.md
   ```

3. _plugins

   用ruby语言编写的插件。具体参考：https://jekyllrb.com/docs/plugins/your-first-plugin/

4. _config.yml

   配置文件存放项目的全局配置，这些配置很少被修改。对于经常需要改变的变量，使用data files。

   在Liquid模板中可以通过```{{ site.xxx }}```来获取对应的值。
   
   

### Front Matter

Front Matter 是在文件开头，介于三段虚线之间的YAML片段。

例子：

``` yaml
---
layout: default
title: 标题
---
```

> layout 用于页面嵌入布局中（通过 ```{{content}}``` ）。
>
> title是页面定义的变量，可以在该页面的Liquid模板中通过```{{ page.title }}```使用。

### Jekyll Liquid

Jekyll 使用 [Liquid](https://shopify.github.io/liquid/) 模板语言处理模板。

语言基本上和一般模板语言相同，如变量取值`{{ object }}`  , 条件判断`{% if condition %} {% endif %}  ` 等等。具体可以参考官方文档。



## GitHub 部署

用GitHub pages部署Jekyll，需要新建一个仓库，然后在仓库的settings中配置GitHub Pages。具体的操作可以参考网上的教程。

想特别提到的一点是：如果使用了自己编写的插件，上传到了_plugins文件夹下，但是部署到线上环境会不生效。原因是Github自动部署的保护机制。所以如果想部署上去，就需要使用Github Actions。具体可以参考：https://jekyllrb.com/docs/continuous-integration/github-actions/#workspace-setup

下面放一下本项目配置的gh-pages.yml：

```yaml
name: Build and deploy Jekyll site to GitHub Pages

on:
  push:
    branches:
      - main

jobs:
  github-pages:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: helaili/jekyll-action@2.0.5
        env:
          JEKYLL_PAT: ${{ secrets.JEKYLL_PAT }}
```



## 参考

> https://jekyllrb.com/docs/
>
> https://jekyllrb.com/docs/continuous-integration/github-actions/



## 其他

这篇博客的搭建主要耗时不到一个月，抽出了几天，这几天抽出了几个小时，实际耗时比较短，所以总体搭建下来感觉还是挺简单的。如果不修改Jekyll默认主题，可能只需要几个小时。

最后，既然自己已经搭出来，希望自己能坚持做下去。

