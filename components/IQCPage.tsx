import React, { useState, useMemo } from 'react';
import { TestParameter, ControlMaterial, ControlLotTarget, IQCResult, WestgardViolation } from '../types';
import LeveyJenningsChart from './LeveyJenningsChart';
import { analyzeWestgard } from '../services/westgardService';
import { PlusCircleIcon } from './icons/PlusCircleIcon';
import { BeakerIcon } from './icons/BeakerIcon';
import { ImportIcon } from './icons/ImportIcon';
import { LightBulbIcon } from './icons/LightBulbIcon';
import { ChartBarSquareIcon } from './icons/ChartBarSquareIcon';
import { DocumentArrowDownIcon } from './icons/DocumentArrowDownIcon';
import { IQCPdfReportProps } from './IQCPdfReport';
import { CalculatorIcon } from './icons/CalculatorIcon';

interface IQCPageProps {
    testParameters: TestParameter[];
    controlMaterials: ControlMaterial[];
    controlLotTargets: ControlLotTarget[];
    iqcResults: IQCResult[];
    onAddResult: () => void;
    onOpenCommentModal: (result: IQCResult) => void;
    onConvertToNC: (violation: WestgardViolation, result: IQCResult) => void;
    onOpenIQCImportModal: () => void;
    onOpenGuidanceModal: (violation: WestgardViolation) => void;
    onExportIQCWithChart: (results: IQCResult[], target: ControlLotTarget, test: TestParameter, control: ControlMaterial) => void;
    onExportIQCToPdf: (data: IQCPdfReportProps) => void;
    onOpenCalculateTargetModal: (mean: number, sd: number, test: TestParameter, control: ControlMaterial, count: number) => void;
}

const formatDateTime = (dateString: string) => {
  if (!dateString) return 'N/A';
  const date = new Date(dateString);
  return date.toLocaleString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' });
};

const formatDateForTitle = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString + 'T00:00:00');
    return date.toLocaleDateString('vi-VN');
}

