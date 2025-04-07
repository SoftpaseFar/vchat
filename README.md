# VChat

<p align="center">
  <img src="assets/icon.png" alt="VChat Icon" width="128" height="128">
  <br>
  <em>VChat 是一个基于 Electron 和 Vue 3 开发的跨平台桌面聊天应用，支持多种 AI 模型接入，提供流畅的聊天体验。</em>
</p>

![VChat Demo](assets/vchat.gif)

## 特性

- 🚀 基于 Electron + Vue 3 + TypeScript 开发
- 💬 支持多种 AI 模型接入（百度千帆、阿里通义千问等）
- 🎨 现代化的用户界面设计
- 📱 跨平台支持（Windows、macOS、Linux）
- 🔒 本地数据存储，保护隐私
- 🎯 支持 Markdown 格式消息
- 🌙 深色模式支持

## 待完善功能

- 🌐 多语言支持
  - 中文
  - English
  - 更多语言支持计划中
- 🎨 主题定制
  - 自定义主题色
  - 主题切换动画
  - 更多主题模板
- 🤖 AI 模型设置
  - 模型参数自定义
  - 默认模型设置
  - 模型切换快捷键
- 📱 界面优化
  - 响应式布局优化
  - 移动端适配
  - 更多自定义选项
- 🔄 功能增强
  - 对话导出
  - 历史记录搜索
  - 快捷指令
  - 更多 AI 模型接入

## 快速开始

### 环境要求

- Node.js 16+
- npm 或 yarn

### 安装

1. 克隆项目

```bash
git clone https://github.com/SoftpaseFar/vchat.git
cd vchat
```

2. 安装依赖

```bash
npm install
```

3. 配置环境变量
   创建 `.env` 文件，并添加以下配置：

```env
QIANFAN_ACCESS_KEY=你的千帆访问密钥
QIANFAN_SECRET_KEY=你的千帆密钥
ALI_API_KEY=你的阿里通义千问API密钥
```

4. 启动开发服务器

```bash
npm start
```

### 构建

构建生产版本：

```bash
npm run make
```

## 项目结构

```
vchat/
├── src/               # 源代码
│   ├── main/          # 主进程
│   ├── renderer/      # 渲染进程
│   └── preload/       # 预加载脚本
├── assets/            # 静态资源
├── types/             # TypeScript 类型定义
└── ...
```

## 技术栈

- Electron - 跨平台桌面应用框架
- Vue 3 - 前端框架
- TypeScript - 类型安全的 JavaScript
- Tailwind CSS - 样式框架
- Pinia - 状态管理
- Vite - 构建工具

## 贡献指南

欢迎提交 Issue 和 Pull Request！

## 许可证

MIT License
