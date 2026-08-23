import jsPDF from 'jspdf';
import { ResumeRole } from '../types';
import { RESUME_ROLES, PERSONAL_INFO } from '../data/portfolioData';

export function generateResumePDF(role: ResumeRole) {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'pt',
    format: 'letter'
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 40;
  const contentWidth = pageWidth - margin * 2;
  let y = 45;

  // Header - Name
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(20);
  doc.setTextColor(20, 25, 35);
  doc.text(PERSONAL_INFO.name.toUpperCase(), pageWidth / 2, y, { align: 'center' });
  y += 18;

  // Header - Title
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(166, 106, 18); // Accent color
  const headline = `${role.title} | ${role.subtitle}`;
  doc.text(headline, pageWidth / 2, y, { align: 'center' });
  y += 15;

  // Header - Contact Info
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(80, 85, 95);
  const contactText = `${PERSONAL_INFO.location} | ${PERSONAL_INFO.phone} | ${PERSONAL_INFO.email}`;
  doc.text(contactText, pageWidth / 2, y, { align: 'center' });
  y += 12;

  const linksText = `LinkedIn: linkedin.com/in/suvam-priyaranjan-sahoo-18b7412bb | GitHub: github.com/suvampriyaranjansahoo`;
  doc.text(linksText, pageWidth / 2, y, { align: 'center' });
  y += 14;

  // Divider
  doc.setDrawColor(210, 215, 225);
  doc.setLineWidth(0.8);
  doc.line(margin, y, pageWidth - margin, y);
  y += 16;

  // Section: PROFESSIONAL SUMMARY
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10.5);
  doc.setTextColor(20, 25, 35);
  doc.text('PROFESSIONAL SUMMARY', margin, y);
  y += 6;
  doc.setDrawColor(166, 106, 18);
  doc.setLineWidth(1.2);
  doc.line(margin, y, margin + 140, y);
  y += 12;

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(50, 55, 65);
  const summaryLines = doc.splitTextToSize(role.summary, contentWidth);
  doc.text(summaryLines, margin, y);
  y += summaryLines.length * 11 + 8;

  // Section: TECHNICAL & CORE SKILLS
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10.5);
  doc.setTextColor(20, 25, 35);
  doc.text('TECHNICAL & CORE SKILLS', margin, y);
  y += 6;
  doc.setDrawColor(166, 106, 18);
  doc.setLineWidth(1.2);
  doc.line(margin, y, margin + 150, y);
  y += 12;

  role.focusSkills.forEach((skillGroup) => {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8.8);
    doc.setTextColor(30, 35, 45);
    const catText = `${skillGroup.category}: `;
    const catWidth = doc.getTextWidth(catText);
    doc.text(catText, margin, y);

    doc.setFont('helvetica', 'normal');
    doc.setTextColor(70, 75, 85);
    const itemLines = doc.splitTextToSize(skillGroup.items, contentWidth - catWidth);
    doc.text(itemLines, margin + catWidth, y);
    y += itemLines.length * 10.5 + 2;
  });
  y += 6;

  // Section: EXPERIENCE
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10.5);
  doc.setTextColor(20, 25, 35);
  doc.text('EXPERIENCE', margin, y);
  y += 6;
  doc.setDrawColor(166, 106, 18);
  doc.setLineWidth(1.2);
  doc.line(margin, y, margin + 80, y);
  y += 12;

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9.5);
  doc.setTextColor(20, 25, 35);
  doc.text('Data Analyst Intern', margin, y);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(90, 95, 105);
  doc.text('Vodafone Intelligent Solutions (VOIS) — Remote', margin + 110, y);
  doc.text('Sep 2025 – Oct 2025', pageWidth - margin, y, { align: 'right' });
  y += 12;

  const expBullets = [
    'Cleaned and validated 50,000+ business records using SQL and Excel, applying rigorous validation checks that improved reporting accuracy by 35%.',
    'Automated Power BI dashboards and Excel workflows using DAX and Power Query, cutting manual reporting turnaround by 40%.',
    'Built churn-analysis KPI dashboards in Power BI feeding a cross-functional initiative that cut customer churn by 5%.'
  ];

  expBullets.forEach((bullet) => {
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(166, 106, 18);
    doc.text('•', margin + 4, y);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(50, 55, 65);
    doc.setFontSize(8.8);
    const bulletLines = doc.splitTextToSize(bullet, contentWidth - 16);
    doc.text(bulletLines, margin + 14, y);
    y += bulletLines.length * 10.5 + 2;
  });
  y += 6;

  // Section: KEY PROJECTS
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10.5);
  doc.setTextColor(20, 25, 35);
  doc.text('KEY PROJECTS', margin, y);
  y += 6;
  doc.setDrawColor(166, 106, 18);
  doc.setLineWidth(1.2);
  doc.line(margin, y, margin + 90, y);
  y += 12;

  role.topBullets.forEach((bullet) => {
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(166, 106, 18);
    doc.text('•', margin + 4, y);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(50, 55, 65);
    doc.setFontSize(8.8);
    const bulletLines = doc.splitTextToSize(bullet, contentWidth - 16);
    doc.text(bulletLines, margin + 14, y);
    y += bulletLines.length * 10.5 + 2;
  });
  y += 6;

  // Section: EDUCATION
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10.5);
  doc.setTextColor(20, 25, 35);
  doc.text('EDUCATION', margin, y);
  y += 6;
  doc.setDrawColor(166, 106, 18);
  doc.setLineWidth(1.2);
  doc.line(margin, y, margin + 80, y);
  y += 12;

  // B.Tech
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(20, 25, 35);
  doc.text(PERSONAL_INFO.education.university, margin, y);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(90, 95, 105);
  doc.text(PERSONAL_INFO.education.period, pageWidth - margin, y, { align: 'right' });
  y += 10.5;
  doc.text(`${PERSONAL_INFO.education.degree} — CGPA: ${PERSONAL_INFO.education.cgpa}`, margin, y);
  y += 11;

  // 12th & 10th Schooling
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(20, 25, 35);
  doc.text(`${PERSONAL_INFO.education.higherSecondary.institution}, ${PERSONAL_INFO.education.higherSecondary.location}`, margin, y);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(90, 95, 105);
  doc.text(PERSONAL_INFO.education.higherSecondary.year, pageWidth - margin, y, { align: 'right' });
  y += 10;
  doc.text(`${PERSONAL_INFO.education.higherSecondary.qualification} — Score: ${PERSONAL_INFO.education.higherSecondary.score}`, margin, y);
  y += 11;

  doc.setFont('helvetica', 'bold');
  doc.setTextColor(20, 25, 35);
  doc.text(`${PERSONAL_INFO.education.secondary.institution}, ${PERSONAL_INFO.education.secondary.location}`, margin, y);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(90, 95, 105);
  doc.text(PERSONAL_INFO.education.secondary.year, pageWidth - margin, y, { align: 'right' });
  y += 10;
  doc.text(`${PERSONAL_INFO.education.secondary.qualification} — Score: ${PERSONAL_INFO.education.secondary.score}`, margin, y);
  y += 14;

  // Section: CERTIFICATIONS
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10.5);
  doc.setTextColor(20, 25, 35);
  doc.text('CERTIFICATIONS', margin, y);
  y += 6;
  doc.setDrawColor(166, 106, 18);
  doc.setLineWidth(1.2);
  doc.line(margin, y, margin + 100, y);
  y += 11;

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(50, 55, 65);
  const certsText = "Oracle Agentic AI Foundations Associate (2026) | Databricks Fundamentals Accreditation | Introduction to Data Analytics — IBM (Coursera) | SQL — HackerRank | Data Visualization — VOIS";
  const certLines = doc.splitTextToSize(certsText, contentWidth);
  doc.text(certLines, margin, y);

  // Save / Download PDF
  doc.save(role.pdfFileName);
}

