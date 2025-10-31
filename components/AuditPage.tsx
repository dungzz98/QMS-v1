import React, { useState, useMemo } from 'react';
// FIX: Corrected imports by removing 'Document' which is not exported, and adding 'AssessmentEvidence' which is used in this file.
import { Assessment, AssessmentFinding, AssessmentStatus, User, ChecklistChapter, AssessmentEvidence } from '../types';
import { checklistData } from '../checklistData';
import { PlusIcon } from './icons/PlusIcon';
import { ArrowLeftIcon } from './icons/ArrowLeftIcon';
import { DocumentArrowUpIcon } from './icons/DocumentArrowUpIcon';
import { EyeIcon } from './icons/EyeIcon';
import { TrashIcon } from './icons/TrashIcon';

interface AssessmentPageProps {
    assessments: Assessment[];
    onSave: (assessment: Omit<Assessment, 'id'> | Assessment) => void;
    onDelete: (id: string) => void;
    currentUser: User | null;
    onViewDocument: (doc: any) => void;
}

const AssessmentListPage: React.FC<{ assessments: Assessment[], onSelect: (assessment: Assessment) => void, onNew: () => void }> = ({ assessments, onSelect, onNew }) => (
    <div className="bg-white p-6 rounded-lg shadow-lg">
        <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-slate-800">Các đợt Đánh giá</h2>
            <button onClick={onNew} className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                <PlusIcon /> Tạo đợt Đánh giá mới
            </button>
        </div>
        <div className="space-y-4">
            {assessments.map(asm => (
                <div key={asm.id} className="p-4 border rounded-lg flex justify-between items-center hover:bg-slate-50 cursor-pointer" onClick={() => onSelect(asm)}>
                    <div>
                        <p className="font-bold text-blue-700">{asm.title}</p>
                        <p className="text-sm text-slate-500">Người đánh giá: {asm.assessor} - Ngày: {asm.date}</p>
                    </div>
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${asm.status === 'completed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                        {asm.status === 'completed' ? 'Hoàn thành' : 'Đang thực hiện'}
                    </span>
                </div>
            ))}
        </div>
    </div>
);

const AssessmentDetailPage: React.FC<{ assessment: Assessment, onBack: () => void, onSave: (assessment: Assessment) => void, onViewDocument: (doc: any) => void }> = ({ assessment, onBack, onSave, onViewDocument }) => {
    const [findings, setFindings] = useState<Assessment['findings']>(assessment.findings);
    const [activeChapterId, setActiveChapterId] = useState<string>(checklistData[0].id);

    const activeChapter = useMemo(() => checklistData.find(c => c.id === activeChapterId), [activeChapterId]);

    const handleFindingChange = (criterionId: string, newFinding: Partial<AssessmentFinding>) => {
        setFindings(prev => ({
            ...prev,
            [criterionId]: {
                ...prev[criterionId],
                criterionId,
                status: prev[criterionId]?.status || 'Không áp dụng',
                notes: prev[criterionId]?.notes || '',
                evidence: prev[criterionId]?.evidence || [],
                ...newFinding,
            }
        }));
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, criterionId: string) => {
        const file = e.target.files?.[0];
        if (file) {
          const reader = new FileReader();
          reader.onload = (loadEvent) => {
            const result = loadEvent.target?.result as string;
            const base64String = result.split(',')[1];
            const newEvidence: AssessmentEvidence = {
                id: `ev-${Date.now()}`,
                fileName: file.name,
                fileType: file.type,
                fileData: base64String,
            };
            const currentEvidence = findings[criterionId]?.evidence || [];
            handleFindingChange(criterionId, { evidence: [...currentEvidence, newEvidence] });
          };
          reader.readAsDataURL(file);
        }
    };
    
    const handleDeleteEvidence = (criterionId: string, evidenceId: string) => {
        const currentEvidence = findings[criterionId]?.evidence || [];
        handleFindingChange(criterionId, { evidence: currentEvidence.filter(ev => ev.id !== evidenceId) });
    };

    const handleSave = () => {
        onSave({ ...assessment, findings });
        alert('Đã lưu kết quả đánh giá!');
    };

    const getChapterStats = (chapter: ChecklistChapter) => {
        let appliedCount = 0;
        let đạtCount = 0;
        chapter.criteria.forEach(crit => {
            const status = findings[crit.id]?.status;
            if(status === 'Đạt' || status === 'Không đạt') {
                appliedCount++;
                if(status === 'Đạt') đạtCount++;
            }
        });
        return { appliedCount, đạtCount };
    };

    const totalStats = useMemo(() => {
        let totalCriteria = 0;
        let totalApplied = 0;
        let totalĐạt = 0;
        checklistData.forEach(chap => {
            totalCriteria += chap.criteriaCount;
            const { appliedCount, đạtCount } = getChapterStats(chap);
            totalApplied += appliedCount;
            totalĐạt += đạtCount;
        });
        return { totalCriteria, totalApplied, totalĐạt };
    }, [findings]);
    

    return (
        <div className="bg-white p-6 rounded-lg shadow-lg">
            <div className="flex justify-between items-center mb-4">
                <button onClick={onBack} className="flex items-center gap-2 text-sm text-blue-600 hover:underline"><ArrowLeftIcon/> Quay lại danh sách</button>
                <button onClick={handleSave} className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700">Lưu thay đổi</button>
            </div>
            <h2 className="text-xl font-bold text-slate-800">{assessment.title}</h2>
            <p className="text-sm text-slate-500 mb-6">Người đánh giá: {assessment.assessor} - Ngày: {assessment.date}</p>
            
            <div className="flex flex-col md:flex-row gap-8">
                {/* Sidebar */}
                <aside className="w-full md:w-1/3 border-r pr-4">
                    <h3 className="font-bold text-slate-700 mb-2">Các chương</h3>
                    <ul className="space-y-1">
                        {checklistData.map(chapter => {
                            const stats = getChapterStats(chapter);
                            return (
                                <li key={chapter.id}>
                                    <button onClick={() => setActiveChapterId(chapter.id)} className={`w-full text-left p-2 rounded-md text-sm ${activeChapterId === chapter.id ? 'bg-blue-100 font-bold' : 'hover:bg-slate-50'}`}>
                                        {chapter.title}
                                        <span className="block text-xs font-normal text-slate-500 mt-1">
                                            {stats.đạtCount} / {stats.appliedCount} / {chapter.criteriaCount} (Đạt/Áp dụng/Tổng)
                                        </span>
                                    </button>
                                </li>
                            )
                        })}
                    </ul>
                    <div className="mt-4 p-2 border-t text-sm">
                        <p className="font-bold">Tổng cộng:</p>
                        <p>{totalStats.totalĐạt} / {totalStats.totalApplied} / {totalStats.totalCriteria} (Đạt/Áp dụng/Tổng)</p>
                        <p>Tỷ lệ đạt: {totalStats.totalApplied > 0 ? ((totalStats.totalĐạt / totalStats.totalApplied) * 100).toFixed(2) : '0.00'}%</p>
                    </div>
                </aside>
                {/* Main Content */}
                <main className="w-full md:w-2/3">
                    {activeChapter && (
                        <div>
                            <h3 className="text-lg font-bold text-slate-800">{activeChapter.title}</h3>
                            <div className="mt-4 space-y-6">
                                {activeChapter.criteria.map(criterion => {
                                    const finding = findings[criterion.id];
                                    return (
                                        <div key={criterion.id} className="p-4 border rounded-lg bg-slate-50">
                                            <p className="font-semibold text-slate-700">{criterion.id}. {criterion.name}</p>
                                            <p className="text-xs text-slate-500 mt-1"><strong>Minh chứng:</strong> {criterion.evidence}</p>
                                            
                                            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <div>
                                                    <label className="block text-sm font-medium text-slate-600">Đánh giá</label>
                                                    <select 
                                                        value={finding?.status || 'Không áp dụng'}
                                                        onChange={(e) => handleFindingChange(criterion.id, { status: e.target.value as AssessmentStatus })}
                                                        className="mt-1 w-full p-2 border rounded-md"
                                                    >
                                                        <option value="Đạt">Đạt</option>
                                                        <option value="Không đạt">Không đạt</option>
                                                        <option value="Không áp dụng">Không áp dụng</option>
                                                    </select>
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-slate-600">Minh chứng</label>
                                                    <label className="mt-1 cursor-pointer inline-flex items-center px-3 py-2 bg-white text-sm text-slate-700 border border-slate-300 rounded-md shadow-sm hover:bg-slate-50">
                                                        <DocumentArrowUpIcon className="w-4 h-4 mr-2"/>
                                                        Tải lên
                                                        <input type="file" className="hidden" onChange={(e) => handleFileChange(e, criterion.id)} />
                                                    </label>
                                                </div>
                                            </div>
                                            <div className="mt-2">
                                                <label className="block text-sm font-medium text-slate-600">Ghi chú/Phát hiện</label>
                                                <textarea 
                                                    value={finding?.notes || ''}
                                                    onChange={(e) => handleFindingChange(criterion.id, { notes: e.target.value })}
                                                    rows={2} 
                                                    className="mt-1 w-full p-2 border rounded-md"
                                                />
                                            </div>
                                            <div className="mt-2 space-y-1">
                                                {(finding?.evidence || []).map(ev => (
                                                    <div key={ev.id} className="flex items-center justify-between bg-white p-1.5 rounded-md text-sm">
                                                        <span>{ev.fileName}</span>
                                                        <div className="flex gap-2">
                                                            {/* FIX: Pass an object to onViewDocument that is compatible with DocumentViewerModal by adding a title and uploadedAt property. */}
                                                            <button onClick={() => onViewDocument({ ...ev, title: ev.fileName, uploadedAt: new Date().toISOString() })} className="text-blue-600"><EyeIcon className="w-4 h-4"/></button>
                                                            <button onClick={() => handleDeleteEvidence(criterion.id, ev.id)} className="text-red-500"><TrashIcon className="w-4 h-4"/></button>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
};


const AssessmentPage: React.FC<AssessmentPageProps> = ({ assessments, onSave, onDelete, currentUser, onViewDocument }) => {
    const [selectedAssessment, setSelectedAssessment] = useState<Assessment | null>(null);

    const handleNewAssessment = () => {
        const newAssessment: Omit<Assessment, 'id'> = {
            title: `Đợt đánh giá ngày ${new Date().toLocaleDateString('vi-VN')}`,
            assessor: currentUser?.fullName || '',
            date: new Date().toISOString().split('T')[0],
            status: 'in_progress',
            findings: {}
        };
        onSave(newAssessment);
        // After saving, we'd ideally get the new assessment with ID back to select it.
        // For now, we just go back to the list where it will appear.
    };

    if (selectedAssessment) {
        return <AssessmentDetailPage assessment={selectedAssessment} onBack={() => setSelectedAssessment(null)} onSave={onSave} onViewDocument={onViewDocument} />;
    }

    return <AssessmentListPage assessments={assessments} onSelect={setSelectedAssessment} onNew={handleNewAssessment} />;
};

export default AssessmentPage;