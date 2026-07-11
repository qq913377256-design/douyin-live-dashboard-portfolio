export type NavItem = { id: string; number: string; label: string }
export type Feature = { name: string; question: string; display: string; action: string }
export type DeliveryValue = { title: string; description: string }
export type DeliveryComparison = { dimension: string; webApp: string; biDelivery: string }
export type Metric = { name: string; formula: string; window: string; meaning: string; note: string }
export type AlertLevel = '紧急' | '重要' | '提醒' | '机会' | '系统'
export type AlertRule = { scene: string; level: AlertLevel; trigger: string; data: string; action: string; time: string }
export type AnalysisChain = { phenomenon: string; cause: string; verify: string; action: string }
export type RoadmapStage = { phase: string; title: string; goal: string; features: string; status: '已完成' | '规划中' | '后续设想'; priority: string }
export type Faq = { question: string; answer: string }

export const site = {
  eyebrow: '个人项目 · 实时运营分析原型',
  title: '抖音直播电商健康诊断看板',
  subtitle: '实时观察在线人数、评论互动、商品切换和问题弹幕，把直播间数据转成可执行的运营建议。',
  tags: ['数据分析', '实时监控', '直播运营', '个人项目'],
  meta: [
    { label: '状态', value: '看板规则诊断原型已完成', status: true },
    { label: '数据范围', value: '公开可观测数据与代理指标' },
    { label: '我的角色', value: '需求、指标、数据处理、看板与分析逻辑' },
  ],
  disclaimer: '该页面展示项目能力和分析方法。在线页面不运行真实采集任务，不保存浏览器登录凭据，也不暴露直播间账号信息。项目并非抖音官方产品，指标不等同于官方后台口径。',
  updated: '2026-07-11',
}

export const navItems: NavItem[] = [
  { id: 'home', number: '01', label: '项目首页' },
  { id: 'demo', number: '02', label: '60秒演示' },
  { id: 'delivery', number: '03', label: '轻量化交付' },
  { id: 'features', number: '04', label: '看板功能' },
  { id: 'data-scope', number: '05', label: '数据范围' },
  { id: 'metrics', number: '06', label: '指标口径' },
  { id: 'alerts', number: '07', label: '异常与建议' },
  { id: 'analysis', number: '08', label: '运营分析方法' },
  { id: 'report', number: '09', label: '直播复盘报告' },
  { id: 'roadmap', number: '10', label: '路线图' },
  { id: 'technology', number: '11', label: '技术实现' },
  { id: 'faq', number: '12', label: '常见问题' },
]

export const sectionIntros: Record<string, string> = {
  demo: '用一分钟浏览完整产品动线：从直播全景、趋势变化，到异常建议、评论意图与商品切换影响。',
  delivery: '面向直播运营人员的独立 Web 应用，从工作群里的链接直接进入直播诊断页面。',
  features: '看板把直播信号拆成流量、互动、内容和商品四个层次；每个模块都对应一个业务问题和下一步动作。',
  'data-scope': '先说明什么能观察、什么不能获得，避免把页面采样信号误写成平台经营数据。',
  metrics: '每个数字都需要定义、窗口和使用边界。这里公开核心口径，让分析结论可以被复核。',
  alerts: '当前看板已完成基于规则的诊断原型：建议由触发条件、关键数据、优先级和明确动作共同组成。',
  analysis: '单个指标不能直接解释原因。运营判断需要从现象出发，提出假设，再用相邻信号验证并形成动作。',
  report: '将实时看板扩展为一场直播结束后的结构化总结，沉淀关键时刻、原因假设与下一场行动。',
  roadmap: '最终目标不是做一个数字大屏，而是形成“直播中发现问题、直播后验证原因、下一场形成改进动作”的闭环。',
  technology: '采集、存储、分析、接口与展示分层设计；公开作品页独立部署，不连接本地实时服务。',
  faq: '关于项目定位、数据可信度、隐私边界和后续能力的常见问题。',
}

