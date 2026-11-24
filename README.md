# 慈福會官網

《七日奇談放送組》的虛構宗教組織網站。紅黑紫金配色、慈光花窗徽記；全站為 HTML/CSS/JavaScript 靜態檔案，適用 GitHub Pages，無後端與安裝依賴。

## 功能

- 首頁、關於慈福會、慈光燈、線上求籤、慈恩法物列表/詳情、慈福之音列表/文章、我的參拜紀錄與網站說明。
- 100 個燈位；6 盞固定故事人物燈。每個瀏覽器每 UTC 年可點一盞個人燈，保存姓名、願望及時間。
- 12 支原創籤；從深紫古金餅乾盒取出金黃黑巧克力慈籤，轉動紅黑紫金「通靈輪盤」，只分允/否。得允時先保存同一枚慈籤，再掰開顯示籤詩；重開仍保持同一枚及開啟狀態。每個 UTC 日一支，落款可使用當年度點燈稱呼。
- 個人祈願卡/籤紙下載（SVG，可用瀏覽器開啟與列印）、JSON 備份匯出/匯入。
- 紀錄只在訪客目前瀏覽器的 localStorage；無帳號、無跨訪客共享、無後端寫入。裝置時間可被修改，前端限制不作身分驗證。
- UTC 每日 00:00 換日，即台灣時間 08:00；年度於 UTC 元旦切換。

## GitHub Pages 發布

1. 登入 [GitHub](https://github.com/)，選右上角 **＋ → New repository**。
2. 名稱建議 `cifu-website`，選 **Public**，勾選 **Add a README file**，按 **Create repository**。
3. 在儲存庫 **Code → Add file → Upload files**，開啟提供的發布資料夾，把裡面的檔案及 `assets` 資料夾拖入；不要上傳外層資料夾，也不要直接上傳 ZIP。
4. 確認 `index.html` 直接出現在根目錄，並有 `app.mjs`、`core.mjs`、`cards.mjs`、`content.mjs`、`styles.css`、`assets/` 與 `.nojekyll`，按 **Commit changes**。
5. 前往 **Settings → Pages → Build and deployment**。Source 選 **Deploy from a branch**，Branch 選 **main**、資料夾選 **/(root)**，按 **Save**。
6. 等待部署；可於 **Actions** 查看 `pages build and deployment` 狀態。完成後在 **Settings → Pages** 點 **Visit site**。
7. 預設網址為 `https://帳號.github.io/儲存庫名稱/`。例如帳號 `xuu1104`、儲存庫 `cifu-website`，為 `https://xuu1104.github.io/cifu-website/`；只有部署完成才代表可用。

官方說明：[建立 GitHub Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-github-pages-site)、[設定發布來源](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site)。

### 更新網站

上傳修改後的同名檔案並 Commit，GitHub Pages 將重新部署。請保持網站網址與儲存 key `cifu.records.v1`，避免無意切換訪客的紀錄來源。修改資料格式前需設計相容遷移。

### 常見問題

- **只有 README、沒有首頁**：檢查 `index.html` 是否放在根目錄，Pages 是否選對 `main / (root)`。
- **圖片不見**：確認已上傳整個 `assets` 資料夾，注意檔名大小寫。
- **看到舊版**：先等 Actions 完成，再重新整理或強制重新載入。
- **點燈無法保存**：檢查是否停用網站儲存或瀏覽器空間不足；本站會提示失敗，不會假稱保存成功。
- **換電腦紀錄不見**：正常，請先於舊瀏覽器「我的參拜紀錄」下載備份，再在新裝置匯入。
- **直接雙擊 index.html 無互動**：ES modules 需要 HTTP/HTTPS，請使用 Pages 或本機預覽。

## 本機開發

安裝 Node.js 後，在原始碼目錄執行 `npm run preview`，開啟 `http://127.0.0.1:4173/`。執行 `npm test` 驗證 UTC、紀錄與備份/下載行為。發布資料夾不需要 Node.js 或 npm。

## 素材與公開範圍

- `assets/approved-visual.png` 為使用者核准的華麗宮廟概念圖；網頁以 CSS 選取其中原始建築區域呈現，保留指定設計。
- `water.png`、`bell.png`、`charm.png`、`lamp.png` 為內建圖像生成工具製作的原創寫實資產。
- `emblem.svg`、`spirit-wheel.svg` 為依確認設計實作的可縮放向量圖。
- `fortune-tin.png`、`fortune-cookie.png`、`fortune-cookie-open.png` 以使用者提供的巧克力幸運餅照片為造型參考，由內建圖像生成工具製作透明背景紅黑紫金版本；參考圖本身不放入公開包。
- 字型授權見 `assets/OFL.txt`。
- 不應上傳其他遊戲專案資料、後台、測試個人紀錄或帳號憑證。本站內的聲稱及見證均屬虛構敘事，無真實交易/醫療服務。
