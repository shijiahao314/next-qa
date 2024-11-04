# NextQA：知识库问答与开放对话

> 后端 Github 仓库 1：[Go-QA](https://github.com/shijiahao314/go-qa)
> 
> 后端 Github 仓库 2：[GraphRAG-Go](https://github.com/shijiahao314/graphrag-go)

## 技术栈

- 前端：Next.js、React、Tailwind
- 后端：Go、Gin、Gorm、Casbin
- 数据库及缓存：MySQL、Redis
- DevOps: Docker、Git

## 系统特点

- 亮/暗模式切换
- 适配移动端设备
- 用户登录：同步用户个人信息、配置信息、对话历史等
- 知识库问答：提供基于知识库的问答服务，对知识库文档搜索并回答问题
- 开放对话：接入 OpenAI 服务，使用 OpenAI API Key 使用开放对话服务
- 单点登录：接入 Github 单点登录系统

## TODO

- [x] 接入 Github 单点登录
- [ ] 提供基于 RAG 和 LLM 的知识库问答

## 系统展示

![login page](/images/image-login.png)

![kb page](/images/image-kb.png)

![kb setting page](/images/image-kb-setting.png)

![qa page](/images/image-qa.png)

![light mode](/images/image-light.png)

<p align="center">
  <img src="/images/image-mobile.png" alt="on mobile 1" width="30%">
  <img src="/images/image-mobile2.png" alt="on mobile 2 " width="30%">
  <img src="/images/image-mobile3.png" alt="on mobile 3" width="30%">
</p>


## 部署使用

### git clone 项目

```bash
git clone git@github.com:shijiahao314/next-qa.git
```

### 创建 .env.local 文件

需要创建`.env.local`文件，并参照`.env.example`填写

### npm 构建并运行

```bash
# 禁止使用 npm install 或 npm i 安装，该操作会修改 package-lock.json 导致安装依赖的版本不同
npm ci # clean install

npm run build && npm run start
# 或
npm run dev
```