export const videoChapters = ['全景', '趋势', '异常建议', '评论意图', '商品切换']
export const videoSummary = [
  '展示完整看板与单场直播的健康概览。',
  '观察在线趋势，以及高峰和下跌事件标线。',
  '查看问题队列与带触发依据的当前建议。',
  '将评论分为价格、规格、购买方式、库存和口碑等意图。',
  '比较商品切换后一、三、五分钟的在线与评论变化。',
]

export const deliveryCopy = {
  lead: '本项目采用 Web 化部署。看板上线后，运营人员无需安装桌面软件、配置本地环境、编写 SQL 或学习复杂的 BI 操作，只需在浏览器中打开链接，即可查看直播实时数据、在线人数趋势、互动表现、异常事件和运营建议。',
  distribution: '看板链接可以直接通过企业微信、飞书、钉钉或工作群进行分发。后续可以继续增加登录认证、角色权限和数据范围控制，使主播、运营和管理人员查看各自权限范围内的数据。',
  comparisonTitle: '与常见传统 BI 交付方式对比',
  comparisonNote: '两种交付方式定位不同。传统 BI 适合统一管理多主题数据和经营报表；本项目把入口收敛到单场直播诊断，让运营人员从链接直接进入当前任务。',
}

export const deliveryValues: DeliveryValue[] = [
  { title: '浏览器即开即用', description: '打开专属链接，直接进入直播诊断页面和当前运营任务。' },
  { title: '无需安装客户端', description: '不要求配置本地环境、数据库工具或桌面端分析软件。' },
  { title: '链接便于团队分发', description: '可通过企业微信、飞书、钉钉或工作群发送统一入口。' },
  { title: '支持后续权限扩展', description: '可继续接入登录认证、角色权限和数据范围控制。' },
]

export const deliveryComparisons: DeliveryComparison[] = [
  { dimension: '访问方式', webApp: '打开专属链接，直接进入直播诊断页面', biDelivery: '通过浏览器访问 BI 门户、工作台或指定报表' },
  { dimension: '使用门槛', webApp: '围绕直播运营任务组织页面，进入后即可查看核心诊断', biDelivery: '通常需要了解平台导航、报表结构和筛选口径' },
  { dimension: '分发方式', webApp: '复制页面链接到企业微信、飞书、钉钉或工作群', biDelivery: '分享报表链接、工作区、应用入口或定期导出' },
  { dimension: '业务场景', webApp: '单场直播的实时观察、异常诊断和运营动作', biDelivery: '跨部门、多主题、历史分析和经营报表' },
  { dimension: '页面定制', webApp: '围绕直播运营流程定制信息层级、交互和建议', biDelivery: '依托平台组件、主题和开发能力进行配置' },
  { dimension: '扩展能力', webApp: '后续可增加登录、角色权限和数据范围控制', biDelivery: '可通过平台权限、数据模型、插件或二次开发扩展' },
]

export const features: Feature[] = [
  { name: '直播基础信息', question: '当前分析的是哪一场，数据是否仍在更新？', display: '直播日期、采集区间、采样参数与任务状态', action: '检查任务状态与时间范围' },
  { name: '直播健康', question: '当前流量是否健康？', display: '当前在线、在线峰值、平均在线与短期变化', action: '调整节奏、福利承接或讲解时长' },
  { name: '流量', question: '是否有新流量进入，承接效果如何？', display: '进场代理值、进场速率、累计互动与可见流量', action: '优化开场、留人话术与商品节奏' },
  { name: '互动', question: '观众是否愿意互动，主要关注什么？', display: '评论数、速率、点赞及购买意图问题', action: '回应问题、重复卖点并引导互动' },
  { name: '在线人数趋势', question: '什么时候发生了关键变化？', display: '在线曲线、高峰、评论高峰与人数下跌事件', action: '回看当时的商品、话术和活动' },
  { name: '当前建议', question: '运营此刻最应该处理什么？', display: '规则或模型生成的诊断、证据与优先级', action: '执行建议并观察后续变化' },
  { name: '问题弹幕队列', question: '哪些问题重复出现但尚未充分回应？', display: '问题类别、原始示例、聚合次数与最近时间', action: '主播或场控按优先级统一回应' },
  { name: '评论意图分布', question: '用户需求集中在哪些环节？', display: '价格、规格、购买方式、口碑、库存与售后', action: '优化讲解结构与固定问答' },
  { name: '商品切换影响', question: '当前商品是否承接住了流量？', display: '切换后一、三、五分钟在线与评论变化', action: '决定继续讲、补充卖点或尽快换品' },
  { name: '事件与最新采样', question: '指标变化与业务事件是否一致，数据是否新鲜？', display: '商品切换、福利、异常事件和最新原始信号', action: '按事件复盘并发现采集或分类异常' },
]

