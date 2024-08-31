<!-- .slide: class="two-column with-code " -->

<style>
  .static-output-44 {
    width: 450px;
    height: auto;
  }
</style>

# Deploying

## Static site generation

And if you use this deployment mode, you'll need to make a few adjustments <br/> <br/>
When building the application, the output will look like this :

<img src="./assets/images/09-deploying/static-output.png" class="static-output-44" />

##--##
<br/> <br/>
You need to configure a reverse proxy to manage public urls<br/><br/>
_Example using nginx :_

```bash
server {
  listen 80;
  server_name sfeir.com;

  root /var/www/out;

  location / {
      try_files $uri $uri.html $uri/ =404;
  }

  error_page 404 /404.html;
  location = /404.html {
      internal;
  }
}
```
