import React, { useState, useEffect, useMemo, useRef } from 'react';
import { LabEquipment, PersonnelProfile, EquipmentUsageLog, User, AccessLog, WorkItem } from '../types';
import { PlusCircleIcon } from './icons/PlusCircleIcon';

interface EquipmentUsageLogFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: Omit<EquipmentUsageLog, 'id'> | EquipmentUsageLog) => void;
  initialData?: EquipmentUsageLog | null;
  equipmentList: LabEquipment[];
  userList: PersonnelProfile[];
  currentUser: User | null;
  accessLogs: AccessLog[];
  workItems: WorkItem[];
  onAddWorkItem: (item: Omit<WorkItem, 'id'>) => void;
}

const EquipmentUsageLogFormModal: React.FC<EquipmentUsageLogFormModalProps> = (props) => {
    const { 
        isOpen, onClose, onSubmit, initialData, equipmentList, userList, currentUser, accessLogs,
        workItems, onAddWorkItem 
    } = props;
    
    const [useCurrentTime, setUseCurrentTime] = useState(!initialData);
    const [suggestions, setSuggestions] = useState<WorkItem[]>([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const suggestionBoxRef = useRef<HTMLDivElement>(null);


    const allUsers = useMemo(() => {
        const users: { id: string; name: string }[] = userList.map(u => ({ id: u.id, name: u.fullName }));
        const userNameSet = new Set(userList.map(u => u.fullName));

        accessLogs.forEach(log => {
            if (!userNameSet.has(log.personOrUnit)) {
                users.push({ id: log.personOrUnit, name: log.personOrUnit });
                userNameSet.add(log.personOrUnit);
            }
        });
        
        return users.sort((a,b) => a.name.localeCompare(b.name, 'vi'));
    }, [userList, accessLogs]);

    const getInitialState = () => {
        const now = new Date();
        const firstEquipment = equipmentList[0];
        const currentUserId = userList.find(u => u.fullName === currentUser?.fullName)?.id;
        
        return {
            equipmentId: initialData?.equipmentId || firstEquipment?.id || '',
            userId: initialData?.userId || currentUserId || allUsers[0]?.id || '',
            date: initialData?.date || now.toISOString().split('T')[0],
            startTime: initialData?.startTime || now.toTimeString().substring(0, 5),
            endTime: initialData?.endTime || now.toTimeString().substring(0, 5),
            maintenancePerformed: initialData?.maintenancePerformed || '',
            qualityCheck: initialData?.qualityCheck || 'n/a' as EquipmentUsageLog['qualityCheck'],
            qualityCheckDetails: initialData?.qualityCheckDetails || '',
            incidents: initialData?.incidents || '',
            correctiveAction: initialData?.correctiveAction || '',
            usageStatus: initialData?.usageStatus || 'Hoạt động tốt' as EquipmentUsageLog['usageStatus'],
            notes: initialData?.notes || '',
        }
    };
    
    const [formData, setFormData] = useState(getInitialState());
   
    useEffect(() => {
        if (isOpen) {
            setUseCurrentTime(!initialData);
            setFormData(getInitialState());
        }
    }, [isOpen, initialData, equipmentList, userList, currentUser, accessLogs]);
    
    useEffect(() => {
        let timer: number;
        if (isOpen && useCurrentTime && !initialData) {
            timer = window.setInterval(() => {
                const now = new Date();
                setFormData(prev => ({
                    ...prev,
                    date: now.toISOString().split('T')[0],
                    startTime: now.toTimeString().substring(0, 5),
                }));
            }, 1000);
        }
        return () => clearInterval(timer);
    }, [isOpen, useCurrentTime, initialData]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (suggestionBoxRef.current && !suggestionBoxRef.current.contains(event.target as Node)) {
                setShowSuggestions(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({...prev, [name]: value}));
        
        if (name === 'maintenancePerformed' && value.trim().length > 0) {
            const filtered = workItems.filter(item => 
                item.description.toLowerCase().includes(value.toLowerCase())
            );
            setSuggestions(filtered);
            setShowSuggestions(true);
        } else {
            setShowSuggestions(false);
        }
    };

    const handleSuggestionClick = (description: string) => {
        setFormData(prev => ({ ...prev, maintenancePerformed: description }));
        setShowSuggestions(false);
        setSuggestions([]);
    };

    const handleAddNewWorkItem = () => {
        const newDescription = formData.maintenancePerformed.trim();
        if (!newDescription) {
            alert('Vui lòng nhập nội dung công việc trước khi thêm.');
            return;
        }
        onAddWorkItem({ description: newDescription });
    };
    
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (initialData) {
            onSubmit({ ...initialData, ...formData });
        } else {
            onSubmit(formData);
        }
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
            <div className="bg-white rounded-lg shadow-xl p-6 m-4 w-full max-w-2xl max-h-[90vh] flex flex-col">
                <div className="flex justify-between items-center border-b pb-3">
                    <h2 className="text-xl font-semibold text-slate-700">
                        {initialData ? 'Chỉnh sửa Nhật ký' : 'Ghi nhận Nhật ký Sử dụng Thiết bị'}
                    </h2>
                    <button onClick={onClose} className="text-slate-500 hover:text-slate-800">&times;</button>
                </div>
                <form onSubmit={handleSubmit} className="mt-4 space-y-4 flex-grow overflow-y-auto pr-2">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                         <div>
                            <label className="block text-sm font-medium text-slate-600">Thiết bị (*)</label>
                            <select name="equipmentId" value={formData.equipmentId} onChange={handleChange} required className="mt-1 block w-full border border-slate-300 rounded-md p-2 bg-white text-slate-900">
                                {equipmentList.map(e => <option key={e.id} value={e.id}>{e.name}</option>)}
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-600">Người sử dụng (*)</label>
                            <select name="userId" value={formData.userId} onChange={handleChange} required className="mt-1 block w-full border border-slate-300 rounded-md p-2 bg-white text-slate-900">
                                {allUsers.map(u => <option key={u.id} value={u.id}>{u.name}</option>)}
                            </select>
                        </div>
                    </div>
                    
                    {!initialData && (
                        <div className="flex items-center">
                            <input
                                id="useCurrentTime"
                                type="checkbox"
                                checked={useCurrentTime}
                                onChange={(e) => setUseCurrentTime(e.target.checked)}
                                className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                            />
                            <label htmlFor="useCurrentTime" className="ml-2 block text-sm text-slate-700">
                                Ghi nhận thời gian bắt đầu theo thời gian thực
                            </label>
                        </div>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex gap-2">
                            <div>
                                <label className="block text-sm font-medium text-slate-600">Ngày (*)</label>
                                <input type="date" name="date" value={formData.date} onChange={handleChange} required disabled={useCurrentTime && !initialData} className="mt-1 block w-full border border-slate-300 rounded-md p-2 bg-white disabled:bg-slate-100 disabled:text-slate-500 text-slate-900"/>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-600">Bắt đầu (*)</label>
                                <input type="time" name="startTime" value={formData.startTime} onChange={handleChange} required disabled={useCurrentTime && !initialData} className="mt-1 block w-full border border-slate-300 rounded-md p-2 bg-white disabled:bg-slate-100 disabled:text-slate-500 text-slate-900"/>
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-600">Kết thúc (*)</label>
                            <input type="time" name="endTime" value={formData.endTime} onChange={handleChange} required className="mt-1 block w-full border border-slate-300 rounded-md p-2 bg-white text-slate-900"/>
                        </div>
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-slate-600">Trạng thái khi sử dụng (*)</label>
                            <select name="usageStatus" value={formData.usageStatus} onChange={handleChange} required className="mt-1 block w-full border border-slate-300 rounded-md p-2 bg-white text-slate-900">
                                <option value="Hoạt động tốt">Hoạt động tốt</option>
                                <option value="Có vấn đề nhỏ">Có vấn đề nhỏ</option>
                                <option value="Gặp sự cố">Gặp sự cố</option>
                            </select>
                        </div>
                    </div>
                     <div ref={suggestionBoxRef} className="md:col-span-2 relative">
                        <div className="flex justify-between items-center mb-1">
                            <label className="block text-sm font-medium text-slate-600">Nội dung bảo trì, bảo dưỡng</label>
                            <button
                                type="button"
                                onClick={handleAddNewWorkItem}
                                className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-800"
                                title="Thêm nội dung này vào danh mục công việc"
                            >
                                <PlusCircleIcon className="w-5 h-5"/>
                                <span>Thêm vào danh mục</span>
                            </button>
                        </div>
                        <textarea
                            name="maintenancePerformed"
                            value={formData.maintenancePerformed}
                            onChange={handleChange}
                            rows={3}
                            placeholder="Gõ để tìm hoặc nhập mới công việc bảo trì..."
                            className="mt-1 block w-full border border-slate-300 rounded-md p-2 bg-white text-slate-900"
                        />
                        {showSuggestions && suggestions.length > 0 && (
                            <ul className="absolute z-10 w-full bg-white border border-slate-300 rounded-md shadow-lg max-h-40 overflow-y-auto mt-1">
                                {suggestions.map(suggestion => (
                                    <li
                                        key={suggestion.id}
                                        onClick={() => handleSuggestionClick(suggestion.description)}
                                        className="px-3 py-2 text-sm text-slate-700 cursor-pointer hover:bg-slate-100"
                                    >
                                        {suggestion.description}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>

                    <fieldset className="space-y-2">
                        <legend className="block text-sm font-medium text-slate-600">Kiểm tra chất lượng</legend>
                        <div className="flex items-center gap-6">
                             <label className="flex items-center">
                                <input type="radio" name="qualityCheck" value="yes" checked={formData.qualityCheck === 'yes'} onChange={handleChange} className="h-4 w-4 text-blue-600 border-slate-300"/>
                                <span className="ml-2 text-sm text-slate-700">Có</span>
                            </label>
                            <label className="flex items-center">
                                <input type="radio" name="qualityCheck" value="no" checked={formData.qualityCheck === 'no'} onChange={handleChange} className="h-4 w-4 text-blue-600 border-slate-300"/>
                                <span className="ml-2 text-sm text-slate-700">Không</span>
                            </label>
                             <label className="flex items-center">
                                <input type="radio" name="qualityCheck" value="n/a" checked={formData.qualityCheck === 'n/a'} onChange={handleChange} className="h-4 w-4 text-blue-600 border-slate-300"/>
                                <span className="ml-2 text-sm text-slate-700">Không thực hiện</span>
                            </label>
                        </div>
                        {formData.qualityCheck !== 'n/a' && (
                             <div>
                                <label htmlFor="qualityCheckDetails" className="sr-only">Chi tiết Kiểm tra chất lượng</label>
                                <textarea id="qualityCheckDetails" name="qualityCheckDetails" value={formData.qualityCheckDetails} onChange={handleChange} rows={2} placeholder="Chi tiết, VD: Chạy QC đầu ngày, kết quả đạt." className="mt-2 block w-full border border-slate-300 rounded-md p-2 bg-white text-slate-900"></textarea>
                            </div>
                        )}
                    </fieldset>

                     <div>
                        <label className="block text-sm font-medium text-slate-600">Sự cố thiết bị / nội kiểm</label>
                        <textarea name="incidents" value={formData.incidents} onChange={handleChange} rows={2} placeholder="VD: Máy báo lỗi Error 123, QC Glucose control 2 vượt 2SD." className="mt-1 block w-full border border-slate-300 rounded-md p-2 bg-white text-slate-900"></textarea>
                    </div>
                     <div>
                        <label className="block text-sm font-medium text-slate-600">Hành động khắc phục</label>
                        <textarea name="correctiveAction" value={formData.correctiveAction} onChange={handleChange} rows={2} placeholder="VD: Khởi động lại máy, chạy lại QC." className="mt-1 block w-full border border-slate-300 rounded-md p-2 bg-white text-slate-900"></textarea>
                    </div>
                     <div>
                        <label className="block text-sm font-medium text-slate-600">Ghi chú</label>
                        <textarea name="notes" value={formData.notes} onChange={handleChange} rows={2} className="mt-1 block w-full border border-slate-300 rounded-md p-2 bg-white text-slate-900"></textarea>
                    </div>
                    <div className="mt-6 flex justify-end gap-3 border-t pt-4">
                        <button type="button" onClick={onClose} className="px-4 py-2 bg-slate-200 text-slate-800 rounded-md hover:bg-slate-300">Hủy</button>
                        <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">Lưu</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EquipmentUsageLogFormModal;