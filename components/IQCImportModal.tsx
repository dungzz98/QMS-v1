import React, { useState } from 'react';
import { ImportIcon } from './icons/ImportIcon';
import { DownloadIcon } from './icons/DownloadIcon';

interface IQCImportModalProps {
  isOpen: boolean;
  onClose: () => void;
  onImport: (file: File) => void;
  onDownloadTemplate: () => void;
}

const IQCImportModal: React.FC<IQCImportModalProps> = ({ isOpen, onClose, onImport, onDownloadTemplate }) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [error, setError] = useState('');

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setError('');
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      if (file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' || file.name.endsWith('.xlsx')) {
        setSelectedFile(file);
      } else {
        setError('Vui lòng chọn một file Excel (.xlsx).');
        setSelectedFile(null);
      }
    }
  };

  const handleImportSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFile) {
      setError('Vui lòng chọn một file để nhập.');
      return;
    }
    onImport(selectedFile);
    setSelectedFile(null);
    onClose();
  };
  
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
      <div className="bg-white rounded-lg shadow-xl p-6 m-4 w-full max-w-lg">
        <div className="flex justify-between items-center border-b pb-3">
          <h2 className="text-xl font-semibold text-slate-700">Nhập Kết quả Nội kiểm từ Excel</h2>
          <button onClick={onClose} className="text-slate-500 hover:text-slate-800 text-3xl leading-none">&times;</button>
        </div>
        
        <div className="mt-4">
          <p className="text-sm text-slate-500 mb-4">
            Nhập hàng loạt kết quả nội kiểm bằng cách tải lên file Excel.
            Hãy chắc chắn rằng file của bạn tuân thủ đúng định dạng của file mẫu.
          </p>
          <button
            onClick={onDownloadTemplate}
            className="w-full mb-6 inline-flex items-center justify-center rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm hover:bg-slate-50"
          >
            <DownloadIcon className="w-5 h-5 mr-2" />
            Tải file mẫu
          </button>

          <form onSubmit={handleImportSubmit} className="space-y-4">
            <div>
              <label htmlFor="iqc-file-upload" className="block text-sm font-medium text-slate-600 mb-2">
                Chọn File Excel (.xlsx)
              </label>
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-slate-300 border-dashed rounded-md">
                <div className="space-y-1 text-center">
                   <svg className="mx-auto h-12 w-12 text-slate-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                    <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <div className="flex text-sm text-slate-600">
                    <label htmlFor="iqc-file-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500">
                      <span>Tải lên một file</span>
                      <input id="iqc-file-upload" name="iqc-file-upload" type="file" className="sr-only" onChange={handleFileChange} accept=".xlsx" />
                    </label>
                    <p className="pl-1">hoặc kéo và thả</p>
                  </div>
                   {selectedFile ? 
                      <p className="text-xs text-slate-700 mt-2">File đã chọn: <span className="font-medium">{selectedFile.name}</span></p> :
                      <p className="text-xs text-slate-500">Chỉ chấp nhận file .xlsx</p>
                   }
                </div>
              </div>
            </div>
            
            {error && <p className="text-sm text-red-600">{error}</p>}

            <div className="mt-6 flex justify-end gap-3">
                <button type="button" onClick={onClose} className="px-4 py-2 bg-slate-200 text-slate-800 rounded-md hover:bg-slate-300">Hủy</button>
                <button type="submit" className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:bg-green-300" disabled={!selectedFile}>
                    <ImportIcon className="w-5 h-5 mr-2" />
                    Bắt đầu Nhập
                </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default IQCImportModal;
