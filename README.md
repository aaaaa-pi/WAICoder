# oj-frontend 
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