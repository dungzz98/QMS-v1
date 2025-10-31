import React from 'react';
import { CheckBadgeIcon } from './icons/CheckBadgeIcon';

interface RestoreProgressModalProps {
  isOpen: boolean;
  progress: number;
}

const RestoreProgressModal: React.FC<RestoreProgressModalProps> = ({ isOpen, progress }) => {
  if (!isOpen) return null;

  const isComplete = progress === 100;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center" aria-modal="true" role="dialog">
      <div className="bg-white rounded-lg shadow-xl p-8 m-4 w-full max-w-md">
        <h2 className="text-xl font-semibold text-slate-700 text-center mb-4">
            {isComplete ? 'Phục hồi Hoàn tất!' : 'Đang phục hồi dữ liệu...'}
        </h2>
        <div className="space-y-2">
          <div className="w-full bg-slate-200 rounded-full h-4">
            <div
              className={`h-4 rounded-full transition-all duration-300 ease-linear ${isComplete ? 'bg-green-500' : 'bg-blue-600'}`}
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <p className="text-center text-sm font-medium text-slate-600">{progress}%</p>
        </div>
        {isComplete && (
            <div className="mt-4 text-center text-green-700 flex items-center justify-center gap-2">
                <CheckBadgeIcon className="w-5 h-5" />
                <p>Trang sẽ được tải lại sau giây lát...</p>
            </div>
        )}
      </div>
    </div>
  );
};

export default RestoreProgressModal;
