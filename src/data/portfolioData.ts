import { Project, CaseStudy, ResumeRole, RiceItem, AcademicMilestone } from '../types';

export const PERSONAL_INFO = {
  name: "Suvam Priyaranjan Sahoo",
  shortName: "Suvam",
  roleHeadline: "Data • Product • Business Analytics",
  tagline: "I turn messy data into decisions — from customer retention and financial risk to product prioritization and real-time analytics.",
  email: "sahoosuvampriyaranjan10@gmail.com",
  phone: "+91 9692681951",
  location: "Gurgaon, Haryana & Bhubaneswar, Odisha, India",
  education: {
    university: "Siksha 'O' Anusandhan University (ITER)",
    degree: "B.Tech in Computer Science Engineering",
    cgpa: "8.18 / 10",
    period: "Aug 2022 – Jul 2026",
    location: "Bhubaneswar, Odisha",
    higherSecondary: {
      institution: "Saraswati Vidya Mandir",
      location: "Neelakantha Nagar, Berhampur, Odisha",
      qualification: "Higher Secondary (12th) — PCM",
      score: "93.85%",
      year: "2021"
    },
    secondary: {
      institution: "Saraswati Shishu Vidya Mandir",
      location: "Nayagarh, Odisha",
      qualification: "Secondary (10th)",
      score: "90.67%",
      year: "2019"
    },
    highSchool: "Saraswati Vidya Mandir (PCM 93.85%, 2021)"
  },
  links: {
    github: "https://github.com/suvampriyaranjansahoo",
    linkedin: "https://linkedin.com/in/suvam-priyaranjan-sahoo-18b7412bb",
    email: "mailto:sahoosuvampriyaranjan10@gmail.com"
  }
};

export const ACADEMIC_MILESTONES: AcademicMilestone[] = [
  {
    id: "btech",
    institution: "Siksha 'O' Anusandhan University (ITER)",
    location: "Bhubaneswar, Odisha",
    degree: "Bachelor of Technology — Computer Science & Engineering",
    score: "8.18 / 10",
    scoreType: "Cumulative GPA",
    period: "Aug 2022 – Jul 2026",
    year: "Expected July 2026",
    honors: "First Class with Distinction Track",
    badge: "Undergraduate Degree",
    highlights: [
      "Rigorous core curriculum in relational data modeling, query optimization, algorithms, and distributed computing systems.",
      "Conducted specialized independent research on XGBoost ROC-AUC predictive modeling across 78,000+ financial records.",
      "Bridged academic database theory with real-time PySpark streaming ETL pipelines and DAX analytical models."
    ],
    coursework: [
      "Database Management Systems (DBMS & SQL)",
      "Data Structures & Algorithms",
      "Probability & Applied Statistics",
      "Object-Oriented Programming (Java, C++)",
      "Operating Systems & Distributed Architecture",
      "Computer Networks & Cloud Systems"
    ]
  },
  {
    id: "12th",
    institution: "Saraswati Vidya Mandir",
    location: "Neelakantha Nagar, Berhampur, Odisha",
    degree: "Higher Secondary Certificate (Class 12th) — Science / PCM",
    score: "93.85%",
    scoreType: "Aggregate Score",
    period: "2019 – 2021",
    year: "Graduated 2021",
    honors: "State Merit Distinction (Top Percentile)",
    badge: "Senior Secondary (12th)",
    highlights: [
      "Secured 93.85% aggregate across Physics, Chemistry, and Advanced Mathematics (PCM stream).",
      "Demonstrated outstanding mathematical and analytical aptitude, laying the quantitative bedrock for data engineering.",
      "Participated in regional science exhibitions and mathematics problem-solving competitions."
    ],
    coursework: [
      "Advanced Mathematics & Calculus",
      "Physics & Mechanics",
      "Chemistry",
      "English & Analytical Reasoning",
      "Introductory Computing & Logic"
    ]
  },
  {
    id: "10th",
    institution: "Saraswati Shishu Vidya Mandir",
    location: "Nayagarh, Odisha",
    degree: "Secondary School Examination (Class 10th)",
    score: "90.67%",
    scoreType: "Aggregate Score",
    period: "2018 – 2019",
    year: "Graduated 2019",
    honors: "First Division with High Distinction",
    badge: "Secondary (10th)",
    highlights: [
      "Achieved 90.67% aggregate with top honors across foundational sciences, mathematics, and humanities.",
      "Consistently ranked in the top tier of the academic cohort with strong scholastic discipline.",
      "Active participant in school debates, science quizzes, and leadership clubs."
    ],
    coursework: [
      "General Mathematics & Geometry",
      "Physical & Biological Sciences",
      "Social Sciences & History",
      "Language & Composition"
    ]
  }
];

export const ACADEMIC_DOMAINS = [
  {
    title: "Data & Systems Foundations",
    icon: "database",
    skills: ["DBMS & SQL Optimization", "Data Structures & Algorithms", "Star-Schema Modeling", "Distributed Systems"]
  },
  {
    title: "Mathematics & Quantitative Rigor",
    icon: "sigma",
    skills: ["Probability & Statistics", "Differential Calculus", "Linear Algebra", "Applied Econometrics"]
  },
  {
    title: "Software Engineering & Architecture",
    icon: "code",
    skills: ["Object-Oriented Design (Java/C++)", "Operating Systems", "Cloud Compute Pipelines", "API Protocols"]
  }
];


export const PROOF_POINTS = [
  { label: "FOCUS", value: "Data → Product → Business" },
  { label: "CORE STACK", value: "SQL · Python · Power BI · Azure" },
  { label: "WORK STYLE", value: "Question → Insight → Action" }
];

export const KEY_METRICS = [
  { value: 50, suffix: "K+", label: "business records validated", note: "at VOIS internship" },
  { value: 78, suffix: "K+", label: "financial records analyzed", note: "18 risk indicators" },
  { value: 40, suffix: "%", label: "reporting turnaround improvement", note: "automated with DAX & Power Query" },
  { value: 0.857, suffix: "", decimal: 3, label: "XGBoost ROC-AUC", note: "bankruptcy prediction benchmark" }
];

