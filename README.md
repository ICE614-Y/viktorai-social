# 維港AI 社交媒體內容生成器
## Vercel 部署指南

---

## 部署步驟（約20分鐘完成）

### 第一步：準備 GitHub 帳號
1. 前往 https://github.com 註冊帳號（免費）
2. 登入後點右上角「+」→「New repository」
3. Repository name 填：`viktorai-social`
4. 選「Private」（私人，只有你看到）
5. 點「Create repository」

### 第二步：上載檔案到 GitHub
1. 在新建的 repository 頁面，點「uploading an existing file」
2. 把以下檔案結構上載：
   ```
   viktorai-gemini/
   ├── api/
   │   └── generate.js
   ├── public/
   │   └── index.html
   └── vercel.json
   ```
3. 點「Commit changes」確認

### 第三步：連接 Vercel
1. 前往 https://vercel.com 用 GitHub 帳號登入
2. 點「Add New Project」
3. 找到剛才建立的 `viktorai-social` repository，點「Import」
4. Framework Preset 選「Other」
5. 點「Deploy」（先不設環境變量，等部署完成後再設）

### 第四步：設定 API Key（最重要）
1. 部署完成後，進入 Vercel 項目頁面
2. 點上方「Settings」→「Environment Variables」
3. 點「Add New」
4. Name 填：`GEMINI_API_KEY`
5. Value 填：你的 [Google AI Studio](https://aistudio.google.com/apikey) API Key
6. （選填）新增 `GEMINI_MODEL`，例如 `gemini-2.0-flash`；不設則使用預設模型
7. 點「Save」
8. 回到「Deployments」頁面，點「Redeploy」讓設定生效

### 第五步：使用
1. Vercel 會給你一個網址，例如：`https://viktorai-social.vercel.app`
2. 打開網址即可使用
3. 這個網址可以分享給團隊成員

---

## 常見問題

**問：API Key 安全嗎？**
答：安全。API Key 存在 Vercel 的伺服器環境變量，不會暴露在瀏覽器或原始碼中。

**問：費用是多少？**
答：Vercel 免費計劃已足夠（每月100GB流量）。Google Gemini API 按用量計費，請參考 [Google AI 定價](https://ai.google.dev/pricing)。

**問：團隊其他人可以用嗎？**
答：可以，把網址發給他們就可以直接用，不需要安裝任何東西。

**問：如何更新內容（題目庫等）？**
答：在 GitHub 修改 `public/index.html`，Vercel 會自動重新部署。

---

## 檔案說明

| 檔案 | 作用 |
|------|------|
| `api/generate.js` | 伺服器端 API，負責安全地調用 Google Gemini API |
| `public/index.html` | 前端介面，所有功能都在這裡 |
| `vercel.json` | 告訴 Vercel 如何部署這個項目 |
