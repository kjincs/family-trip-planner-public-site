# 家庭旅行 · 公开版

这是后续维护使用的公开分享版本，保留原有旅行看板、搜索筛选、行程详情、路线图与打印 / PDF。页面为静态只读网站，内容直接来自 `trips-data.js`，不读取或写入浏览器 localStorage。

每条旅行都有独立网页，位于 `trips/`，可直接复制地址分享给朋友。首页卡片打开对应行程页面；行程页提供“打印 / 保存 PDF”和“返回全部旅行”。不提供 HTML 下载。

## 日常更新

请在这个文件夹中修改 `index.html`、`trips-data.js` 与所需图片。共享行程版式在 `trip-template.js`，独立页加载逻辑在 `trip-page.js`，首页交互在 `dashboard.js`；更改旅行数据后所有行程页会一起更新，无需构建。通过 Codex 更新后，先预览、检查个人信息，再将审核后的文件发布到 GitHub。已发布内容在各设备上相同；网站不提供在线编辑与 JSON 导入。

本地预览：在这个文件夹运行 `python3 -m http.server 8765 --bind 127.0.0.1`，打开 `http://127.0.0.1:8765/`。

## 内容约定

家庭仅使用昵称：小鱼家、枫叶家、海豚家、虾米家。Texas 与 Alaska 同行家庭均为小鱼家、虾米家。不在文件或版本历史中保存真实姓名与昵称的对应关系。

酒店名称、商业地址、航班号及行程日期可以展示；真实姓名、确切年龄、联系方式、私人住址、工作安排、预订编号、票号、付款资料与会员账户信息不得发布。活动面向公众的年龄限制可以保留。

现有六条旅行均保留。Alaska 的稳定 ID 仍为 `alaska-christmas`，当前内容为春假行程；Peru 的稳定 ID 为 `peru-nine-days`。

## 发布边界

只将此文件夹内审核后的内容放入一个全新的公开仓库，作为仓库根目录；不要上传上层私有项目、旧 Git 历史、原始备份、附件或私人笔记。随后可用 GitHub Pages 发布 `main` 分支根目录。`.nojekyll` 已包含，无需构建步骤。

公开仓库：[kjincs/family-trip-planner-public-site](https://github.com/kjincs/family-trip-planner-public-site)。GitHub Pages 使用 `main` 分支根目录发布；网站地址为 [家庭旅行](https://kjincs.github.io/family-trip-planner-public-site/)。

本地公开版拥有独立 Git 历史。原版网站保存在同级的私有备份文件夹中，不会随这个仓库发布。
