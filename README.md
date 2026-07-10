# 抖音直播电商健康诊断看板｜在线作品页

一个独立的静态作品站，用于说明单场直播健康诊断看板的项目背景、分析方法、数据边界、指标口径与产品路线。页面不连接本地采集器，不运行真实采集任务，也不提供登录、搜索或后台功能。

## 技术栈

- Vite + React + TypeScript
- 原生 CSS，无组件库
- GitHub Pages + GitHub Actions

## 本地运行

需要Node.js 22或兼容版本。仓库使用pnpm锁定依赖，npm命令也可运行。

```bash
pnpm install
pnpm dev
```

类型检查、生产构建和本地预览：

```bash
pnpm typecheck
pnpm build
pnpm preview
```

没有pnpm时可使用`npm install`、`npm run dev`、`npm run build`和`npm run preview`。

## 浏览器验收

安装Python版Playwright后，可运行四档响应式与核心交互烟测：

```bash
python tests/browser_smoke.py
```

脚本会自动启动生产预览，并检查1440、1024、768和390像素视口。Node.js或Chromium不在系统PATH时，可分别通过`--node`和`--browser-exe`传入本机可执行文件路径。

Vite 的部署基础路径固定为 `/douyin-live-dashboard-portfolio/`。生产预览地址默认包含该路径，例如 `http://localhost:4173/douyin-live-dashboard-portfolio/`。

## 替换演示素材

公开素材仅允许放在 `public/assets/`，文件名保持不变：

| 文件 | 用途 | 建议规格 |
|---|---|---|
| `dashboard-demo.mp4` | 约一分钟演示视频 | 16:9、55–65 秒、H.264、15–30MB、内嵌中文字幕 |
| `dashboard-poster.webp` | 视频封面 | 16:9 WebP |
| `dashboard-current.webp` | 看板完整截图 | 16:9 WebP、文字可读 |

替换后运行生产构建，并检查视频播放、全屏、封面图、截图预览和移动端布局。演示素材必须来自虚构场次或合成数据，不得包含真实直播链接、账号、用户标识、浏览器登录信息或本地路径。

## 内容维护

页面导航、功能模块、指标口径、异常规则、路线图与 FAQ 集中维护在 `src/content.ts`。UI 组件只负责结构和交互，修改业务文案时优先编辑该文件。

## 部署到 GitHub Pages

1. 在 GitHub 创建公开仓库 `douyin-live-dashboard-portfolio`，默认分支为 `main`。
2. 只推送本项目目录，不要把相邻采集器、资料包、数据库或本机配置纳入仓库。
3. 在仓库的 **Settings → Pages → Build and deployment** 中选择 **GitHub Actions**。
4. 推送到 `main` 后，`.github/workflows/deploy.yml` 会依次执行依赖安装、类型检查、生产构建和 Pages 发布。
5. 部署完成后访问 `https://<账号名>.github.io/douyin-live-dashboard-portfolio/`。

工作流使用 GitHub Pages 官方 Actions，并把 `dist` 作为部署产物。首版不配置自定义域名和访问统计。

## 常见路径问题

- 页面能打开但素材 404：确认仓库名与 `vite.config.ts` 中的 `base` 完全一致，并使用 `import.meta.env.BASE_URL` 拼接静态资源路径。
- 本地直接双击 `dist/index.html` 无法使用：请运行 `pnpm preview`，不要通过`file://`打开构建产物。
- fork 后仓库名不同：同步修改 Vite `base` 和 `index.html` 中分享图路径，然后重新构建。
- 视频缺失：页面会显示友好的占位提示，其他章节仍可正常阅读。

## 数据与隐私边界

本项目不是抖音官方产品。页面中的指标属于采样值、代理指标、规则结果或模型分类，不等同于官方后台数据；当前不包含成交额、订单、支付人数、退款与精准流量来源等经营数据。公开页面不保存账号、密码、浏览器登录信息、真实直播链接或评论用户标识。
