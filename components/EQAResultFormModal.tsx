import React, { useState, useEffect } from 'react';
import { EQAResult, EQAMaterial, TestParameter, User } from '../types';

interface EQAResultFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: Omit<EQAResult, 'id'> | EQAResult) => void;
  initialData?: EQAResult | null;
  initialMaterialId?: string;
  currentUser: User | null;
  testParameters: TestParameter[];
  eqaMaterials: EQAMaterial[];
}

const EQAResultFormModal: React.FC<EQAResultFormModalProps> = (props) => {
    const { isOpen, onClose, onSubmit, initialData, initialMaterialId, currentUser, testParameters, eqaMaterials } = props;

    const getInitialState = () => ({
        eqaMaterialId: initialData?.eqaMaterialId || initialMaterialId || eqaMaterials[0]?.id || '',
        testParameterId: initialData?.testParameterId || testParameters[0]?.id || '',
        date: initialData?.date ? initialData.date.split('T')[0] : new Date().toISOString().split('T')[0],
        labValue: initialData?.labValue.toString() || '',
        peerGroupMean: initialData?.peerGroupMean.toString() || '',
        peerGroupSd: initialData?.peerGroupSd.toString() || '',
        evaluation: initialData?.evaluation,
        notes: initialData?.notes || '',
    });

    const [formData, setFormData] = useState(getInitialState());
    const [reportFile, setReportFile] = useState<{ name: string; type: string; data: string; } | null>(null);

    useEffect(() => {
        if (isOpen) {
            setFormData(getInitialState());
            if (initialData?.reportFileName && initialData?.reportFileType && initialData?.reportFileData) {
                setReportFile({ name: initialData.reportFileName, type: initialData.reportFileType, data: initialData.reportFileData });
            } else {
                setReportFile(null);
            }
        }
    }, [isOpen, initialData, initialMaterialId, currentUser, testParameters, eqaMaterials]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (loadEvent) => {
                const result = loadEvent.target?.result as string;
                const base64String = result.split(',')[1];
                setReportFile({ name: file.name, type: file.type, data: base64String });
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const labValue = parseFloat(formData.labValue);
        const peerGroupMean = parseFloat(formData.peerGroupMean);
        const peerGroupSd = parseFloat(formData.peerGroupSd);

        if (isNaN(labValue) || isNaN(peerGroupMean) || isNaN(peerGroupSd)) {
            alert("Các giá trị kết quả phải là số.");
            return;
        }

        const dataToSubmit: any = {
            ...formData,
            date: new Date(formData.date + 'T00:00:00').toISOString(),
            labValue,
            peerGroupMean,
            peerGroupSd,
            evaluation: formData.evaluation || undefined,
            recordedBy: currentUser?.fullName || 'N/A',
            reportFileData: reportFile?.data,
            reportFileName: reportFile?.name,
            reportFileType: reportFile?.type,
        };

        if (initialData?.id) {
            onSubmit({ ...initialData, ...dataToSubmit });
        } else {
            onSubmit(dataToSubmit);
        }
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
            <div className="bg-white rounded-lg shadow-xl p-6 m-4 w-full max-w-2xl max-h-full overflow-y-auto">
                <div className="flex justify-between items-center border-b pb-3">
                    <h2 className="text-xl font-semibold text-slate-700">{initialData ? 'Sửa Kết quả EQA' : 'Nhập Kết quả EQA'}</h2>
                    <button onClick={onClose} className="text-slate-500 hover:text-slate-800">&times;</button>
                </div>
                <form onSubmit={handleSubmit} className="mt-4 space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                         <div>
                            <label className="block text-sm font-medium text-slate-600">Chương trình EQA (*)</label>
                            <select name="eqaMaterialId" value={formData.eqaMaterialId} onChange={handleChange} required className="mt-1 block w-full border border-slate-300 rounded-md p-2 bg-white text-slate-900">
                                {eqaMaterials.map(m => <option key={m.id} value={m.id}>{m.name} (Lô: {m.lotNumber})</option>)}
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-600">Xét nghiệm (*)</label>
                            <select name="testParameterId" value={formData.testParameterId} onChange={handleChange} required className="mt-1 block w-full border border-slate-300 rounded-md p-2 bg-white text-slate-900">
                                {testParameters.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
                            </select>
                        </div>
                         <div>
                            <label className="block text-sm font-medium text-slate-600">Ngày thực hiện (*)</label>
                            <input type="date" name="date" value={formData.date} onChange={handleChange} required className="mt-1 block w-full border border-slate-300 rounded-md p-2 bg-white text-slate-900"/>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-600">Kết quả của Lab (*)</label>
                            <input type="number" step="any" name="labValue" value={formData.labValue} onChange={handleChange} required className="mt-1 block w-full border border-slate-300 rounded-md p-2 bg-white text-slate-900"/>
                        </div>
                         <div>
                            <label className="block text-sm font-medium text-slate-600">Mean của nhóm (*)</label>
                            <input type="number" step="any" name="peerGroupMean" value={formData.peerGroupMean} onChange={handleChange} required className="mt-1 block w-full border border-slate-300 rounded-md p-2 bg-white text-slate-900"/>
                        </div>
                         <div>
                            <label className="block text-sm font-medium text-slate-600">SD của nhóm (*)</label>
                            <input type="number" step="any" min="0" name="peerGroupSd" value={formData.peerGroupSd} onChange={handleChange} required className="mt-1 block w-full border border-slate-300 rounded-md p-2 bg-white text-slate-900"/>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-600">Đánh giá thủ công</label>
                            <select name="evaluation" value={formData.evaluation || ''} onChange={handleChange} className="mt-1 block w-full border border-slate-300 rounded-md p-2 bg-white text-slate-900">
                                <option value="">Tự động theo Z-score</option>
                                <option value="acceptable">Đạt</option>
                                <option value="warning">Cảnh báo</option>
                                <option value="unacceptable">Không đạt</option>
                            </select>
                        </div>
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-slate-600">Đính kèm Báo cáo (PDF, PNG, JPG)</label>
                            <div className="mt-1 flex items-center gap-4">
                                <label className="cursor-pointer inline-flex items-center px-4 py-2 bg-white text-sm text-slate-700 border border-slate-300 rounded-md shadow-sm hover:bg-slate-50">
                                    <span>{reportFile ? 'Thay đổi file' : 'Chọn file'}</span>
                                    <input type="file" className="hidden" onChange={handleFileChange} accept=".pdf,.png,.jpg,.jpeg" />
                                </label>
                                {reportFile && <span className="text-sm truncate max-w-xs">{reportFile.name}</span>}
                            </div>
                        </div>
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-slate-600">Ghi chú</label>
                            <textarea name="notes" value={formData.notes} onChange={handleChange} rows={3} className="mt-1 block w-full border border-slate-300 rounded-md p-2 bg-white text-slate-900"></textarea>
                        </div>
                    </div>
                    <div className="mt-6 flex justify-end gap-3">
                        <button type="button" onClick={onClose} className="px-4 py-2 bg-slate-200 text-slate-800 rounded-md hover:bg-slate-300">Hủy</button>
                        <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">Lưu</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EQAResultFormModal;