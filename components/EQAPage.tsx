import React, { useState, useMemo } from 'react';
import { EQAMaterial, EQAResult, TestParameter } from '../types';
import { PlusIcon } from './icons/PlusIcon';
import { EditIcon } from './icons/EditIcon';
import { EyeIcon } from './icons/EyeIcon';

interface EQAPageProps {
    eqaMaterials: EQAMaterial[];
    eqaResults: EQAResult[];
    testParameters: TestParameter[];
    onOpenModal: (materialId?: string, result?: EQAResult) => void;
}

const formatDate = (dateString: string) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' });
};

const EQAPage: React.FC<EQAPageProps> = ({ eqaMaterials, eqaResults, testParameters, onOpenModal }) => {
    const [selectedMaterialId, setSelectedMaterialId] = useState<string>(eqaMaterials[0]?.id || '');

    const testMap = useMemo(() => new Map(testParameters.map(t => [t.id, t.name])), [testParameters]);
    
    const resultsForMaterial = useMemo(() => {
        return eqaResults
            .filter(r => r.eqaMaterialId === selectedMaterialId)
            .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    }, [eqaResults, selectedMaterialId]);
    
    const calculateZScore = (labValue: number, mean: number, sd: number) => {
        if (sd === 0) return 'N/A';
        return ((labValue - mean) / sd).toFixed(2);
    };

    const getEvaluationStatus = (result: EQAResult) => {
        const zScore = parseFloat(calculateZScore(result.labValue, result.peerGroupMean, result.peerGroupSd));
        
        if (result.evaluation) {
             const statusMap = {
                acceptable: { text: 'Đạt', color: 'bg-green-100 text-green-800' },
                warning: { text: 'Cảnh báo', color: 'bg-yellow-100 text-yellow-800' },
                unacceptable: { text: 'Không đạt', color: 'bg-red-100 text-red-800' },
            };
            return statusMap[result.evaluation];
        }
        
        // Auto-evaluate if not manually set
        if (isNaN(zScore)) return { text: 'N/A', color: 'bg-slate-100 text-slate-800' };
        if (Math.abs(zScore) <= 2) return { text: 'Đạt', color: 'bg-green-100 text-green-800' };
        if (Math.abs(zScore) <= 3) return { text: 'Cảnh báo', color: 'bg-yellow-100 text-yellow-800' };
        return { text: 'Không đạt', color: 'bg-red-100 text-red-800' };
    }

    return (
        <div className="bg-white p-6 rounded-lg shadow-lg">
            <div className="flex flex-wrap justify-between items-center mb-6 gap-4">
                 <div>
                    <h2 className="text-xl font-semibold text-slate-800">Quản lý Ngoại kiểm (EQA)</h2>
                    <p className="text-sm text-slate-500 mt-1">Ghi nhận và theo dõi kết quả các chương trình ngoại kiểm.</p>
                </div>
                <button onClick={() => onOpenModal(selectedMaterialId)} className="inline-flex items-center justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700">
                    <PlusIcon className="w-5 h-5 mr-2" />
                    Nhập kết quả EQA
                </button>
            </div>
            
            <div className="mb-4">
                <label className="block text-sm font-medium text-slate-600 mb-1">Chọn Chương trình/Mẫu EQA</label>
                <select value={selectedMaterialId} onChange={e => setSelectedMaterialId(e.target.value)} className="w-full max-w-md p-2 border border-slate-300 rounded-md bg-white text-slate-900">
                    {eqaMaterials.map(m => <option key={m.id} value={m.id}>{m.name} (Lô: {m.lotNumber})</option>)}
                </select>
            </div>
            
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-slate-200">
                    <thead className="bg-slate-50">
                        <tr>
                            <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase">Ngày</th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase">Xét nghiệm</th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase">Kết quả Lab</th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase">Mean Nhóm</th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase">SD Nhóm</th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase">Z-Score</th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase">Đánh giá</th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase">Hành động</th>
                        </tr>
                    </thead>
                     <tbody className="bg-white divide-y divide-slate-100">
                        {resultsForMaterial.length > 0 ? resultsForMaterial.map(result => {
                            const zScore = calculateZScore(result.labValue, result.peerGroupMean, result.peerGroupSd);
                            const status = getEvaluationStatus(result);
                            return (
                                <tr key={result.id} className="hover:bg-slate-50">
                                    <td className="px-4 py-3 whitespace-nowrap text-sm text-slate-600">{formatDate(result.date)}</td>
                                    <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-slate-900">{testMap.get(result.testParameterId) || 'N/A'}</td>
                                    <td className="px-4 py-3 whitespace-nowrap text-sm font-bold text-blue-700">{result.labValue}</td>
                                    <td className="px-4 py-3 whitespace-nowrap text-sm text-slate-600">{result.peerGroupMean}</td>
                                    <td className="px-4 py-3 whitespace-nowrap text-sm text-slate-600">{result.peerGroupSd}</td>
                                    <td className="px-4 py-3 whitespace-nowrap text-sm font-semibold text-slate-900">{zScore}</td>
                                    <td className="px-4 py-3 whitespace-nowrap text-sm">
                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${status.color}`}>
                                            {status.text}
                                        </span>
                                    </td>
                                    <td className="px-4 py-3 whitespace-nowrap text-sm">
                                        <div className="flex items-center gap-3">
                                            {result.reportFileData && <button className="text-gray-600 hover:text-gray-900" title="Xem báo cáo"><EyeIcon /></button>}
                                            <button onClick={() => onOpenModal(selectedMaterialId, result)} className="text-blue-600 hover:text-blue-900" title="Chỉnh sửa"><EditIcon /></button>
                                        </div>
                                    </td>
                                </tr>
                            )
                        }) : (
                            <tr>
                                <td colSpan={8} className="text-center py-10 text-slate-500">
                                    Chưa có kết quả nào cho chương trình EQA này.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default EQAPage;
