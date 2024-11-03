# NextQA：提供基于知识库问答与开放对话的系统

> 后端Github仓库：[Go-QA](https://github.com/shijiahao314/go-qa)

## 技术栈

- 前端：Next.js、React、Tailwind
- 后端：Golang、gin、gorn、casbin
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
  <img src="/images/image-mobile.png" alt="on mobile" width="45%">
  <img src="/images/image-mobile2.png" alt="on mobile" width="45%">
</p>


## 安装

### 使用 npm 构建前端

```bash
# 禁止使用 npm install 或 npm i 安装，该操作会修改 package-lock.json 导致安装依赖的版本不同
npm ci # clean install

npm run build && npm run start
# 或
npm run dev
```
