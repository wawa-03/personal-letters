# ✉️ Personal Letters

[![React](https://img.shields.io/badge/React-18-61DAFB?style=flat-square&logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-5-646CFF?style=flat-square&logo=vite&logoColor=white)](https://vitejs.dev/)
[![License](https://img.shields.io/badge/License-CC%20BY--NC--SA%204.0-lightgrey?style=flat-square)](LICENSE)

信笺风格的个人作品集网站。50 封原创信笺散落在虚拟桌面上，等待被发现。

> **不是传统的作品集。** 没有卡片网格、没有时间线、没有暗色模板。只有散落的信笺，邀请你拿起一封，读一读。

---

## ✨ 核心特性

### 📬 散落式布局
信笺以不同位置、角度、层级散落在页面上，像真实桌面上的信件。每次访问都有细微差别。

### 🎭 视差滚动
滚动时，不同信笺以不同速度移动，营造空间深度感。桌面是真实的。

### 🔴 蜡封交互
每封信都有蜡封。点击拆开信封，揭示内容。这个交互在阅读前增加了一点仪式感。

### 📖 阅读器模式
打开信笺后，展开为全屏阅读视图。干净的排版，舒适的阅读体验，信笺间轻松切换。

### 📱 响应式设计
桌面和移动端都完美适配。移动端信笺自然堆叠滚动。

### ⚡ 性能优化
- 信笺内容懒加载
- CSS transform 实现流畅动画
- 零重依赖

---

## 🎨 设计哲学

**少即是多。** 刻意极简——温暖的纸张纹理、微妙的阴影、自然的动效。焦点在内容（信笺）本身，而非容器。

**物理隐喻。** 信笺、蜡封、纸张、桌面——数字交互扎根于真实物体。用户一眼就知道怎么用。

**负空间。** 散落式布局把留白当作设计元素。信笺不拥挤，它们在呼吸。

---

## 🛠 技术栈

| 技术 | 用途 |
|---|---|
| React 18 | 组件架构、Hooks、Context |
| TypeScript | 类型安全、开发体验 |
| Vite | 快速构建、HMR |
| CSS Modules | 作用域样式、无冲突 |
| Framer Motion | 流畅动画（可选）|

---

## 🚀 快速开始

```bash
# 克隆
git clone https://github.com/wawa-03/personal-letters.git
cd personal-letters

# 安装依赖
pnpm install

# 启动开发服务器
pnpm dev

# 构建生产版本
pnpm build
```

---

## 📁 项目结构

```
personal-letters/
├── client/
│   └── src/
│       ├── components/
│       │   ├── Letter/          # 单封信笺组件
│       │   ├── Desk/            # 散落式布局容器
│       │   ├── Seal/            # 蜡封交互
│       │   └── ui/              # UI 基础组件
│       ├── data/
│       │   └── letters.ts       # 50 封信笺数据
│       ├── hooks/               # 自定义 Hooks
│       ├── pages/
│       │   ├── Home.tsx         # 主页（散落布局）
│       │   └── NotFound.tsx     # 404 页面
│       ├── contexts/            # React Context
│       ├── lib/                 # 工具函数
│       ├── App.tsx
│       ├── main.tsx
│       └── index.css            # 纸张纹理、全局样式
├── server/                      # 后端（如有）
├── shared/                      # 前后端共享类型
├── package.json
├── vite.config.ts
└── tsconfig.json
```

---

## 📝 信笺数据

每封信笺包含：
- **标题**：如"给慢慢醒来的自己"、"一场将停未停的雨"
- **日期和地点**：营造场景感
- **摘要**：一句话预览
- **纸张类型**：rag / ivory / blue / fold / type / postcard / rule / red
- **布局参数**：位置、旋转、视差系数、层级
- **正文内容**：3-5 段原创文字

> 💡 **注意**：当前 50 封信笺使用模板文本。你可以在 `client/src/data/letters.ts` 中替换为真实内容。

---

## 🎯 适用场景

| 场景 | 用法 |
|---|---|
| 个人作品集 | 展示写作、思考、项目 |
| 创意机构 | 用"信笺"形式展示案例 |
| 教育 | 互动式叙事 |
| 艺术项目 | 数字装置 |

---

## 📦 自定义

- **添加信笺**：编辑 `client/src/data/letters.ts`
- **更换主题**：修改 `client/src/index.css` 中的 CSS 变量
- **调整布局**：修改 `client/src/components/Desk/` 中的散落算法

---

## 🤝 Contributing

欢迎贡献！请 open issue 或提交 PR。

## 📄 License

[CC BY-NC-SA 4.0](LICENSE)

---

**Built by [Wawa](https://github.com/wawa-03)** — Full-stack developer specializing in AI automation and production-ready web applications.