export const observableData = [
  '采样时间、直播日期、任务开始与结束时间',
  '当前在线人数与历史采样在线人数',
  '评论数量、评论速率与公开评论文本',
  '页面点赞展示值或采样增量',
  '商品名称与商品切换时间',
  '评论意图分类、问题聚合与负面反馈识别',
  '由采样计算的高峰、突降与换品影响',
]

export const unavailableData = [
  { name: '成交额、订单与支付人数', reason: '属于商家或平台后台交易数据' },
  { name: '成交转化率与完整漏斗', reason: '缺少曝光、点击、加购和支付数据' },
  { name: '退款、售后与毛利', reason: '依赖订单系统和商品成本表' },
  { name: '精确场观与流量来源结构', reason: '采样无法替代平台去重和归因口径' },
  { name: '商品点击、加购和人群画像', reason: '需要合法授权后的聚合经营数据' },
]

export const dataStatement = '数据说明：本项目基于直播页面可观测信息和采样结果构建分析指标，部分指标属于采样值、代理指标、规则结果或模型分类，不等同于抖音官方后台口径。当前不包含成交额、订单、支付人数、退款和精准流量来源等交易经营数据。公开页面不运行采集任务，不存储账号信息或个人标识。'

export const metrics: Metric[] = [
  { name: '当前在线人数', formula: '最新一条有效样本的在线人数', window: '最新值', meaning: '当前直播间承载规模', note: '可能存在页面延迟或平台平滑' },
  { name: '在线峰值', formula: 'max(采集区间内在线人数)', window: '全场 / 区间', meaning: '直播达到的最高在线规模', note: '同时标注发生时间' },
  { name: '平均在线人数', formula: 'Σ(在线人数 × 持续时长) / 总有效时长', window: '全场 / 区间', meaning: '时间加权的在线水平', note: '缺失样本不参与计算' },
  { name: '3分钟在线变化', formula: '在线(t) - 在线(t-3min)', window: '3分钟', meaning: '短期净增或净减', note: '同时展示绝对值与百分比' },
  { name: '3分钟在线变化率', formula: '(在线(t)-在线(t-3min)) / max(在线(t-3min), 1)', window: '3分钟', meaning: '跨直播规模比较变化', note: '小基数时限制异常值' },
  { name: '在线人数下跌高峰', formula: '所有3分钟窗口中最小的在线变化', window: '3分钟滚动', meaning: '最严重流失时刻', note: '标注事件名称、时间和数值' },
  { name: '评论总数', formula: '采集到的有效评论条数', window: '全场 / 区间', meaning: '总互动规模', note: '排除系统消息和明显重复' },
  { name: '评论速率', formula: '最近1分钟有效评论数', window: '1分钟', meaning: '当前互动热度', note: '可增加3分钟平滑值' },
  { name: '评论高峰', formula: '3分钟评论量的最大值', window: '全场', meaning: '互动最集中时刻', note: '记录当时商品和事件' },
  { name: '购买意图评论数', formula: '询价、购买方式、优惠、库存等分类评论数', window: '1 / 3 / 5分钟', meaning: '潜在转化需求', note: '模型结果，不等于订单' },
  { name: '评论意图占比', formula: '某意图评论数 / 已分类评论数', window: '近5分钟 / 全场', meaning: '用户关注点结构', note: '未分类评论单独列出' },
  { name: '商品切换后在线变化', formula: '切换后第N分钟在线 - 切换时在线', window: '1 / 3 / 5分钟', meaning: '商品留人和承接影响', note: '仅反映相关性，不证明因果' },
  { name: '数据完整率', formula: '有效样本数 / 预期样本数', window: '全场', meaning: '判断趋势图可信度', note: '低于阈值时提示数据不完整' },
  { name: '数据新鲜度', formula: '当前时间 - 最新样本时间', window: '实时', meaning: '任务是否正常更新', note: '超过两倍采样间隔触发提示' },
]

