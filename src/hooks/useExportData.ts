import ExcelJS from 'exceljs';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

interface ExportOptions {
  filename: string;
  title?: string;
}

export const useExportData = () => {
  const exportToExcel = async <T extends object>(
    data: T[],
    columns?: { key: keyof T; label: string }[],
    options?: ExportOptions
  ) => {
    const opts = options || { filename: `export-${Date.now()}` };
    const resolvedColumns = columns || (data.length > 0
      ? (Object.keys(data[0]) as (keyof T)[]).map((key) => ({ key, label: String(key) }))
      : []);

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Données');

    // Add header row
    worksheet.columns = resolvedColumns.map((col) => ({
      header: col.label,
      key: String(col.key),
      width: Math.max(
        col.label.length + 2,
        ...data.map((item) => String((item as any)[col.key] || '').length + 2)
      ),
    }));

    // Style header row
    worksheet.getRow(1).font = { bold: true };
    worksheet.getRow(1).fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'FF006440' },
    };
    worksheet.getRow(1).font = { bold: true, color: { argb: 'FFFFFFFF' } };

    // Add data rows
    data.forEach((item) => {
      const row: Record<string, unknown> = {};
      resolvedColumns.forEach((col) => {
        row[String(col.key)] = (item as any)[col.key];
      });
      worksheet.addRow(row);
    });

    // Generate and download file
    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${opts.filename}.xlsx`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const exportToPDF = <T extends object>(
    data: T[],
    columns?: { key: keyof T; label: string }[],
    options?: ExportOptions
  ) => {
    const opts = options || { filename: `export-${Date.now()}` };
    const resolvedColumns = columns || (data.length > 0
      ? (Object.keys(data[0]) as (keyof T)[]).map((key) => ({ key, label: String(key) }))
      : []);

    const doc = new jsPDF('landscape', 'mm', 'a4');

    // Header
    doc.setFontSize(18);
    doc.setTextColor(0, 100, 60);
    doc.text(opts.title || opts.filename, 14, 20);

    doc.setFontSize(10);
    doc.setTextColor(100);
    doc.text(`Exporté le ${new Date().toLocaleDateString('fr-FR')}`, 14, 28);

    // Table
    const tableData = data.map((item) =>
      resolvedColumns.map((col) => String((item as any)[col.key] || ''))
    );

    autoTable(doc, {
      head: [resolvedColumns.map((col) => col.label)],
      body: tableData,
      startY: 35,
      styles: {
        fontSize: 9,
        cellPadding: 3,
      },
      headStyles: {
        fillColor: [0, 100, 60],
        textColor: 255,
        fontStyle: 'bold',
      },
      alternateRowStyles: {
        fillColor: [245, 245, 245],
      },
      margin: { left: 14, right: 14 },
    });

    doc.save(`${opts.filename}.pdf`);
  };

  return { exportToExcel, exportToPDF };
};
