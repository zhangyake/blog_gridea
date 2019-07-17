<template>
  <div class="post-detail">
    <article class="post">
      <h2 class="post-title">
        {{ article.title }}
      </h2>
      <div class="post-info">
        <!-- <time class="post-time"> · {{ article.created_at }} · </time> -->
        <span> · {{ article.created_at }} · </span>
        <span> {{ article.page_view }} min read </span>
        <a
          href="https://zhangyake.github.io/tag/gridea"
          class="post-tags"
          v-for="(tag, index) in article.tags"
          :key="'tag' + index"
        >
          # {{ tag.name }}
        </a>
      </div>
      <img class="post-feature-image" :src="article.page_image_url" alt="" />
      <div class="post-content-wrapper">
        <div class="post-content">
          <p>| 版本：ubuntu 14.04（64位）nginx+MySQL+Laravel+PHP7+Redis</p>
          <ol>
            <li>安装Nginx（version：1.9）</li>
          </ol>
          <p>1、首先添加nginx_signing.key#</p>
          <pre><code>wget http:<span class="hljs-comment">//nginx.org/keys/nginx_signing.key</span>

sudo apt-<span class="hljs-built_in">key</span> <span class="hljs-built_in">add</span> nginx_signing.<span class="hljs-built_in">key</span></code></pre>
          <p>2、添加Nginx官方提供的源#</p>
          <pre><code>echo <span class="hljs-string">"deb http://nginx.org/packages/mainline/ubuntu/ trusty nginx"</span>&gt;&gt; <span class="hljs-regexp">/etc/apt</span><span class="hljs-regexp">/sources.list

echo "deb-src http:/</span><span class="hljs-regexp">/nginx.org/packages</span><span class="hljs-regexp">/mainline/ubuntu</span><span class="hljs-regexp">/ trusty nginx"&gt;&gt; /etc</span><span class="hljs-regexp">/apt/sources</span>.list</code></pre>
          <p>3、更新源并安装Nginx#</p>
          <pre><code>sudo apt-<span class="hljs-builtin-name">get</span> update

sudo apt-<span class="hljs-builtin-name">get</span> install nginx</code></pre>
          <p>4、Nginx配置#</p>
          <p>打开配置文件。</p>
          <pre><code><span class="hljs-keyword">vim</span> /etc/nginx/nginx.<span class="hljs-keyword">conf</span></code></pre>
          <p>修改user：</p>
          <pre><code><span class="hljs-keyword">user</span>  <span class="hljs-title">www-data</span>;</code></pre>
          <p>增加server：</p>
          <pre><code><span class="hljs-section">server</span> {

    <span class="hljs-attribute">listen</span> <span class="hljs-number">80</span> default_server;

    <span class="hljs-attribute">listen</span> [::]:<span class="hljs-number">80</span> default_server ipv6only=<span class="hljs-literal">on</span>;

    <span class="hljs-attribute">root</span> /var/www/laravel/public;

    <span class="hljs-attribute">index</span> index.php index.html index.htm;

    <span class="hljs-attribute">server_name</span> server_domain_or_IP;

    <span class="hljs-attribute">location</span> / {

        <span class="hljs-attribute">try_files</span> <span class="hljs-variable">$uri</span> <span class="hljs-variable">$uri</span>/ /index.php?<span class="hljs-variable">$query_string</span>;

    }

    <span class="hljs-attribute">location</span> <span class="hljs-regexp">~ \.php$</span> {

        <span class="hljs-attribute">try_files</span> <span class="hljs-variable">$uri</span> /index.php =<span class="hljs-number">404</span>;

        <span class="hljs-attribute">fastcgi_split_path_info</span><span class="hljs-regexp"> ^(.+\.php)(/.+)$</span>;

        <span class="hljs-attribute">fastcgi_pass</span> unix:/var/run/php/php7.0-fpm.sock;

        <span class="hljs-attribute">fastcgi_index</span> index.php;

        <span class="hljs-attribute">fastcgi_param</span> SCRIPT_FILENAME <span class="hljs-variable">$document_root</span><span class="hljs-variable">$fastcgi_script_name</span>;

        <span class="hljs-attribute">include</span> fastcgi_params;

    }

}
</code></pre>
          <p>
            注意：root中的laravel应为你的项目名称，server_name应为你的服务器公网IP。
          </p>
          <p>配置完之后重启Nginx，使上面的配置项生效。</p>
          <pre><code>sudo<span class="hljs-built_in"> service </span>nginx restart</code></pre>
          <ol start="2">
            <li>安装PHP（version：7.0x）</li>
          </ol>
          <p>1、添加PPA，添加过程中需要按一次回车（Enter）键#</p>
          <pre><code>sudo apt-get install python-software-properties software-properties-common

