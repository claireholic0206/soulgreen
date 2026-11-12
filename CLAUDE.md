@AGENTS.md

## 跨專案架構（2026-11-12，Solution Architect）

本專案是 Soulgreen 的客戶網站（前端，騰訊雲）。芳療工作台（後端）是另一個專案：`~/Documents/07. Usha Veda/aroma-system`，由另一個 Claude session 負責。**兩邊之間的分工、部署與資料格式，以 `~/Documents/02. Soulgreen/architecture/` 為準**（ARCHITECTURE.md、CONTRACTS.md、CHANGELOG.md）。
- 開始工作前，先看 `architecture/CHANGELOG.md` 最上面幾筆。
- 不改資料庫結構、不放服務金鑰；需要新資料或新 API，先在 `CHANGELOG.md` 記一筆「待 architect 確認」，不要自己發明格式。
- 改到後端會讀到的東西（飛書問卷題目、產品表的用法、提交格式）也要記 CHANGELOG。
- 只影響畫面、文案、樣式的事，直接做。
