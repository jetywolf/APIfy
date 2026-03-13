<div align="center">

<img src="https://img.shields.io/badge/APIfy-⚡-7c3aed?style=for-the-badge&labelColor=040408" alt="APIfy">

# ⚡ APIfy

**Describe it. Get it. Ship it.**

Generate a fully-deployed, production-ready REST API from plain language — in seconds.

用自然语言描述需求，秒级获得可直接使用的生产级 REST API。

<br>

[![Deploy to Cloudflare Workers](https://img.shields.io/badge/Deploy%20to-Cloudflare%20Workers-F38020?style=flat-square&logo=cloudflare&logoColor=white)](https://workers.cloudflare.com)
[![Powered by GPT-4o](https://img.shields.io/badge/Powered%20by-GPT--4o-412991?style=flat-square&logo=openai&logoColor=white)](https://platform.openai.com)
[![License MIT](https://img.shields.io/badge/License-MIT-22c55e?style=flat-square)](LICENSE)
[![Wrangler](https://img.shields.io/badge/Wrangler-v3-F38020?style=flat-square&logo=cloudflare&logoColor=white)](https://developers.cloudflare.com/workers/wrangler/)

</div>

---

<div align="center">
  <img width="700" alt="APIfy screenshot" src="https://placehold.co/700x420/040408/7c3aed?text=APIfy+—+Type.+Generate.+Ship.&font=raleway">
</div>

---

## ✨ What is APIfy? · 这是什么？

**EN** → APIfy is a SaaS that turns any natural language description into a real, callable REST API — deployed to Cloudflare's global edge network with zero configuration. Type what you need, click *Generate*, and you get a live endpoint with full CRUD, persistent state, and auto-generated docs.

**中** → APIfy 是一个将自然语言直接转化为可调用 REST API 的 SaaS 平台。底层由 GPT-4o 生成代码，部署在 Cloudflare Workers 全球边缘网络，无需任何配置。输入需求描述，点击生成，立刻获得带持久化状态的真实接口及自动文档。

---

## 🎬 Demo · 演示

| Step | Action |
|------|--------|
| 1 | Type: *"A todo list API with priorities and tags"* |
| 2 | Click **⚡ Generate API** |
| 3 | Get a live URL like `https://apiify.xxx.workers.dev/exec/a1b2c3d4/todos` |
| 4 | Call it immediately with `curl`, JS, or the built-in test console |

```bash
# List todos
curl https://apiify.xxx.workers.dev/exec/a1b2c3d4/todos

# Create a todo
curl -X POST https://apiify.xxx.workers.dev/exec/a1b2c3d4/todos \
  -H "Content-Type: application/json" \
  -d '{"title": "Ship APIfy", "priority": "high", "tags": ["dev"]}'
```

---

## 🏗️ Architecture · 架构

```
┌─────────────────────────────────────────────────────────────┐
│                    Cloudflare Edge                           │
│                                                             │
│   Browser ──► Worker ──► /api/generate ──► OpenAI GPT-4o   │
│                  │                                           │
│                  ├──► /exec/:id/*  ──► new Function()       │
│                  │         │                                 │
│                  │    ┌────▼────┐   ┌──────────┐            │
│                  │    │   R2   │   │    D1    │            │
│                  │    │(state) │   │(metadata)│            │
│                  │    └────────┘   └──────────┘            │
│                  │                                           │
│                  └──► Frontend HTML (served from Worker)    │
└─────────────────────────────────────────────────────────────┘
```

| Layer | Technology | Purpose |
|-------|-----------|---------|
| Runtime | Cloudflare Workers | Serverless edge execution, global CDN |
| AI | OpenAI GPT-4o | Natural language → handler code |
| Database | Cloudflare D1 | API metadata, generated code, call counts |
| Storage | Cloudflare R2 | Per-API persistent key-value state |
| Frontend | Vanilla JS + Tailwind | Single-file embedded SaaS UI |

---

## 🚀 Quick Start · 快速上手

### Prerequisites · 前置条件

- [Cloudflare account](https://dash.cloudflare.com) (free tier works · 免费套餐即可)
- [Wrangler CLI v3+](https://developers.cloudflare.com/workers/wrangler/) — `npm i -g wrangler`
- OpenAI API key with `gpt-4o` access · 有 gpt-4o 权限的 OpenAI Key

### 1 · Clone & Install · 克隆安装

```bash
git clone https://github.com/jetywolf/APIfy.git
cd APIfy
npm install
```

### 2 · Create Cloudflare Resources · 创建云资源

```bash
# Login to Cloudflare · 登录 Cloudflare
wrangler login

# Create D1 database · 创建 D1 数据库
wrangler d1 create apiify-db
# ↑ Copy the database_id into wrangler.toml [[d1_databases]]
# ↑ 把 database_id 填入 wrangler.toml [[d1_databases]]

# Create R2 bucket · 创建 R2 存储桶
wrangler r2 bucket create apiify-storage

# Initialise schema · 初始化数据库表结构
npm run db:init
```

### 3 · Configure · 配置

Edit `wrangler.toml`:

```toml
[[d1_databases]]
binding       = "DB"
database_name = "apiify-db"
database_id   = "PASTE_YOUR_D1_ID_HERE"   # ← paste here · 粘贴到这里

[vars]
BASE_URL = "https://apiify.YOUR_SUBDOMAIN.workers.dev"  # ← update after first deploy
```

Set your OpenAI secret (never committed · 不会提交到代码库):

```bash
wrangler secret put OPENAI_API_KEY
```

### 4 · Deploy · 部署

```bash
npm run deploy
```

Open the URL printed by Wrangler — your SaaS is live. 🎉

打开 Wrangler 输出的 URL，你的 SaaS 已上线。

---

## 🛠️ Local Development · 本地开发

```bash
npm run dev
# → http://localhost:8787
```

Wrangler emulates D1 and R2 locally — full functionality without deploying.

Wrangler 本地模拟 D1 和 R2，无需部署即可完整运行。

---

## 📡 API Reference · 接口说明

### Platform APIs · 平台接口

| Method | Path | Description |
|--------|------|-------------|
| `POST` | `/api/generate` | Generate API from description · 根据描述生成 API |
| `GET`  | `/api/apis` | List all APIs · 列出所有 API |
| `GET`  | `/api/apis/:id` | Get API details · 获取 API 详情 |
| `DELETE` | `/api/apis/:id` | Delete API + state · 删除 API 及其状态 |
| `ANY`  | `/exec/:id/*` | Call a generated API · 调用生成的 API |

### Generate Endpoint · 生成接口

```bash
POST /api/generate
Content-Type: application/json

{
  "description": "A product catalog with search and inventory tracking"
}
```

Response · 响应:

```json
{
  "id": "a1b2c3d4e5f6g7h8",
  "name": "ProductCatalogApi",
  "description": "REST API for managing products with search and inventory",
  "endpoint": "https://apiify.xxx.workers.dev/exec/a1b2c3d4e5f6g7h8",
  "endpoints": [
    {
      "method": "GET",
      "path": "/products",
      "description": "List all products with optional search",
      "params": [{ "name": "q", "in": "query", "required": false, "type": "string" }],
      "responseExample": { "products": [] }
    }
  ]
}
```

### Generated API Execution Model · 生成 API 的执行模型

Every generated API is an isolated `async function handler(req, store)`:

每个生成的 API 都是一个独立沙箱中的 `async function handler(req, store)`:

```js
// req   — { method, path, query, body, headers }
// store — synchronous KV store backed by R2:
//           store.get(key)     → value or undefined
//           store.set(key, v)  → persists to R2
//           store.delete(key)
//           store.list()       → all keys

async function handler(req, store) {
  // GPT-4o writes this — full CRUD, validation, sample data seeding
}
// Returns: { status: number, body: any, headers?: object }
```

---

## 📁 Project Structure · 项目结构

```
APIfy/
├── src/
│   ├── index.js        # CF Worker entry + router · Worker 入口与路由
│   ├── generate.js     # POST /api/generate
│   ├── apis.js         # GET / DELETE /api/apis
│   ├── exec.js         # ANY /exec/:id/*
│   ├── executor.js     # new Function() sandbox + R2 state · 沙箱执行 + R2 状态
│   ├── llm.js          # GPT-4o integration + system prompt · GPT-4o 集成
│   ├── utils.js        # json() helper + CORS
│   └── frontend.js     # Full SaaS UI (embedded HTML) · 完整前端（内嵌 HTML）
├── schema.sql          # D1 table definitions · D1 表结构
├── wrangler.toml       # Cloudflare config · CF 配置
└── package.json
```

---

## 🔒 Security Notes · 安全说明

- Dynamic execution uses `new Function()` enabled by the `unsafe_eval` compatibility flag
- Generated code runs inside a Cloudflare Workers V8 isolate — no filesystem, no OS access
- Each API's state is namespaced in R2 under `state/<id>.json`
- For stricter sandboxing in production, consider routing execution through a dedicated Worker with minimal bindings

---

- 动态代码执行通过 `unsafe_eval` 兼容标志启用 `new Function()`
- 生成代码在 Cloudflare Workers 的 V8 隔离环境中运行，没有文件系统或 OS 访问权限
- 每个 API 的状态在 R2 中以 `state/<id>.json` 命名空间隔离
- 生产环境若需更严格的沙箱，可将执行路由到独立的最小权限 Worker

---

## ⚙️ Environment Variables · 环境变量

| Name | How to set · 设置方式 | Description |
|------|-----------------------|-------------|
| `OPENAI_API_KEY` | `wrangler secret put` | OpenAI API key (never commit · 勿提交) |
| `BASE_URL` | `wrangler.toml [vars]` | Full deployed Worker URL · 完整部署 URL |

---

## 🗺️ Roadmap · 路线图

- [ ] API key authentication for generated APIs · 为生成的 API 添加 Key 鉴权
- [ ] Usage analytics dashboard · 使用量分析面板
- [ ] API versioning & rollback · API 版本管理与回滚
- [ ] Export to OpenAPI / Swagger spec · 导出 OpenAPI 规范
- [ ] Custom domain per API · 每个 API 自定义域名
- [ ] Rate limiting · 速率限制

---

## 📄 License · 许可证

[MIT](LICENSE) © 2025 jetywolf

---

<div align="center">

Built with ❤️ on [Cloudflare Workers](https://workers.cloudflare.com) · [OpenAI GPT-4o](https://platform.openai.com)

基于 Cloudflare Workers 与 OpenAI GPT-4o 构建

⭐ Star this repo if you find it useful · 如果觉得有用请点个 Star ⭐

</div>