export function downloadResumeByRoleId(roleId: string) {
  const role = RESUME_ROLES.find(r => r.id === roleId) || RESUME_ROLES[1];
  generateResumePDF(role);
}

export function generateFullPortfolioPDF() {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'pt',
    format: 'letter'
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 40;
  const contentWidth = pageWidth - margin * 2;
  let y = 42;

  const addPageHeader = (pageNumber: number, totalPages: number) => {
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.5);
    doc.setTextColor(130, 135, 145);
    doc.text(`SUVAM PRIYARANJAN SAHOO — MASTER PORTFOLIO DOSSIER`, margin, 24);
    doc.text(`Page ${pageNumber} of ${totalPages}`, pageWidth - margin, 24, { align: 'right' });
    doc.setDrawColor(220, 225, 232);
    doc.setLineWidth(0.5);
    doc.line(margin, 28, pageWidth - margin, 28);
  };

  const addPageFooter = (pageNumber: number, totalPages: number) => {
    doc.setDrawColor(220, 225, 232);
    doc.setLineWidth(0.5);
    doc.line(margin, pageHeight - 26, pageWidth - margin, pageHeight - 26);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.5);
    doc.setTextColor(130, 135, 145);
    doc.text(`Confidential & Verified Candidate Dossier · Data → Insight → Decision → Impact`, margin, pageHeight - 16);
    doc.text(`github.com/suvampriyaranjansahoo · linkedin.com/in/suvam-priyaranjan-sahoo-18b7412bb`, pageWidth - margin, pageHeight - 16, { align: 'right' });
  };

  // ─── PAGE 1: EXECUTIVE DOSSIER, ENTERPRISE TRACK RECORD & ROLE SPECIALIZATIONS ───
  addPageHeader(1, 2);

  // Title / Name Header
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(19);
  doc.setTextColor(16, 19, 24);
  doc.text(PERSONAL_INFO.name.toUpperCase(), pageWidth / 2, y, { align: 'center' });
  y += 16;

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10.5);
  doc.setTextColor(166, 106, 18);
  doc.text("MASTER PORTFOLIO · DATA, PRODUCT & BUSINESS ANALYTICS", pageWidth / 2, y, { align: 'center' });
  y += 13;

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(70, 75, 85);
  doc.text(`${PERSONAL_INFO.location} | ${PERSONAL_INFO.phone} | ${PERSONAL_INFO.email}`, pageWidth / 2, y, { align: 'center' });
  y += 11;
  doc.text(`LinkedIn: linkedin.com/in/suvam-priyaranjan-sahoo-18b7412bb | GitHub: github.com/suvampriyaranjansahoo`, pageWidth / 2, y, { align: 'center' });
  y += 13;

  // Horizontal Rule
  doc.setDrawColor(210, 215, 225);
  doc.setLineWidth(0.8);
  doc.line(margin, y, pageWidth - margin, y);
  y += 14;

  // Executive Overview
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(16, 19, 24);
  doc.text('EXECUTIVE PROFILE & VALUE PROPOSITION', margin, y);
  y += 5;
  doc.setDrawColor(166, 106, 18);
  doc.setLineWidth(1.2);
  doc.line(margin, y, margin + 210, y);
  y += 11;

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(50, 55, 65);
  const masterSummary = "Final-year Computer Science Engineering graduate combining quantitative distinction with hands-on enterprise analytics experience. Proven ability to bridge raw data engineering, statistical modeling, and product prioritization into tangible business outcomes. Proven enterprise track record at Vodafone Intelligent Solutions (VOIS) driving a 5% churn reduction, 35% reporting-accuracy improvement across 50,000+ business records, and cutting reporting turnarounds by 40% via automated DAX workflows.";
  const summaryLines = doc.splitTextToSize(masterSummary, contentWidth);
  doc.text(summaryLines, margin, y);
  y += summaryLines.length * 10.5 + 8;

  // Verified Quantitative Metrics Matrix (4 Key Numbers)
  doc.setFillColor(248, 246, 242);
  doc.roundedRect(margin, y, contentWidth, 34, 4, 4, 'F');
  doc.setDrawColor(220, 212, 200);
  doc.setLineWidth(0.5);
  doc.roundedRect(margin, y, contentWidth, 34, 4, 4, 'D');

  const metricBoxWidth = contentWidth / 4;
  const keyStats = [
    { num: '50,000+', lbl: 'Business Records Validated' },
    { num: '-40%', lbl: 'Turnaround Time via DAX' },
    { num: '-5%', lbl: 'Customer Churn Reduction' },
    { num: '0.857', lbl: 'XGBoost ROC-AUC Benchmark' }
  ];

  keyStats.forEach((st, i) => {
    const boxX = margin + i * metricBoxWidth + metricBoxWidth / 2;
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10.5);
    doc.setTextColor(166, 106, 18);
    doc.text(st.num, boxX, y + 14, { align: 'center' });
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(6.8);
    doc.setTextColor(80, 85, 95);
    doc.text(st.lbl, boxX, y + 26, { align: 'center' });
  });
  y += 42;

  // Enterprise Experience Section
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(16, 19, 24);
  doc.text('ENTERPRISE WORK EXPERIENCE', margin, y);
  y += 5;
  doc.setDrawColor(166, 106, 18);
  doc.setLineWidth(1.2);
  doc.line(margin, y, margin + 160, y);
  y += 11;

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9.2);
  doc.setTextColor(16, 19, 24);
  doc.text('Data Analyst Intern', margin, y);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.2);
  doc.setTextColor(80, 85, 95);
  doc.text('Vodafone Intelligent Solutions (VOIS) — Remote', margin + 105, y);
  doc.text('Sep 2025 – Oct 2025', pageWidth - margin, y, { align: 'right' });
  y += 11;

  const expItems = [
    "Cleaned & validated 50,000+ telecommunications records using SQL & Excel, implementing strict validation rules (+35% accuracy).",
    "Automated Power BI dashboards & reporting models via DAX and Power Query, slashing recurring reporting turnaround by 40%.",
    "Constructed retention KPI dashboards identifying early churn signals, directly feeding a cross-functional initiative cutting churn by 5%."
  ];

  expItems.forEach(bullet => {
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(166, 106, 18);
    doc.text('•', margin + 3, y);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(50, 55, 65);
    doc.setFontSize(8.2);
    const bLines = doc.splitTextToSize(bullet, contentWidth - 14);
    doc.text(bLines, margin + 12, y);
    y += bLines.length * 10 + 2;
  });
  y += 5;

  // Role Specialization Matrix (All 5 Target Profiles Bundled)
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(16, 19, 24);
  doc.text('ROLE-SPECIFIC COMPETENCIES & KEY ACHIEVEMENTS', margin, y);
  y += 5;
  doc.setDrawColor(166, 106, 18);
  doc.setLineWidth(1.2);
  doc.line(margin, y, margin + 250, y);
  y += 11;

  RESUME_ROLES.forEach(r => {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8.5);
    doc.setTextColor(16, 19, 24);
    doc.text(`${r.title} (${r.subtitle}):`, margin, y);
    
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(60, 65, 75);
    const topHighlight = r.topBullets[0] || '';
    const highlightLines = doc.splitTextToSize(`– ${topHighlight}`, contentWidth - 12);
    doc.text(highlightLines, margin + 8, y + 9.5);
    y += 9.5 + highlightLines.length * 9 + 3;
  });

  addPageFooter(1, 2);

  // ─── PAGE 2: FLAGSHIP PROJECTS, TECHNICAL SKILLS, EDUCATION & CERTIFICATIONS ───
  doc.addPage();
  addPageHeader(2, 2);
  y = 42;

  // Key Flagship Projects
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(16, 19, 24);
  doc.text('KEY ANALYTICS & ENGINEERING PROJECTS', margin, y);
  y += 5;
  doc.setDrawColor(166, 106, 18);
  doc.setLineWidth(1.2);
  doc.line(margin, y, margin + 220, y);
  y += 11;

  const keyProjects = [
    {
      title: "PriorityPe — UPI RICE Prioritization Engine",
      tech: "Python, NLP (TF-IDF, KMeans), Streamlit, RICE Framework",
      desc: "Scraped 6,000 Play Store reviews across PhonePe, Google Pay, and Paytm; extracted 8 core complaint themes and ranked product roadmap using dynamically weighted RICE scoring matrix."
    },
    {
      title: "Financial Analytics & Bankruptcy Risk Suite",
      tech: "SQL, XGBoost, SHAP, Power BI, Python",
      desc: "Analyzed 78,682 corporate filings (1999–2018) across 18 financial ratios. Benchmarked 6 ML algorithms with XGBoost reaching 0.857 ROC-AUC and generated SHAP explainability waterfall plots for credit risk committees."
    },
    {
      title: "MediFlowRT — Real-Time Healthcare Telemetry",
      tech: "Azure Event Hub, Databricks, PySpark, Synapse SQL, Power BI",
      desc: "Engineered streaming Bronze-Silver-Gold ETL pipeline and star-schema warehouse, boosting operational query speed by 25% and bed allocation efficiency by 15%."
    },
    {
      title: "Customer Behavior & Retention Analytics",
      tech: "SQL, RFM Segmentation, CLV Modeling, Power BI DAX",
      desc: "Audited 10,000+ retail transactions with 99.9% data integrity, established 5 customer behavioral cohorts, and reduced out-of-stock occurrences by 12% via inventory buffer logic."
    },
    {
      title: "CardioInsight-AI & MindEase Conversational NLP",
      tech: "TensorFlow, XGBoost Ensemble, SHAP, Hugging Face Transformers",
      desc: "Built clinical ensemble model achieving 90.5% accuracy / 0.94 ROC-AUC with SHAP transparency, and deployed real-time emotion detection NLP pipeline with 87% accuracy."
    }
  ];

  keyProjects.forEach(proj => {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8.8);
    doc.setTextColor(16, 19, 24);
    doc.text(proj.title, margin, y);
    
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.8);
    doc.setTextColor(166, 106, 18);
    doc.text(`[${proj.tech}]`, pageWidth - margin, y, { align: 'right' });
    y += 9.5;

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(60, 65, 75);
    const pLines = doc.splitTextToSize(proj.desc, contentWidth - 8);
    doc.text(pLines, margin + 6, y);
    y += pLines.length * 9.5 + 4;
  });
  y += 4;

  // Technical Toolbox & Competencies
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(16, 19, 24);
  doc.text('TECHNICAL SKILLS & DOMAIN EXPERTISE', margin, y);
  y += 5;
  doc.setDrawColor(166, 106, 18);
  doc.setLineWidth(1.2);
  doc.line(margin, y, margin + 200, y);
  y += 11;

  const skillLines = [
    { cat: "Programming & Querying", items: "SQL (CTEs, Window Functions, Joins), Python (Pandas, NumPy, Scikit-learn), Java, C, C++, PostgreSQL" },
    { cat: "BI & Dashboarding", items: "Power BI, DAX Measures, Power Query, Advanced Excel (XLOOKUP, Pivot Tables, Automation), Data Storytelling" },
    { cat: "Product & Strategy", items: "RICE / ICE Framework, Customer Feedback Mining, RFM & CLV Cohort Retention, KPI Definition, Funnel Analytics" },
    { cat: "Cloud & Data Engineering", items: "Microsoft Azure (Event Hub, Synapse SQL), Apache PySpark, Databricks, Bronze-Silver-Gold Architecture, Star-Schema" },
    { cat: "AI/ML & Explainability", items: "XGBoost, TensorFlow, SHAP (Explainable AI), NLP (TF-IDF, KMeans, Transformers), Streamlit, Flask, Docker" }
  ];

  skillLines.forEach(sk => {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8.2);
    doc.setTextColor(20, 25, 35);
    const catLabel = `${sk.cat}: `;
    const catW = doc.getTextWidth(catLabel);
    doc.text(catLabel, margin, y);

    doc.setFont('helvetica', 'normal');
    doc.setTextColor(60, 65, 75);
    doc.setFontSize(8);
    const itemLines = doc.splitTextToSize(sk.items, contentWidth - catW);
    doc.text(itemLines, margin + catW, y);
    y += itemLines.length * 9.5 + 1.5;
  });
  y += 6;

  // Education Section
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(16, 19, 24);
  doc.text('SCHOLASTIC FOUNDATION & EDUCATION', margin, y);
  y += 5;
  doc.setDrawColor(166, 106, 18);
  doc.setLineWidth(1.2);
  doc.line(margin, y, margin + 210, y);
  y += 11;

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.8);
  doc.setTextColor(16, 19, 24);
  doc.text(PERSONAL_INFO.education.university, margin, y);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(80, 85, 95);
  doc.text(PERSONAL_INFO.education.period, pageWidth - margin, y, { align: 'right' });
  y += 9.5;
  doc.text(`${PERSONAL_INFO.education.degree} — Cumulative CGPA: ${PERSONAL_INFO.education.cgpa}`, margin, y);
  y += 10;

  doc.text(`12th Science (PCM): ${PERSONAL_INFO.education.higherSecondary.institution} — ${PERSONAL_INFO.education.higherSecondary.score} (${PERSONAL_INFO.education.higherSecondary.year}) | 10th: ${PERSONAL_INFO.education.secondary.score} (${PERSONAL_INFO.education.secondary.year})`, margin, y);
  y += 14;

  // Industry Certifications
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(16, 19, 24);
  doc.text('VERIFIED INDUSTRY CERTIFICATIONS', margin, y);
  y += 5;
  doc.setDrawColor(166, 106, 18);
  doc.setLineWidth(1.2);
  doc.line(margin, y, margin + 190, y);
  y += 11;

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(50, 55, 65);
  const certList = "• Oracle Agentic AI Foundations Associate (2026)  • Databricks Fundamentals Accreditation (2025)\n• Introduction to Data Analytics — IBM (Coursera)  • SQL Certification — HackerRank  • Enterprise Data Visualization — VOIS";
  const cLines = doc.splitTextToSize(certList, contentWidth);
  doc.text(cLines, margin, y);

  addPageFooter(2, 2);

  // Save the master dossier PDF
  doc.save('Suvam_Priyaranjan_Sahoo_Full_Portfolio.pdf');
}

