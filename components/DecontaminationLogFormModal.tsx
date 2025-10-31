import React, { useState, useEffect, useMemo } from 'react';
import { DecontaminationLog, User, MonitoredArea, MonitoredEquipment, RoomLocation, LabEquipment } from '../types';

interface DecontaminationLogFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: Omit<DecontaminationLog, 'id'> | DecontaminationLog) => void;
  initialData?: DecontaminationLog | null;
  currentUser: User | null;
  monitoredAreas: MonitoredArea[];
  monitoredEquipment: MonitoredEquipment[];
  roomLocations: RoomLocation[];
  labEquipment: LabEquipment[];
}

const DecontaminationLogFormModal: React.FC<DecontaminationLogFormModalProps> = (props) => {
    const { isOpen, onClose, onSubmit, initialData, currentUser, monitoredAreas, monitoredEquipment, roomLocations, labEquipment } = props;
    const [useCurrentTime, setUseCurrentTime] = useState(!initialData);
    const [selectionType, setSelectionType] = useState<'area' | 'equipment'>('area');

    const getInitialState = () => {
        const now = new Date();
        return {
            date: now.toISOString().split('T')[0],
            time: now.toTimeString().substring(0, 5),
            areaOrEquipment: '',
            method: '',
            chemicalUsed: '',
            concentrationAndVolume: '',
            contactTime: '',
            performedBy: currentUser?.fullName || '',
            notes: '',
        };
    };

    const [formData, setFormData] = useState(getInitialState());

    const areaList = useMemo(() => Array.from(new Set([
        ...monitoredAreas.map(a => a.name),
        ...roomLocations.map(loc => loc.name)
    ])).sort((a,b) => a.localeCompare(b, 'vi')), [monitoredAreas, roomLocations]);

    const equipmentList = useMemo(() => 
        labEquipment.map(e => e.name).sort((a,b) => a.localeCompare(b, 'vi'))
    , [labEquipment]);

    useEffect(() => {
        if (isOpen) {
            setUseCurrentTime(!initialData);
            if (initialData) {
                const isEquipment = labEquipment.some(e => e.name === initialData.areaOrEquipment);
                setSelectionType(isEquipment ? 'equipment' : 'area');
                
                setFormData({
                    ...getInitialState(),
                    ...initialData
                });
            } else {
                setSelectionType('area'); // Default for new entries
                setFormData(getInitialState());
            }
        }
    }, [isOpen, initialData, currentUser, labEquipment]);
    
    useEffect(() => {
        let timer: number;
        if (isOpen && useCurrentTime && !initialData) {
            timer = window.setInterval(() => {
                const now = new Date();
                setFormData(prev => ({
                    ...prev,
                    date: now.toISOString().split('T')[0],
                    time: now.toTimeString().substring(0, 5),
                }));
            }, 1000);
        }
        return () => clearInterval(timer);
    }, [isOpen, useCurrentTime, initialData]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(initialData ? { ...initialData, ...formData } : formData);
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
            <div className="bg-white rounded-lg shadow-xl p-6 m-4 w-full max-w-2xl">
                <div className="flex justify-between items-center border-b pb-3">
                    <h2 className="text-xl font-semibold text-slate-700">{initialData ? 'Sửa' : 'Ghi nhận'} Sổ Khử nhiễm</h2>
                    <button onClick={onClose} className="text-slate-500 hover:text-slate-800">&times;</button>
                </div>
                <form onSubmit={handleSubmit} className="mt-4 space-y-4">
                     <div className="flex items-center">
                        <input id="useCurrentTimeDecon" type="checkbox" checked={useCurrentTime} onChange={e => setUseCurrentTime(e.target.checked)} className="h-4 w-4 rounded border-gray-300 text-blue-600"/>
                        <label htmlFor="useCurrentTimeDecon" className="ml-2 block text-sm text-slate-700">Sử dụng thời gian hiện tại</label>
                    </div>
                     <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-slate-600">Ngày (*)</label>
                            <input type="date" name="date" value={formData.date} onChange={handleChange} required disabled={useCurrentTime} className="mt-1 block w-full border rounded-md p-2 bg-white disabled:bg-slate-100 disabled:text-slate-500"/>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-600">Giờ (*)</label>
                            <input type="time" name="time" value={formData.time} onChange={handleChange} required disabled={useCurrentTime} className="mt-1 block w-full border rounded-md p-2 bg-white disabled:bg-slate-100 disabled:text-slate-500"/>
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-600">Đối tượng khử nhiễm (*)</label>
                        <div className="mt-2 flex gap-4">
                            <label className="flex items-center">
                                <input
                                    type="radio"
                                    name="selectionType"
                                    value="area"
                                    checked={selectionType === 'area'}
                                    onChange={() => {
                                        setSelectionType('area');
                                        setFormData(prev => ({ ...prev, areaOrEquipment: '' }));
                                    }}
                                    className="h-4 w-4 border-gray-300 text-blue-600 focus:ring-blue-500"
                                />
                                <span className="ml-2 text-sm text-slate-700">Khu vực</span>
                            </label>
                            <label className="flex items-center">
                                <input
                                    type="radio"
                                    name="selectionType"
                                    value="equipment"
                                    checked={selectionType === 'equipment'}
                                    onChange={() => {
                                        setSelectionType('equipment');
                                        setFormData(prev => ({ ...prev, areaOrEquipment: '' }));
                                    }}
                                    className="h-4 w-4 border-gray-300 text-blue-600 focus:ring-blue-500"
                                />
                                <span className="ml-2 text-sm text-slate-700">Thiết bị</span>
                            </label>
                        </div>
                    </div>
                    {selectionType === 'area' ? (
                        <div>
                            <label htmlFor="area-select" className="block text-sm font-medium text-slate-600">Chọn Khu vực (*)</label>
                            <input
                                id="area-select"
                                type="text"
                                name="areaOrEquipment"
                                value={formData.areaOrEquipment}
                                onChange={handleChange}
                                required
                                list="area-list"
                                className="mt-1 block w-full border rounded-md p-2"
                                placeholder="Chọn hoặc nhập tên khu vực"
                            />
                            <datalist id="area-list">
                                {areaList.map(item => <option key={item} value={item} />)}
                            </datalist>
                        </div>
                    ) : (
                        <div>
                            <label htmlFor="equipment-select" className="block text-sm font-medium text-slate-600">Chọn Thiết bị (*)</label>
                            <input
                                id="equipment-select"
                                type="text"
                                name="areaOrEquipment"
                                value={formData.areaOrEquipment}
                                onChange={handleChange}
                                required
                                list="equipment-list"
                                className="mt-1 block w-full border rounded-md p-2"
                                placeholder="Chọn hoặc nhập tên thiết bị"
                            />
                            <datalist id="equipment-list">
                                {equipmentList.map(item => <option key={item} value={item} />)}
                            </datalist>
                        </div>
                    )}
                    <div>
                        <label className="block text-sm font-medium text-slate-600">Phương pháp khử nhiễm (*)</label>
                        <input type="text" name="method" value={formData.method} onChange={handleChange} required placeholder="VD: Lau bề mặt, chiếu tia UV" className="mt-1 block w-full border rounded-md p-2"/>
                    </div>
                     <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-slate-600">Hóa chất sử dụng</label>
                            <input type="text" name="chemicalUsed" value={formData.chemicalUsed || ''} onChange={handleChange} placeholder="VD: Cồn 70%, Javel" className="mt-1 block w-full border rounded-md p-2"/>
                        </div>
                         <div>
                            <label className="block text-sm font-medium text-slate-600">Nồng độ & Thể tích</label>
                            <input type="text" name="concentrationAndVolume" value={formData.concentrationAndVolume || ''} onChange={handleChange} placeholder="VD: 1%, 5L" className="mt-1 block w-full border rounded-md p-2"/>
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-600">Thời gian tiếp xúc</label>
                        <input type="text" name="contactTime" value={formData.contactTime || ''} onChange={handleChange} placeholder="VD: 30 phút" className="mt-1 block w-full border rounded-md p-2"/>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-600">Người thực hiện</label>
                        <input type="text" name="performedBy" value={formData.performedBy} readOnly className="mt-1 block w-full border rounded-md p-2 bg-slate-100"/>
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

export default DecontaminationLogFormModal;