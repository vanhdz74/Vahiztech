const fs = require('fs');
const path = require('path');
const { marked } = require('marked');
const { execSync } = require('child_process');

const filesToConvert = [
  {
    input: 'KE_HOACH_GIAI_DOAN_DU_AN.md',
    output: 'KE_HOACH_GIAI_DOAN_DU_AN.pdf',
    title: 'Kế Hoạch & Lộ Trình Phát Triển Dự Án Vahiztech'
  },
  {
    input: 'HUONG_DAN_KY_THUAT_VA_TRIEN_KHAI.md',
    output: 'HUONG_DAN_KY_THUAT_VA_TRIEN_KHAI.pdf',
    title: 'Hướng Dẫn Kỹ Thuật & Đặc Tả Triển Khai Vahiztech'
  },
  {
    input: 'docs/architecture/PHASE_1_ARCHITECTURE_AND_DATA_MODEL.md',
    output: 'docs/architecture/PHASE_1_ARCHITECTURE_AND_DATA_MODEL.pdf',
    title: 'Đặc Tả Kiến Trúc & Mô Hình Dữ Liệu Multi-Tenant (Phase 1)'
  },
  {
    input: 'docs/standards/development-standards.md',
    output: 'docs/standards/development-standards.pdf',
    title: 'Quy Chuẩn Phát Triển & Quy Trình Kỹ Thuật Vahiztech'
  },
  {
    input: 'README.md',
    output: 'README.pdf',
    title: 'Hệ Thống Định Danh Tập Trung (IAM & SSO) Vahiztech'
  }
];

function generateHtml(markdownContent, title) {
  let htmlContent = marked.parse(markdownContent);

  // Chuyển đổi các khối mã mermaid thành thẻ div.mermaid để mermaid.js tự render
  htmlContent = htmlContent.replace(/<pre><code class="language-mermaid">([\s\S]*?)<\/code><\/pre>/g, (match, p1) => {
    const unescaped = p1
      .replace(/&amp;/g, '&')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'");
    return `<div class="mermaid">${unescaped}</div>`;
  });

  return `<!DOCTYPE html>
<html lang="vi">
<head>
<meta charset="utf-8">
<title>${title}</title>
<style>
  @page {
    size: A4;
    margin: 16mm 14mm 16mm 14mm;
  }
  *, *:before, *:after {
    box-sizing: border-box;
  }
  body {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif;
    font-size: 10.5pt;
    line-height: 1.65;
    color: #1f2328;
    background: #ffffff;
    margin: 0;
    padding: 0;
  }
  h1 {
    font-size: 20pt;
    font-weight: 700;
    border-bottom: 2.5px solid #0969da;
    padding-bottom: 10px;
    margin-top: 0;
    margin-bottom: 18px;
    color: #0969da;
    page-break-after: avoid;
  }
  h2 {
    font-size: 14pt;
    font-weight: 600;
    border-bottom: 1px solid #d0d7de;
    padding-bottom: 6px;
    margin-top: 24px;
    margin-bottom: 14px;
    color: #1f2328;
    page-break-after: avoid;
  }
  h3 {
    font-size: 12pt;
    font-weight: 600;
    margin-top: 18px;
    margin-bottom: 10px;
    color: #24292f;
    page-break-after: avoid;
  }
  h4 {
    font-size: 11pt;
    font-weight: 600;
    margin-top: 14px;
    margin-bottom: 8px;
    page-break-after: avoid;
  }
  p, ul, ol {
    margin-top: 6px;
    margin-bottom: 10px;
  }
  li {
    margin-bottom: 4px;
  }
  code {
    font-family: "JetBrains Mono", Consolas, "Liberation Mono", Courier, monospace;
    font-size: 9pt;
    background-color: #f6f8fa;
    padding: 2px 5px;
    border-radius: 4px;
    border: 1px solid #d8dee4;
    color: #cf222e;
  }
  pre {
    background-color: #f6f8fa;
    border: 1px solid #d0d7de;
    border-radius: 6px;
    padding: 12px;
    font-size: 9pt;
    line-height: 1.5;
    overflow-x: auto;
    page-break-inside: avoid;
    margin: 12px 0;
  }
  pre code {
    background: transparent;
    padding: 0;
    border: none;
    color: #1f2328;
  }
  table {
    border-collapse: collapse;
    width: 100%;
    margin: 16px 0;
    page-break-inside: avoid;
    font-size: 9.5pt;
  }
  th, td {
    border: 1px solid #d0d7de;
    padding: 7px 10px;
    text-align: left;
    vertical-align: top;
  }
  th {
    background-color: #f6f8fa;
    font-weight: 600;
    color: #24292f;
  }
  tr:nth-child(even) td {
    background-color: #fbfcfd;
  }
  blockquote {
    margin: 12px 0;
    padding: 8px 16px;
    color: #57606a;
    border-left: 4px solid #0969da;
    background-color: #f6f8fa;
    border-radius: 0 6px 6px 0;
    page-break-inside: avoid;
  }
  hr {
    height: 1.5px;
    background-color: #d0d7de;
    border: none;
    margin: 22px 0;
  }
  .mermaid {
    text-align: center;
    margin: 20px 0;
    page-break-inside: avoid;
  }
  svg {
    max-width: 100% !important;
    height: auto !important;
  }
  a {
    color: #0969da;
    text-decoration: none;
  }
  img {
    max-width: 100%;
  }
</style>
<script src="file:///tmp/mermaid.min.js"></script>
<script>
  mermaid.initialize({
    startOnLoad: true,
    theme: "neutral",
    securityLevel: "loose",
    flowchart: { useMaxWidth: true, htmlLabels: true },
    er: { useMaxWidth: true }
  });
</script>
</head>
<body>
${htmlContent}
</body>
</html>`;
}

