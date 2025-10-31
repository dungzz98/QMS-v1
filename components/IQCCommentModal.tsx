import React, { useState, useEffect } from 'react';
import { IQCResult, TestParameter, ControlMaterial } from '../types';

interface IQCCommentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (resultId: string, notes: string) => void;
  result: IQCResult | null;
  test?: TestParameter;
  control?: ControlMaterial;
}

const IQCCommentModal: React.FC<IQCCommentModalProps> = ({ isOpen, onClose, onSubmit, result, test, control }) => {
  const [notes, setNotes] = useState('');

  useEffect(() => {
    if (result) {
      setNotes(result.notes || '');
    }
  }, [result]);

  if (!isOpen || !result) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(result.id, notes);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
      <div className="bg-white rounded-lg shadow-xl p-6 m-4 w-full max-w-lg">
        <div className="flex justify-between items-center border-b pb-3">
          <h2 className="text-xl font-semibold text-slate-700">Thêm Nhận xét cho Kết quả IQC</h2>
          <button onClick={onClose} className="text-slate-500 hover:text-slate-800">&times;</button>
        </div>
        <div className="mt-4 bg-slate-50 p-3 rounded-md text-sm">
            <p><strong>Xét nghiệm:</strong> {test?.name}</p>
            <p><strong>Control:</strong> {control?.level} (Lô: {control?.lotNumber})</p>
            <p><strong>Ngày:</strong> {new Date(result.date).toLocaleString('vi-VN')}</p>
            <p><strong>Kết quả:</strong> <span className="font-bold">{result.value}</span></p>
        </div>
        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-600">Nhận xét / Ghi chú</label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={4}
              className="mt-1 block w-full border border-slate-300 rounded-md shadow-sm p-2 bg-white text-slate-900"
              placeholder="Nhập nguyên nhân, hành động khắc phục..."
            />
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

export default IQCCommentModal;
