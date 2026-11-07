# 部署与分享指南

三种方式，按推荐程度排序：

---

## 方式一（推荐）：部署到 Vercel，拿到公网网址

Vercel 是 Next.js 官方平台，免费档足够个人使用。部署后手机、平板、电脑都能直接打开，不需要装 Node。

### 1. 准备代码仓库

```bash
cd geo-reflex
git init
git add .
git commit -m "feat: 初中几何模型与辅助线学习平台"
# 在 GitHub 新建一个空仓库后：
git remote add origin https://github.com/<你的用户名>/<仓库名>.git
git push -u origin main
```

### 2. 在 Vercel 导入

1. 打开 https://vercel.com ，用 GitHub 账号登录
2. 点 **Add New → Project**，选择刚推送的仓库
3. Framework Preset 会自动识别为 **Next.js**，无需改配置
4. 点 **Deploy**，等待 1—2 分钟
5. 拿到形如 `https://geo-reflex-xxx.vercel.app` 的网址，发给任何人都能打开

> 以后改代码推送到 GitHub，Vercel 会自动重新部署。

### 或者用命令行部署

```bash
cd geo-reflex
npx vercel          # 首次登录并创建项目
npx vercel --prod   # 发布到正式网址
```

---

## 方式二：同一个 Wi-Fi 下，手机直接访问你的电脑

适合课堂上临时演示，不需要部署。

```bash
cd geo-reflex
npm install
npm run dev:lan     # 监听 0.0.0.0:3210
```

然后在本机查 IP：

```bash
ipconfig
# 找到 IPv4 地址，例如 192.168.1.23
```

手机连同一个 Wi-Fi，浏览器打开：

```
http://192.168.1.23:3210
```

如果打不开：

- Windows 防火墙弹窗要允许 Node.js 访问“专用网络”
- 确认手机和电脑在同一个网段（不要一个连 5G、一个连 2.4G 的不同访客网络）
- 公司/学校网络可能隔离设备，需要换手机热点再试

**限制**：电脑关机或离开这个 Wi-Fi 就不能用了；网址是局域网 IP，不适合长期分享。

---

## 方式三：发给别人的电脑本地运行

把 `geo-reflex-share.zip` 发给对方（或 GitHub 仓库），对方电脑安装 Node.js 20+ 后：

```bash
# 解压后进入目录
npm install
npm run dev
# 浏览器打开 http://localhost:3210
```

也可以先构建生产版本：

```bash
npm run build
npm run start
```

手机若也要在这台电脑上访问，把 `npm run start` 换成监听所有网卡：

```bash
npx next start -H 0.0.0.0 -p 3210
# 手机访问 http://<电脑IP>:3210
```

---

## 常见问题

**Q：能不能直接双击 HTML 打开？**
不能。这是 Next.js 项目，需要 Node 服务；要“点开即用”，请用方式一部署到 Vercel。

**Q：微信里发给别人能打开吗？**
Vercel 域名可以直接在微信内置浏览器打开；也可以绑定自己的域名。

**Q：Vercel 免费额度够吗？**
这是一个纯静态内容站，访问量不大时免费档完全够用。

**Q：数据会丢吗？**
模型内容都在 `src/data` 里，部署是只读的；要更新内容改代码后重新推送即可。
