import React, { useEffect } from 'react';
import { LabEquipment } from '../types';

interface EquipmentProfilePrintViewProps {
  equipment: LabEquipment;
  onDone: () => void;
}

const formatDate = (dateString?: string) => {
    if (!dateString) return '';
    const date = new Date(dateString + 'T00:00:00');
    return date.toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' });
};

const statusMap: Record<LabEquipment['status'], string> = {
    operational: 'Hoạt động',
    maintenance: 'Đang bảo trì',
    out_of_service: 'Ngưng sử dụng'
};

const EquipmentProfilePrintView: React.FC<EquipmentProfilePrintViewProps> = ({ equipment, onDone }) => {
    useEffect(() => {
        setTimeout(() => {
            window.print();
            onDone();
        }, 100); 
    }, [onDone]);

    const combinedHistory = [
        ...(equipment.maintenanceHistory || []).map(r => ({ ...r, type: 'Bảo trì' })),
        ...(equipment.calibrationHistory || []).map(r => ({ ...r, type: 'Hiệu chuẩn' }))
    ].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    const renderEmptyRows = (count: number) => {
        return Array.from({ length: count }).map((_, index) => (
            <tr key={`empty-${index}`}>
                <td className="border border-black h-8">&nbsp;</td>
                <td className="border border-black h-8">&nbsp;</td>
                <td className="border border-black h-8">&nbsp;</td>
            </tr>
        ));
    };

    const renderMaintRows = (count: number) => {
        return Array.from({ length: count }).map((_, index) => (
            <tr key={`empty-maint-${index}`}>
                <td className="border border-black h-8">&nbsp;</td>
                <td className="border border-black h-8">&nbsp;</td>
                <td className="border border-black h-8">&nbsp;</td>
                <td className="border border-black h-8">&nbsp;</td>
            </tr>
        ));
    }

    return (
        <div id="printable-equipment-profile" className="font-serif text-black text-sm">
            {/* Page 1 */}
            <div className="w-full h-[297mm] p-8 flex flex-col" style={{ pageBreakAfter: 'always' }}>
                <header className="text-center mb-8">
                    <p className="font-bold uppercase">BỆNH VIỆN ĐẠI HỌC Y DƯỢC</p>
                    <p className="font-bold uppercase">KHOA XÉT NGHIỆM</p>
                    <h1 className="text-2xl font-bold uppercase mt-8">LÝ LỊCH THIẾT BỊ</h1>
                </header>

                <section className="mb-6">
                    <h2 className="font-bold mb-2">1. Thông tin chung</h2>
                    <div className="grid grid-cols-2 gap-x-8 gap-y-2">
                        <div><strong>Tên thiết bị:</strong> {equipment.name}</div>
                        <div><strong>Ký hiệu:</strong> {equipment.model || ''}</div>
                        <div><strong>Số Serial:</strong> {equipment.serialNumber}</div>
                        <div><strong>Nước:</strong> </div>
                        <div><strong>Nhà sản xuất:</strong> {equipment.manufacturer || ''}</div>
                        <div><strong>Vị trí:</strong> {equipment.location}</div>
                        <div><strong>Mã số thiết bị:</strong> {equipment.assetId}</div>
                        <div><strong>Tình trạng:</strong> {statusMap[equipment.status]}</div>
                        <div><strong>Thời gian nhận máy:</strong> {formatDate(equipment.purchaseDate)}</div>
                        <div><strong>Thời gian sử dụng:</strong> {formatDate(equipment.warrantyDate)}</div>
                    </div>
                </section>

                <section className="mb-6">
                    <h2 className="font-bold mb-2">2. Nhà cung cấp</h2>
                    <div className="grid grid-cols-2 gap-x-8 gap-y-2">
                        <div><strong>Tên nhà cung cấp:</strong> </div>
                        <div></div>
                        <div><strong>Địa chỉ:</strong> </div>
                        <div></div>
                        <div><strong>Điện thoại:</strong> </div>
                        <div><strong>Số Fax:</strong> </div>
                    </div>
                </section>

                <section className="mb-6 flex-grow flex flex-col">
                    <h2 className="font-bold mb-2">3. Quản lý</h2>
                    <table className="w-full border-collapse border border-black">
                        <thead>
                            <tr className="bg-gray-200">
                                <th className="border border-black p-2 font-bold w-1/2">Họ và tên</th>
                                <th className="border border-black p-2 font-bold w-1/4">Từ ngày</th>
                                <th className="border border-black p-2 font-bold w-1/4">Ghi chú</th>
                            </tr>
                        </thead>
                        <tbody>
                            {renderEmptyRows(15)}
                        </tbody>
                    </table>
                </section>

                <footer className="mt-auto flex justify-between items-center text-xs pt-4">
                    <span>XN-BM 5.5.1/03</span>
                    <span>Lần ban hành: 01.dd/mm/yy</span>
                    <span>Trang: 1/3</span>
                </footer>
            </div>
            
            {/* Page 2 */}
            <div className="w-full h-[297mm] p-8 flex flex-col" style={{ pageBreakAfter: 'always' }}>
                 <header className="text-center mb-8">
                    <p className="font-bold uppercase">BỆNH VIỆN ĐẠI HỌC Y DƯỢC</p>
                    <p className="font-bold uppercase">KHOA XÉT NGHIỆM</p>
                </header>
                <section className="flex-grow flex flex-col">
                    <h2 className="font-bold mb-2">4. Sửa chữa / bảo dưỡng</h2>
                    <table className="w-full border-collapse border border-black">
                        <thead>
                            <tr className="bg-gray-200">
                                <th className="border border-black p-2 font-bold w-[15%]">Thời gian</th>
                                <th className="border border-black p-2 font-bold w-[20%]">Người thực hiện</th>
                                <th className="border border-black p-2 font-bold w-[45%]">Nội dung thực hiện</th>
                                <th className="border border-black p-2 font-bold w-[20%]">Ghi chú</th>
                            </tr>
                        </thead>
                         <tbody>
                            {combinedHistory.slice(0, 30).map(record => (
                                <tr key={record.id}>
                                    <td className="border border-black p-1 h-8 text-center">{formatDate(record.date)}</td>
                                    <td className="border border-black p-1 h-8">{record.performedBy}</td>
                                    <td className="border border-black p-1 h-8">{`${record.type}: ${record.description}`}</td>
                                    <td className="border border-black p-1 h-8"></td>
                                </tr>
                            ))}
                            {renderMaintRows(Math.max(0, 30 - combinedHistory.length))}
                        </tbody>
                    </table>
                </section>
                <footer className="mt-auto flex justify-between items-center text-xs pt-4">
                    <span>XN-BM 5.5.1/03</span>
                    <span>Lần ban hành: 01.dd/mm/yy</span>
                    <span>Trang: 2/3</span>
                </footer>
            </div>

             {/* Page 3 */}
             <div className="w-full h-[297mm] p-8 flex flex-col">
                 <header className="text-center mb-8">
                    <p className="font-bold uppercase">BỆNH VIỆN ĐẠI HỌC Y DƯỢC</p>
                    <p className="font-bold uppercase">KHOA XÉT NGHIỆM</p>
                </header>
                <footer className="mt-auto flex justify-between items-center text-xs pt-4">
                    <span>XN-BM 5.5.1/03</span>
                    <span>Lần ban hành: 01.dd/mm/yy</span>
                    <span>Trang: 3/3</span>
                </footer>
            </div>
        </div>
    );
};

export default EquipmentProfilePrintView;
