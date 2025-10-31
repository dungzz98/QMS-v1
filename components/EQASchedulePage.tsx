import React from 'react';
import { EQASchedule, EQAMaterial, PersonnelProfile } from '../types';
import { PlusIcon } from './icons/PlusIcon';
import { EditIcon } from './icons/EditIcon';
import { TrashIcon } from './icons/TrashIcon';

interface EQASchedulePageProps {
    schedules: EQASchedule[];
    eqaMaterials: EQAMaterial[];
    personnel: PersonnelProfile[];
    onAddOrUpdate: (schedule?: EQASchedule) => void;
    onDelete: (id: string) => void;
}

const formatDate = (dateString?: string) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString + 'T00:00:00');
    return date.toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' });
};

const getStatus = (schedule: EQASchedule) => {
    if (schedule.status === 'completed') {
        return { text: 'Đã hoàn thành', color: 'bg-green-100 text-green-800' };
    }
    
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const dueDate = new Date(schedule.resultDueDate + 'T00:00:00');
    
    const sevenDaysFromNow = new Date();
    sevenDaysFromNow.setDate(today.getDate() + 7);

    if (dueDate < today) {
        return { text: 'Quá hạn', color: 'bg-red-100 text-red-800' };
    }
    if (dueDate <= sevenDaysFromNow) {
        return { text: 'Sắp hết hạn', color: 'bg-yellow-100 text-yellow-800' };
    }
    
    return { text: 'Đã lên lịch', color: 'bg-blue-100 text-blue-800' };
};


const EQASchedulePage: React.FC<EQASchedulePageProps> = ({ schedules, eqaMaterials, personnel, onAddOrUpdate, onDelete }) => {
    
    const materialMap = new Map<string, EQAMaterial>(eqaMaterials.map(m => [m.id, m]));
    const personnelMap = new Map(personnel.map(p => [p.id, p.fullName]));

    const sortedSchedules = [...schedules].sort((a,b) => new Date(a.resultDueDate).getTime() - new Date(b.resultDueDate).getTime());

    return (
        <div className="bg-white p-6 rounded-lg shadow-lg">
            <div className="flex flex-wrap justify-between items-center mb-6 gap-4">
                 <div>
                    <h2 className="text-xl font-semibold text-slate-800">Lịch Ngoại kiểm (EQA)</h2>
                    <p className="text-sm text-slate-500 mt-1">Lập kế hoạch, phân công và theo dõi hạn chót của các chương trình ngoại kiểm.</p>
                </div>
                <button onClick={() => onAddOrUpdate()} className="inline-flex items-center justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700">
                    <PlusIcon className="w-5 h-5 mr-2" />
                    Thêm Lịch
                </button>
            </div>
            
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-slate-200">
                    <thead className="bg-slate-50">
                        <tr>
                            <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase">Chương trình EQA</th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase">Ngày nhận mẫu</th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase">Hạn chót nộp KQ</th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase">Người phụ trách</th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase">Trạng thái</th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase">Hành động</th>
                        </tr>
                    </thead>
                     <tbody className="bg-white divide-y divide-slate-100">
                        {sortedSchedules.length > 0 ? sortedSchedules.map(schedule => {
                            const material = materialMap.get(schedule.eqaMaterialId);
                            const status = getStatus(schedule);
                            return (
                                <tr key={schedule.id} className="hover:bg-slate-50">
                                    <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-slate-900">
                                        {material?.name || 'N/A'}
                                        <p className="text-xs text-slate-500 font-normal">Lô: {material?.lotNumber}</p>
                                    </td>
                                    <td className="px-4 py-3 whitespace-nowrap text-sm text-slate-600">{formatDate(schedule.sampleReceptionDate)}</td>
                                    <td className="px-4 py-3 whitespace-nowrap text-sm font-semibold text-red-600">{formatDate(schedule.resultDueDate)}</td>
                                    <td className="px-4 py-3 whitespace-nowrap text-sm text-slate-600">{personnelMap.get(schedule.assignedPersonnelId) || 'N/A'}</td>
                                    <td className="px-4 py-3 whitespace-nowrap text-sm">
                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${status.color}`}>
                                            {status.text}
                                        </span>
                                    </td>
                                    <td className="px-4 py-3 whitespace-nowrap text-sm">
                                        <div className="flex items-center gap-3">
                                            <button onClick={() => onAddOrUpdate(schedule)} className="text-blue-600 hover:text-blue-900" title="Chỉnh sửa"><EditIcon /></button>
                                            <button onClick={() => onDelete(schedule.id)} className="text-red-600 hover:text-red-900" title="Xóa"><TrashIcon /></button>
                                        </div>
                                    </td>
                                </tr>
                            )
                        }) : (
                            <tr>
                                <td colSpan={6} className="text-center py-10 text-slate-500">
                                    Chưa có lịch trình ngoại kiểm nào.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default EQASchedulePage;