export const RESUME_ROLES: ResumeRole[] = [
  {
    id: "business-analyst",
    title: "Business Analyst",
    subtitle: "Business & Performance Analytics",
    icon: "📊",
    pdfFileName: "Suvam_Priyaranjan_Sahoo_Business_Analyst.pdf",
    summary: "Computer Science Engineering graduate with hands-on experience translating business problems into data-driven insights using SQL, Power BI, and Excel. Delivered a 5% churn reduction and 35% reporting-accuracy improvement during a Data Analyst internship at VOIS through stakeholder-focused KPI reporting and dashboard automation.",
    focusSkills: [
      { category: "Programming", items: "Python, SQL, Java, C, C++" },
      { category: "Business Analysis", items: "Business Intelligence, KPI Reporting, Business Research, Trend Analysis, Data Interpretation, Data Validation, Business Problem-Solving" },
      { category: "Analytics & BI", items: "Power BI, DAX, Dashboard Development, Data Visualization, Data Storytelling, Executive & Stakeholder Reporting" },
      { category: "Excel & Tools", items: "Microsoft Excel, Pivot Tables, XLOOKUP, Power Query, Google Sheets" },
      { category: "Databases & Cloud", items: "SQL, Synapse SQL, Azure, Databricks, ETL Pipelines" }
    ],
    topBullets: [
      "Cleaned & validated 50K+ business records in Excel & SQL, increasing reporting accuracy by 35%.",
      "Automated Power BI dashboards using DAX and Power Query, cutting manual reporting turnaround by 40%.",
      "Delivered churn dashboards and stakeholder-ready KPI reports, driving a 5% churn reduction.",
      "Segmented 10K+ customer transactions via RFM & CLV, reducing retail stock-out occurrences by 12%."
    ]
  },
  {
    id: "data-analyst",
    title: "Data Analyst",
    subtitle: "SQL · Python · BI",
    icon: "📈",
    pdfFileName: "Suvam_Priyaranjan_Sahoo_Data_Analyst.pdf",
    summary: "Computer Science Engineering graduate with hands-on experience in SQL, Python, and Excel, gained through a Data Analyst internship at Vodafone Intelligent Solutions and independent data projects. Surfaced retention signals from usage data that fed into a cross-functional initiative cutting churn by 5%, and automated reporting workflows cutting turnaround by 40%.",
    focusSkills: [
      { category: "Programming & SQL", items: "Python (Pandas, NumPy, Scikit-learn), SQL (Joins, CTEs, Window Functions), PostgreSQL" },
      { category: "Business & Performance Analytics", items: "Customer Segmentation & Behavioral Cohorting (RFM, CLV), Churn & Retention Analysis, Revenue & Trend Analysis, KPI Definition" },
      { category: "Spreadsheet Analytics", items: "Advanced Excel, Power Query, Pivot Tables, XLOOKUP, Google Sheets" },
      { category: "Dashboarding & Reporting", items: "Power BI, DAX, Metric Reporting, Stakeholder Reporting" },
      { category: "Data Modeling", items: "Star-Schema Design, Bronze/Silver/Gold Layered Architecture" },
      { category: "Cloud & Tools", items: "Microsoft Azure, Databricks, Git, GitHub" }
    ],
    topBullets: [
      "Analyzed 78,682 company-year financial records (1999–2018) across 18 indicators using SQL & Python.",
      "Benchmarked 6 machine learning models with XGBoost achieving 0.857 ROC-AUC and SHAP explainability.",
      "Engineered Azure/PySpark streaming ETL pipelines boosting resource-allocation efficiency by 15%.",
      "Audited 10,000+ retail transactions with 99.9% data integrity and built DAX-based retention cohort models."
    ]
  },
  {
    id: "product-analyst",
    title: "Product Analyst",
    subtitle: "Product Analytics · RICE",
    icon: "🎯",
    pdfFileName: "Suvam_Priyaranjan_Sahoo_Product_Analyst.pdf",
    summary: "Computer Science graduate with a Data Analyst internship at Vodafone Intelligent Solutions, where 50,000+ business records were cleaned and KPI dashboards built. Independently built PriorityPe, a tool that scores UPI app review complaints using the RICE framework to flag what to fix first, combining customer feedback analysis with a working product interface.",
    focusSkills: [
      { category: "Product & Business Analytics", items: "RICE/ICE Prioritization, KPI Definition, Customer Feedback Analysis, Retention Analysis, Funnel Analysis, A/B Testing, Requirements Gathering" },
      { category: "Programming & SQL", items: "Python (Pandas, NumPy, Scikit-learn), SQL, PostgreSQL, CTEs, Window Functions" },
      { category: "Analytics & NLP", items: "Data Cleaning, EDA, Topic Modeling (TF-IDF, KMeans), Sentiment Analysis (VADER)" },
      { category: "Business Intelligence", items: "Power BI, DAX, Dashboard Development, Stakeholder Reporting" },
      { category: "Product Build", items: "Streamlit, MySQL, Product Prototyping, Chart.js" }
    ],
    topBullets: [
      "Scraped 6,000 Play Store reviews across 3 UPI apps (PhonePe, Google Pay, Paytm) and mined 8 core complaint themes.",
      "Ranked themes via RICE (Reach, Impact, Confidence, Effort) with explicit qualitative and quantitative reasoning.",
      "Built interactive Streamlit & web dashboards with live dynamic weighting and wrote a 1-page PM executive memo.",
      "Delivered KPI reporting reducing customer churn by 5% at Vodafone Intelligent Solutions."
    ]
  },
  {
    id: "data-engineer",
    title: "Data Engineer",
    subtitle: "Azure · PySpark · ETL",
    icon: "⚙️",
    pdfFileName: "Suvam_Priyaranjan_Sahoo_Data_Engineer.pdf",
    summary: "Computer Science Engineering graduate with hands-on internship and project experience building data pipelines and investigating data quality issues down to their root cause. During a Data Analyst internship at VOIS, delivered a 35% lift in reporting accuracy by enforcing data quality standards across 50,000+ records.",
    focusSkills: [
      { category: "Data Engineering", items: "ETL Pipeline Design (Azure, PySpark), Data Modeling, Star-Schema Design, Data Warehousing (Synapse SQL)" },
      { category: "Data Quality & Root Cause Analysis", items: "Data Profiling, Anomaly & Outlier Investigation, Missing-Value & Duplicate Resolution, Completeness/Accuracy/Consistency Checks" },
      { category: "Programming & SQL", items: "Python (Pandas, NumPy, PySpark), SQL, PostgreSQL, CTEs, Window Functions" },
      { category: "Cloud & Tools", items: "Microsoft Azure (Event Hub, Synapse), Databricks, Git, GitHub" }
    ],
    topBullets: [
      "Engineered real-time Azure pipeline (Event Hub + Databricks) with Bronze–Silver–Gold ETL layers.",
      "Designed star-schema warehouse in Azure Synapse SQL, improving operational query speed by 25%.",
      "Investigated root-cause quality anomalies across 78,682 financial filings before downstream ingestion.",
      "Enforced data quality checks for 50,000+ business records, improving downstream reporting accuracy by 35%."
    ]
  },
  {
    id: "ai-ml-engineer",
    title: "AI/ML Engineer",
    subtitle: "ML · NLP · AI",
    icon: "🤖",
    pdfFileName: "Suvam_Priyaranjan_Sahoo_AI_ML_Engineer.pdf",
    summary: "Final-year Computer Science Engineering student with end-to-end experience across the ML lifecycle — model development, NLP, and data engineering. Built and shipped three production-style systems: a hybrid XGBoost + deep learning ensemble for clinical disease prediction (90.5% accuracy, 0.94 ROC-AUC), a transformer-based NLP chatbot, and a real-time Azure analytics pipeline.",
    focusSkills: [
      { category: "Machine Learning & Deep Learning", items: "TensorFlow, Scikit-learn, XGBoost, Neural Networks, Ensemble Methods, Feature Engineering, Hyperparameter Tuning, Model Evaluation" },
      { category: "NLP & LLMs", items: "Hugging Face Transformers, Prompt Engineering & Chaining, LLM APIs, Sentiment & Emotion Detection, Tokenization" },
      { category: "Explainable AI", items: "SHAP, Feature Importance, Model Interpretability" },
      { category: "Programming & Tools", items: "Python (Pandas, NumPy, PySpark), SQL, Docker, Azure, Databricks, Flask, Streamlit" }
    ],
    topBullets: [
      "Designed hybrid ensemble (XGBoost + Deep Neural Network) reaching 90.5% accuracy and 0.94 ROC-AUC.",
      "Integrated SHAP to convert complex feature importances into transparent clinical decision explanations.",
      "Built transformer NLP pipeline for emotion detection and empathetic response with 87% accuracy (MindEase).",
      "Engineered real-time streaming ETL in Azure Databricks with automated Power BI operations dashboards."
    ]
  }
];

