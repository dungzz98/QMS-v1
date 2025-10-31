import React from 'react';
import { DecontaminationLog } from '../types';
import { EditIcon } from './icons/EditIcon';
import { TrashIcon } from './icons/TrashIcon';

interface DecontaminationLogPageProps {
  logs: DecontaminationLog[];
  onEdit: (log: DecontaminationLog) => void;
  onDelete: (id: string) => void;
}

const formatDateTime = (date: string, time: string) => {
    if (!date || !time) return 'N/A';
    const d = new Date(`${date}T${time}`);
    return d.toLocaleString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' });
}

const DecontaminationLogPage: React.FC<DecontaminationLogPageProps> = ({ logs, onEdit, onDelete }) => {
    return (
        <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-200">
                <thead className="bg-white border-b-2 border-black">
                    <tr>
                        <th className="px-4 py-3 text-left text-xs font-bold text-black uppercase tracking-wider">Thời gian</th>
                        <th className="px-4 py-3 text-left text-xs font-bold text-black uppercase tracking-wider">Khu vực/Thiết bị</th>
                        <th className="px-4 py-3 text-left text-xs font-bold text-black uppercase tracking-wider">Phương pháp</th>
                        <th className="px-4 py-3 text-left text-xs font-bold text-black uppercase tracking-wider">Hóa chất sử dụng</th>
                        <th className="px-4 py-3 text-left text-xs font-bold text-black uppercase tracking-wider">Thời gian tiếp xúc</th>
                        <th className="px-4 py-3 text-left text-xs font-bold text-black uppercase tracking-wider">Người thực hiện</th>
                        <th className="px-4 py-3 text-left text-xs font-bold text-black uppercase tracking-wider">Hành động</th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-slate-200">
                    {logs.length > 0 ? logs.map(log => (
                        <tr key={log.id} className="hover:bg-slate-50">
                            <td className="px-4 py-3 text-sm text-black">{formatDateTime(log.date, log.time)}</td>
                            <td className="px-4 py-3 text-sm font-medium text-black">{log.areaOrEquipment}</td>
                            <td className="px-4 py-3 text-sm text-black">{log.method}</td>
                            <td className="px-4 py-3 text-sm text-black">{log.chemicalUsed ? `${log.chemicalUsed} (${log.concentrationAndVolume || 'N/A'})` : 'N/A'}</td>
                            <td className="px-4 py-3 text-sm text-black">{log.contactTime || 'N/A'}</td>
                            <td className="px-4 py-3 text-sm text-black">{log.performedBy}</td>
                            <td className="px-4 py-3">
                                <div className="flex gap-3">
                                    <button onClick={() => onEdit(log)} className="text-blue-600 hover:text-blue-800"><EditIcon/></button>
                                    <button onClick={() => onDelete(log.id)} className="text-red-600 hover:text-red-800"><TrashIcon/></button>
                                </div>
                            </td>
                        </tr>
                    )) : (
                        <tr><td colSpan={7} className="text-center py-10 text-black">Không có dữ liệu khử nhiễm trong ngày đã chọn.</td></tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default DecontaminationLogPage;
