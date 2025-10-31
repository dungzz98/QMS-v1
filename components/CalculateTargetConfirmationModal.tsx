import React from 'react';
import { TestParameter, ControlMaterial } from '../types';

interface CalculateTargetConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  data: {
    mean: number;
    sd: number;
    test: TestParameter;
    control: ControlMaterial;
    count: number;
  } | null;
}

const CalculateTargetConfirmationModal: React.FC<CalculateTargetConfirmationModalProps> = ({ isOpen, onClose, onConfirm, data }) => {
  if (!isOpen || !data) return null;

  const { mean, sd, test, control, count } = data;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center" aria-modal="true" role="dialog">
      <div className="bg-white rounded-lg shadow-xl p-6 m-4 w-full max-w-lg">
        <div className="flex justify-between items-start border-b pb-3">
          <h2 className="text-xl font-semibold text-slate-700">Xác nhận Target Mới</h2>
          <button onClick={onClose} className="text-slate-500 hover:text-slate-800 text-3xl leading-none" aria-label="Đóng">&times;</button>
        </div>
        <div className="mt-4 text-slate-600 space-y-3">
            <p>Các giá trị sau đã được tính toán từ <strong>{count}</strong> điểm dữ liệu cho:</p>
            <div className="text-sm bg-slate-50 p-3 rounded-md border">
                <p><strong>Xét nghiệm:</strong> {test.name}</p>
                <p><strong>Vật liệu Control:</strong> {control.name} - {control.level} (Lô: {control.lotNumber})</p>
            </div>
            <div className="my-4 p-4 bg-blue-50 rounded-lg text-center">
                <p className="text-sm font-medium text-slate-600">Mean mới:</p>
                <p className="font-mono text-xl font-bold text-blue-700">{mean.toFixed(4)}</p>
                <p className="text-sm font-medium text-slate-600 mt-2">SD mới:</p>
                <p className="font-mono text-xl font-bold text-blue-700">{sd.toFixed(4)}</p>
            </div>
            <p>Bạn có muốn lưu các giá trị này làm target mới không? (Nếu đã có, target cũ sẽ bị ghi đè)</p>
        </div>
        <div className="mt-6 flex justify-end gap-3">
          <button type="button" onClick={onClose} className="px-4 py-2 bg-slate-200 text-slate-800 rounded-md hover:bg-slate-300">
            Hủy
          </button>
          <button type="button" onClick={onConfirm} className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
            Lưu làm Target
          </button>
        </div>
      </div>
    </div>
  );
};

export default CalculateTargetConfirmationModal;
