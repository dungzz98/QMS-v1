import React, { useState, useEffect } from 'react';
import { SystemEvent, User } from '../types';

interface SystemEventFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: Omit<SystemEvent, 'id'> | SystemEvent) => void;
  initialData?: SystemEvent | null;
  currentUser: User | null;
}

const SystemEventFormModal: React.FC<SystemEventFormModalProps> = ({ isOpen, onClose, onSubmit, initialData, currentUser }) => {
    const getInitialState = () => ({
        type: 'error' as SystemEvent['type'],
        description: '',
        status: 'open' as SystemEvent['status'],
    });

    const [formData, setFormData] = useState(getInitialState());

    useEffect(() => {
        if (isOpen) {
            if (initialData) {
                setFormData({
                    type: initialData.type,
                    description: initialData.description,
                    status: initialData.status,
                });
            } else {
                setFormData(getInitialState());
            }
        }
    }, [initialData, isOpen]);

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLTextAreaElement>) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value as any }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const eventData = {
            ...formData,
            timestamp: new Date().toISOString(),
            user: currentUser?.fullName || 'N/A',
        };

        if (initialData?.id) {
            onSubmit({ ...initialData, ...eventData });
        } else {
            onSubmit(eventData);
        }
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
            <div className="bg-white rounded-lg shadow-xl p-6 m-4 w-full max-w-lg">
                <div className="flex justify-between items-center border-b pb-3">
                    <h2 className="text-xl font-semibold text-slate-700">
                        {initialData ? 'Cập nhật Sự kiện' : 'Ghi nhận Sự kiện Hệ thống'}
                    </h2>
                    <button onClick={onClose} className="text-slate-500 hover:text-slate-800">&times;</button>
                </div>
                <form onSubmit={handleSubmit} className="mt-4 space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-slate-600">Loại sự kiện (*)</label>
                        <select name="type" value={formData.type} onChange={handleChange} required className="mt-1 block w-full border border-slate-300 rounded-md p-2">
                            <option value="error">Lỗi hệ thống</option>
                            <option value="maintenance">Bảo trì</option>
                            <option value="update">Cập nhật</option>
                            <option value="backup">Sao lưu</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-600">Mô tả chi tiết (*)</label>
                        <textarea name="description" value={formData.description} onChange={handleChange} required rows={4} className="mt-1 block w-full border border-slate-300 rounded-md p-2"></textarea>
                    </div>
                     <div>
                        <label className="block text-sm font-medium text-slate-600">Trạng thái (*)</label>
                        <select name="status" value={formData.status} onChange={handleChange} required className="mt-1 block w-full border border-slate-300 rounded-md p-2">
                            <option value="open">Đang mở</option>
                            <option value="resolved">Đã giải quyết</option>
                        </select>
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

export default SystemEventFormModal;
