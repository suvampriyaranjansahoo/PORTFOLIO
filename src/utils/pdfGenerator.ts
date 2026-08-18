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
