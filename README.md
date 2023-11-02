<h1 align="center">
  <br>
  <a href="https://github.com/aaaaa-pi/WAICoder" alt="logo" ><img src="https://github.com/aaaaa-pi/WAICoder/blob/main/src/assets/logo_light.svg?raw=true" width="150"/></a>
  <br>
  <p align="center">
    <a href="#">快速上手</a> •
    <a href="#">调试与部署</a> •
    <a href="#anchor"></a>
  </p>
  <br>
  <p>
  <img alt="GitHub Contributors" src="https://img.shields.io/github/contributors/aaaaa-pi/WAICoder" />
  <img alt="GitHub Last Commit" src="https://img.shields.io/github/last-commit/aaaaa-pi/WAICoder" />
  <img alt="" src="https://img.shields.io/github/repo-size/aaaaa-pi/WAICoder" />
  <img alt="GitHub Issues" src="https://img.shields.io/github/issues/aaaaa-pi/WAICoder" />
  <img alt="AutoDeploy" src="https://github.com/aaaaa-pi/WAICoder/actions/workflows/auto_deploy.yml/badge.svg" />
  </p>

</h1>



# WAICoder 

## Project setup 
``` pnpm install ``` 
### Compiles and hot-reloads for development 
``` pnpm run serve ``` 
### Compiles and minifies for production 
``` pnpm run build ``` 
### Lints and fixes files 
``` pnpm run lint ``` 
## 根据后台生成代码

```shell
openapi --input http://localhost:8121/api/v2/api-docs --output ./generated --client axios
```

### Customize configuration See [Configuration Reference](https://cli.vuejs.org/config/). 
# OnlineJudage