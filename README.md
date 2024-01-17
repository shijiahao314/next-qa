# Next-QA：提供基于知识库问答与开放对话的系统

> 后端Github仓库：[Go-QA](https://github.com/shijiahao314/go-qa)

## 技术栈

- 前端：Next.js, Tailwind
- 后端：Golang, Gin, Gorm, Casbin
- 数据库：MySQL, Redis

## 系统特点

- 亮/暗模式切换

|                                    |                                   |
| ---------------------------------- | --------------------------------- |
| ![light mode](/images/image-0.png) | ![dark mode](/images/image-1.png) |

- 桌面端、移动端适配

|                                      |                                     |                                           |
| ------------------------------------ | ----------------------------------- | ----------------------------------------- |
| ![light mode](/images/image-2-1.png) | ![dark mode](/images/image-2-2.png) | ![mobile behavior](/images/image-2-3.png) |

## 系统服务

- 用户登录：同步用户个人信息、配置信息（不包含API Key）、对话历史等
- 知识库问答：提供基于知识库的问答服务，对知识库文档搜索并回答问题
- 开放对话：接入OpenAI服务，使用OpenAI API Key使用开放对话服务
