# 工作日志

## 2026-07-11 09:11

- GitHub Pages发布源切换为GitHub Actions后，工作流`29134049233`构建与部署成功。
- 公开站点`https://qq913377256-design.github.io/douyin-live-dashboard-portfolio/`返回HTTP 200。
- 演示视频、封面和看板截图均返回HTTP 200，MIME类型分别为`video/mp4`、`image/webp`和`image/webp`。
- 未完成项：无。

## 2026-07-11 09:06

- 创建公开仓库`qq913377256-design/douyin-live-dashboard-portfolio`，并推送首个本地提交`5b0582c`。
- 启用GitHub Pages，发布源设为GitHub Actions，站点地址为`https://qq913377256-design.github.io/douyin-live-dashboard-portfolio/`。
- 首次工作流在启用Pages前的`Setup Pages`步骤失败；本次提交将触发新的完整构建与部署。
- 未完成项：等待工作流完成后验证公开页面、视频和静态资源。

## 2026-07-11 01:04

- 固定React、Vite、TypeScript与pnpm依赖版本，生成`pnpm-lock.yaml`，统一GitHub Pages工作流为冻结锁文件构建。
- 修复列表key和Vite类型声明导致的首次类型检查失败，补充内联favicon，消除浏览器控制台404。
- 完成两轮代码审查，修复移动目录跨断点滚动锁定、模态语义、背景`inert`隔离、截图弹层焦点返回、功能状态边界和分享图绝对URL。
- 增加`tests/browser_smoke.py`，覆盖1440、1024、768、390像素视口、11个章节、视频时长、锚点、抽屉、弹层、横向溢出和控制台错误。
- 验证结果：`pnpm typecheck`通过，`pnpm build`通过，Playwright烟测通过，敏感信息扫描无匹配，MP4为1920×1080、H.264、61.72秒、18,536,187字节。
- 公开链接：待创建GitHub仓库并完成首次部署后补充。
- 未完成项：GitHub远程仓库创建、首次部署及部署后无登录复查。

## 2026-07-11 16:30

- 完成 Vite、React、TypeScript 和原生 CSS 静态作品页工程结构。
- 实现 11 个文档章节、桌面固定目录、移动目录抽屉、滚动高亮、锚点直达、视频失败占位、截图预览弹层、响应式指标表、路线图、FAQ 与返回顶部。
- 业务内容集中维护在 `src/content.ts`，公开素材仅引用 `public/assets/` 下三个脱敏合成资产。
- 增加 GitHub Pages 构建发布工作流、README、素材替换说明和隐私边界说明。
- 验证结果：按任务分工未安装依赖、未执行类型检查、构建、Playwright 与 ffprobe；由主任务统一验证。
- 公开链接：待创建 GitHub 仓库并完成首次部署后补充。
- 未完成项：GitHub 远程仓库创建、首次部署及部署后无登录复查。

## 2026-07-11 00:47

- 使用独立静态仿真看板和合成业务数据生成公开演示资产，未读取现有采集器的数据库、登录态或敏感配置。
- 输出 `public/assets/dashboard-current.webp`、`dashboard-poster.webp` 和 `dashboard-demo.mp4`；视频内嵌7段中文字幕，无音轨。
- 验证结果：三项资产均为1920×1080；视频为H.264 High、25fps、61.72秒、18,536,187字节，完整解码无错误；公开资产敏感信息扫描通过。
- 未完成项：无。

## 2026-07-11 09:57

- 在60秒演示和看板功能之间新增“轻量化交付”章节，目录与后续章节编号同步调整为12章
- 增加四张交付价值卡片，以及覆盖访问方式、使用门槛、分发方式、业务场景、页面定制和扩展能力的中性对比表
- 明确独立Web应用与常见BI交付的不同定位，登录、角色权限和数据范围控制仍标记为后续扩展
- 更新SEO摘要、响应式样式和浏览器测试，390像素视口下仅对比表容器横向滚动
- 验证通过：TypeScript类型检查、Vite生产构建、1440、1024、768、390像素Playwright测试、控制台检查和敏感信息扫描
- 公开链接：https://qq913377256-design.github.io/douyin-live-dashboard-portfolio/
- 线上复查：GitHub Pages已返回本次构建的JS和CSS资源，`#delivery`章节标题、四张价值卡片和对比表内容均已发布
- 未完成项：无

## 2026-07-12 20:21

- 将指标口径表替换为15项看板指标及对应Tooltip短文案，内容集中维护在`src/content.ts`
- 表格由五列详细口径调整为指标、Tooltip短文案两列，移动端继续使用表格容器横向滚动
- 增加15行指标和3分钟留存占比文案的浏览器断言
- 验证通过：TypeScript类型检查、Vite生产构建及1440、1024、768、390像素Playwright测试
- 公开链接：https://qq913377256-design.github.io/douyin-live-dashboard-portfolio/#metrics
- 线上复查：GitHub Pages已切换到本次构建资源，当前在线、3分钟留存占比和高频问题等新文案均已发布
- 未完成项：无

## 2026-07-12 20:30

- 根据反馈将指标表第二列表头由Tooltip短文案改为统计口径
- 恢复原有宽表格样式和移动端横向滚动提示，保留15项新指标内容
- 验证通过：TypeScript类型检查、Vite生产构建及四档视口Playwright测试
- 公开链接：https://qq913377256-design.github.io/douyin-live-dashboard-portfolio/#metrics
- 未完成项：等待发布后复查线上表头
