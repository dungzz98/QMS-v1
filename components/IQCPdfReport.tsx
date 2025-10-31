import React from 'react';
import { IQCResult, ControlLotTarget, TestParameter, ControlMaterial, WestgardViolation } from '../types';
import LeveyJenningsChart from './LeveyJenningsChart';

export interface IQCPdfReportProps {
    results: IQCResult[];
    target: ControlLotTarget;
    test: TestParameter;
    control: ControlMaterial;
    violations: WestgardViolation[];
    dateRange: string;
}

const formatDateTime = (dateString: string) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' });
};

const IQCPdfReport: React.FC<IQCPdfReportProps> = ({ results, target, test, control, violations, dateRange }) => {
    
    // Use a more print-friendly font stack and sizing
    const baseStyle: React.CSSProperties = {
        fontFamily: 'Arial, sans-serif',
        color: '#333',
        fontSize: '10pt',
    };

    const sortedResults = [...results].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    
    return (
        <div id="iqc-pdf-content" style={{ ...baseStyle, width: '210mm', minHeight: '297mm', padding: '20mm', boxSizing: 'border-box', backgroundColor: 'white' }}>
            <header style={{ textAlign: 'center', borderBottom: '2px solid #333', paddingBottom: '10px' }}>
                <h1 style={{ fontSize: '18pt', fontWeight: 'bold', margin: 0 }}>BÁO CÁO NỘI KIỂM CHẤT LƯỢNG</h1>
                <h2 style={{ fontSize: '14pt', fontWeight: 'normal', margin: '5px 0 0 0' }}>{test.name}</h2>
            </header>

            <section style={{ marginTop: '15px', fontSize: '11pt' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <tbody>
                        <tr>
                            <td style={{ padding: '4px', fontWeight: 'bold', width: '20%' }}>Vật liệu control:</td>
                            <td style={{ padding: '4px', width: '30%' }}>{control.name}</td>
                            <td style={{ padding: '4px', fontWeight: 'bold', width: '20%' }}>Mức:</td>
                            <td style={{ padding: '4px', width: '30%' }}>{control.level}</td>
                        </tr>
                        <tr>
                            <td style={{ padding: '4px', fontWeight: 'bold' }}>Số lô:</td>
                            <td style={{ padding: '4px' }}>{control.lotNumber}</td>
                            <td style={{ padding: '4px', fontWeight: 'bold' }}>Hạn sử dụng:</td>
                            <td style={{ padding: '4px' }}>{new Date(control.expirationDate + 'T00:00:00').toLocaleDateString('vi-VN')}</td>
                        </tr>
                         <tr>
                            <td style={{ padding: '4px', fontWeight: 'bold' }}>Target Mean:</td>
                            <td style={{ padding: '4px' }}>{target.mean}</td>
                            <td style={{ padding: '4px', fontWeight: 'bold' }}>Target SD:</td>
                            <td style={{ padding: '4px' }}>{target.sd}</td>
                        </tr>
                        <tr>
                            <td style={{ padding: '4px', fontWeight: 'bold' }}>Khoảng thời gian:</td>
                            <td style={{ padding: '4px' }} colSpan={3}>{dateRange}</td>
                        </tr>
                    </tbody>
                </table>
            </section>
            
            <section style={{ marginTop: '15px' }}>
                <h3 style={{ fontSize: '12pt', fontWeight: 'bold', borderBottom: '1px solid #ccc', paddingBottom: '5px' }}>Biểu đồ Levey-Jennings</h3>
                <div style={{ marginTop: '10px' }}>
                    {results.length > 0 ? (
                        <LeveyJenningsChart data={results} mean={target.mean} sd={target.sd} violations={violations} />
                    ) : <p>Không có dữ liệu để vẽ biểu đồ.</p>}
                </div>
            </section>

             <section style={{ marginTop: '15px' }}>
                <h3 style={{ fontSize: '12pt', fontWeight: 'bold', borderBottom: '1px solid #ccc', paddingBottom: '5px' }}>Dữ liệu chi tiết</h3>
                <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '10px' }}>
                    <thead>
                        <tr style={{ backgroundColor: '#f2f2f2' }}>
                            <th style={{ border: '1px solid #ddd', padding: '6px', textAlign: 'left' }}>Thời gian</th>
                            <th style={{ border: '1px solid #ddd', padding: '6px', textAlign: 'left' }}>Kết quả</th>
                            <th style={{ border: '1px solid #ddd', padding: '6px', textAlign: 'left' }}>Người nhập</th>
                            <th style={{ border: '1px solid #ddd', padding: '6px', textAlign: 'left' }}>Ghi chú</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sortedResults.map(r => (
                            <tr key={r.id}>
                                <td style={{ border: '1px solid #ddd', padding: '6px' }}>{formatDateTime(r.date)}</td>
                                <td style={{ border: '1px solid #ddd', padding: '6px', fontWeight: 'bold' }}>{r.value}</td>
                                <td style={{ border: '1px solid #ddd', padding: '6px' }}>{r.recordedBy}</td>
                                <td style={{ border: '1px solid #ddd', padding: '6px' }}>{r.notes || ''}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </section>

             <section style={{ marginTop: '15px', pageBreakInside: 'avoid' }}>
                <h3 style={{ fontSize: '12pt', fontWeight: 'bold', borderBottom: '1px solid #ccc', paddingBottom: '5px' }}>Cảnh báo Westgard</h3>
                 <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '10px' }}>
                    <thead>
                        <tr style={{ backgroundColor: '#f2f2f2' }}>
                            <th style={{ border: '1px solid #ddd', padding: '6px', textAlign: 'left' }}>Quy tắc</th>
                            <th style={{ border: '1px solid #ddd', padding: '6px', textAlign: 'left' }}>Mô tả Vi phạm</th>
                        </tr>
                    </thead>
                    <tbody>
                        {violations.length > 0 ? violations.map((v, i) => (
                            <tr key={i}>
                                <td style={{ border: '1px solid #ddd', padding: '6px', fontWeight: 'bold' }}>{v.rule.toUpperCase()}</td>
                                <td style={{ border: '1px solid #ddd', padding: '6px' }}>{v.message}</td>
                            </tr>
                        )) : (
                            <tr>
                                <td colSpan={2} style={{ border: '1px solid #ddd', padding: '6px', textAlign: 'center' }}>Không có vi phạm nào.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </section>
            
            <footer style={{ position: 'absolute', bottom: '10mm', width: '190mm', textAlign: 'center', fontSize: '9pt', borderTop: '1px solid #ccc', paddingTop: '5px' }}>
                Báo cáo được tạo bởi Hệ thống Quản lý Chất lượng vào ngày {new Date().toLocaleDateString('vi-VN')}
            </footer>
        </div>
    );
};

export default IQCPdfReport;