# p5js-test

test p5.js

## run server

```sh
$ ./server.sh
```

access {ip-address}:3000.

## tips

### server setup

```sh
$ sudo apt install nodejs npm
$ npm i -g http-server browser-sync
```

### run server (static)

```sh
$ cd {project}
$ http-server
```

access {ip-address}:8080.

### run server (Hot reload)

```sh
$ cd {project}
$ browser-sync start --server -f -w
```

access {ip-address}:3000.