sudo<span class="hljs-built_in"> add-apt-repository </span>ppa:ondrej/php

sudo apt-get update</code></pre>
          <p>2、安装PHP7以及所需的一些扩展#</p>
          <pre><code>sudo apt-get install php7<span class="hljs-meta">.0</span>-fpm php7<span class="hljs-meta">.0</span>-mysql php7<span class="hljs-meta">.0</span>-<span class="hljs-meta">common</span> php7<span class="hljs-meta">.0</span>-curl php7<span class="hljs-meta">.0</span>-<span class="hljs-keyword">cli</span> php7<span class="hljs-meta">.0</span>-mcrypt php7<span class="hljs-meta">.0</span>-mbstring php7<span class="hljs-meta">.0</span>-dom php7<span class="hljs-meta">.0</span>-gd</code></pre>
          <p>3、配置PHP7#</p>
          <p>打开php.ini配置文件:</p>
          <pre><code>sudo vim <span class="hljs-regexp">/etc/</span>php<span class="hljs-regexp">/7.0/</span>fpm<span class="hljs-regexp">/php.ini</span></code></pre>
          <p>
            找到cgi.fix_pathinfo选项，去掉注释;，然后将值设置为0
            （这个操作是为了避免PHP7的一个漏洞，PS：vim使用“/”进入查找模式）
          </p>
          <pre><code><span class="hljs-attr">cgi.fix_pathinfo</span>=<span class="hljs-number">0</span></code></pre>
          <p>启用php7.0-mcrypt</p>
          <pre><code><span class="hljs-attribute">sudo phpenmod mcrypt</span></code></pre>
          <p>重启php7.0-fpm</p>
          <pre><code>sudo<span class="hljs-built_in"> service </span>php7.0-fpm restart</code></pre>
          <ol start="3">
            <li>
              <p>安装Mysql（version：5.6）</p>
              <p>
                sudo apt-get install mysql-server-5.6 mysql-client-5.6<br />途中会提示设置MySQL的密码，安装好后：
              </p>
              <p>
                mysql -uroot -p<br />然后输入刚刚设置的密码，能成功进入即成功安装。
              </p>
            </li>
            <li><p>安装Laravel（version：latest）</p></li>
          </ol>
          <p>1、安装composer，分别执行以下语句#</p>
          <pre><code>sudo apt-get install curl

cd ~

curl -sS <span class="hljs-string">https:</span><span class="hljs-comment">//getcomposer.org/installer| php</span>

sudo mv composer.phar <span class="hljs-regexp">/usr/</span>local<span class="hljs-regexp">/bin/</span>composer
</code></pre>
          <p>2、安装压缩、解压缩程序#</p>
          <pre><code>sudo apt-<span class="hljs-builtin-name">get</span> install zip unzip</code></pre>
          <p>3、安装git#</p>
          <pre><code>sudo apt-<span class="hljs-builtin-name">get</span> install git</code></pre>
          <p>
            然后在Coding上创建一个私有项目laravel，里面包含所有该Laravel项目所需代码。
          </p>
          <p>4、使用git将代码clone到服务器上#</p>
          <pre><code><span class="hljs-attr">cd</span> <span class="hljs-string">/var</span>

<span class="hljs-attr">mkdir</span> <span class="hljs-string">www</span>

<span class="hljs-attr">cd</span> <span class="hljs-string">www</span>

<span class="hljs-attr">git</span> <span class="hljs-string">clone your-project-git-link</span></code></pre>
          <p>注意：git clone 的地址应是你自己Coding仓库中的项目SSL链接地址</p>
          <p>5、修改laravel项目的访问权限#</p>
          <pre><code>sudo chown -<span class="hljs-string">R :</span>www-data <span class="hljs-regexp">/var/</span>www/laravel