async function convertAll() {
  console.log("=== BẮT ĐẦU CHUYỂN ĐỔI CÁC FILE MARKDOWN SANG PDF ===");
  
  for (const item of filesToConvert) {
    const inputPath = path.resolve(__dirname, '..', item.input);
    const outputPath = path.resolve(__dirname, '..', item.output);
    
    if (!fs.existsSync(inputPath)) {
      console.warn(`[CẢNH BÁO] Không tìm thấy file: ${inputPath}`);
      continue;
    }

    console.log(`\nĐang xử lý: ${item.input} -> ${item.output}`);
    const mdContent = fs.readFileSync(inputPath, 'utf8');
    const htmlContent = generateHtml(mdContent, item.title);
    
    const tempHtmlPath = path.join('/tmp', `temp_${path.basename(item.input, '.md')}.html`);
    fs.writeFileSync(tempHtmlPath, htmlContent, 'utf8');
    
    // Đảm bảo thư mục đầu ra tồn tại
    const outDir = path.dirname(outputPath);
    if (!fs.existsSync(outDir)) {
      fs.mkdirSync(outDir, { recursive: true });
    }

    const chromeCmd = `google-chrome --headless=new --disable-gpu --no-sandbox --allow-file-access-from-files --run-all-compositor-stages-before-draw --virtual-time-budget=4000 --print-to-pdf="${outputPath}" "file://${tempHtmlPath}"`;
    
    try {
      execSync(chromeCmd, { stdio: 'pipe' });
      const stats = fs.statSync(outputPath);
      console.log(`✅ Hoàn thành: ${item.output} (${(stats.size / 1024).toFixed(1)} KB)`);
    } catch (err) {
      console.error(`❌ Lỗi khi xuất PDF cho ${item.input}:`, err.message);
    } finally {
      if (fs.existsSync(tempHtmlPath)) {
        fs.unlinkSync(tempHtmlPath);
      }
    }
  }

  console.log("\n=== TẤT CẢ FILE ĐÃ ĐƯỢC CHUYỂN ĐỔI SANG PDF THÀNH CÔNG ===");
}

convertAll();
