<h1 align="center">🛍️ Customer Shopping Behavior Analysis</h1>

<p align="center">
  End-to-end analytics project: data cleaning → SQL analysis → dashboarding → business recommendations.
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Python-pandas-blue?logo=python&logoColor=white" />
  <img src="https://img.shields.io/badge/SQL-PostgreSQL-336791?logo=postgresql&logoColor=white" />
  <img src="https://img.shields.io/badge/Dashboard-Power%20BI-F2C811?logo=powerbi&logoColor=black" />
  <img src="https://img.shields.io/badge/License-MIT-green" />
</p>

<p align="center">
  <a href="./customer_behavior_dashboard.pbix">📊 Dashboard</a> ·
  <a href="./Customer_Shopping_Behavior_Analysis.pdf">📄 Full Report</a> ·
  <a href="./Customer-Shopping-Behavior-Analysis.pptx">🖥️ Presentation</a> ·
  <a href="./Customer_Shopping_Behavior_Analysis_.ipynb">🐍 Notebook</a> ·
  <a href="./customer_behavior_sql_queries.sql">🗄️ SQL Queries</a>
</p>

---

### At a Glance

| Customers analyzed | Revenue-driving segment | Top data quality issue found & fixed | Loyal customer share |
|:---:|:---:|:---:|:---:|
| **3,900** | Male ($157.9K vs $75.2K female) | 37 missing review ratings, imputed by category median | **80%** |

---

## 📋 Table of Contents

- [Project Overview](#-project-overview)
- [Dataset](#-dataset)
- [Data Preparation](#-data-preparation-python)
- [Key Findings](#-key-findings-sql)
- [Dashboard](#-dashboard-power-bi)
- [Business Recommendations](#-business-recommendations)
- [Repository Structure](#-repository-structure)
- [Running It Locally](#-running-it-locally)
- [Skills Demonstrated](#-skills-demonstrated)

---

## 🔎 Project Overview

This project analyzes 3,900 customer shopping transactions to uncover patterns in spending, product preferences, and subscription behavior, then translates those patterns into concrete business recommendations — the same workflow a retail analytics team would follow end to end.

<p align="center">
  <img src="./assets/workflow_diagram.png" alt="Project workflow: business problem to Python EDA to SQL to Power BI to report to presentation to GitHub" width="850">
</p>

| Stage | Tool |
|---|---|
| Data cleaning, feature engineering, EDA | Python (pandas) |
| Business question answering | SQL (PostgreSQL) |
| Interactive dashboard | Power BI |
| Report & stakeholder presentation | PDF + slides |

---

## 🗂 Dataset

- **3,900 rows × 18 columns** of retail transaction data
- Customer demographics: age, gender, location, subscription status
- Purchase details: item, category, amount, season, size, color
- Behavior signals: discount usage, previous purchases, purchase frequency, review rating, shipping type
- **37 missing values** in `Review Rating` — imputed with the median rating per product category

---

## 🧹 Data Preparation (Python)

- Loaded and inspected the raw CSV with `pandas`
- Imputed missing `Review Rating` values using per-category medians
- Standardized column names to snake_case
- Engineered `age_group` (quartile-based bins) and `purchase_frequency_days` (mapped from purchase frequency labels)
- Verified `discount_applied` and `promo_code_used` were redundant and dropped the latter
- Loaded the cleaned dataset into PostgreSQL for SQL analysis

---

## 📈 Key Findings (SQL)

Ten business questions were answered directly against the cleaned dataset. Full queries are in [`customer_behavior_sql_queries.sql`](./customer_behavior_sql_queries.sql).

| # | Question | Finding |
|---|---|---|
| 1 | Revenue by gender | Male customers generate **$157,890** vs. **$75,191** for female customers — roughly double |
| 2 | High-spending discount users | **839 customers** used a discount and still spent above the average purchase amount |
| 3 | Top 5 rated products | Gloves (3.86), Sandals (3.84), Boots (3.82), Hat (3.80), Skirt (3.78) |
| 4 | Standard vs. Express shipping | Express customers spend slightly more on average (**$60.48 vs. $58.46**, ~3.5%) |
| 5 | Subscribers vs. non-subscribers | Non-subscribers spend marginally more on average ($59.87 vs. $59.49); subscribers contribute **27%** of revenue |
| 6 | Most discount-dependent products | Hat (50% of purchases discounted), Sneakers (49.7%), Coat (49.1%), Sweater (48.2%), Pants (47.4%) |
| 7 | Customer segmentation | Loyal: **3,116** (80%) · Returning: **701** (18%) · New: **83** (2%) |
| 8 | Top 3 products per category | Accessories → Jewelry; Clothing → Blouse/Pants; Footwear → Sandals; Outerwear → Jacket |
| 9 | Repeat buyers (>5 purchases) & subscription | 958 subscribe, 2,518 don't — no strong link between repeat buying and subscribing |
| 10 | Revenue by age group | Young Adult ($62,143) leads, followed by Middle-aged, Adult, and Senior — a fairly even spread |

---

## 📊 Dashboard (Power BI)

<p align="center">
  <img src="./assets/dashboard_preview.png" alt="Power BI dashboard showing customer count, average purchase amount, average review rating, revenue and sales by category, and revenue and sales by age group" width="850">
</p>

Interactive filters for subscription status, gender, category, and shipping type. Open [`customer_behavior_dashboard.pbix`](./customer_behavior_dashboard.pbix) in Power BI Desktop to explore.

---

## 💡 Business Recommendations

- **Boost subscriptions** — subscribers currently spend about the same as non-subscribers, so the program isn't yet driving extra spend; exclusive perks could change that.
- **Convert New → Returning → Loyal** — only 2% of customers are "New," suggesting strong retention once someone makes a second purchase; worth investigating what drives that early conversion.
- **Rebalance discount strategy** — several products (Hat, Sneakers, Coat) rely on discounts for roughly half their sales; review margin impact.
- **Lean into express shipping** — it correlates with modestly higher spend and could be promoted as an upsell.
- **Target the Young Adult segment** — the highest revenue-contributing age group.

---

## 🗃 Repository Structure

```
├── Customer_Shopping_Behavior_Analysis_.ipynb   # Data cleaning, feature engineering, EDA
├── customer_behavior_sql_queries.sql            # 10 business questions in SQL
├── customer_behavior_dashboard.pbix             # Power BI interactive dashboard
├── Customer_Shopping_Behavior_Analysis.pdf       # Full written report
├── Customer-Shopping-Behavior-Analysis.pptx      # Stakeholder presentation
├── customer_shopping_behavior.csv                # Raw dataset
└── assets/                                       # Images used in this README
```

## ⚙️ Running It Locally

```bash
pip install pandas sqlalchemy psycopg2-binary
```

Open the notebook and run cells top to bottom. The database connection cells expect a local PostgreSQL instance — set credentials via environment variables rather than hardcoding them:

```python
import os
password = os.environ.get("DB_PASSWORD")
```

---

## 🧠 Skills Demonstrated

`Python` · `pandas` · `Data Cleaning` · `Feature Engineering` · `SQL` · `PostgreSQL` · `Power BI` · `Data Visualization` · `Customer Segmentation` · `Business Reporting`

---

## 📄 License

MIT — see [LICENSE.txt](./LICENSE.txt)

<p align="center">
  <b>Suvam Priyaranjan Sahoo</b><br>
  <a href="https://github.com/suvampriyaranjansahoo">GitHub</a>
</p>