sudo chmod -R <span class="hljs-number">775</span> <span class="hljs-regexp">/var/</span>www<span class="hljs-regexp">/laravel/</span>storage</code></pre>
          <p>6、导入laravel 的vendor目录#</p>
          <pre><code><span class="hljs-keyword">cd</span> <span class="hljs-string">/var/www/laravel</span>

composer install</code></pre>
          <p>注意：5，6两部操作中的“laravel” 应该是你自己项目的的名称。</p>
          <ol start="5">
            <li>安装Redis（version：4.0.5）#</li>
          </ol>
          <p>
            最新版地址：<a href="http://redis.io/download"
              >http://redis.io/download</a
            >
          </p>
          <pre><code>cd ~

wget http:<span class="hljs-comment">//download.redis.io/releases/redis-4.0.5.tar.gz</span>

tar xzf redis-<span class="hljs-number">4.0</span>.<span class="hljs-number">5</span><span class="hljs-selector-class">.tar</span><span class="hljs-selector-class">.gz</span></code></pre>
          <p>配置并启动Redis</p>
          <pre><code><span class="hljs-selector-tag">cd</span> <span class="hljs-selector-tag">redis-4</span><span class="hljs-selector-class">.0</span><span class="hljs-selector-class">.5</span>

<span class="hljs-selector-tag">vi</span> <span class="hljs-selector-tag">redis</span><span class="hljs-selector-class">.conf</span></code></pre>
          <p>
            搜索bind，将# bind
            127.0.0.1的注释去掉后保存（这样做后只有本地服务可以访问Redis，不然就有安全隐患）
          </p>
          <pre><code>make

src/redis-<span class="hljs-keyword">server</span></code></pre>
          <p>看到redis的运行提示即完成。 |</p>

          <div class="post-content">
            <p>| 版本：ubuntu 14.04（64位）nginx+MySQL+Laravel+PHP7+Redis</p>
            <ol>
              <li>安装Nginx（version：1.9）</li>
            </ol>
            <p>1、首先添加nginx_signing.key#</p>
            <pre><code class="hljs cs">wget http:<span class="hljs-comment">//nginx.org/keys/nginx_signing.key</span>

sudo apt-key <span class="hljs-keyword">add</span> nginx_signing.key
</code></pre>
            <p>2、添加Nginx官方提供的源#</p>
            <pre><code class="hljs php"><span class="hljs-keyword">echo</span> <span class="hljs-string">"deb http://nginx.org/packages/mainline/ubuntu/ trusty nginx"</span>&gt;&gt; /etc/apt/sources.<span class="hljs-keyword">list</span>

<span class="hljs-keyword">echo</span> <span class="hljs-string">"deb-src http://nginx.org/packages/mainline/ubuntu/ trusty nginx"</span>&gt;&gt; /etc/apt/sources.<span class="hljs-keyword">list</span>
</code></pre>
            <p>3、更新源并安装Nginx#</p>
            <pre><code class="hljs sql">sudo apt-get <span class="hljs-keyword">update</span>

sudo apt-<span class="hljs-keyword">get</span> <span class="hljs-keyword">install</span> nginx
</code></pre>
            <p>4、Nginx配置#</p>
            <p>打开配置文件。</p>
            <pre><code class="hljs nginx"><span class="hljs-attribute">vim</span> /etc/nginx/nginx.conf
</code></pre>
            <p>修改user：</p>
            <pre><code class="hljs nginx"><span class="hljs-attribute">user</span>  www-data;
</code></pre>
            <p>增加server：</p>
            <pre><code class="hljs nginx"><span class="hljs-section">server</span> {

    <span class="hljs-attribute">listen</span> <span class="hljs-number">80</span> default_server;

    <span class="hljs-attribute">listen</span> [::]:<span class="hljs-number">80</span> default_server ipv6only=<span class="hljs-literal">on</span>;

    <span class="hljs-attribute">root</span> /var/www/laravel/public;

    <span class="hljs-attribute">index</span> index.php index.html index.htm;

    <span class="hljs-attribute">server_name</span> server_domain_or_IP;

    <span class="hljs-attribute">location</span> / {

        <span class="hljs-attribute">try_files</span> <span class="hljs-variable">$uri</span> <span class="hljs-variable">$uri</span>/ /index.php?<span class="hljs-variable">$query_string</span>;

    }

    <span class="hljs-attribute">location</span> <span class="hljs-regexp">~ \.php$</span> {

        <span class="hljs-attribute">try_files</span> <span class="hljs-variable">$uri</span> /index.php =<span class="hljs-number">404</span>;

        <span class="hljs-attribute">fastcgi_split_path_info</span><span class="hljs-regexp"> ^(.+\.php)(/.+)$</span>;

        <span class="hljs-attribute">fastcgi_pass</span> unix:/var/run/php/php7.0-fpm.sock;

        <span class="hljs-attribute">fastcgi_index</span> index.php;

        <span class="hljs-attribute">fastcgi_param</span> SCRIPT_FILENAME <span class="hljs-variable">$document_root</span><span class="hljs-variable">$fastcgi_script_name</span>;

        <span class="hljs-attribute">include</span> fastcgi_params;

    }

}