export const PROJECTS: Project[] = [
  {
    id: "prioritype",
    index: "01",
    title: "PriorityPe",
    tagline: "RICE Prioritization Engine for UPI Products",
    question: "Which UPI complaints should a product team fix first?",
    category: "product",
    meta: "PRODUCT ANALYTICS · CUSTOMER VOICE · RICE",
    featured: true,
    metrics: [
      { value: "6,000", label: "reviews scraped" },
      { value: "8", label: "complaint themes" },
      { value: "3", label: "UPI apps (PhonePe, GPay, Paytm)" },
      { value: "Live RICE", label: "interactive re-ranking" }
    ],
    description: "Review mining turns noisy customer feedback into a ranked product roadmap using topic modeling (TF-IDF & KMeans), sentiment analysis, and the RICE framework with transparent qualitative scoring rationale.",
    flow: "Reviews → NLP & Clustering → Themes → RICE Matrix → Live Roadmap",
    githubUrl: "https://github.com/suvampriyaranjansahoo/PriorityPe-RICE-Prioritization-Engine",
    caseStudyId: "priority",
    tags: ["Product Analytics", "NLP", "RICE Framework", "Python", "Streamlit", "Customer Voice"]
  },
  {
    id: "financial-analytics",
    index: "02",
    title: "Financial Analytics & Bankruptcy Risk Suite",
    tagline: "Early-Warning Distress Detection & Explainable ML",
    question: "Can financial indicators identify corporate distress early?",
    category: "analytics",
    meta: "FINANCIAL ANALYTICS · RISK & MODELING",
    featured: true,
    metrics: [
      { value: "78,682", label: "financial records (1999–2018)" },
      { value: "18", label: "key financial indicators" },
      { value: "6", label: "ML models benchmarked" },
      { value: "0.857", label: "XGBoost ROC-AUC" }
    ],
    description: "SQL ratio analysis, Power BI KPIs, and machine learning benchmarking for early-warning financial distress detection, complete with SHAP feature interpretability for risk committees.",
    flow: "Raw Filings → SQL EDA & Ratios → Feature Eng → Benchmark 6 Models → SHAP Explainability",
    githubUrl: "https://github.com/suvampriyaranjansahoo/Financial-Analytics-Bankruptcy-Prediction-Suite",
    caseStudyId: "financial",
    tags: ["Financial Analytics", "SQL", "Power BI", "XGBoost", "SHAP", "Risk Modeling"]
  },
  {
    id: "mediflowrt",
    index: "03",
    title: "MediFlowRT",
    tagline: "Real-Time Healthcare Operations & Streaming Analytics",
    question: "How can real-time healthcare telemetry support hospital operations?",
    category: "engineering",
    meta: "DATA ENGINEERING · HEALTHCARE TELEMETRY",
    metrics: [
      { value: "+15%", label: "allocation efficiency" },
      { value: "+25%", label: "query performance (Star-schema)" },
      { value: "3", label: "hospital units monitored" }
    ],
    description: "Azure & PySpark streaming ETL pipeline (Event Hub + Databricks) featuring Bronze–Silver–Gold layered architecture, Synapse star-schema warehousing, and Power BI live operations monitoring.",
    flow: "Telemetry Streams → Azure Event Hub → PySpark Bronze-Silver-Gold → Synapse SQL → Power BI",
    githubUrl: "https://github.com/suvampriyaranjansahoo/MediFlowRT-Real-Time-Healthcare-Analytics-Platform",
    caseStudyId: "mediflow",
    tags: ["Azure", "PySpark", "Databricks", "Synapse SQL", "Star-Schema", "Power BI"]
  },
  {
    id: "customer-retention",
    index: "04",
    title: "Customer Behavior & Retention Analytics",
    tagline: "RFM Cohorts, CLV & Stock-Out Optimization",
    question: "Which customer segments drive retention and sustainable revenue?",
    category: "analytics",
    meta: "BUSINESS ANALYTICS · COHORT RETENTION",
    metrics: [
      { value: "10,000+", label: "transactions audited" },
      { value: "99.9%", label: "data integrity achieved" },
      { value: "−12%", label: "stock-out occurrences" }
    ],
    description: "RFM and CLV customer segmentation, SQL data auditing, and DAX-powered Power BI dashboards uncovering customer purchase rhythms and inventory replenishment strategies.",
    flow: "Transactional Logs → SQL Audit → RFM & CLV Segmentation → DAX Dashboards → Inventory Action",
    githubUrl: "https://github.com/suvampriyaranjansahoo/customer_behavior_analysis",
    caseStudyId: "customer",
    tags: ["Customer Analytics", "RFM Segmentation", "CLV", "Power BI DAX", "SQL", "Retention"]
  },
  {
    id: "cardioinsight",
    index: "05",
    title: "CardioInsight-AI",
    tagline: "Coronary Artery Disease Hybrid Ensemble & Explainability",
    question: "Can hybrid ensembles deliver high-accuracy clinical decision support?",
    category: "ai",
    meta: "APPLIED AI · CLINICAL DECISION SUPPORT",
    metrics: [
      { value: "90.5%", label: "prediction accuracy" },
      { value: "0.94", label: "ROC-AUC score" },
      { value: "SHAP", label: "clinical explainability" }
    ],
    description: "Designed a hybrid ensemble combining XGBoost and Deep Neural Networks trained on multi-source clinical datasets, translating complex risk features into transparent clinical explanations.",
    flow: "Clinical Dataset → Outlier/EDA → Ensemble Model → Hyperparameter Tuning → SHAP Transparency",
    githubUrl: "https://github.com/suvampriyaranjansahoo",
    caseStudyId: "cardio",
    tags: ["Machine Learning", "TensorFlow", "XGBoost", "SHAP", "Clinical AI"]
  },
  {
    id: "mindease",
    index: "06",
    title: "MindEase AI Chatbot",
    tagline: "Transformer-based NLP Pipeline for Empathetic Conversational Support",
    question: "How to deploy reliable emotion classification in conversational assistants?",
    category: "ai",
    meta: "NLP · TRANSFORMERS & CONVERSATIONAL AI",
    metrics: [
      { value: "87%", label: "emotion detection accuracy" },
      { value: "End-to-End", label: "Flask + Streamlit production" },
      { value: "Zero-lag", label: "inference pipeline" }
    ],
    description: "Built a transformer-based NLP pipeline (preprocessing, tokenization, inference) for real-time emotion detection and empathetic conversational support, shipped with Flask and Streamlit.",
    flow: "User Utterance → Tokenization → Transformer Emotion Model → Prompt Routing → Response Generation",
    githubUrl: "https://github.com/suvampriyaranjansahoo",
    caseStudyId: "mindease",
    tags: ["NLP", "Hugging Face", "Transformers", "Flask", "Streamlit"]
  }
];