const IQCPage: React.FC<IQCPageProps> = (props) => {
    const { 
        testParameters, controlMaterials, controlLotTargets, iqcResults, onAddResult, 
        onOpenCommentModal, onConvertToNC, onOpenIQCImportModal, onOpenGuidanceModal, 
        onExportIQCWithChart, onExportIQCToPdf, onOpenCalculateTargetModal
    } = props;
    
    const [selectedTestId, setSelectedTestId] = useState<string>(testParameters[0]?.id || '');
    const [selectedControlId, setSelectedControlId] = useState<string>(controlMaterials[0]?.id || '');
    const [startDate, setStartDate] = useState<string>('');
    const [endDate, setEndDate] = useState<string>('');

    const availableControlsForTest = useMemo(() => {
        const controlIds = controlLotTargets
            .filter(t => t.testParameterId === selectedTestId)
            .map(t => t.controlMaterialId);
        
        // Also include controls that have results but no target yet
        iqcResults.forEach(r => {
            if (r.testParameterId === selectedTestId && !controlIds.includes(r.controlMaterialId)) {
                controlIds.push(r.controlMaterialId);
            }
        });

        return controlMaterials.filter(cm => controlIds.includes(cm.id));
    }, [selectedTestId, controlLotTargets, controlMaterials, iqcResults]);

    // Effect to update selected control if it's not available for the new test
    React.useEffect(() => {
        if (!availableControlsForTest.some(c => c.id === selectedControlId)) {
            setSelectedControlId(availableControlsForTest[0]?.id || '');
        }
    }, [selectedTestId, availableControlsForTest, selectedControlId]);

    const currentTarget = useMemo(() => {
        return controlLotTargets.find(t => t.testParameterId === selectedTestId && t.controlMaterialId === selectedControlId);
    }, [selectedTestId, selectedControlId, controlLotTargets]);

    const filteredResults = useMemo(() => {
        let results = iqcResults
            .filter(r => r.testParameterId === selectedTestId && r.controlMaterialId === selectedControlId);
        
        if (startDate) {
            results = results.filter(r => r.date.split('T')[0] >= startDate);
        }
        if (endDate) {
            results = results.filter(r => r.date.split('T')[0] <= endDate);
        }
    
        results.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    
        // If no date range is specified, show the last 30 points. Otherwise, show all in range.
        if (!startDate && !endDate) {
            return results.slice(-30);
        }
    
        return results;
    }, [selectedTestId, selectedControlId, iqcResults, startDate, endDate]);
    
    const violations = useMemo<WestgardViolation[]>(() => {
        if (!currentTarget || !filteredResults.length) return [];
        return analyzeWestgard(filteredResults, currentTarget.mean, currentTarget.sd);
    }, [filteredResults, currentTarget]);

    const selectedTest = useMemo(() => testParameters.find(t => t.id === selectedTestId), [testParameters, selectedTestId]);
    const selectedControl = useMemo(() => controlMaterials.find(c => c.id === selectedControlId), [controlMaterials, selectedControlId]);
    
    const sixSigmaMetrics = useMemo(() => {
        if (!currentTarget || filteredResults.length < 20) return null;
        if (!selectedTest) return null;
        
        const meanOfData = filteredResults.reduce((acc, r) => acc + r.value, 0) / filteredResults.length;
        const bias = Math.abs(meanOfData - currentTarget.mean);
        const biasPercent = (bias / currentTarget.mean) * 100;

        const sumOfSquares = filteredResults.reduce((acc, r) => acc + Math.pow(r.value - meanOfData, 2), 0);
        const sdOfData = Math.sqrt(sumOfSquares / (filteredResults.length - 1));
        const cvPercent = (sdOfData / meanOfData) * 100;
        
        const sigma = (selectedTest.tea - biasPercent) / cvPercent;

        return {
            bias: bias.toFixed(2),
            biasPercent: biasPercent.toFixed(2),
            cvPercent: cvPercent.toFixed(2),
            sigma: sigma.toFixed(2),
        };
    }, [currentTarget, filteredResults, selectedTest]);

    const tableTitle = useMemo(() => {
        if (startDate && endDate) {
            return `(từ ${formatDateForTitle(startDate)} đến ${formatDateForTitle(endDate)})`;
        }
        if (startDate) {
            return `(từ ${formatDateForTitle(startDate)})`;
        }
        if (endDate) {
            return `(đến ${formatDateForTitle(endDate)})`;
        }
        return `(${filteredResults.length} điểm gần nhất)`;
    }, [startDate, endDate, filteredResults.length]);

    const handlePdfExportClick = () => {
        if (selectedTest && selectedControl && currentTarget) {
            onExportIQCToPdf({
                results: filteredResults,
                target: currentTarget,
                test: selectedTest,
                control: selectedControl,
                violations: violations,
                dateRange: tableTitle
            });
        }
    };

    const handleCalculateTarget = () => {
        if (filteredResults.length < 2 || !selectedTest || !selectedControl) return;

        const values = filteredResults.map(r => r.value);
        const n = values.length;
        const mean = values.reduce((a, b) => a + b, 0) / n;
        const sd = Math.sqrt(values.map(x => Math.pow(x - mean, 2)).reduce((a, b) => a + b, 0) / (n - 1));

        onOpenCalculateTargetModal(mean, sd, selectedTest, selectedControl, n);
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-lg">
            <div className="flex flex-wrap justify-between items-center mb-6 gap-4">
                <div>
                    <h2 className="text-xl font-semibold text-slate-800">Phần mềm Nội kiểm (IQC)</h2>
                    <p className="text-sm text-slate-500 mt-1">Phân tích dữ liệu, biểu đồ Levey-Jennings và quy tắc Westgard.</p>
                </div>
                <div className="flex items-center gap-2 flex-wrap">
                    <button
                        onClick={handleCalculateTarget}
                        disabled={filteredResults.length < 10}
                        className="inline-flex items-center justify-center rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm hover:bg-slate-50 disabled:bg-slate-50 disabled:text-slate-400 disabled:cursor-not-allowed"
                        title={filteredResults.length < 10 ? "Cần ít nhất 10 điểm dữ liệu trong khoảng đã chọn để tính toán" : "Tính toán Mean và SD từ dữ liệu hiện tại"}
                    >
                        <CalculatorIcon className="w-5 h-5 mr-2" />
                        Tính toán Mean/SD
                    </button>
                    <button 
                        onClick={handlePdfExportClick}
                        disabled={!currentTarget || filteredResults.length === 0}
                        className="inline-flex items-center justify-center rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm hover:bg-slate-50 disabled:bg-slate-50 disabled:text-slate-400 disabled:cursor-not-allowed"
                        title="Xuất báo cáo PDF"
                    >
                        <DocumentArrowDownIcon className="w-5 h-5 mr-2" />
                        Xuất PDF
                    </button>
                    <button 
                        onClick={() => onExportIQCWithChart(filteredResults, currentTarget!, selectedTest!, selectedControl!)}
                        disabled={!currentTarget || filteredResults.length === 0}
                        className="inline-flex items-center justify-center rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm hover:bg-slate-50 disabled:bg-slate-50 disabled:text-slate-400 disabled:cursor-not-allowed"
                        title="Xuất dữ liệu hiện tại ra file Excel, định dạng sẵn để vẽ biểu đồ"
                    >
                        <ChartBarSquareIcon className="w-5 h-5 mr-2" />
                        Xuất Excel
                    </button>
                    <button onClick={onOpenIQCImportModal} className="inline-flex items-center justify-center rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm hover:bg-slate-50">
                        <ImportIcon className="w-5 h-5 mr-2" />
                        Nhập Excel
                    </button>
                    <button onClick={onAddResult} className="inline-flex items-center justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700">
                        <PlusCircleIcon className="w-5 h-5 mr-2" />
                        Nhập kết quả
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-4 p-4 bg-slate-50 rounded-md border">
                <div>
                    <label className="block text-sm font-medium text-slate-600 mb-1">Chọn Xét nghiệm</label>
                    <select value={selectedTestId} onChange={e => setSelectedTestId(e.target.value)} className="w-full p-2 border border-slate-300 rounded-md bg-white text-slate-900">
                        {testParameters.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-medium text-slate-600 mb-1">Chọn Mức Control</label>
                    <select value={selectedControlId} onChange={e => setSelectedControlId(e.target.value)} disabled={!selectedTestId} className="w-full p-2 border border-slate-300 rounded-md bg-white text-slate-900">
                        {availableControlsForTest.map(c => <option key={c.id} value={c.id}>{c.level} ({c.lotNumber})</option>)}
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-medium text-slate-600 mb-1">Từ ngày</label>
                    <input type="date" value={startDate} onChange={e => setStartDate(e.target.value)} className="w-full p-2 border border-slate-300 rounded-md bg-white text-slate-900"/>
                </div>
                <div>
                    <label className="block text-sm font-medium text-slate-600 mb-1">Đến ngày</label>
                    <input type="date" value={endDate} onChange={e => setEndDate(e.target.value)} className="w-full p-2 border border-slate-300 rounded-md bg-white text-slate-900"/>
                </div>
                <div className="self-end">
                    <button 
                        onClick={() => { setStartDate(''); setEndDate(''); }}
                        className="w-full px-4 py-2 bg-slate-200 text-slate-700 rounded-md hover:bg-slate-300 text-sm font-medium"
                    >
                        Xóa Lọc Ngày
                    </button>
                </div>
            </div>
            
            {sixSigmaMetrics && (
                 <div className="mb-6 p-3 bg-blue-50 border border-blue-200 rounded-md text-sm flex items-center justify-around">
                    <p className="font-semibold text-slate-700">Hiệu suất Six Sigma:</p>
                    <div className="text-center">
                        <p className="text-xs text-slate-500">CV%</p>
                        <p className="font-bold text-slate-800">{sixSigmaMetrics.cvPercent}</p>
                    </div>
                    <div className="text-center">
                        <p className="text-xs text-slate-500">Bias%</p>
                        <p className="font-bold text-slate-800">{sixSigmaMetrics.biasPercent}</p>
                    </div>
                    <div className="text-center">
                        <p className="text-xs text-slate-500">Six Sigma</p>
                        <p className="font-bold text-lg text-blue-600">{sixSigmaMetrics.sigma}</p>
                    </div>
                </div>
            )}
            
            {selectedTest && selectedControl ? (
                <div>
                    <div className="mb-6">
                        {currentTarget ? (
                             <LeveyJenningsChart data={filteredResults} mean={currentTarget.mean} sd={currentTarget.sd} violations={violations} />
                        ) : (
                             <div className="h-[400px] flex flex-col items-center justify-center bg-slate-50 border rounded-lg text-center">
                                <BeakerIcon className="w-12 h-12 mx-auto text-slate-300 mb-4" />
                                <h3 className="font-bold text-slate-700">Chưa có Target Mean/SD</h3>
                                <p className="text-sm text-slate-500 max-w-md">Vui lòng nhập Mean/SD cho lô control này trong phần Cài đặt, hoặc sử dụng chức năng "Tính toán Mean/SD" sau khi có đủ dữ liệu.</p>
                             </div>
                        )}
                       
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <h3 className="text-md font-semibold text-slate-700 mb-2">Dữ liệu QC <span className="font-normal text-slate-500">{tableTitle}</span></h3>
                            <div className="overflow-auto border rounded-lg max-h-96">
                                <table className="min-w-full divide-y divide-slate-200">
                                    <thead className="bg-slate-50 sticky top-0">
                                        <tr>
                                            <th className="px-4 py-2 text-left text-xs font-medium text-slate-500 uppercase">Thời gian</th>
                                            <th className="px-4 py-2 text-left text-xs font-medium text-slate-500 uppercase">Kết quả</th>
                                            <th className="px-4 py-2 text-left text-xs font-medium text-slate-500 uppercase">Người nhập</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-slate-200">
                                        {filteredResults.slice().reverse().map(r => {
                                            const isViolated = violations.some(v => v.resultId === r.id && v.rule !== '1-2s');
                                            return (
                                                <tr key={r.id} className={`${isViolated ? 'bg-red-50' : ''}`}>
                                                    <td className="px-4 py-2 text-sm text-slate-600">{formatDateTime(r.date)}</td>
                                                    <td className={`px-4 py-2 text-sm font-semibold ${isViolated ? 'text-red-700' : 'text-slate-800'}`}>{r.value.toFixed(2)}</td>
                                                    <td className="px-4 py-2 text-sm text-slate-600">{r.recordedBy}</td>
                                                </tr>
                                            )
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                         <div>
                            <h3 className="text-md font-semibold text-slate-700 mb-2">Cảnh báo Westgard</h3>
                            <div className="overflow-auto border rounded-lg max-h-96 p-4 space-y-2">
                               {violations.length > 0 ? violations.map((v, i) => {
                                   const result = filteredResults.find(r => r.id === v.resultId);
                                   const isCritical = v.rule !== '1-2s';
                                   
                                   return (
                                       <div key={i} className={`p-2 rounded-md text-sm ${isCritical ? 'bg-red-50' : 'bg-yellow-50'}`}>
                                           <div className="flex justify-between items-start">
                                               <div className={`flex-grow ${isCritical ? 'text-red-800' : 'text-yellow-800'}`}>
                                                   <span className="font-bold">{v.rule.toUpperCase()}:</span> {v.message}
                                                   {result?.notes && <p className="text-xs italic mt-1 pl-2 border-l-2 border-current">Ghi chú: {result.notes}</p>}
                                               </div>
                                               <div className="flex items-center gap-2 flex-shrink-0 ml-2">
                                                    <button onClick={() => onOpenGuidanceModal(v)} className="p-1 text-blue-600 hover:bg-blue-100 rounded-full" title="Hướng dẫn xử lý"><LightBulbIcon className="w-4 h-4" /></button>
                                                    <button onClick={() => result && onOpenCommentModal(result)} className="text-xs font-semibold text-slate-600 hover:underline">Nhận xét</button>
                                                   {isCritical && <button onClick={() => result && onConvertToNC(v, result)} className="text-xs font-semibold text-red-700 hover:underline">Chuyển SKPH</button>}
                                               </div>
                                           </div>
                                       </div>
                                   )
                               }) : (
                                   <div className="text-center text-slate-500 pt-10">
                                       <BeakerIcon className="w-10 h-10 mx-auto text-slate-300 mb-2" />
                                       <p>Không có vi phạm nào được phát hiện.</p>
                                   </div>
                               )}
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="text-center py-10 text-slate-500">
                    <p>Vui lòng chọn một xét nghiệm và mức control để xem dữ liệu.</p>
                    <p>Nếu không có lựa chọn nào, hãy cấu hình trong phần Cài đặt.</p>
                </div>
            )}
        </div>
    );
};

export default IQCPage;