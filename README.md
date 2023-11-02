<p align="center">
  <br>
  <a href="https://github.com/aaaaa-pi/WAICoder" alt="logo" ><img src="https://github.com/aaaaa-pi/WAICoder/blob/main/src/assets/logo_light.svg?raw=true" width="300"/></a>
  <br>
</p>
  <p align="center">
    <a href="#">调试</a> •
    <a href="#">构建</a>
  </p>
  <p align="center">
    <img alt="GitHub Contributors" src="https://img.shields.io/github/contributors/aaaaa-pi/WAICoder" />
    <img alt="GitHub Last Commit" src="https://img.shields.io/github/last-commit/aaaaa-pi/WAICoder" />
    <img alt="" src="https://img.shields.io/github/repo-size/aaaaa-pi/WAICoder" />
    <img alt="GitHub Issues" src="https://img.shields.io/github/issues/aaaaa-pi/WAICoder" />
    <img alt="AutoDeploy" src="https://github.com/aaaaa-pi/WAICoder/actions/workflows/auto_deploy.yml/badge.svg" />
  </p>

## 调试
```shell
git clone https://github.com/aaaaa-pi/WAICoder.git
pnpm install
pnpm run serve
```
### OpenAPI 自动生成接口请求代码
```shell
pnpm install -g openapi-typescript-codegen --save-dev
openapi --input ./spec.json --output ./generated --client xhr
> 示例
> openapi --input http://localhost:8121/api/v2/api-docs --output ./generated --client axios
```

## 构建
``` pnpm run build ``` 
