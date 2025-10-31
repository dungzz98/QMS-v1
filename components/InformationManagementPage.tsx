import React, { useState, useMemo } from 'react';
import { User, SystemEvent } from '../types';
import { utils, writeFile } from 'xlsx';
import { ServerIcon } from './icons/ServerIcon';
import { ShieldExclamationIcon } from './icons/ShieldExclamationIcon';
import { PlusIcon } from './icons/PlusIcon';
import { ExportIcon } from './icons/ExportIcon';
import { TrashIcon } from './icons/TrashIcon';
import { ForwardIcon } from './icons/ForwardIcon';

interface InformationManagementPageProps {
    systemEvents: SystemEvent[];
    onAddEvent: () => void;
    onDeleteEvent: (id: string) => void;
    onCreateNonConformity: (event: SystemEvent) => void;
}

const formatDate = (dateString: string) => new Date(dateString).toLocaleString('vi-VN');

const InformationManagementPage: React.FC<InformationManagementPageProps> = ({ systemEvents, onAddEvent, onDeleteEvent, onCreateNonConformity }) => {
    const [activeTab, setActiveTab] = useState<'logs' | 'downtime'>('logs');

    const sortedEvents = useMemo(() => 
        [...systemEvents].sort((a,b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
    , [systemEvents]);
    
    const handleExportExcel = () => {
        const dataToExport = sortedEvents.map(event => ({
            'Thời gian': formatDate(event.timestamp),
            'Loại': event.type,
            'Mô tả': event.description,
            'Người ghi nhận': event.user,
            'Trạng thái': event.status === 'resolved' ? 'Đã giải quyết' : 'Đang mở',
        }));

        const ws = utils.json_to_sheet(dataToExport);
        const wb = utils.book_new();
        utils.book_append_sheet(wb, ws, "NhatKyHeThong");
        writeFile(wb, `Nhat_ky_He_thong_${new Date().toISOString().split('T')[0]}.xlsx`);
    };

    const TabButton: React.FC<{ tab: 'logs' | 'downtime', label: string, icon: React.ReactNode }> = ({ tab, label, icon }) => (
        <button
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 text-sm font-medium rounded-md flex items-center gap-2 ${activeTab === tab ? 'bg-blue-600 text-white shadow' : 'text-slate-600 bg-slate-100 hover:bg-slate-200'}`}
        >
            {icon}{label}
        </button>
    );

    return (
        <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold text-slate-800">Quản lý Thông tin</h2>
            <p className="text-sm text-slate-500 mt-1 mb-6">Giám sát truy cập, theo dõi nhật ký hệ thống và quy trình ứng phó sự cố.</p>

            <div className="flex gap-2 mb-6 border-b border-slate-200 pb-4">
                <TabButton tab="logs" label="Nhật ký Hệ thống" icon={<ServerIcon />} />
                <TabButton tab="downtime" label="Quy trình Sự cố CNTT" icon={<ShieldExclamationIcon />} />
            </div>

            {activeTab === 'logs' && (
                <div>
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-lg font-bold text-slate-700">Nhật ký Sự kiện Hệ thống</h3>
                        <div className="flex items-center gap-2">
                           <button onClick={handleExportExcel} className="inline-flex items-center gap-2 px-3 py-2 bg-teal-600 text-white text-sm rounded-md hover:bg-teal-700">
                                <ExportIcon/> Xuất Excel
                            </button>
                            <button onClick={onAddEvent} className="inline-flex items-center gap-2 px-3 py-2 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700"><PlusIcon/> Thêm sự kiện</button>
                        </div>
                    </div>
                     <div className="overflow-x-auto border rounded-lg">
                        <table className="min-w-full divide-y divide-slate-200">
                            <thead className="bg-slate-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Thời gian</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Loại</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Mô tả</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Người ghi nhận</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Trạng thái</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Hành động</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-slate-100">
                               {sortedEvents.map(event => (
                                   <tr key={event.id}>
                                       <td className="px-6 py-4 whitespace-nowrap">{formatDate(event.timestamp)}</td>
                                       <td className="px-6 py-4">{event.type}</td>
                                       <td className="px-6 py-4 max-w-sm truncate" title={event.description}>{event.description}</td>
                                       <td className="px-6 py-4">{event.user}</td>
                                       <td className="px-6 py-4"><span className={`px-2 py-1 text-xs font-semibold rounded-full ${event.status === 'resolved' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>{event.status}</span></td>
                                       <td className="px-6 py-4">
                                           <div className="flex items-center gap-3">
                                               <button
                                                   onClick={() => onCreateNonConformity(event)}
                                                   className="text-orange-600 hover:text-orange-800 disabled:text-slate-300 disabled:cursor-not-allowed"
                                                   title={event.nonConformityId ? "Đã chuyển sang SKPH" : "Chuyển sang Sự không phù hợp"}
                                                   disabled={!!event.nonConformityId}
                                               >
                                                   <ForwardIcon />
                                               </button>
                                               <button onClick={() => onDeleteEvent(event.id)} className="text-red-600 hover:text-red-800" title="Xóa">
                                                   <TrashIcon />
                                               </button>
                                           </div>
                                       </td>
                                   </tr>
                               ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
            
            {activeTab === 'downtime' && (
                 <div>
                    <h3 className="text-lg font-bold text-slate-700 mb-4">Quy trình ứng phó khi có sự cố CNTT</h3>
                    <ol className="list-decimal list-inside space-y-4 text-slate-700">
                        <li>
                            <strong>Phát hiện & Thông báo:</strong> Nhân viên IT có trách nhiệm thông báo cho các khoa/phòng liên quan và bộ phận tiếp đón về sự cố.
                        </li>
                        <li>
                            <strong>Chuyển sang quy trình thủ công:</strong> Khoa Xét nghiệm gửi các phiếu yêu cầu xét nghiệm giấy (theo mẫu bệnh viện) đến các khoa/phòng.
                        </li>
                        <li>
                            <strong>Lấy mẫu & Ghi nhận:</strong> Khi lấy mẫu, nhân viên ghi đầy đủ thông tin bệnh nhân (số thứ tự, họ tên, tuổi) lên cả ống mẫu và phiếu yêu cầu.
                        </li>
                         <li>
                            <strong>Xử lý tại Lab:</strong> Mẫu được nhận và chỉ định xét nghiệm trên máy theo chế độ thủ công (không kết nối LIS).
                        </li>
                         <li>
                            <strong>Trả kết quả:</strong> Sau khi có kết quả, nhân viên nhập kết quả vào phiếu giấy.
                        </li>
                        <li>
                            <strong>Lưu trữ:</strong> Kết quả được trả bằng bản cứng cho người yêu cầu. Một bản photo được giữ lại tại khoa để lưu trữ.
                        </li>
                    </ol>
                </div>
            )}
        </div>
    );
};

export default InformationManagementPage;