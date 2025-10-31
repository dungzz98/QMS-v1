import React, { useState, useEffect } from 'react';
import { EQASchedule, EQAMaterial, PersonnelProfile } from '../types';

interface EQAScheduleFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: Omit<EQASchedule, 'id'> | EQASchedule) => void;
  initialData?: EQASchedule | null;
  eqaMaterials: EQAMaterial[];
  personnel: PersonnelProfile[];
}

const EQAScheduleFormModal: React.FC<EQAScheduleFormModalProps> = ({ isOpen, onClose, onSubmit, initialData, eqaMaterials, personnel }) => {
    const getInitialState = () => ({
        eqaMaterialId: initialData?.eqaMaterialId || eqaMaterials[0]?.id || '',
        sampleReceptionDate: initialData?.sampleReceptionDate || new Date().toISOString().split('T')[0],
        resultDueDate: initialData?.resultDueDate || '',
        assignedPersonnelId: initialData?.assignedPersonnelId || personnel[0]?.id || '',
        status: initialData?.status || 'scheduled' as EQASchedule['status'],
        notes: initialData?.notes || '',
    });

    const [formData, setFormData] = useState(getInitialState());

    useEffect(() => {
        if (isOpen) {
            setFormData(getInitialState());
        }
    }, [isOpen, initialData, eqaMaterials, personnel]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value as any }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (new Date(formData.resultDueDate) < new Date(formData.sampleReceptionDate)) {
            alert("Hạn chót nộp kết quả không được trước ngày nhận mẫu.");
            return;
        }
        onSubmit(initialData ? { ...initialData, ...formData } : formData);
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
            <div className="bg-white rounded-lg shadow-xl p-6 m-4 w-full max-w-xl">
                <div className="flex justify-between items-center border-b pb-3">
                    <h2 className="text-xl font-semibold text-slate-700">{initialData ? 'Sửa Lịch Ngoại kiểm' : 'Thêm Lịch Ngoại kiểm'}</h2>
                    <button onClick={onClose} className="text-slate-500 hover:text-slate-800">&times;</button>
                </div>
                <form onSubmit={handleSubmit} className="mt-4 space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-slate-600">Chương trình EQA (*)</label>
                        <select name="eqaMaterialId" value={formData.eqaMaterialId} onChange={handleChange} required className="mt-1 block w-full border border-slate-300 rounded-md p-2">
                           {eqaMaterials.map(m => <option key={m.id} value={m.id}>{m.name} (Lô: {m.lotNumber})</option>)}
                        </select>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-slate-600">Ngày nhận mẫu (*)</label>
                            <input type="date" name="sampleReceptionDate" value={formData.sampleReceptionDate} onChange={handleChange} required className="mt-1 block w-full border border-slate-300 rounded-md p-2"/>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-600">Hạn chót nộp KQ (*)</label>
                            <input type="date" name="resultDueDate" value={formData.resultDueDate} onChange={handleChange} required className="mt-1 block w-full border border-slate-300 rounded-md p-2"/>
                        </div>
                    </div>
                     <div>
                        <label className="block text-sm font-medium text-slate-600">Phân công cho (*)</label>
                        <select name="assignedPersonnelId" value={formData.assignedPersonnelId} onChange={handleChange} required className="mt-1 block w-full border border-slate-300 rounded-md p-2">
                           {personnel.map(p => <option key={p.id} value={p.id}>{p.fullName}</option>)}
                        </select>
                    </div>
                     <div>
                        <label className="block text-sm font-medium text-slate-600">Trạng thái (*)</label>
                        <select name="status" value={formData.status} onChange={handleChange} required className="mt-1 block w-full border border-slate-300 rounded-md p-2">
                           <option value="scheduled">Đã lên lịch</option>
                           <option value="completed">Đã hoàn thành</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-600">Ghi chú</label>
                        <textarea name="notes" value={formData.notes} onChange={handleChange} rows={2} className="mt-1 block w-full border border-slate-300 rounded-md p-2"></textarea>
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

export default EQAScheduleFormModal;