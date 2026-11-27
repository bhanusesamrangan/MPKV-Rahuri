'use client';

/**
 * Utility to print ONLY a designated DOM element (table or list)
 * instead of printing the entire web page.
 * Creates an isolated, styled print context via a hidden iframe.
 */
export const printElement = (elementId: string, pageTitle: string = 'Mahatma Phule Krishi Vidyapeeth, Rahuri') => {
  if (typeof window === 'undefined') return;

  const targetElement = document.getElementById(elementId);
  if (!targetElement) {
    console.warn(`Print element with id "${elementId}" not found. Falling back to default window.print()`);
    window.print();
    return;
  }

  // Create an invisible iframe to isolate print contents
  const iframe = document.createElement('iframe');
  iframe.setAttribute('style', 'position:fixed;right:0;bottom:0;width:0;height:0;border:0;visibility:hidden;');
  document.body.appendChild(iframe);

  const doc = iframe.contentWindow?.document;
  if (!doc) {
    window.print();
    return;
  }

  // Collect all active stylesheets and inline style blocks
  let styleTags = '';
  const styles = document.querySelectorAll('style, link[rel="stylesheet"]');
  styles.forEach((s) => {
    styleTags += s.outerHTML;
  });

  const currentDate = new Date().toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  });

  const isMr = typeof document !== 'undefined' ? document.documentElement.lang !== 'en' : true;
  const headerTitle = isMr ? 'महात्मा फुले कृषि विद्यापीठ, राहुरी' : 'Mahatma Phule Krishi Vidyapeeth, Rahuri';
  const officialTag = isMr ? 'अधिकृत विद्यापीठ पोर्टल माहिती' : 'Official University Portal Document';
  const printedLabel = isMr ? 'मुद्रित दिनांक' : 'Printed on';
  const footerAddr = isMr
    ? 'महात्मा फुले कृषि विद्यापीठ, राहुरी - ४१३७२२ जि. अहिल्यानगर (महाराष्ट्र)'
    : 'Mahatma Phule Krishi Vidyapeeth, Rahuri - 413722 Dist. Ahilyanagar (MS)';

  doc.open();
  doc.write(`
    <!DOCTYPE html>
    <html lang="${isMr ? 'mr' : 'en'}">
      <head>
        <meta charset="utf-8" />
        <title>${pageTitle}</title>
        ${styleTags}
        <style>
          @page {
            size: A4 auto;
            margin: 12mm 10mm;
          }
          *, *::before, *::after {
            box-sizing: border-box;
          }
          body {
            background-color: #ffffff !important;
            color: #111827 !important;
            padding: 12px !important;
            margin: 0 !important;
            font-family: 'Poppins', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif !important;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
          /* Hide interactive and non-printable elements */
          .no-print, button, input, select {
            display: none !important;
          }
          /* Clean, crisp table print layout */
          table {
            width: 100% !important;
            border-collapse: collapse !important;
            margin-top: 10px !important;
            page-break-inside: auto;
          }
          thead {
            display: table-header-group !important;
          }
          tr {
            page-break-inside: avoid !important;
            page-break-after: auto;
          }
          th, td {
            border: 1px solid #d1d5db !important;
            padding: 7px 10px !important;
            font-size: 11px !important;
            color: #1f2937 !important;
            text-align: left;
          }
          th {
            background-color: #f3f4f6 !important;
            font-weight: 700 !important;
          }
          /* Card grid print layout */
          .grid {
            display: grid !important;
            gap: 12px !important;
          }
          .grid > div {
            border: 1px solid #e5e7eb !important;
            border-radius: 12px !important;
            padding: 12px !important;
            break-inside: avoid !important;
            page-break-inside: avoid !important;
            box-shadow: none !important;
          }
          img {
            max-width: 100% !important;
            height: auto !important;
          }
          /* Official Institutional Header on Printout */
          .print-doc-header {
            display: flex;
            align-items: flex-start;
            justify-content: space-between;
            border-bottom: 2.5px solid #047857;
            padding-bottom: 10px;
            margin-bottom: 16px;
          }
          .print-doc-header h1 {
            margin: 0;
            font-size: 17px;
            color: #047857;
            font-weight: 800;
            letter-spacing: -0.01em;
          }
          .print-doc-header p {
            margin: 3px 0 0 0;
            font-size: 12px;
            color: #374151;
            font-weight: 600;
          }
          .print-doc-header .meta-right {
            text-align: right;
            font-size: 10px;
            color: #6b7280;
            line-height: 1.4;
          }
          /* Official Institutional Footer on Printout */
          .print-doc-footer {
            margin-top: 24px;
            border-top: 1px solid #e5e7eb;
            padding-top: 8px;
            font-size: 10px;
            color: #6b7280;
            display: flex;
            justify-content: space-between;
            align-items: center;
          }
        </style>
      </head>
      <body>
        <div class="print-doc-header">
          <div>
            <h1>${headerTitle}</h1>
            <p>${pageTitle}</p>
          </div>
          <div class="meta-right">
            <span style="font-weight: 600; color: #047857;">${officialTag}</span><br />
            <span>${printedLabel}: ${currentDate}</span>
          </div>
        </div>
        <main>
          ${targetElement.innerHTML}
        </main>
        <div class="print-doc-footer">
          <span>${footerAddr}</span>
          <span>https://mpkv.ac.in</span>
        </div>
      </body>
    </html>
  `);
  doc.close();

  iframe.contentWindow?.focus();
  setTimeout(() => {
    try {
      iframe.contentWindow?.print();
    } catch (e) {
      console.error('Print execution failed:', e);
    }
    // Remove the temporary iframe after printing dialog closes
    setTimeout(() => {
      if (document.body.contains(iframe)) {
        document.body.removeChild(iframe);
      }
    }, 1500);
  }, 350);
};
