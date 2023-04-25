# 環境構築

## MySQL

下記コマンドで立ち上げる。基本立ち上げたままで良い。

```
$ docker comopse up -d db
```

## Spring Boot

### build + サーバー立ち上げ まとめてやる場合

下記のコマンドを実行後、[localhost:8001](http://localhost:8001)にアクセス。1〜2 分かかる。

```
$ docker compose up app
```

### build と サーバー立ち上げ 別々にやる場合

※ 挙動未確認

```
$ docker compose run --rm app sh -c "cd backend && gradle build"
$ docker compose run --rm app sh -c "cd backend && java -jar -Dserver.port=8001 build/libs/*SNAPSHOT.jar"
```

## Next.js (+ Tailwind CSS)

### パッケージのインストール

```
$ docker compose run --rm front sh -c "cd frontend && yarn install"
```

### Next.js の立ち上げ

下記のコマンドを実行後、[localhost:3001](http://localhost:3001)にアクセス。

```
$ docker compose up front
```