</code></pre>
            <p>
              注意：root中的laravel应为你的项目名称，server_name应为你的服务器公网IP。
            </p>
            <p>配置完之后重启Nginx，使上面的配置项生效。</p>
            <pre><code class="hljs nginx"><span class="hljs-attribute">sudo</span> service nginx restart
</code></pre>
            <ol start="2">
              <li>安装PHP（version：7.0x）</li>
            </ol>
            <p>1、添加PPA，添加过程中需要按一次回车（Enter）键#</p>
            <pre><code class="hljs sql">sudo apt-get <span class="hljs-keyword">install</span> python-software-properties software-properties-common

sudo <span class="hljs-keyword">add</span>-apt-repository ppa:ondrej/php

sudo apt-<span class="hljs-keyword">get</span> <span class="hljs-keyword">update</span>
</code></pre>
            <p>2、安装PHP7以及所需的一些扩展#</p>
            <pre><code class="hljs css"><span class="hljs-selector-tag">sudo</span> <span class="hljs-selector-tag">apt-get</span> <span class="hljs-selector-tag">install</span> <span class="hljs-selector-tag">php7</span><span class="hljs-selector-class">.0-fpm</span> <span class="hljs-selector-tag">php7</span><span class="hljs-selector-class">.0-mysql</span> <span class="hljs-selector-tag">php7</span><span class="hljs-selector-class">.0-common</span> <span class="hljs-selector-tag">php7</span><span class="hljs-selector-class">.0-curl</span> <span class="hljs-selector-tag">php7</span><span class="hljs-selector-class">.0-cli</span> <span class="hljs-selector-tag">php7</span><span class="hljs-selector-class">.0-mcrypt</span> <span class="hljs-selector-tag">php7</span><span class="hljs-selector-class">.0-mbstring</span> <span class="hljs-selector-tag">php7</span><span class="hljs-selector-class">.0-dom</span> <span class="hljs-selector-tag">php7</span><span class="hljs-selector-class">.0-gd</span>
</code></pre>
            <p>3、配置PHP7#</p>
            <p>打开php.ini配置文件:</p>
            <pre><code class="hljs nginx"><span class="hljs-attribute">sudo</span> vim /etc/php/<span class="hljs-number">7</span>.<span class="hljs-number">0</span>/fpm/php.ini
</code></pre>
            <p>
              找到cgi.fix_pathinfo选项，去掉注释;，然后将值设置为0
              （这个操作是为了避免PHP7的一个漏洞，PS：vim使用“/”进入查找模式）
            </p>
            <pre><code class="hljs">cgi.fix_pathinfo=0
</code></pre>
            <p>启用php7.0-mcrypt</p>
            <pre><code class="hljs nginx"><span class="hljs-attribute">sudo</span> phpenmod mcrypt
</code></pre>
            <p>重启php7.0-fpm</p>
            <pre><code class="hljs css"><span class="hljs-selector-tag">sudo</span> <span class="hljs-selector-tag">service</span> <span class="hljs-selector-tag">php7</span><span class="hljs-selector-class">.0-fpm</span> <span class="hljs-selector-tag">restart</span>