export const CASE_STUDIES: Record<string, CaseStudy> = {
  priority: {
    id: "priority",
    title: "PriorityPe",
    subtitle: "RICE Prioritization Engine for UPI Products",
    tagline: "Mining 6,000 Play Store reviews into an actionable, weighted product roadmap.",
    meta: "PRODUCT ANALYTICS · CUSTOMER VOICE · RICE",
    stats: [
      { value: "6,000", label: "Play Store reviews scraped" },
      { value: "8", label: "core complaint themes surfaced" },
      { value: "3", label: "UPI apps (PhonePe, GPay, Paytm)" }
    ],
    tabs: {
      problem: {
        title: "Problem Statement",
        content: "App store review streams for major Indian UPI apps (PhonePe, Google Pay, Paytm) receive thousands of unstructured reviews daily. Product teams struggle to distinguish vocal minority complaints from high-frequency, high-severity transaction blockers. Without structured prioritization, engineers often end up fixing low-impact edge cases instead of core transaction-critical failures.",
        bulletPoints: [
          "Unstructured feedback hides systemic product defects under noise.",
          "Prioritization disputes occur without quantitative reach and impact metrics.",
          "Need for a dynamic framework where PMs can adjust business weights in real-time."
        ]
      },
      data: {
        title: "Data Pipeline",
        content: "Scraped 6,000 customer reviews across Google Play Store using Python scrapers. Filtered down to 566 high-signal English reviews with verified transaction timestamps, ratings (1-star to 5-star), and detailed feedback descriptions.",
        bulletPoints: [
          "Data cleaning & regex preprocessing: stripped emojis, URLs, and spam tokens.",
          "Text normalization: lowercase, stop-word removal, and lemmatization via NLTK/spaCy.",
          "Dataset structured into verified review text, user sentiment scores, and application identifiers."
        ],
        codeSnippet: {
          language: "python",
          code: `# PriorityPe NLP review preprocessing pipeline
import pandas as pd
import re
from nltk.corpus import stopwords
from nltk.stem import WordNetLemmatizer

lemmatizer = WordNetLemmatizer()
stop_words = set(stopwords.words('english'))

def clean_review(text):
    text = re.sub(r'http\S+|www\S+|[^a-zA-Z\s]', '', text.lower())
    tokens = [lemmatizer.lemmatize(w) for w in text.split() if w not in stop_words and len(w) > 2]
    return ' '.join(tokens)`
        }
      },
      analysis: {
        title: "Clustering & Themes",
        content: "Applied TF-IDF vectorization and KMeans unsupervised clustering to categorize reviews into 8 dominant themes. Validated cluster coherence using silhouette scores and VADER sentiment intensity analysis.",
        bulletPoints: [
          "Theme 1: Failed Transactions & Money Deducted (34% of 1-star reviews)",
          "Theme 2: Refund Delays & Lack of Status Transparency (22%)",
          "Theme 3: Bank Server Timeout & Inconsistent UPI Switch (16%)",
          "Theme 4: Autopay / Mandate Cancellation Errors (10%)",
          "Theme 5: QR Code Scan & Camera Focus Lag (8%)",
          "Theme 6: Promotional Cashback Discrepancies (4%)",
          "Theme 7: OTP & SMS Delivery Delays (4%)",
          "Theme 8: App Freeze & Navigation Latency (2%)"
        ]
      },
      method: {
        title: "RICE Framework Scoring",
        content: "Scored every theme on Reach (monthly affected users), Impact (1-5 scale based on financial loss vs inconvenience), Confidence (percentage of supporting data), and Effort (engineering weeks estimated). RICE Score = (Reach × Impact × Confidence) / Effort.",
        bulletPoints: [
          "Reach: Scaled by review frequency and volume share.",
          "Impact: Scored 5 for money loss/failed debits, 3 for operational delay, 1 for cosmetic issues.",
          "Confidence: 90% for high-volume verified transactional complaints; 60% for intermittent device issues.",
          "Effort: Estimated with standard engineering sprint sizing (1 to 5 person-months)."
        ],
        codeSnippet: {
          language: "python",
          code: `# Calculate dynamic RICE score with custom priority weighting
def calculate_rice(reach, impact, confidence, effort, impact_wt=1.0, effort_wt=1.0):
    weighted_impact = impact * impact_wt
    weighted_effort = max(0.5, effort * effort_wt)
    rice_score = (reach * weighted_impact * (confidence / 100.0)) / weighted_effort
    return round(rice_score, 2)`
        }
      },
      insight: {
        title: "Key Product Insights",
        content: "The analysis proved that 'Failed Money Deducted' and 'Refund Delays' represented over 56% of negative brand sentiment and churn risk. Resolving the communication loop between the bank switch and the UI during pending states offers the highest ROI per engineering sprint.",
        bulletPoints: [
          "Users tolerate app cosmetic flaws, but churn immediately upon silent pending-debit states.",
          "Adding an automated 2-minute proactive status polling reduced user panic tickets by an estimated 45%."
        ]
      },
      recommendation: {
        title: "PM Recommendation Memo",
        content: "Sprint 1-2: Prioritize the 'Smart Reversal Status Tracker' (Theme 1 & 2). Provide instant banking reference number (RRN) lookup directly inside the receipt view. Sprint 3: Mandate / Autopay single-tap pause switch to address recurring billing anxiety.",
        bulletPoints: [
          "Immediate: Implement proactive Push Notifications when NPCI resolves pending state.",
          "Q2: Re-architect QR camera initialization to reduce first-frame scan latency below 300ms."
        ]
      }
    }
  },
  financial: {
    id: "financial",
    title: "Financial Analytics & Bankruptcy Risk Suite",
    tagline: "Benchmarking 6 Machine Learning models on 78,682 corporate filings with SHAP interpretability.",
    meta: "FINANCIAL ANALYTICS · RISK & MODELING",
    stats: [
      { value: "78,682", label: "company-year financial records" },
      { value: "18", label: "financial ratios & indicators" },
      { value: "0.857", label: "XGBoost ROC-AUC benchmark" }
    ],
    tabs: {
      problem: {
        title: "Problem Statement",
        content: "Corporate insolvency poses massive credit risk for commercial lenders and institutional investors. Traditional linear credit rating models rely on static financial statements and often fail to detect non-linear liquidity drains or leverage spirals until it is too late. The challenge was building an early-warning risk prediction system with auditable financial ratios and transparent feature explanations.",
        bulletPoints: [
          "Heavily imbalanced dataset with rare distress events (< 5% default rate).",
          "Need for high recall without drowning analysts in false positive alarms.",
          "Regulatory requirement for explainability: black-box neural models alone are unusable by credit committees."
        ]
      },
      data: {
        title: "Financial Data & SQL EDA",
        content: "78,682 company-year records spanning 1999–2018. Engineered 18 key financial ratios across 4 dimensions: Profitability (ROA, ROE, EBITDA/Assets), Liquidity (Current Ratio, Quick Ratio, Cash/Assets), Leverage (Debt/Equity, Debt/Assets, Interest Coverage), and Efficiency (Asset Turnover, Inventory Turnover).",
        bulletPoints: [
          "SQL-based aggregation with CTEs and Window Functions to compute year-over-year growth deltas.",
          "Handled survivorship bias and removed extreme outlier filing entries.",
          "Applied RobustScaler to handle heavy-tailed financial ratio distributions."
        ],
        codeSnippet: {
          language: "sql",
          code: `-- SQL CTE: Calculating YoY Liquidity & Working Capital Ratios
WITH FinancialRatios AS (
  SELECT
    company_id,
    fiscal_year,
    (current_assets - current_liabilities) / NULLIF(total_assets, 0) AS working_capital_ratio,
    retained_earnings / NULLIF(total_assets, 0) AS retained_earnings_ratio,
    ebit / NULLIF(total_assets, 0) AS operational_profitability_ratio,
    total_debt / NULLIF(total_equity, 0) AS debt_to_equity,
    LAG(ebit, 1) OVER (PARTITION BY company_id ORDER BY fiscal_year) AS prev_year_ebit,
    bankruptcy_flag
  FROM corporate_filings
)
SELECT 
  *,
  ROUND(((ebit - prev_year_ebit) / NULLIF(ABS(prev_year_ebit), 0)) * 100, 2) AS ebit_growth_pct
FROM FinancialRatios;`
        }
      },
      analysis: {
        title: "Trend & Ratio Analysis",
        content: "Statistical analysis revealed that the deterioration of the Working Capital / Total Assets ratio combined with negative Cash Flow from Operations preceded formal bankruptcy filings by 18 to 24 months in 84% of cases.",
        bulletPoints: [
          "Severe multi-collinearity between raw balance sheet items; mitigated via ratio transformation.",
          "Class imbalance addressed using SMOTE (Synthetic Minority Over-sampling) and weighted loss functions.",
          "Cross-validated using rolling time-series splits (training on past 10 years, testing on subsequent 2 years)."
        ]
      },
      method: {
        title: "Model Benchmarking & SHAP",
        content: "Benchmarked 6 classification algorithms: Logistic Regression, Random Forest, AdaBoost, LightGBM, CatBoost, and XGBoost. XGBoost achieved the leading performance with an ROC-AUC of 0.857 and PR-AUC of 0.742.",
        bulletPoints: [
          "Hyperparameters tuned with Bayesian Optimization (Optuna) over 100 trials.",
          "Integrated SHAP (SHapley Additive exPlanations) TreeExplainer to generate global feature importance and local waterfall plots for individual credit assessments."
        ],
        codeSnippet: {
          language: "python",
          code: `# SHAP TreeExplainer for credit risk decision audit
import shap
import xgboost as xgb

model = xgb.XGBClassifier(n_estimators=300, max_depth=5, learning_rate=0.03, scale_pos_weight=19.5)
model.fit(X_train, y_train)

explainer = shap.TreeExplainer(model)
shap_values = explainer.shap_values(X_test)

# Generates individual waterfall explanation for credit officer memo
def explain_borrower(borrower_idx):
    return shap.plots.waterfall(explainer(X_test)[borrower_idx])`
        }
      },
      insight: {
        title: "Risk Drivers Discovered",
        content: "Top 3 predictors of distress ranked by mean absolute SHAP value: 1) Retained Earnings / Total Assets, 2) Operating Cash Flow / Total Debt, 3) Current Assets / Current Liabilities. Sudden drops in cash flow efficiency triggered the highest marginal risk score increases.",
        bulletPoints: [
          "Companies with high accounting profits but negative operational cash flows exhibited 3.8x higher default rates.",
          "SHAP waterfall plots allow credit officers to identify exact vulnerability drivers in seconds."
        ]
      },
      recommendation: {
        title: "Executive Recommendation",
        content: "Deploy the XGBoost + SHAP scoring pipeline as a real-time warning module inside the commercial underwriting portal. Flag accounts with risk score > 0.65 for manual senior underwriter review 6 months before annual covenant renewals.",
        bulletPoints: [
          "Implement monthly dynamic ratio tracking to replace annual backward-looking audits.",
          "Provide borrowers with automated actionable guidance on improving liquidity covenants."
        ]
      }
    }
  },
  mediflow: {
    id: "mediflow",
    title: "MediFlowRT",
    tagline: "Real-Time Healthcare Streaming Analytics with Azure & PySpark",
    meta: "DATA ENGINEERING · HEALTHCARE TELEMETRY",
    stats: [
      { value: "+15%", label: "allocation efficiency" },
      { value: "+25%", label: "query performance (Star-schema)" },
      { value: "3", label: "hospital units monitored" }
    ],
    tabs: {
      problem: {
        title: "Problem Statement",
        content: "Emergency departments and inpatient wards suffered from fragmented data silos. Bed occupancy, triage wait times, and staffing allocations were updated manually on whiteboards and batch spreadsheets, causing severe bed assignment delays and peak-hour nurse shortages.",
        bulletPoints: [
          "Average bed turnaround time exceeded 4.2 hours due to uncoordinated discharge reporting.",
          "Leadership lacked real-time visibility into patient admission spikes."
        ]
      },
      data: {
        title: "Architecture & Pipelines",
        content: "Engineered a streaming ingestion pipeline using Azure Event Hub to capture patient admission, triage, and telemetry events. Processed via Azure Databricks with PySpark structured streaming into Bronze, Silver, and Gold delta tables.",
        bulletPoints: [
          "Bronze Layer: Raw JSON telemetry ingestion with append-only validation.",
          "Silver Layer: Cleaned, deduplicated, and enriched patient records.",
          "Gold Layer: Star-schema fact tables (Fact_Admissions, Fact_BedTransitions) and dimension tables (Dim_Ward, Dim_Patient, Dim_Physician)."
        ]
      },
      analysis: {
        title: "Warehouse Design & Query Optimization",
        content: "Migrated analytical queries to Azure Synapse SQL. Structured the data into a star-schema model with clustered columnstore indexes, slashing aggregate query response times by 25%.",
        bulletPoints: [
          "Enforced automated partition pruning on admission timestamps.",
          "Added automated ETL anomaly detection alerts for schema drift."
        ]
      },
      method: {
        title: "BI & Operations Dashboards",
        content: "Constructed real-time Power BI executive and ward-level dashboards with DAX measures for dynamic bed occupancy rate, average wait time per triage severity level (ESI 1-5), and projected discharge volume.",
        bulletPoints: [
          "DirectQuery integration with Azure Synapse for sub-minute refresh.",
          "Role-based security views for nurse managers vs hospital administration."
        ]
      },
      insight: {
        title: "Operational Impact",
        content: "Real-time visibility reduced average bed allocation wait times by 15%, allowing nursing supervisors to pre-assign housekeeping teams before formal patient discharge completion.",
        bulletPoints: [
          "Eliminated 40 hours of monthly manual report compilation across 3 departments.",
          "Identified Thursday evening triage bottleneck caused by scheduled physician shift handover overlaps."
        ]
      },
      recommendation: {
        title: "System Recommendations",
        content: "Scale the streaming pipeline to ingest ambulance GPS and telemetry streams, enabling predictive ER capacity leveling 30 minutes before trauma vehicle arrival.",
        bulletPoints: [
          "Integrate ML-based length-of-stay (LOS) prediction model at intake.",
          "Connect Gold layer to automated SMS notification gateway for family updates."
        ]
      }
    }
  },
  customer: {
    id: "customer",
    title: "Customer Behavior & Retention Analytics",
    tagline: "Auditing 10,000+ retail records with RFM, CLV, and inventory optimization.",
    meta: "BUSINESS ANALYTICS · RETENTION",
    stats: [
      { value: "10,000+", label: "transactions audited" },
      { value: "99.9%", label: "data integrity achieved" },
      { value: "−12%", label: "stock-out occurrences" }
    ],
    tabs: {
      problem: {
        title: "Problem Statement",
        content: "An omnichannel retail business suffered from high customer churn (top 20% customers dropping by 8% quarterly) and frequent inventory stock-outs in top-selling categories due to disconnected sales and supply-chain databases.",
        bulletPoints: [
          "Inability to differentiate high-value loyal customers from one-time bargain seekers.",
          "Marketing spend was distributed evenly rather than targeted at high CLV segments."
        ]
      },
      data: {
        title: "Data Audit & Cleaning",
        content: "Audited 10,000+ retail transaction records across POS and eCommerce platforms in SQL and Excel. Resolved null values, currency conversions, and duplicate customer ID records to achieve 99.9% verified data integrity.",
        bulletPoints: [
          "Formulated automated SQL checks for negative transaction amounts and return reconciliations.",
          "Normalized customer address and categorical product tax classifications."
        ]
      },
      analysis: {
        title: "RFM & CLV Segmentation",
        content: "Segmented customer base into 5 behavioral cohorts: Champions, Loyal Customers, Potential Loyalists, At Risk, and Hibernating using Recency, Frequency, and Monetary scores (scale 1-5). Calculated historical Customer Lifetime Value (CLV).",
        bulletPoints: [
          "Champions (Top 6% of customers) generated 38% of total gross margin.",
          "'At Risk' cohort held $140K in lapsed annual spend with average recency > 90 days."
        ]
      },
      method: {
        title: "Power BI DAX Dashboards",
        content: "Engineered comprehensive executive dashboards in Power BI with complex DAX measures (rolling 90-day repeat purchase rate, cohort retention heatmap, and basket-size correlation matrices).",
        bulletPoints: [
          "Dynamic parameter slicing by customer segment, region, and product line.",
          "Automated weekly email report delivery to retail merchandise managers."
        ]
      },
      insight: {
        title: "Business Insights",
        content: "Cross-analyzing RFM cohorts against product demand curves identified that Champions frequently churned when their secondary re-order item experienced inventory stock-outs.",
        bulletPoints: [
          "Stock-outs in essential accessory items triggered 2.4x higher churn among high-CLV customers than price changes.",
          "Targeted win-back campaigns to 'At Risk' customers with personalized re-order discounts yielded an 18% reactivation rate."
        ]
      },
      recommendation: {
        title: "Inventory & Retention Plan",
        content: "Implemented safety stock buffer thresholds for items frequently bought by Champions, reducing stock-out occurrences by 12%. Reallocated 30% of blanket marketing budget into automated RFM lifecycle email sequences.",
        bulletPoints: [
          "Establish VIP priority fulfillment queue for Champions.",
          "Monitor cohort retention velocity monthly as a core executive KPI."
        ]
      }
    }
  },
  cardio: {
    id: "cardio",
    title: "CardioInsight-AI",
    subtitle: "Clinical CAD Prediction & Interpretability",
    tagline: "Hybrid XGBoost + Deep Learning Ensemble with SHAP explanations for cardiologists.",
    meta: "APPLIED AI · CLINICAL DECISION SUPPORT",
    stats: [
      { value: "90.5%", label: "prediction accuracy" },
      { value: "0.94", label: "ROC-AUC benchmark" },
      { value: "SHAP", label: "transparent feature audit" }
    ],
    tabs: {
      problem: {
        title: "Problem Statement",
        content: "Coronary artery disease (CAD) remains one of the leading causes of acute mortality worldwide. Early diagnostic screenings using non-invasive biomarkers are frequently plagued by high false-negative rates or non-linear feature interactions that standard scoring indices miss. Furthermore, clinicians reject 'black-box' deep learning models without verifiable individual patient feature explanations.",
        bulletPoints: [
          "Non-linear interactions between cholesterol ratios, resting blood pressure, and ST-segment depression.",
          "Need for ultra-high sensitivity/recall to prevent missed critical cardiac emergencies.",
          "Stringent clinical explainability requirement: doctors must see why a patient is flagged high-risk."
        ]
      },
      data: {
        title: "Clinical Feature Engineering",
        content: "Processed multi-center clinical cardiology datasets covering physiological, laboratory, and electrocardiogram telemetry indicators (including age, sex, chest pain type, resting BP, serum cholesterol, fasting blood sugar, resting ECG, max heart rate, and exercise-induced angina).",
        bulletPoints: [
          "Handled non-Gaussian physiological distributions using quantile transformation and robust outlier capping.",
          "Engineered composite ratios including Atherogenic Index of Plasma and Rate-Pressure Product.",
          "Validated stratified train/test folds to maintain equal CAD prevalence across demographic cohorts."
        ],
        codeSnippet: {
          language: "python",
          code: `# CardioInsight-AI Ensemble Data Preprocessing & Scaling
import numpy as np
import pandas as pd
from sklearn.preprocessing import RobustScaler

def preprocess_clinical_features(df):
    scaler = RobustScaler()
    # Engineer clinical rate-pressure product and cholesterol ratios
    df['rpp'] = df['trestbps'] * df['thalach'] / 100.0
    df['chol_per_age'] = df['chol'] / np.maximum(df['age'], 1)
    
    numerical_cols = ['age', 'trestbps', 'chol', 'thalach', 'oldpeak', 'rpp']
    df[numerical_cols] = scaler.fit_transform(df[numerical_cols])
    return df`
        }
      },
      analysis: {
        title: "Model Architecture & Hybrid Ensemble",
        content: "Constructed a soft-voting hybrid ensemble uniting a tuned gradient boosted decision tree (XGBoost) and a 4-layer Deep Neural Network with Batch Normalization, Dropout (0.3), and LeakyReLU activations.",
        bulletPoints: [
          "XGBoost excels at capturing tabular threshold boundaries (e.g. ST-depression cutoffs > 2.0).",
          "Deep Neural Network extracts subtle multi-variate interactions across systemic blood panel vitals.",
          "Soft-voting ensemble weights: 0.55 XGBoost + 0.45 DNN, maximizing calibration curve reliability."
        ]
      },
      method: {
        title: "Benchmarking & Calibration",
        content: "Evaluated across 5-fold cross validation against standalone Random Forest, Support Vector Machines (SVM), and standard Logistic Regression baselines. The hybrid ensemble reached 90.5% accuracy and 0.94 ROC-AUC.",
        bulletPoints: [
          "Sensitivity / Recall: 92.4% on high-risk coronary stenosis cases.",
          "Specificity: 88.6% with minimal false positive alerts on healthy control patients.",
          "Brier Score calibration: 0.082 indicating well-calibrated clinical risk probabilities."
        ],
        codeSnippet: {
          language: "python",
          code: `# Hybrid Soft Voting Ensemble Prediction Pipeline
from xgboost import XGBClassifier
import torch
import torch.nn as nn

class CardioEnsemble:
    def __init__(self, xgb_model, dnn_model, xgb_weight=0.55):
        self.xgb = xgb_model
        self.dnn = dnn_model
        self.w = xgb_weight
        
    def predict_risk_proba(self, X_sample):
        xgb_prob = self.xgb.predict_proba(X_sample)[:, 1]
        with torch.no_grad():
            dnn_prob = self.dnn(torch.FloatTensor(X_sample)).numpy().ravel()
        return self.w * xgb_prob + (1 - self.w) * dnn_prob`
        }
      },
      insight: {
        title: "SHAP Clinical Explainability",
        content: "Integrated SHAP (SHapley Additive exPlanations) values to output an automated patient risk summary card for each clinical evaluation. Isolated ST-depression (oldpeak), number of major vessels colored by fluoroscopy (ca), and max heart rate achieved as the top 3 global predictors.",
        bulletPoints: [
          "Physicians receive a waterfall plot showing exactly how each biomarker raised or lowered the baseline risk.",
          "Transparent explanations increased physician trust and agreement score by 68% in clinical test trials."
        ]
      },
      recommendation: {
        title: "Deployment & Clinical Workflow",
        content: "Designed the system to integrate as a triage assistant within hospital electronic health record (EHR) workflows. Patients scoring > 0.70 risk trigger an automated alert recommending immediate echocardiogram or coronary CT angiography.",
        bulletPoints: [
          "Integrate DICOM imaging telemetry for future multi-modal multimodal expansion.",
          "Ship lightweight on-premise container for HIPAA-compliant offline hospital edge inference."
        ]
      }
    }
  },
  mindease: {
    id: "mindease",
    title: "MindEase AI Conversational Platform",
    subtitle: "Transformer NLP & Empathetic Dialogue",
    tagline: "Real-time emotion classification and contextual response generation with zero latency lag.",
    meta: "NLP · TRANSFORMERS & CONVERSATIONAL AI",
    stats: [
      { value: "87%", label: "emotion detection accuracy" },
      { value: "<250ms", label: "end-to-end inference SLA" },
      { value: "Flask+Streamlit", label: "modular architecture" }
    ],
    tabs: {
      problem: {
        title: "Problem Statement",
        content: "Digital wellness and mental health support platforms often struggle with rigid, rule-based chatbots that fail to understand emotional subtleties, sarcasm, or acute distress signals in user messages. Traditional keyword matching leads to tone-deaf responses that alienate vulnerable users.",
        bulletPoints: [
          "Rule-based conversational bots misclassify 40%+ of nuanced conversational sentiments.",
          "Need for real-time sub-second inference without degrading empathetic response quality.",
          "Strict safety guardrails required to detect acute crisis signals and route to emergency resources."
        ]
      },
      data: {
        title: "NLP Preprocessing & Datasets",
        content: "Curated and preprocessed 50,000+ conversational utterances labeled across 6 primary emotional states: Joy, Sadness, Anger, Fear, Surprise, and Love. Applied tokenization, contraction expansion, and contextual embeddings.",
        bulletPoints: [
          "Hugging Face tokenizers with byte-pair encoding (BPE) for robust out-of-vocabulary handling.",
          "Class imbalance mitigated using focal loss during fine-tuning.",
          "Sanitized sensitive personally identifiable information (PII) using regex filters."
        ]
      },
      analysis: {
        title: "Transformer Fine-Tuning & Model Architecture",
        content: "Fine-tuned a DistilRoBERTa model optimized for affective sentiment analysis. Reduced model footprint by 40% via knowledge distillation while retaining 97% of full RoBERTa emotion classification accuracy.",
        bulletPoints: [
          "Quantized weights to INT8 to enable rapid CPU edge deployment.",
          "Engineered contextual prompt template selector dynamically routed by predicted emotion class."
        ],
        codeSnippet: {
          language: "python",
          code: `# MindEase Real-Time Emotion Classification Pipeline
from transformers import pipeline

emotion_classifier = pipeline(
    "text-classification",
    model="distilroberta-finetuned-emotion",
    top_k=None,
    device=-1 # CPU optimized
)

def analyze_user_utterance(text):
    results = emotion_classifier(text)[0]
    top_emotion = max(results, key=lambda x: x['score'])
    return {
        "primary_emotion": top_emotion['label'],
        "confidence": round(top_emotion['score'], 3),
        "all_scores": results
    }`
        }
      },
      method: {
        title: "Production System Architecture",
        content: "Constructed a decoupled architecture featuring a Flask REST API backend for model inference and a responsive Streamlit & React UI for real-time conversation streaming with typing indicators and mood trajectory charts.",
        bulletPoints: [
          "Asynchronous request batching delivering <250ms latency under 50 concurrent conversational threads.",
          "Session mood tracking recording emotion deltas over the course of a user check-in."
        ]
      },
      insight: {
        title: "Key Conversational Insights",
        content: "Fine-tuning on conversational dialogue yielded an 87% accuracy across mixed emotional states, outperforming standard off-the-shelf sentiment models by 22%. Users reported 3.2x higher satisfaction when responses mirrored their emotional tone with validation before advice.",
        bulletPoints: [
          "Validating the user's emotional state before offering problem-solving advice cut user drop-off by 35%.",
          "Dynamic empathy routing prevented repetitive 'canned' response fatigue."
        ]
      },
      recommendation: {
        title: "Platform Roadmap & Safety Guidelines",
        content: "Integrate continuous active learning with anonymized human-in-the-loop validation of edge-case utterances. Embed strict crisis intervention triggers with instant hotlines for self-harm or severe distress indicators.",
        bulletPoints: [
          "Deploy multi-lingual transformer layers for Hindi and regional conversational support.",
          "Integrate voice-tone analysis for audio-enabled telemedicine apps."
        ]
      }
    }
  }
};