export const eventDefinitions = [
  { name: '在线高峰', definition: '采集区间内在线人数最高的时间点。' },
  { name: '评论高峰', definition: '所有三分钟滚动窗口中，有效评论最多的窗口结束时点。' },
  { name: '在线人数下跌高峰', definition: '所有三分钟窗口中，在线人数净变化最小的窗口结束时点。' },
]

export const alerts: AlertRule[] = [
  { scene: '负面反馈集中', level: '紧急', trigger: '近3分钟负面评论不少于5条且占比超过15%', data: '负面 7条 · 占比18%', action: '暂停重复卖点，先解释争议点或售后政策', time: '演示场次 10:24' },
  { scene: '在线人数突降', level: '重要', trigger: '3分钟下降率不高于-20%，且绝对下降不少于20人', data: '在线 -31人 · -22%', action: '检查换品、价格公布与讲解节奏', time: '演示场次 10:21' },
  { scene: '长时间低互动', level: '提醒', trigger: '连续5分钟评论低于1条/分钟，平均在线高于50', data: '在线均值 86 · 评论 0.6条/分', action: '抛出选择题、价格问题或福利口令', time: '演示场次 10:17' },
  { scene: '高互动机会', level: '机会', trigger: '评论速率进入本场前10%，同时在线上涨', data: '评论 9条/分 · 在线 +12%', action: '延长重点商品讲解并强化购买路径', time: '演示场次 10:29' },
  { scene: '数据更新延迟', level: '系统', trigger: '数据新鲜度超过两倍采样间隔', data: '最新样本距今 68秒', action: '检查页面、网络或采集任务状态', time: '演示场次 10:31' },
]

export const alertStatusNote = '当前已完成看板内的规则诊断原型。实时推送、持久化告警记录和建议反馈闭环属于 Phase 3 规划，尚未作为现成功能开放。下列阈值与诊断内容均为合成演示场次中的示例。'

export const businessQuestions = [
  '哪个时间段在线人数增长最快，主播当时在讲什么？',
  '哪次换品造成明显掉人，哪些商品能够留住流量？',
  '用户最常问价格、规格、库存还是购买方式？',
  '直播间是有人但不互动，还是互动高但流量不足？',
  '负面反馈是否集中在某一商品、承诺或售后问题？',
  '高互动时刻有没有及时承接购买意图？',
]

export const analysisChains: AnalysisChain[] = [
  { phenomenon: '在线上涨，评论不涨', cause: '新流量进入，但内容承接较弱', verify: '查看新进场后的停留和问题', action: '快速说明利益点并设计互动问题' },
  { phenomenon: '评论上涨，在线下降', cause: '可能出现争议或负面讨论', verify: '检查评论意图与负面占比', action: '先处理争议，不机械催单' },
  { phenomenon: '换品后在线上涨', cause: '商品或切换节奏有效', verify: '对比同类商品历史表现', action: '延长讲解并强化购买路径' },
  { phenomenon: '问题重复出现', cause: '卖点或购买说明不清', verify: '聚合问题类别与出现时间', action: '集中回应并增加固定口播' },
]