</code></pre>
            <ol start="3">
              <li>
                <p>安装Mysql（version：5.6）</p>
                <p>
                  sudo apt-get install mysql-server-5.6 mysql-client-5.6<br />
                  途中会提示设置MySQL的密码，安装好后：
                </p>
                <p>
                  mysql -uroot -p<br />
                  然后输入刚刚设置的密码，能成功进入即成功安装。
                </p>
              </li>
              <li>
                <p>安装Laravel（version：latest）</p>
              </li>
            </ol>
            <p>1、安装composer，分别执行以下语句#</p>
            <pre><code class="hljs nginx"><span class="hljs-attribute">sudo</span> apt-get install curl

cd <span class="hljs-regexp">~

curl</span> -sS https://getcomposer.org/installer| php

sudo mv composer.phar /usr/local/bin/composer

</code></pre>
            <p>2、安装压缩、解压缩程序#</p>
            <pre><code class="hljs cs">sudo apt-<span class="hljs-keyword">get</span> install zip unzip
</code></pre>
            <p>3、安装git#</p>
            <pre><code class="hljs cs">sudo apt-<span class="hljs-keyword">get</span> install git
</code></pre>
            <p>
              然后在Coding上创建一个私有项目laravel，里面包含所有该Laravel项目所需代码。
            </p>
            <p>4、使用git将代码clone到服务器上#</p>
            <pre><code class="hljs bash"><span class="hljs-built_in">cd</span> /var

mkdir www

<span class="hljs-built_in">cd</span> www

git <span class="hljs-built_in">clone</span> your-project-git-link
</code></pre>
            <p>注意：git clone 的地址应是你自己Coding仓库中的项目SSL链接地址</p>
            <p>5、修改laravel项目的访问权限#</p>
            <pre><code class="hljs ruby">sudo chown -R <span class="hljs-symbol">:www-data</span> /var/www/laravel

sudo chmod -R <span class="hljs-number">775</span> /var/www/laravel/storage
</code></pre>
            <p>6、导入laravel 的vendor目录#</p>
            <pre><code class="hljs bash"><span class="hljs-built_in">cd</span> /var/www/laravel

composer install
</code></pre>
            <p>注意：5，6两部操作中的“laravel” 应该是你自己项目的的名称。</p>
            <ol start="5">
              <li>安装Redis（version：4.0.5）#</li>
            </ol>
            <p>最新版地址：http://redis.io/download</p>
            <pre><code class="hljs nginx"><span class="hljs-attribute">cd</span> <span class="hljs-regexp">~

wget</span> http://download.redis.io/releases/redis-4.0.5.tar.gz

tar xzf redis-<span class="hljs-number">4</span>.<span class="hljs-number">0</span>.<span class="hljs-number">5</span>.tar.gz
</code></pre>
            <p>配置并启动Redis</p>
            <pre><code class="hljs css"><span class="hljs-selector-tag">cd</span> <span class="hljs-selector-tag">redis-4</span><span class="hljs-selector-class">.0</span><span class="hljs-selector-class">.5</span>

<span class="hljs-selector-tag">vi</span> <span class="hljs-selector-tag">redis</span><span class="hljs-selector-class">.conf</span>
</code></pre>
            <p>
              搜索bind，将# bind
              127.0.0.1的注释去掉后保存（这样做后只有本地服务可以访问Redis，不然就有安全隐患）
            </p>
            <pre><code class="hljs nginx"><span class="hljs-attribute">make</span>

src/redis-server
</code></pre>
            <p>看到redis的运行提示即完成。 |</p>
          </div>
        </div>
        <div class="toc-container"></div>
      </div>
    </article>
  </div>
</template>

<script>
import emojione from "emojione";
import marked from "marked";
import hljs from "highlight.js";
export default {
  name: "post",
  components: {},
  data() {
    return {
      article: {},
      rawHtml: ""
    };
  },
  mounted() {
    let id = this.$route.params.id;
    this.getArticleDeatil({ id });
  },
  methods: {
    getArticleDeatil(data) {
      this.api.getArticleDeatil(data).then(res => {
        this.article = res.data;
        this.rawHtml = this.parse(this.article.content_md);
      });
    },
    parse(content) {
      marked.setOptions({
        highlight: code => {
          return hljs.highlightAuto(code).value;
        },
        sanitize: true
      });

      return emojione.toImage(marked(content));
    }
  }
};
</script>
<style>
/* @import "~simplemde/dist/simplemde.min.css"; */
/* @import "~highlight.js/styles/atom-one-dark.css"; */
/* @import "./markdown.css"; */
</style>