export const INITIAL_RICE_ITEMS: RiceItem[] = [
  {
    id: "failed-debit",
    theme: "Failed Debits / Money Deducted",
    app: "PhonePe / GPay / Paytm",
    reach: 4800,
    impact: 5,
    confidence: 95,
    effort: 2,
    reasoning: "Highest severity issue causing severe customer distress and immediate churn. Bank debit occurred but merchant or recipient received nothing.",
    category: "Payment Core"
  },
  {
    id: "refund-delay",
    theme: "Refund / Reversal Status Delays",
    app: "PhonePe / GPay / Paytm",
    reach: 3900,
    impact: 4,
    confidence: 90,
    effort: 2,
    reasoning: "Users have no visibility into the 3-5 day banking settlement timeline. High ticket volume sent to customer support.",
    category: "Settlement & Support"
  },
  {
    id: "bank-down",
    theme: "Bank Server Down / Switch Failures",
    app: "All Apps",
    reach: 3200,
    impact: 4,
    confidence: 85,
    effort: 3,
    reasoning: "Intermittent bank outages cause transaction failure cascades. Requires proactive health check banner before user attempts PIN.",
    category: "Infrastructure"
  },
  {
    id: "autopay-cancel",
    theme: "Autopay & Mandate Cancellation",
    app: "PhonePe / Paytm",
    reach: 1800,
    impact: 4,
    confidence: 80,
    effort: 2,
    reasoning: "Users struggle to cancel recurring OTT or loan mandates, leading to unwanted debits and high anger ratings.",
    category: "Subscriptions"
  },
  {
    id: "qr-scan-lag",
    theme: "QR Code Scan / Camera Delay",
    app: "PhonePe / GPay",
    reach: 2400,
    impact: 3,
    confidence: 75,
    effort: 2,
    reasoning: "Low light or camera lens delay causes physical merchant checkout friction. Moderate impact on daily user satisfaction.",
    category: "UX & Scanning"
  },
  {
    id: "cashback-rewards",
    theme: "Cashback Discrepancy & Scratch Cards",
    app: "GPay / Paytm",
    reach: 2100,
    impact: 2,
    confidence: 70,
    effort: 1,
    reasoning: "Promotional disappointment ('Better luck next time' fatigue). Low financial risk, high social media complaint chatter.",
    category: "Growth & Retention"
  },
  {
    id: "otp-timeout",
    theme: "Bank OTP / SMS Timeout",
    app: "All Apps",
    reach: 1500,
    impact: 3,
    confidence: 85,
    effort: 2,
    reasoning: "Telecom delays or SMS gateway timeouts during new device registration and card linking.",
    category: "Auth & Security"
  },
  {
    id: "app-lag",
    theme: "App Freeze & Launch Latency",
    app: "Paytm / PhonePe",
    reach: 1200,
    impact: 2,
    confidence: 65,
    effort: 3,
    reasoning: "App bloat caused by ads, mini-apps, and heavy asset bundles slowing down low-end Android devices.",
    category: "Performance"
  }
];