export const reportFlow = ['采样数据', '事件归因', '场次摘要', '行动建议', 'Markdown / PDF报告']
export const reportOutline = [
  '场次概览与数据质量',
  '关键时间线：高峰、突降与换品',
  '商品表现与评论意图',
  '异常原因假设及证据',
  '下一场可执行改进清单',
]

export const roadmap: RoadmapStage[] = [
  { phase: 'Phase 1', title: '在线作品页', goal: '让项目可以通过一个链接完整展示', features: '在线文档、演示视频、指标口径与数据范围', status: '已完成', priority: 'P0' },
  { phase: 'Phase 2', title: '直播复盘', goal: '从实时看板扩展到场次分析', features: '自动报告、关键时间线、商品排序与PDF导出', status: '规划中', priority: 'P0' },
  { phase: 'Phase 3', title: '告警与反馈闭环', goal: '把看板内诊断转为可追踪的运营行动', features: '实时推送、持久化告警记录、处理状态与建议反馈闭环', status: '规划中', priority: 'P1' },
  { phase: 'Phase 4', title: '语音分析', goal: '关联主播内容与数据变化', features: '音频采集、转写、话术标签与关键片段定位', status: '后续设想', priority: 'P1' },
  { phase: 'Phase 5', title: '历史对比', goal: '判断运营优化是否有效', features: '场次库、主播基线、商品历史对比与趋势', status: '后续设想', priority: 'P1' },
  { phase: 'Phase 6', title: '经营数据整合', goal: '在授权下补齐结果指标', features: '订单、成交额、投放与商品经营数据', status: '后续设想', priority: 'P2' },
  { phase: 'Phase 7', title: '协同运营', goal: '从分析工具扩展为工作流', features: '告警、任务、建议反馈与复盘知识库', status: '后续设想', priority: 'P2' },
]

export const architecture = [
  { name: '采集层', detail: 'Playwright · 公开可见文本 · 低频采样' },
  { name: '存储层', detail: 'SQLite · 历史样本 · 可迁移数据模型' },
  { name: '分析层', detail: '窗口指标 · 事件识别 · 评论分类 · 规则建议' },
  { name: 'API层', detail: 'FastAPI · 历史查询 · 报告数据' },
  { name: '看板层', detail: '实时健康诊断 · 趋势与事件 · 运营建议' },
]
export const techTags = ['Vite', 'React', 'TypeScript', '原生CSS', 'Playwright', 'SQLite', 'FastAPI']

export const faqs: Faq[] = [
  { question: '这是抖音官方产品或官方数据吗？', answer: '不是。本项目是个人运营分析原型，仅处理公开页面可观测信号及其采样结果。页面中的采样值、代理指标、规则结果和模型分类均不等同于官方后台数据。' },
  { question: '为什么没有成交额、订单和真实转化率？', answer: '这些属于商家或平台后台经营数据，公开直播页面无法确认。项目不会用推测值冒充交易结果；只有获得合法授权和完整漏斗数据后才会接入。' },
  { question: '异常建议是由大模型自由生成的吗？', answer: '当前方案优先使用可配置规则，将级别、触发原因、关键数据、时间和动作一起展示。文本分类可使用模型，但建议仍需有可复核证据，并允许人工修正。' },
  { question: '在线作品页会连接本地采集器吗？', answer: '不会。作品页是独立静态站点，只包含合成演示视频、脱敏截图和说明文字，不请求采集服务或业务接口。' },
  { question: '如何保护账号和评论用户隐私？', answer: '项目不要求在代码中保存账号、密码或登录凭据，不公开真实直播链接和用户标识。展示素材使用虚构场次与合成数据，公开页面不运行采集任务。' },
  { question: '商品切换后的变化能证明商品导致了涨跌吗？', answer: '不能。切换后的在线与评论变化只表示时间相关性，还需结合价格、福利、流量来源、主播话术和历史基线验证，不能直接作为因果结论。' },
]

export const footerCopy = {
  type: '个人数据产品作品页',
  stack: 'Vite · React · TypeScript · 原生CSS',
  note: '非抖音官方产品；页面仅展示分析方法与合成演示数据。',
}