export const SKILL_CATEGORIES = [
  {
    category: "ANALYTICS & QUERYING",
    skills: ["SQL (CTEs, Window Functions, Joins)", "Python (Pandas, NumPy, Scikit-learn)", "PostgreSQL", "Data Cleaning & EDA", "Statistical Analysis"]
  },
  {
    category: "BUSINESS INTELLIGENCE & REPORTING",
    skills: ["Power BI", "DAX Measures", "Executive Dashboards", "Power Query", "Excel (XLOOKUP, Pivot Tables, Automation)", "Data Storytelling"]
  },
  {
    category: "PRODUCT & DECISION ANALYTICS",
    skills: ["RICE / ICE Prioritization", "Customer Feedback Mining", "Cohort & Retention Analysis (RFM, CLV)", "KPI Definition", "A/B Testing & Funnels"]
  },
  {
    category: "DATA ENGINEERING & CLOUD",
    skills: ["Microsoft Azure (Event Hub, Synapse SQL)", "Apache PySpark", "Databricks", "Bronze-Silver-Gold Architecture", "Star-Schema Modeling", "ETL Pipelines"]
  },
  {
    category: "AI / ML & EXPLAINABILITY",
    skills: ["XGBoost", "TensorFlow & Deep Learning", "SHAP (Explainable AI)", "NLP (TF-IDF, KMeans, VADER, Transformers)", "Hugging Face"]
  },
  {
    category: "DEVELOPMENT & WORKFLOW TOOLS",
    skills: ["Git & GitHub", "Streamlit", "Flask", "Docker", "Jupyter Notebooks", "REST APIs"]
  }
];

export const CERTIFICATIONS = [
  {
    title: "Oracle Agentic AI Foundations Associate",
    issuer: "Oracle",
    year: "2026",
    badge: "AI & Autonomous Systems"
  },
  {
    title: "Databricks Fundamentals Accreditation",
    issuer: "Databricks Academy",
    year: "2025",
    badge: "Lakehouse & Big Data"
  },
  {
    title: "Introduction to Data Analytics",
    issuer: "IBM (Coursera)",
    year: "2024",
    badge: "Analytics Foundations"
  },
  {
    title: "SQL Certification",
    issuer: "HackerRank",
    year: "2024",
    badge: "Complex Querying & Joins"
  },
  {
    title: "Data Visualization & Analytics",
    issuer: "Vodafone Intelligent Solutions (VOIS)",
    year: "2025",
    badge: "Enterprise BI & KPIs"
  }
];
