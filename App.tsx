import React, { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import LoginPage from './components/LoginPage';
import WarehouseManagementPage from './components/WarehouseManagementPage';
import QualityManagementPage from './components/QualityManagementPage';
import EnvironmentSafetyPage from './components/EnvironmentSafetyPage';
import PersonnelPage from './components/PersonnelPage';
import EquipmentPage from './components/EquipmentPage';
import DocumentsPage from './components/DocumentsPage';
import CustomerServicePage from './components/CustomerServicePage';
import ContinuousImprovementPage from './components/ContinuousImprovementPage';
import OrganizationPage from './components/OrganizationPage';
import SettingsPage from './components/SettingsPage';
import InformationManagementPage from './components/InformationManagementPage';
import AssessmentPage from './components/AuditPage';
import DataManagementPage from './components/DataManagementPage';
import AlertsPage from './components/AlertsPage';
import PersonnelFormModal from './components/PersonnelFormModal';
import TraineeFormModal from './components/TraineeFormModal';
import EquipmentFormModal from './components/EquipmentFormModal';
import EquipmentDetailModal from './components/EquipmentDetailModal';
import MaintenanceLogFormModal from './components/MaintenanceLogFormModal';
import CalibrationLogFormModal from './components/CalibrationLogFormModal';
import EquipmentDocumentFormModal, { EquipmentDocumentFormData } from './components/EquipmentDocumentFormModal';
import EquipmentUsageLogFormModal from './components/EquipmentUsageLogFormModal';
import DocumentViewerModal from './components/DocumentViewerModal';
import JobRoleFormModal from './components/JobRoleFormModal';
import OrganizationUnitFormModal from './components/OrganizationUnitFormModal';
import PersonnelDetailModal from './components/PersonnelDetailModal';
import PersonnelDocumentFormModal, { PersonnelDocumentFormData } from './components/PersonnelDocumentFormModal';
import LeaveFormModal from './components/LeaveFormModal';
import AttendanceFormModal from './components/AttendanceFormModal';
import DutyAssignmentFormModal from './components/DutyAssignmentFormModal';
import TaskAssignmentFormModal from './components/TaskAssignmentFormModal';
import MovePersonnelModal from './components/MovePersonnelModal';
import ConfirmationModal from './components/ConfirmationModal';
import ChemicalFormModal from './components/ChemicalFormModal';
import AdjustQuantityModal from './components/AdjustQuantityModal';
import UsageLogModal from './components/UsageLogModal';
import SafetyInfoModal from './components/SafetyInfoModal';
import BarcodeModal from './components/BarcodeModal';
import SafetyDocumentModal from './components/SafetyDocumentModal';
import MoveToInstrumentModal from './components/MoveToInstrumentModal';
import OnInstrumentAdjustModal, { OnInstrumentAdjustData } from './components/OnInstrumentAdjustModal';
import PlanningSlipModal from './components/PlanningSlipModal';
import DisposalFormModal from './components/DisposalFormModal';
import DisposalPrintView from './components/DisposalPrintView';
import TrainingCourseFormModal from './components/TrainingCourseFormModal';
import TrainingRecordFormModal from './components/TrainingRecordFormModal';
import CompetencyFormModal from './components/CompetencyFormModal';
import CompetencyAssessmentFormModal from './components/CompetencyAssessmentFormModal';
import { NonConformityPage } from './components/NonConformityPage';
import Chatbot, { ChatMessage } from './components/Chatbot';
import DocumentFormModal from './components/DocumentFormModal';
import NonConformityFormModal from './components/NonConformityFormModal';
import PreventiveActionFormModal from './components/PreventiveActionFormModal';
import WorkItemFormModal from './components/WorkItemFormModal';
import GlobalSearch from './components/GlobalSearch';
import DecontaminationLogFormModal from './components/DecontaminationLogFormModal';
import RestoreProgressModal from './components/RestoreProgressModal';
import ImprovementFormModal from './components/ImprovementFormModal';
import FeedbackFormModal from './components/FeedbackFormModal';
import SystemEventFormModal from './components/SystemEventFormModal';


// Import modals for Settings
import TestParameterFormModal from './components/TestParameterFormModal';
import TestParameterImportModal from './components/TestParameterImportModal';
import ChemicalMasterFormModal from './components/ChemicalMasterFormModal';
import ChemicalMasterImportModal from './components/ChemicalMasterImportModal';
import InstrumentFormModal from './components/InstrumentFormModal';
import RoomLocationFormModal from './components/RoomLocationFormModal';
import StorageFormModal from './components/StorageFormModal';
import ControlMaterialFormModal from './components/ControlMaterialFormModal';
import EQAMaterialFormModal from './components/EQAMaterialFormModal';
import DocumentCategoryFormModal from './components/DocumentCategoryFormModal';
import UserFormModal from './components/UserFormModal';
import IQCResultFormModal from './components/IQCResultFormModal';
import ControlLotTargetFormModal from './components/ControlLotTargetFormModal';
import IQCCommentModal from './components/IQCCommentModal';
import IQCImportModal from './components/IQCImportModal';
import WestgardGuidanceModal from './components/WestgardGuidanceModal';
import IQCPdfReport, { IQCPdfReportProps } from './components/IQCPdfReport';
import CalculateTargetConfirmationModal from './components/CalculateTargetConfirmationModal';
import EQAResultFormModal from './components/EQAResultFormModal';
import EQAScheduleFormModal from './components/EQAScheduleFormModal';


import * as types from './types';
import * as data from './data';
import { getSafetyInfo, getChatbotResponse, generateDisposalReport } from './services/geminiService';
import { utils, writeFile, read } from 'xlsx';

import { ArchiveBoxIcon } from './components/icons/ArchiveBoxIcon';
import { ChartBarSquareIcon } from './components/icons/ChartBarSquareIcon';
import { ShieldCheckIcon } from './components/icons/ShieldCheckIcon';
import { AcademicCapIcon } from './components/icons/AcademicCapIcon';
import { ToolIcon } from './components/icons/ToolIcon';
import { BookOpenIcon } from './components/icons/BookOpenIcon';
import { HeadphonesIcon } from './components/icons/HeadphonesIcon';
import { RecycleIcon } from './components/icons/RecycleIcon';
import { BuildingOfficeIcon } from './components/icons/BuildingOfficeIcon';
import { SettingsIcon } from './components/icons/SettingsIcon';
import { LogoutIcon } from './components/icons/LogoutIcon';
import { InformationIcon } from './components/icons/InformationIcon';
import { StarIcon } from './components/icons/StarIcon';
import { ExclamationTriangleIcon } from './components/icons/ExclamationTriangleIcon';
import { DatabaseIcon } from './components/icons/DatabaseIcon';
import { SparklesIcon } from './components/icons/SparklesIcon';
import { BellIcon } from './components/icons/BellIcon';
import { UserIcon } from './components/icons/UserIcon';
import { ClipboardDocumentCheckIcon } from './components/icons/ClipboardDocumentCheckIcon';
import { GlobeAltIcon } from './components/icons/GlobeAltIcon';
import { ChevronDoubleLeftIcon } from './components/icons/ChevronDoubleLeftIcon';

// Make jsPDF and html2canvas available from the window object
declare const jspdf: any;
declare const html2canvas: any;

type Page = 
    | 'warehouse' | 'quality' | 'safety' | 'personnel' | 'equipment' | 'documents' 
    | 'customer' | 'improvement' | 'organization' | 'settings' | 'info' | 'audit' 
    | 'nonconformity' | 'dataManagement' | 'alerts';

type ActiveItemType = 'area' | 'equipment' | 'waterSource';

type ModalType = 
    | 'testParameter' | 'chemicalMaster' | 'instrument' | 'roomLocation' 
    | 'storage' | 'controlMaterial' | 'eqaMaterial' | 'documentCategory' | 'iqcResult' | 'controlLotTarget' | 'workItem' | null;

const generateInitialNcIds = (ncs: Omit<types.NonConformity, 'ncId'>[]): types.NonConformity[] => {
    const sortedNcs = [...ncs].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    const monthCounters: { [key: string]: number } = {};

    return sortedNcs.map(nc => {
        const date = new Date(nc.date + 'T00:00:00');
        const year = date.getFullYear();
        const month = date.getMonth();
        const monthKey = `${year}-${month}`;
        
        monthCounters[monthKey] = (monthCounters[monthKey] || 0) + 1;

        const yearStr = year.toString().slice(-2);
        const monthStr = (month + 1).toString().padStart(2, '0');
        const seqStr = monthCounters[monthKey].toString().padStart(3, '0');
        const numericId = `${yearStr}${monthStr}${seqStr}`;
        
        const newNc: types.NonConformity = {
            id: nc.id,
            date: nc.date,
            description: nc.description,
            category: nc.category,
            severity: nc.severity,
            status: nc.status,
            reportedBy: nc.reportedBy,
            rootCauseAnalysis: nc.rootCauseAnalysis,
            correctiveAction: nc.correctiveAction,
            preventiveAction: nc.preventiveAction,
            hdkpId: nc.hdkpId,
            detectionSources: nc.detectionSources,
            detectionSourceOther: nc.detectionSourceOther,
            actionPerformer: nc.actionPerformer,
            completionDate: nc.completionDate,
            implementationApproved: nc.implementationApproved,
            actionApprover: nc.actionApprover,
            implementationApprovalDate: nc.implementationApprovalDate,
            resultApproved: nc.resultApproved,
            actionEffectiveness: nc.actionEffectiveness,
            finalApprover: nc.finalApprover,
            closedBy: nc.closedBy,
            closedDate: nc.closedDate,
            ncId: `SKPH-${numericId}`,
            preventiveActionId: nc.preventiveActionId,
        };

        if (newNc.correctiveAction && !newNc.hdkpId) {
            newNc.hdkpId = `HDKP-${numericId}`;
        }

        return newNc;
    });
};

const initialNonConformitiesWithIds = generateInitialNcIds(data.initialNonConformities);

const PrimaryNavItem: React.FC<{
  icon: React.ReactNode;
  label: string;
  isActive: boolean;
  onClick: () => void;
  isCollapsed: boolean;
}> = ({ icon, label, isActive, isCollapsed, onClick }) => (
  <li>
    <a
      href="#"
      onClick={(e) => { e.preventDefault(); onClick(); }}
      title={isCollapsed ? label : undefined}
      className={`flex p-4 text-base rounded-lg mx-2 my-1 transition-colors ${
        isCollapsed ? 'justify-center' : 'items-center'
      } ${
        isActive
          ? 'bg-blue-600 text-white font-bold shadow-md'
          : 'text-slate-200 hover:bg-slate-700 hover:text-white'
      }`}
    >
      {icon}
      {!isCollapsed && <span className="ml-4 whitespace-nowrap">{label}</span>}
    </a>
  </li>
);


const NavItem: React.FC<{
  icon: React.ReactNode;
  label: string;
  isActive: boolean;
  onClick: () => void;
}> = ({ icon, label, isActive, onClick }) => (
  <li>
    <a
      href="#"
      onClick={(e) => { e.preventDefault(); onClick(); }}
      className={`flex items-center p-3 text-sm rounded-lg mx-2 my-1 transition-colors ${
        isActive
          ? 'bg-blue-100 text-blue-700 font-bold'
          : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
      }`}
    >
      {icon}
      <span className="ml-3">{label}</span>
    </a>
  </li>
);

const QmsIsoPage = () => (
    <div className="bg-white p-8 rounded-lg shadow-lg text-center h-full flex flex-col justify-center items-center">
        <GlobeAltIcon className="w-16 h-16 text-blue-500 mb-4" />
        <h2 className="text-2xl font-bold text-slate-800 mb-4">Quản lý theo ISO 15189:2022</h2>
        <p className="text-slate-600 max-w-xl">Module này đang trong quá trình phát triển và sẽ sớm được ra mắt.</p>
        <p className="text-slate-600 mt-2 max-w-xl">Các tính năng dự kiến sẽ bao gồm quản lý rủi ro, đánh giá nhà cung cấp, và các yêu cầu khác theo tiêu chuẩn ISO 15189:2022.</p>
    </div>
);


const App = () => {
    // ======== STATE MANAGEMENT ========
    const [currentUser, setCurrentUser] = useState<types.User | null>(null);
    const [activeModule, setActiveModule] = useState<'qms2429' | 'qmsISO'>('qms2429');
    const [activePage, setActivePage] = useState<Page>('alerts');
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);


    // All application data states
    const [users, setUsers] = useState<types.User[]>(data.initialUsers);
    const [chemicals, setChemicals] = useState<types.Chemical[]>(data.initialChemicals);
    const [chemicalMasters, setChemicalMasters] = useState<types.ChemicalMaster[]>(data.initialChemicalMasters);
    const [storageLocations, setStorageLocations] = useState<types.StorageLocation[]>(data.initialStorageLocations);
    const [instruments, setInstruments] = useState<types.Instrument[]>(data.initialInstruments);
    const [onInstrumentStock, setOnInstrumentStock] = useState<types.OnInstrumentStock[]>(data.initialOnInstrumentStock);
    const [testParameters, setTestParameters] = useState<types.TestParameter[]>(data.initialTestParameters);
    const [controlMaterials, setControlMaterials] = useState<types.ControlMaterial[]>(data.initialControlMaterials);
    const [controlLotTargets, setControlLotTargets] = useState<types.ControlLotTarget[]>(data.initialControlLotTargets);
    const [iqcResults, setIqcResults] = useState<types.IQCResult[]>(data.initialIQCResults);
    const [eqaResults, setEqaResults] = useState<types.EQAResult[]>(data.initialEQAResults);
    const [personnel, setPersonnel] = useState<types.PersonnelProfile[]>(data.initialPersonnel);
    const [trainees, setTrainees] = useState<types.TraineeProfile[]>(data.initialTrainees);
    const [jobRoles, setJobRoles] = useState<types.JobRole[]>(data.initialJobRoles);
    const [organizationUnits, setOrganizationUnits] = useState<types.OrganizationUnit[]>(data.initialOrganizationUnits);
    const [labEquipment, setLabEquipment] = useState<types.LabEquipment[]>(data.initialLabEquipment);
    const [workItems, setWorkItems] = useState<types.WorkItem[]>(data.initialWorkItems);
    const [nonConformities, setNonConformities] = useState<types.NonConformity[]>(initialNonConformitiesWithIds.sort((a,b) => b.date.localeCompare(a.date)));
    const [leaveRecords, setLeaveRecords] = useState<types.LeaveRecord[]>(data.initialLeaveRecords);
    const [attendanceRecords, setAttendanceRecords] = useState<types.AttendanceRecord[]>(data.initialAttendanceRecords);
    const [workSchedule, setWorkSchedule] = useState<types.WorkSchedule>(data.initialWorkSchedule);
    const [holidays, setHolidays] = useState<types.Holiday[]>(data.initialHolidays);
    const [dutyAssignments, setDutyAssignments] = useState<types.DutyAssignment[]>(data.initialDutyAssignments);
    const [taskAssignments, setTaskAssignments] = useState<types.TaskAssignment[]>(data.initialTaskAssignments);
    const [personnelAssignmentHistory, setPersonnelAssignmentHistory] = useState<types.PersonnelAssignmentHistory[]>(data.initialPersonnelAssignmentHistory);
    const [kpiScores, setKpiScores] = useState<types.KpiScore[]>(data.initialKpiScores);
    const [monitoredAreas, setMonitoredAreas] = useState<types.MonitoredArea[]>(data.initialMonitoredAreas);
    const [monitoredEquipment, setMonitoredEquipment] = useState<types.MonitoredEquipment[]>(data.initialMonitoredEquipment);
    const [waterSources, setWaterSources] = useState<types.WaterSource[]>(data.initialWaterSources);
    const [accessLogs, setAccessLogs] = useState<types.AccessLog[]>(data.initialAccessLogs);
    const [areaEnvLogs, setAreaEnvLogs] = useState<types.AreaEnvironmentLog[]>(data.initialAreaEnvironmentLogs);
    const [equipEnvLogs, setEquipEnvLogs] = useState<types.EquipmentTemperatureLog[]>(data.initialEquipmentTempLogs);
    const [waterConductivityLogs, setWaterConductivityLogs] = useState<types.WaterConductivityLog[]>(data.initialWaterConductivityLogs);
    const [decontaminationLogs, setDecontaminationLogs] = useState<types.DecontaminationLog[]>(data.initialDecontaminationLogs);
    const [incidentReports, setIncidentReports] = useState<types.IncidentReport[]>(data.initialIncidentReports);
    const [trainingCourses, setTrainingCourses] = useState<types.TrainingCourse[]>(data.initialTrainingCourses);
    const [trainingRecords, setTrainingRecords] = useState<types.TrainingRecord[]>(data.initialTrainingRecords);
    const [competencies, setCompetencies] = useState<types.Competency[]>(data.initialCompetencies);
    const [competencyAssessments, setCompetencyAssessments] = useState<types.CompetencyAssessment[]>(data.initialCompetencyAssessments);
    const [labDocuments, setLabDocuments] = useState<types.LabDocument[]>(data.initialDocuments);
    const [documentCategories, setDocumentCategories] = useState<types.DocumentCategory[]>(data.initialDocumentCategories);
    const [improvementInitiatives, setImprovementInitiatives] = useState<types.ImprovementInitiative[]>(data.initialImprovementInitiatives);
    const [customerFeedback, setCustomerFeedback] = useState<types.CustomerFeedback[]>(data.initialCustomerFeedback);
    const [assessments, setAssessments] = useState<types.Assessment[]>(data.initialAssessments);
    const [planningSlips, setPlanningSlips] = useState<types.PlanningSlip[]>(data.initialPlanningSlips);
    const [disposalRecords, setDisposalRecords] = useState<types.DisposalRecord[]>(data.initialDisposalRecords);
    const [manualPreparationLogs, setManualPreparationLogs] = useState<types.ManualPreparationLog[]>(data.initialManualPreparationLogs);
    const [maintenanceChecklistLogs, setMaintenanceChecklistLogs] = useState<types.MaintenanceChecklistLog[]>(data.initialMaintenanceChecklistLogs);
    const [equipmentUsageLogs, setEquipmentUsageLogs] = useState<types.EquipmentUsageLog[]>(data.initialEquipmentUsageLogs);
    const [roomLocations, setRoomLocations] = useState<types.RoomLocation[]>(data.initialRoomLocations);
    const [eqaMaterials, setEQAMaterials] = useState<types.EQAMaterial[]>(data.initialEQAMaterials);
    const [preventiveActionReports, setPreventiveActionReports] = useState<types.PreventiveActionReport[]>(data.initialPreventiveActionReports);
    const [systemEvents, setSystemEvents] = useState<types.SystemEvent[]>(data.initialSystemEvents);
    const [eqaSchedule, setEqaSchedule] = useState<types.EQASchedule[]>(data.initialEQASchedule);

    // Modal states
    const [isChemicalFormOpen, setIsChemicalFormOpen] = useState(false);
    const [editingChemical, setEditingChemical] = useState<types.Chemical | null>(null);
    const [isAdjustModalOpen, setIsAdjustModalOpen] = useState(false);
    const [chemicalToAdjust, setChemicalToAdjust] = useState<types.Chemical | null>(null);
    const [isUsageLogOpen, setIsUsageLogOpen] = useState(false);
    const [chemicalForLog, setChemicalForLog] = useState<types.Chemical | null>(null);
    const [isSafetyInfoOpen, setIsSafetyInfoOpen] = useState(false);
    const [safetyInfo, setSafetyInfo] = useState('');
    const [isSafetyInfoLoading, setIsSafetyInfoLoading] = useState(false);
    const [chemicalForSafety, setChemicalForSafety] = useState<types.Chemical | null>(null);
    const [isBarcodeModalOpen, setIsBarcodeModalOpen] = useState(false);
    const [chemicalForBarcode, setChemicalForBarcode] = useState<types.Chemical | null>(null);
    const [isSafetyDocOpen, setIsSafetyDocOpen] = useState(false);
    const [chemicalForSafetyDoc, setChemicalForSafetyDoc] = useState<types.Chemical | null>(null);
    const [isMoveToInstrumentModalOpen, setIsMoveToInstrumentModalOpen] = useState(false);
    const [chemicalToMove, setChemicalToMove] = useState<types.Chemical | null>(null);
    const [isOnInstrumentAdjustModalOpen, setIsOnInstrumentAdjustModalOpen] = useState(false);
    const [stockToAdjust, setStockToAdjust] = useState<{item: types.OnInstrumentStock, action: 'use' | 'return' | 'discard'} | null>(null);
    const [isPlanningSlipModalOpen, setIsPlanningSlipModalOpen] = useState(false);
    const [slipToView, setSlipToView] = useState<types.PlanningSlip | null>(null);
    const [isDisposalFormOpen, setIsDisposalFormOpen] = useState(false);
    const [editingDisposalRecord, setEditingDisposalRecord] = useState<types.DisposalRecord | null>(null);
    const [disposalToPrint, setDisposalToPrint] = useState<types.DisposalRecord | null>(null);
    const [isChatbotOpen, setIsChatbotOpen] = useState(false);
    const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
    const [isChatbotLoading, setIsChatbotLoading] = useState(false);
    const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
    const [confirmAction, setConfirmAction] = useState<{ onConfirm: () => void, title: string, message: string | React.ReactNode } | null>(null);
    const [isDecontaminationLogModalOpen, setIsDecontaminationLogModalOpen] = useState(false);
    const [editingDecontaminationLog, setEditingDecontaminationLog] = useState<types.DecontaminationLog | null>(null);
    const [isRestoreProgressModalOpen, setIsRestoreProgressModalOpen] = useState(false);
    const [restoreProgress, setRestoreProgress] = useState(0);

    // Settings Modals
    const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);
    const [activeSettingsModal, setActiveSettingsModal] = useState<ModalType>(null);
    const [settingsInitialData, setSettingsInitialData] = useState<any>(null);
    const [isChemicalMasterImportOpen, setIsChemicalMasterImportOpen] = useState(false);
    const [isTestParameterImportOpen, setIsTestParameterImportOpen] = useState(false);

    // IQC & EQA Modals
    const [isIQCCommentModalOpen, setIsIQCCommentModalOpen] = useState(false);
    const [resultToComment, setResultToComment] = useState<types.IQCResult | null>(null);
    const [isIQCImportModalOpen, setIsIQCImportModalOpen] = useState(false);
    const [isWestgardGuidanceModalOpen, setIsWestgardGuidanceModalOpen] = useState(false);
    const [selectedViolationForGuidance, setSelectedViolationForGuidance] = useState<types.WestgardViolation | null>(null);
    const [pdfExportData, setPdfExportData] = useState<IQCPdfReportProps | null>(null);
    const [isCalculateTargetModalOpen, setIsCalculateTargetModalOpen] = useState(false);
    const [calculatedTargetData, setCalculatedTargetData] = useState<{
        mean: number;
        sd: number;
        test: types.TestParameter;
        control: types.ControlMaterial;
        count: number;
    } | null>(null);
    const [isEqaResultModalOpen, setIsEqaResultModalOpen] = useState(false);
    const [editingEqaResult, setEditingEqaResult] = useState<{ result?: types.EQAResult, materialId?: string } | null>(null);
    const [isEQAScheduleFormOpen, setIsEQAScheduleFormOpen] = useState(false);
    const [editingEQASchedule, setEditingEQASchedule] = useState<types.EQASchedule | null>(null);

    const [isImprovementFormOpen, setIsImprovementFormOpen] = useState(false);
    const [editingImprovement, setEditingImprovement] = useState<types.ImprovementInitiative | null>(null);
    const [isFeedbackFormOpen, setIsFeedbackFormOpen] = useState(false);
    const [editingFeedback, setEditingFeedback] = useState<types.CustomerFeedback | null>(null);

    const [isPersonnelFormOpen, setIsPersonnelFormOpen] = useState(false);
    const [editingPersonnel, setEditingPersonnel] = useState<types.PersonnelProfile | null>(null);
    const [isTraineeFormOpen, setIsTraineeFormOpen] = useState(false);
    const [editingTrainee, setEditingTrainee] = useState<types.TraineeProfile | null>(null);
    const [isEquipmentFormOpen, setIsEquipmentFormOpen] = useState(false);
    const [editingEquipment, setEditingEquipment] = useState<types.LabEquipment | null>(null);
    const [equipmentForDetail, setEquipmentForDetail] = useState<types.LabEquipment | null>(null);
    const [isMaintenanceFormOpen, setIsMaintenanceFormOpen] = useState(false);
    const [isCalibrationFormOpen, setIsCalibrationFormOpen] = useState(false);
    const [isEquipmentDocFormOpen, setIsEquipmentDocFormOpen] = useState(false);
    const [isEquipmentUsageLogFormOpen, setIsEquipmentUsageLogFormOpen] = useState(false);
    const [editingUsageLog, setEditingUsageLog] = useState<types.EquipmentUsageLog | null>(null);
    const [documentToView, setDocumentToView] = useState<types.LabDocument | types.EquipmentDocument | types.PersonnelDocument | null>(null);
    const [isJobRoleFormOpen, setIsJobRoleFormOpen] = useState(false);
    const [editingJobRole, setEditingJobRole] = useState<types.JobRole | null>(null);
    const [isOrgUnitFormOpen, setIsOrgUnitFormOpen] = useState(false);
    const [editingOrgUnit, setEditingOrgUnit] = useState<types.OrganizationUnit | null>(null);
    const [orgUnitParentId, setOrgUnitParentId] = useState<string | null>(null);
    const [personnelForDetail, setPersonnelForDetail] = useState<types.PersonnelProfile | null>(null);
    const [isPersonnelDocFormOpen, setIsPersonnelDocFormOpen] = useState(false);
    const [isLeaveFormOpen, setIsLeaveFormOpen] = useState(false);
    const [isAttendanceFormOpen, setIsAttendanceFormOpen] = useState(false);
    const [attendanceContext, setAttendanceContext] = useState<{ personnelId: string, date: string, record?: types.AttendanceRecord } | null>(null);
    const [isDutyFormOpen, setIsDutyFormOpen] = useState(false);
    const [isTaskFormOpen, setIsTaskFormOpen] = useState(false);
    const [isMovePersonnelOpen, setIsMovePersonnelOpen] = useState(false);
    const [isTrainingCourseFormOpen, setIsTrainingCourseFormOpen] = useState(false);
    const [editingTrainingCourse, setEditingTrainingCourse] = useState<types.TrainingCourse | null>(null);
    const [isTrainingRecordFormOpen, setIsTrainingRecordFormOpen] = useState(false);
    const [isCompetencyFormOpen, setIsCompetencyFormOpen] = useState(false);
    const [editingCompetency, setEditingCompetency] = useState<types.Competency | null>(null);
    const [isCompetencyAssessmentFormOpen, setIsCompetencyAssessmentFormOpen] = useState(false);
    const [isDocumentFormOpen, setIsDocumentFormOpen] = useState(false);
    const [editingDocument, setEditingDocument] = useState<types.LabDocument | null>(null);
    const [isNonConformityFormOpen, setIsNonConformityFormOpen] = useState(false);
    const [editingNC, setEditingNC] = useState<types.NonConformity | null>(null);
    const [ncCreationSource, setNcCreationSource] = useState<{ type: 'incident' | 'equipmentLog' | 'systemEvent', id: string } | null>(null);
    const [isPreventiveActionFormOpen, setIsPreventiveActionFormOpen] = useState(false);
    const [editingPA, setEditingPA] = useState<types.PreventiveActionReport | null>(null);
    const [isUserFormOpen, setIsUserFormOpen] = useState(false);
    const [editingUser, setEditingUser] = useState<types.User | null>(null);
    const [isSystemEventFormOpen, setIsSystemEventFormOpen] = useState(false);
    const [editingSystemEvent, setEditingSystemEvent] = useState<types.SystemEvent | null>(null);


    // Global Search State
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState<types.SearchResult[]>([]);
    const [isSearching, setIsSearching] = useState(false);
    const [focusedItemId, setFocusedItemId] = useState<string | null>(null);
    
    useEffect(() => {
        if (focusedItemId) {
            const timer = setTimeout(() => {
                setFocusedItemId(null);
            }, 2500); // Highlight duration
            return () => clearTimeout(timer);
        }
    }, [focusedItemId]);


    // ======== HANDLERS ========
    const handleLogin = (username: string, password: string): types.User | null => {
        const user = users.find(u => u.username === username && u.passwordHash === password);
        if (user) {
            setCurrentUser(user);
            return user;
        }
        return null;
    };
    const handleLogout = () => {
        setCurrentUser(null);
        setActivePage('alerts');
        setActiveModule('qms2429');
    };

    const handleDelete = (setter: React.Dispatch<React.SetStateAction<any[]>>, id: string, title: string, message: string) => {
        setConfirmAction({
            onConfirm: () => {
                setter(prev => prev.filter(item => item.id !== id));
                setConfirmAction(null);
                setIsConfirmModalOpen(false); // Ensure modal closes on confirm
            },
            title, message
        });
        setIsConfirmModalOpen(true);
    };

    const handleSave = (setter: React.Dispatch<React.SetStateAction<any[]>>, data: any, idPrefix: string) => {
        if (data.id) {
            setter(prev => prev.map(item => item.id === data.id ? data : item));
        } else {
            setter(prev => [{ ...data, id: `${idPrefix}-${Date.now()}` }, ...prev]);
        }
    };
    
    const handleAddWorkItem = (item: Omit<types.WorkItem, 'id'>) => {
        const exists = workItems.some(wi => wi.description.trim().toLowerCase() === item.description.trim().toLowerCase());
        if (exists) {
            alert('Công việc này đã có trong danh mục.');
            return;
        }
        handleSave(setWorkItems, item, 'wi');
        alert(`Đã thêm công việc "${item.description}" vào danh mục.`);
    };

    // WAREHOUSE HANDLERS
    const handleSaveChemical = (formData: Omit<types.Chemical, 'id' | 'barcode'> | types.Chemical) => {
        if ('id' in formData && formData.id) {
            setChemicals(prev => prev.map(c => c.id === formData.id ? { ...c, ...formData } : c));
        } else {
            const newChemical: types.Chemical = {
                ...formData,
                id: `chem-${Date.now()}`,
                barcode: `CHEM${String(Date.now()).slice(-4)}${formData.sequenceNumber}`,
                usageLog: [{
                    date: new Date().toISOString(),
                    reason: `Nhập kho (Người nhận: ${formData.personReceived})`,
                    person: currentUser?.fullName || 'N/A',
                    quantityChange: formData.quantity,
                    newQuantity: formData.quantity
                }],
            };
            setChemicals(prev => [newChemical, ...prev]);
        }
    };

    const handleAdjustQuantity = (chemicalId: string, change: number, reason: string, person: string, changeType: 'use' | 'add' | 'destroy', recipient?: string) => {
        setChemicals(prev => prev.map(c => {
            if (c.id === chemicalId) {
                const newQuantity = c.quantity + change;
                const newLog: types.UsageLogEntry = {
                    date: new Date().toISOString(),
                    reason, person, recipient,
                    quantityChange: change,
                    newQuantity,
                };
                return { ...c, quantity: newQuantity, usageLog: [newLog, ...(c.usageLog || [])] };
            }
            return c;
        }));
        setIsAdjustModalOpen(false);
    };

    const handleMoveToInstrument = (chemicalId: string, instrumentId: string, quantity: number, openVialExpiration?: string) => {
        const chemical = chemicals.find(c => c.id === chemicalId);
        if (!chemical) return;
    
        const newStock: types.OnInstrumentStock = {
            id: `ois-${Date.now()}`,
            chemicalId,
            chemicalName: chemical.name,
            lotNumber: chemical.lotNumber,
            instrumentId,
            quantity,
            unit: chemical.unit,
            openVialExpiration,
            movedToInstrumentAt: new Date().toISOString(),
        };
        setOnInstrumentStock(prev => [newStock, ...prev]);
        handleAdjustQuantity(chemicalId, -quantity, `Chuyển lên máy ${instruments.find(i => i.id === instrumentId)?.name}`, currentUser?.fullName || 'N/A', 'use');
        setIsMoveToInstrumentModalOpen(false);
    };

    const handleOnInstrumentAdjust = (item: types.OnInstrumentStock, data: OnInstrumentAdjustData) => {
        const { action, quantity, reason } = data;
        const instrumentName = instruments.find(i => i.id === item.instrumentId)?.name || 'N/A';
    
        if (action === 'return') {
            setChemicals(prev => prev.map(c => {
                if (c.id === item.chemicalId) {
                    const newQuantity = c.quantity + quantity;
                    const newLog: types.UsageLogEntry = {
                        date: new Date().toISOString(),
                        reason: `Trả về từ máy ${instrumentName}: ${reason}`,
                        person: currentUser?.fullName || 'N/A',
                        quantityChange: quantity,
                        newQuantity
                    };
                    return { ...c, quantity: newQuantity, usageLog: [newLog, ...(c.usageLog || [])] };
                }
                return c;
            }));
        }
    
        setOnInstrumentStock(prev => prev.map(s => {
            if (s.id === item.id) {
                return { ...s, quantity: s.quantity - quantity };
            }
            return s;
        }).filter(s => s.quantity > 0));
        setIsOnInstrumentAdjustModalOpen(false);
    };

    const handleUpdatePhysicalCount = (chemicalId: string, actualQuantity: number, person: string) => {
        setChemicals(prev => prev.map(c => {
            if (c.id === chemicalId) {
                const change = actualQuantity - c.quantity;
                if (change === 0) return c;
                const newLog: types.UsageLogEntry = {
                    date: new Date().toISOString(),
                    reason: `Kiểm kê (Tồn kho hệ thống: ${c.quantity})`,
                    person,
                    quantityChange: change,
                    newQuantity: actualQuantity,
                };
                return { ...c, quantity: actualQuantity, usageLog: [newLog, ...(c.usageLog || [])] };
            }
            return c;
        }));
    };

    // QUALITY HANDLERS
    const handleOpenIQCCommentModal = (result: types.IQCResult) => {
        setResultToComment(result);
        setIsIQCCommentModalOpen(true);
    };
    
    const handleSaveIQCComment = (resultId: string, notes: string) => {
        setIqcResults(prev => prev.map(r => r.id === resultId ? { ...r, notes } : r));
        setIsIQCCommentModalOpen(false);
    };

    const handleConvertIqcToNc = (violation: types.WestgardViolation, result: types.IQCResult) => {
        const test = testParameters.find(t => t.id === result.testParameterId);
        const control = controlMaterials.find(c => c.id === result.controlMaterialId);
    
        const description = `Vi phạm Westgard [${violation.rule.toUpperCase()}] cho xét nghiệm ${test?.name || 'N/A'}.\n- Mẫu control: ${control?.name || 'N/A'} - ${control?.level || 'N/A'}\n- Lô: ${control?.lotNumber || 'N/A'}\n- Kết quả ghi nhận: ${result.value}\n- Thông báo vi phạm: ${violation.message}`;
    
        const newNC: Omit<types.NonConformity, 'id'|'ncId'> = {
            date: new Date().toISOString().split('T')[0],
            description: description,
            category: 'analytical',
            severity: 'severe',
            status: 'open',
            reportedBy: currentUser!.fullName,
        };
        setEditingNC(newNC as any); // open modal with pre-filled data
        setIsNonConformityFormOpen(true);
    };

    const handleOpenWestgardGuidanceModal = (violation: types.WestgardViolation) => {
        setSelectedViolationForGuidance(violation);
        setIsWestgardGuidanceModalOpen(true);
    };
    
    const handleExportIQCWithChart = (results: types.IQCResult[], target: types.ControlLotTarget, test: types.TestParameter, control: types.ControlMaterial) => {
        if (!results || results.length === 0 || !target || !test || !control) {
            alert("Không có dữ liệu để xuất.");
            return;
        }
    
        const dataForExport = results.map(r => ({
            'Thời gian': new Date(r.date).toLocaleString('vi-VN'),
            'Kết quả': r.value,
            'Mean': target.mean,
            '+1 SD': target.mean + target.sd,
            '+2 SD': target.mean + (2 * target.sd),
            '+3 SD': target.mean + (3 * target.sd),
            '-1 SD': target.mean - target.sd,
            '-2 SD': target.mean - (2 * target.sd),
            '-3 SD': target.mean - (3 * target.sd),
            'Người nhập': r.recordedBy,
            'Ghi chú': r.notes || ''
        }));
    
        const ws = utils.json_to_sheet([]); // Create an empty sheet first
    
        // Add info header
        const header = [
            ["BÁO CÁO KẾT QUẢ NỘI KIỂM"],
            [],
            ["Xét nghiệm:", test.name],
            ["Vật liệu Control:", `${control.name} - ${control.level}`],
            ["Lô:", control.lotNumber],
            ["Target:", `Mean = ${target.mean}, SD = ${target.sd}`],
            ["Ngày xuất:", new Date().toLocaleDateString('vi-VN')],
            [] // Empty row for spacing
        ];
        utils.sheet_add_aoa(ws, header, { origin: 'A1' });
    
        // Add data table
        utils.sheet_add_json(ws, dataForExport, { origin: -1, skipHeader: false }); // Append after header
        
        // Add instructions
        const instructions = [
            [],
            ["HƯỚNG DẪN TẠO BIỂU ĐỒ LEVEY-JENNINGS:"],
            ["1. Chọn các cột từ 'Thời gian' đến '-3 SD' (bao gồm cả tiêu đề)."],
            ["2. Trong Excel, vào tab 'Insert' (Chèn) -> 'Line Chart' (Biểu đồ đường)."],
            ["3. Biểu đồ Levey-Jennings sẽ được tạo tự động."],
        ];
        utils.sheet_add_aoa(ws, instructions, { origin: -1 }); // Append to the end
    
        const wb = utils.book_new();
        utils.book_append_sheet(wb, ws, "DuLieuQC");
    
        const fileName = `NoiKiem_${test.name.replace(/\s/g, '_')}_${control.level.replace(/\s/g, '_')}_${new Date().toISOString().split('T')[0]}.xlsx`;
        writeFile(wb, fileName);
    };

    const handleExportIQCToPdf = (data: IQCPdfReportProps) => {
        setPdfExportData(data);
    };

    const handleOpenCalculateTargetModal = (mean: number, sd: number, test: types.TestParameter, control: types.ControlMaterial, count: number) => {
        setCalculatedTargetData({ mean, sd, test, control, count });
        setIsCalculateTargetModalOpen(true);
    };

    const handleConfirmSaveCalculatedTarget = () => {
        if (!calculatedTargetData) return;
        const { test, control, mean, sd } = calculatedTargetData;

        setControlLotTargets(prevTargets => {
            const existingTargetIndex = prevTargets.findIndex(t => t.testParameterId === test.id && t.controlMaterialId === control.id);
            if (existingTargetIndex !== -1) {
                // Update existing target
                const newTargets = [...prevTargets];
                newTargets[existingTargetIndex] = { ...newTargets[existingTargetIndex], mean, sd };
                alert("Đã cập nhật target thành công!");
                return newTargets;
            } else {
                // Add new target
                const newTarget: types.ControlLotTarget = {
                    id: `clt-calc-${Date.now()}`,
                    testParameterId: test.id,
                    controlMaterialId: control.id,
                    mean,
                    sd,
                };
                alert("Đã lưu target mới thành công!");
                return [newTarget, ...prevTargets];
            }
        });

        setIsCalculateTargetModalOpen(false);
        setCalculatedTargetData(null);
    };
    
    const handleSaveEQAResult = (data: Omit<types.EQAResult, 'id'> | types.EQAResult) => {
        handleSave(setEqaResults, data, 'eqares');
        setIsEqaResultModalOpen(false);
    };

    const handleSaveEQASchedule = (data: Omit<types.EQASchedule, 'id'> | types.EQASchedule) => {
        handleSave(setEqaSchedule, data, 'eqasched');
        setIsEQAScheduleFormOpen(false);
    };
    const handleDeleteEQASchedule = (id: string) => {
        handleDelete(setEqaSchedule, id, 'Xóa Lịch', 'Bạn có chắc muốn xóa lịch ngoại kiểm này?');
    };

    useEffect(() => {
        if (pdfExportData) {
            // Delay to allow the component to render
            setTimeout(() => {
                const reportElement = document.getElementById('iqc-pdf-content');
                if (reportElement) {
                    html2canvas(reportElement, { scale: 2 }).then((canvas: any) => {
                        const imgData = canvas.toDataURL('image/png');
                        const pdf = new jspdf.jsPDF({
                            orientation: 'portrait',
                            unit: 'mm',
                            format: 'a4'
                        });
                        const pdfWidth = pdf.internal.pageSize.getWidth();
                        const pdfHeight = pdf.internal.pageSize.getHeight();
                        const canvasWidth = canvas.width;
                        const canvasHeight = canvas.height;
                        const ratio = canvasWidth / canvasHeight;
                        const imgWidth = pdfWidth - 20; // 10mm margin on each side
                        const imgHeight = imgWidth / ratio;
                        
                        let position = 10;
                        if (imgHeight > pdfHeight - 20) {
                            // If content is too tall, it will be scaled down, which might be ok.
                            // For multi-page, logic would be more complex here.
                            console.warn("PDF content might be too tall for a single page.");
                        }

                        pdf.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight);

                        const { test, control } = pdfExportData;
                        const fileName = `Bao_cao_Noi_kiem_${test.name.replace(/\s/g, '_')}_${control.level.replace(/\s/g, '_')}_${new Date().toISOString().split('T')[0]}.pdf`;
                        pdf.save(fileName);
                    }).finally(() => {
                        setPdfExportData(null); // Clean up
                    });
                }
            }, 500);
        }
    }, [pdfExportData]);

    // PERSONNEL & ORG HANDLERS
    const handleSaveTrainee = (data: Omit<types.TraineeProfile, 'id'> | types.TraineeProfile) => {
        handleSave(setTrainees, data, 't');
    };

    const handleSavePersonnelDoc = (personnelId: string, docData: PersonnelDocumentFormData) => {
        setPersonnel(prev => prev.map(p => {
            if (p.id === personnelId) {
                const newDoc: types.PersonnelDocument = {
                    ...docData,
                    id: `pdoc-${Date.now()}`,
                    uploadedAt: new Date().toISOString()
                };
                return { ...p, documents: [newDoc, ...(p.documents || [])] };
            }
            return p;
        }));
    };

    const handleDeletePersonnelDoc = (personnelId: string, docId: string) => {
        setPersonnel(prev => prev.map(p => {
            if (p.id === personnelId) {
                return { ...p, documents: (p.documents || []).filter(d => d.id !== docId) };
            }
            return p;
        }));
    };
    
    // EQUIPMENT HANDLERS
    const handleSaveEquipment = (data: Omit<types.LabEquipment, 'id'> | types.LabEquipment) => handleSave(setLabEquipment, data, 'equip');
    
    const handleDeleteEquipmentSubRecord = (
        type: 'maintenance' | 'calibration' | 'document',
        equipmentId: string,
        recordId: string,
    ) => {
        const messageMap = {
            maintenance: 'Bạn có chắc muốn xóa lịch sử bảo trì này?',
            calibration: 'Bạn có chắc muốn xóa lịch sử hiệu chuẩn này?',
            document: 'Bạn có chắc muốn xóa tài liệu này?',
        };
        setConfirmAction({
            onConfirm: () => {
                setLabEquipment(prev => prev.map(eq => {
                    if (eq.id === equipmentId) {
                        const newEq = { ...eq };
                        if (type === 'maintenance') {
                            newEq.maintenanceHistory = (newEq.maintenanceHistory || []).filter(r => r.id !== recordId);
                        } else if (type === 'calibration') {
                            newEq.calibrationHistory = (newEq.calibrationHistory || []).filter(r => r.id !== recordId);
                        } else {
                            newEq.documents = (newEq.documents || []).filter(d => d.id !== recordId);
                        }
                        return newEq;
                    }
                    return eq;
                }));
                setIsConfirmModalOpen(false);
            },
            title: 'Xác nhận Xóa',
            message: messageMap[type]
        });
        setIsConfirmModalOpen(true);
    };

    const handleAddMaintenanceRecord = (equipmentId: string, record: Omit<types.MaintenanceRecord, 'id'>) => {
        setLabEquipment(prev => prev.map(eq => {
            if (eq.id === equipmentId) {
                const newRecord = { ...record, id: `maint-${Date.now()}`};
                return { ...eq, lastMaintenance: record.date, maintenanceHistory: [newRecord, ...(eq.maintenanceHistory || [])] };
            }
            return eq;
        }));
    };

    const handleAddCalibrationRecord = (equipmentId: string, record: Omit<types.CalibrationRecord, 'id'>) => {
        setLabEquipment(prev => prev.map(eq => {
            if (eq.id === equipmentId) {
                const newRecord = { ...record, id: `calib-${Date.now()}`};
                return { ...eq, lastCalibration: record.date, calibrationHistory: [newRecord, ...(eq.calibrationHistory || [])] };
            }
            return eq;
        }));
    };

    const handleAddEquipmentDocument = (equipmentId: string, docData: EquipmentDocumentFormData) => {
        setLabEquipment(prev => prev.map(eq => {
            if (eq.id === equipmentId) {
                const newDoc = { ...docData, id: `eqdoc-${Date.now()}`, uploadedAt: new Date().toISOString() };
                return { ...eq, documents: [newDoc, ...(eq.documents || [])] };
            }
            return eq;
        }));
    };

    const handleSaveOrUpdateUsageLog = (logData: Omit<types.EquipmentUsageLog, 'id'> | types.EquipmentUsageLog) => {
        handleSave(setEquipmentUsageLogs, logData, 'log');
        setEditingUsageLog(null);
        setIsEquipmentUsageLogFormOpen(false);
    };

    const handleCheckMaintenanceTask = (equipmentId: string, workItemId: string, date: string) => {
        const logId = `${equipmentId}-${workItemId}-${date}`;
        const existingLog = maintenanceChecklistLogs.find(l => l.id === logId);
        const workItem = workItems.find(wi => wi.id === workItemId);
        const equipment = labEquipment.find(eq => eq.id === equipmentId);
    
        if (existingLog) {
            // Un-checking
            handleDelete(setMaintenanceChecklistLogs, logId, 'Hủy xác nhận', 'Bạn có chắc muốn hủy xác nhận công việc đã hoàn thành này?');
        } else {
            // Checking: Use a confirmation modal.
            setConfirmAction({
                onConfirm: () => {
                    const newLog: types.MaintenanceChecklistLog = {
                        id: logId,
                        equipmentId,
                        workItemId,
                        date,
                        completedByUserId: currentUser!.id,
                    };
                    setMaintenanceChecklistLogs(prev => [...prev, newLog]);
                    setConfirmAction(null);
                    setIsConfirmModalOpen(false);
                },
                title: 'Xác nhận Hoàn thành',
                message: `Xác nhận công việc "${workItem?.description || ''}" đã được hoàn thành cho thiết bị "${equipment?.name || ''}" vào ngày ${new Date(date + 'T00:00:00').toLocaleDateString('vi-VN')}?`
            });
            setIsConfirmModalOpen(true);
        }
    };

    const handleUpdateEquipmentProcedure = (equipmentId: string, procedure: string) => {
        setLabEquipment(prev => prev.map(eq => eq.id === equipmentId ? { ...eq, operatingProcedure: procedure } : eq));
    };

    const handleExportEquipmentProfileToDoc = (equipment: types.LabEquipment) => {
        const formatDate = (dateString?: string) => {
            if (!dateString) return '';
            const date = new Date(dateString + 'T00:00:00');
            return date.toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' });
        };
    
        const statusMap: Record<types.LabEquipment['status'], string> = {
            operational: 'Hoạt động',
            maintenance: 'Đang bảo trì',
            out_of_service: 'Ngưng sử dụng'
        };
    
        const combinedHistory = [
            ...(equipment.maintenanceHistory || []).map(r => ({ ...r, type: 'Bảo trì' })),
            ...(equipment.calibrationHistory || []).map(r => ({ ...r, type: 'Hiệu chuẩn' }))
        ].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    
        const emptyRows = (count: number, cols: number) => Array.from({ length: count }).map(() => `<tr>${'<td style="border: 1px solid black; height: 2em;">&nbsp;</td>'.repeat(cols)}</tr>`).join('');
    
        const historyRows = combinedHistory.map(record => `
            <tr>
                <td style="border: 1px solid black; padding: 4px; text-align: center;">${formatDate(record.date)}</td>
                <td style="border: 1px solid black; padding: 4px;">${record.performedBy}</td>
                <td style="border: 1px solid black; padding: 4px;">${record.type}: ${record.description}</td>
                <td style="border: 1px solid black; padding: 4px;"></td>
            </tr>
        `).join('');
    
        const htmlContent = `
            <html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:w="urn:schemas-microsoft-com:office:word" xmlns="http://www.w3.org/TR/REC-html40">
            <head><meta charset='utf-8'><title>Lý lịch Thiết bị</title></head>
            <body style="font-family: 'Times New Roman', serif; font-size: 12pt;">
                
                <!-- Page 1 -->
                <div style="width: 210mm; height: 297mm; padding: 20mm; box-sizing: border-box; display: flex; flex-direction: column; page-break-after: always;">
                    <header style="text-align: center; margin-bottom: 2rem;">
                        <p style="margin:0; font-weight: bold;">BỆNH VIỆN ĐẠI HỌC Y DƯỢC</p>
                        <p style="margin:0; font-weight: bold;">KHOA XÉT NGHIỆM</p>
                        <h1 style="margin-top: 2rem; font-size: 16pt; font-weight: bold;">LÝ LỊCH THIẾT BỊ</h1>
                    </header>
    
                    <section style="margin-bottom: 1.5rem;">
                        <h2 style="font-weight: bold; margin-bottom: 0.5rem;">1. Thông tin chung</h2>
                        <table style="width: 100%;">
                            <tr><td style="width: 50%;"><strong>Tên thiết bị:</strong> ${equipment.name}</td><td><strong>Ký hiệu:</strong> ${equipment.model || ''}</td></tr>
                            <tr><td><strong>Số Serial:</strong> ${equipment.serialNumber}</td><td><strong>Nước:</strong></td></tr>
                            <tr><td><strong>Nhà sản xuất:</strong> ${equipment.manufacturer || ''}</td><td><strong>Vị trí:</strong> ${equipment.location}</td></tr>
                            <tr><td><strong>Mã số thiết bị:</strong> ${equipment.assetId}</td><td><strong>Tình trạng:</strong> ${statusMap[equipment.status]}</td></tr>
                            <tr><td><strong>Thời gian nhận máy:</strong> ${formatDate(equipment.purchaseDate)}</td><td><strong>Thời gian sử dụng:</strong> ${formatDate(equipment.warrantyDate)}</td></tr>
                        </table>
                    </section>
    
                    <section style="margin-bottom: 1.5rem;">
                        <h2 style="font-weight: bold; margin-bottom: 0.5rem;">2. Nhà cung cấp</h2>
                        <table style="width: 100%;">
                           <tr><td style="width: 50%;"><strong>Tên nhà cung cấp:</strong></td><td></td></tr>
                           <tr><td><strong>Địa chỉ:</strong></td><td></td></tr>
                           <tr><td><strong>Điện thoại:</strong></td><td><strong>Số Fax:</strong></td></tr>
                        </table>
                    </section>
    
                    <section style="flex-grow: 1; display: flex; flex-direction: column;">
                        <h2 style="font-weight: bold; margin-bottom: 0.5rem;">3. Quản lý</h2>
                        <table style="width: 100%; border-collapse: collapse; border: 1px solid black;">
                           <thead><tr style="background-color: #e5e7eb;"><th style="border: 1px solid black; padding: 8px; font-weight: bold; width: 50%;">Họ và tên</th><th style="border: 1px solid black; padding: 8px; font-weight: bold; width: 25%;">Từ ngày</th><th style="border: 1px solid black; padding: 8px; font-weight: bold; width: 25%;">Ghi chú</th></tr></thead>
                           <tbody>${emptyRows(15, 3)}</tbody>
                        </table>
                    </section>
    
                    <footer style="margin-top: auto; display: flex; justify-content: space-between; font-size: 10pt; padding-top: 1rem;">
                        <span>XN-BM 5.5.1/03</span><span>Lần ban hành: 01.dd/mm/yy</span><span>Trang: 1/3</span>
                    </footer>
                </div>
    
                <!-- Page 2 -->
                <div style="width: 210mm; height: 297mm; padding: 20mm; box-sizing: border-box; display: flex; flex-direction: column; page-break-after: always;">
                     <header style="text-align: center; margin-bottom: 2rem;">
                        <p style="margin:0; font-weight: bold;">BỆNH VIỆN ĐẠI HỌC Y DƯỢC</p>
                        <p style="margin:0; font-weight: bold;">KHOA XÉT NGHIỆM</p>
                    </header>
                    <section style="flex-grow: 1; display: flex; flex-direction: column;">
                        <h2 style="font-weight: bold; margin-bottom: 0.5rem;">4. Sửa chữa / bảo dưỡng</h2>
                        <table style="width: 100%; border-collapse: collapse; border: 1px solid black;">
                            <thead><tr style="background-color: #e5e7eb;">
                                <th style="border: 1px solid black; padding: 8px; font-weight: bold; width: 15%;">Thời gian</th>
                                <th style="border: 1px solid black; padding: 8px; font-weight: bold; width: 20%;">Người thực hiện</th>
                                <th style="border: 1px solid black; padding: 8px; font-weight: bold; width: 45%;">Nội dung thực hiện</th>
                                <th style="border: 1px solid black; padding: 8px; font-weight: bold; width: 20%;">Ghi chú</th>
                            </tr></thead>
                            <tbody>${historyRows}${emptyRows(Math.max(0, 30 - combinedHistory.length), 4)}</tbody>
                        </table>
                    </section>
                    <footer style="margin-top: auto; display: flex; justify-content: space-between; font-size: 10pt; padding-top: 1rem;">
                        <span>XN-BM 5.5.1/03</span><span>Lần ban hành: 01.dd/mm/yy</span><span>Trang: 2/3</span>
                    </footer>
                </div>
    
                <!-- Page 3 -->
                <div style="width: 210mm; height: 297mm; padding: 20mm; box-sizing: border-box; display: flex; flex-direction: column;">
                     <header style="text-align: center; margin-bottom: 2rem;">
                        <p style="margin:0; font-weight: bold;">BỆNH VIỆN ĐẠI HỌC Y DƯỢC</p>
                        <p style="margin:0; font-weight: bold;">KHOA XÉT NGHIỆM</p>
                    </header>
                    <footer style="margin-top: auto; display: flex; justify-content: space-between; font-size: 10pt; padding-top: 1rem;">
                        <span>XN-BM 5.5.1/03</span><span>Lần ban hành: 01.dd/mm/yy</span><span>Trang: 3/3</span>
                    </footer>
                </div>
            </body></html>
        `;
    
        const blob = new Blob([htmlContent], { type: 'application/msword' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = `Ly_lich_Thiet_bi_${equipment.assetId}.doc`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(link.href);
    };

    const handleExportUsageLogToDoc = (equipmentId: string, logs: types.EquipmentUsageLog[]) => {
        const equipment = labEquipment.find(e => e.id === equipmentId);
        if (!equipment) {
            alert("Không tìm thấy thiết bị để xuất nhật ký.");
            return;
        }
    
        const userMap = new Map<string, string>();
        personnel.forEach(p => userMap.set(p.id, p.fullName));
        accessLogs.forEach(log => {
            if (!userMap.has(log.personOrUnit)) {
                userMap.set(log.personOrUnit, log.personOrUnit);
            }
        });
    
        const getUsageDuration = (start: string, end: string): string => {
            try {
                const startTime = new Date(`1970-01-01T${start}`);
                const endTime = new Date(`1970-01-01T${end}`);
                if (isNaN(startTime.getTime()) || isNaN(endTime.getTime()) || endTime < startTime) return '';
                const diffMs = endTime.getTime() - startTime.getTime();
                const hours = Math.floor(diffMs / 3600000);
                const minutes = Math.floor((diffMs % 3600000) / 60000);
                return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
            } catch { return ''; }
        };
    
        const sortedLogs = [...logs].sort((a, b) => new Date(`${a.date}T${a.startTime}`).getTime() - new Date(`${b.date}T${b.startTime}`).getTime());
    
        const logRows = sortedLogs.map(log => `
            <tr>
                <td style="border: 1px solid black; padding: 4px; text-align: center;">${new Date(log.date + 'T' + log.startTime).toLocaleString('vi-VN')}</td>
                <td style="border: 1px solid black; padding: 4px;">${log.maintenancePerformed || ''}</td>
                <td style="border: 1px solid black; padding: 4px; text-align: center;">${log.qualityCheck === 'yes' ? 'X' : ''}</td>
                <td style="border: 1px solid black; padding: 4px; text-align: center;">${log.qualityCheck === 'no' ? 'X' : ''}</td>
                <td style="border: 1px solid black; padding: 4px;">${log.incidents || ''}</td>
                <td style="border: 1px solid black; padding: 4px;">${log.correctiveAction || ''}</td>
                <td style="border: 1px solid black; padding: 4px;">${log.usageStatus || ''}</td>
                <td style="border: 1px solid black; padding: 4px; text-align: center;">${getUsageDuration(log.startTime, log.endTime)}</td>
                <td style="border: 1px solid black; padding: 4px;">${userMap.get(log.userId) || log.userId}</td>
                <td style="border: 1px solid black; padding: 4px;">${log.notes || ''}</td>
            </tr>
        `).join('');
    
        const emptyRows = (count: number, cols: number) => Array.from({ length: count }).map(() => `<tr>${'<td style="border: 1px solid black; height: 1.5em;">&nbsp;</td>'.repeat(cols)}</tr>`).join('');
        const totalRowsNeeded = 20; 
        const finalLogRows = logRows + emptyRows(Math.max(0, totalRowsNeeded - sortedLogs.length), 10);
        
        const year = logs.length > 0 ? new Date(logs[0].date).getFullYear() : new Date().getFullYear();
    
        const htmlContent = `
            <html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:w="urn:schemas-microsoft-com:office:word" xmlns="http://www.w3.org/TR/REC-html40">
            <head>
                <meta charset='utf-8'>
                <title>Nhật ký sử dụng thiết bị</title>
                <style>
                    @page { size: A4 landscape; margin: 1.5cm; }
                    body { font-family: 'Times New Roman', serif; font-size: 11pt; }
                    table { width: 100%; border-collapse: collapse; }
                    th, td { border: 1px solid black; padding: 4px; vertical-align: top; }
                    th { font-weight: bold; background-color: #e5e7eb; text-align: center; }
                </style>
            </head>
            <body>
                <div>
                    <header style="text-align: center; margin-bottom: 1rem;">
                        <p style="margin:0; font-weight: bold;">BỆNH VIỆN ĐẠI HỌC Y DƯỢC</p>
                        <p style="margin:0; font-weight: bold;">KHOA XÉT NGHIỆM</p>
                        <h1 style="margin-top: 1.5rem; font-size: 16pt; font-weight: bold;">NHẬT KÝ SỬ DỤNG THIẾT BỊ</h1>
                    </header>
                    <section style="margin-bottom: 1rem; font-size: 11pt;">
                        <table style="width: 100%; border: none;">
                            <tr>
                                <td style="border: none; width: 50%;"><strong>Tên thiết bị:</strong> ${equipment.name}</td>
                                <td style="border: none; width: 50%;"><strong>Người phụ trách:</strong></td>
                            </tr>
                            <tr>
                                <td style="border: none;"><strong>Ký hiệu / Hãng:</strong> ${equipment.model || equipment.manufacturer || ''}</td>
                                <td style="border: none;"><strong>Vị trí:</strong> ${equipment.location}</td>
                            </tr>
                            <tr>
                                <td style="border: none;"><strong>Mã thiết bị:</strong> ${equipment.assetId}</td>
                                <td style="border: none;"><strong>Năm:</strong> ${year}</td>
                            </tr>
                        </table>
                    </section>
                    <section>
                        <table>
                            <thead>
                                <tr>
                                    <th rowspan="2" style="width: 8%;">Thời gian</th>
                                    <th rowspan="2" style="width: 12%;">Nội dung bảo trì, bảo dưỡng</th>
                                    <th colspan="2">Kiểm tra chất lượng (QC)</th>
                                    <th rowspan="2" style="width: 12%;">Sự cố thiết bị/nội kiểm</th>
                                    <th rowspan="2" style="width: 12%;">Hành động khắc phục</th>
                                    <th rowspan="2" style="width: 8%;">Trạng thái khi sử dụng</th>
                                    <th rowspan="2" style="width: 6%;">Thời gian sử dụng</th>
                                    <th rowspan="2" style="width: 8%;">Người sử dụng</th>
                                    <th rowspan="2">Ghi chú</th>
                                </tr>
                                <tr>
                                    <th style="width: 4%;">Có</th>
                                    <th style="width: 4%;">Không</th>
                                </tr>
                            </thead>
                            <tbody>${finalLogRows}</tbody>
                        </table>
                    </section>
                    <footer style="margin-top: 1rem; display: flex; justify-content: space-between; font-size: 10pt;">
                        <span>XN-BM 5.5.1/05</span>
                        <span>Lần ban hành: 01.dd/mm/yy</span>
                        <span>Trang 1/5</span>
                    </footer>
                </div>
            </body></html>
        `;
    
        const blob = new Blob([htmlContent], { type: 'application/msword' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = `Nhat_ky_su_dung_${equipment.assetId}.doc`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(link.href);
    };

    const handleInitiateNCFromEquipmentLog = (log: types.EquipmentUsageLog) => {
        const eqName = labEquipment.find(e => e.id === log.equipmentId)?.name || 'N/A';
        const reporterName = users.find(u => u.id === log.userId)?.fullName || log.userId;

        const newNC: Omit<types.NonConformity, 'id' | 'ncId'> = {
          date: new Date().toISOString().split('T')[0],
          description: `Sự cố trên thiết bị ${eqName}: ${log.incidents}`,
          correctiveAction: log.correctiveAction,
          reportedBy: reporterName,
          category: 'equipment',
          severity: 'minor',
          status: 'open'
        };
        
        setNcCreationSource({ type: 'equipmentLog', id: log.id });
        setEditingNC(newNC as any);
        setIsNonConformityFormOpen(true);
    };

    const handleCreateNonConformityFromLog = (log: types.EquipmentUsageLog) => {
        const eqName = labEquipment.find(e => e.id === log.equipmentId)?.name || 'N/A';
        const reporterName = users.find(u => u.id === log.userId)?.fullName || log.userId;
    
        setConfirmAction({
          onConfirm: () => {
            handleInitiateNCFromEquipmentLog(log);
            setIsConfirmModalOpen(false);
          },
          title: 'Xác nhận Chuyển sang SKPH',
          message: (
            <div className="text-sm space-y-2">
              <p>Bạn có chắc muốn tạo một phiếu Sự không phù hợp (SKPH) mới từ thông tin nhật ký sử dụng sau?</p>
              <div className="bg-slate-50 p-3 rounded-md border border-slate-200 space-y-1">
                <p><strong>Thiết bị:</strong> {eqName}</p>
                <p><strong>Người báo cáo:</strong> {reporterName}</p>
                <p><strong>Nội dung sự cố:</strong> {log.incidents}</p>
                <p><strong>Hành động khắc phục đã thực hiện:</strong> {log.correctiveAction}</p>
              </div>
            </div>
          )
        });
        setIsConfirmModalOpen(true);
    };


    // NC & PA Handlers
    const handleSaveNonConformity = (data: Omit<types.NonConformity, 'id'> | types.NonConformity) => {
        if ('id' in data && data.id) { // Update
            setNonConformities(prev => prev.map(item => item.id === data.id ? data : item).sort((a,b) => b.date.localeCompare(a.date)));
        } else { // Add
            const monthCounters: { [key: string]: number } = {};
            nonConformities.forEach(nc => {
                const d = new Date(nc.date);
                const key = `${d.getFullYear()}-${d.getMonth()}`;
                monthCounters[key] = (monthCounters[key] || 0) + 1;
            });
            const date = new Date(data.date + 'T00:00:00');
            const key = `${date.getFullYear()}-${date.getMonth()}`;
            const seq = (monthCounters[key] || 0) + 1;
            const numericId = `${date.getFullYear().toString().slice(-2)}${(date.getMonth() + 1).toString().padStart(2, '0')}${seq.toString().padStart(3, '0')}`;
            
            const newNc: types.NonConformity = {
                ...(data as Omit<types.NonConformity, 'id'>),
                id: `nc-${Date.now()}`,
                ncId: `SKPH-${numericId}`,
                hdkpId: data.correctiveAction ? `HDKP-${numericId}` : undefined,
            };
            setNonConformities(prev => [newNc, ...prev].sort((a,b) => b.date.localeCompare(a.date)));
            
            if (ncCreationSource) {
                if (ncCreationSource.type === 'incident') {
                    setIncidentReports(prev => prev.map(inc => 
                        inc.id === ncCreationSource.id ? { ...inc, nonConformityId: newNc.id } : inc
                    ));
                } else if (ncCreationSource.type === 'equipmentLog') {
                    setEquipmentUsageLogs(prev => prev.map(log =>
                        log.id === ncCreationSource.id ? { ...log, nonConformityId: newNc.id } : log
                    ));
                } else if (ncCreationSource.type === 'systemEvent') {
                    setSystemEvents(prev => prev.map(event =>
                        event.id === ncCreationSource.id ? { ...event, nonConformityId: newNc.id } : event
                    ));
                }
                setNcCreationSource(null);
            }
        }
    };
    const handleSavePreventiveAction = (data: Omit<types.PreventiveActionReport, 'id'> | types.PreventiveActionReport) => {
        if ('id' in data && data.id) { // Update
            setPreventiveActionReports(prev => prev.map(item => item.id === data.id ? data : item));
        } else { // Add
             const year = new Date(data.dateCreated).getFullYear().toString().slice(-2);
             const count = preventiveActionReports.filter(r => r.reportId.startsWith(`HDPN-${year}`)).length + 1;
             const newPa: types.PreventiveActionReport = {
                ...(data as Omit<types.PreventiveActionReport, 'id'>),
                id: `pa-${Date.now()}`,
                reportId: `HDPN-${year}${count.toString().padStart(4, '0')}`,
             };
             setPreventiveActionReports(prev => [newPa, ...prev]);

             // Link back to the NC
             if (newPa.nonConformityId) {
                setNonConformities(prevNcs => prevNcs.map(nc => 
                    nc.id === newPa.nonConformityId 
                        ? { ...nc, preventiveActionId: newPa.id } 
                        : nc
                ));
             }
        }
    };

    // Data Management Handlers
    const handleBackup = () => {
        const backupData = {
            users, chemicals, chemicalMasters, storageLocations, instruments, onInstrumentStock,
            testParameters, controlMaterials, controlLotTargets, iqcResults, personnel, trainees, jobRoles,
            organizationUnits, labEquipment, workItems, nonConformities, leaveRecords, attendanceRecords,
            workSchedule, holidays, dutyAssignments, taskAssignments, personnelAssignmentHistory, kpiScores,
            monitoredAreas, monitoredEquipment, waterSources, accessLogs, areaEnvLogs, equipEnvLogs,
            waterConductivityLogs, incidentReports, trainingCourses, trainingRecords, competencies,
            competencyAssessments, labDocuments, documentCategories, improvementInitiatives, customerFeedback,
            assessments, planningSlips, disposalRecords, manualPreparationLogs, maintenanceChecklistLogs,
            equipmentUsageLogs, roomLocations, eqaMaterials, preventiveActionReports, eqaResults, decontaminationLogs,
            systemEvents, eqaSchedule
        };
        const jsonString = `data:text/json;charset=utf-8,${encodeURIComponent(JSON.stringify(backupData, null, 2))}`;
        const link = document.createElement("a");
        link.href = jsonString;
        link.download = `qms_backup_${new Date().toISOString().split('T')[0]}.json`;
        link.click();
    };

    const handleRestore = (file: File) => {
        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const text = e.target?.result;
                if (typeof text !== 'string') throw new Error("File could not be read.");
                const data = JSON.parse(text);

                setRestoreProgress(0);
                setIsRestoreProgressModalOpen(true);

                const restoreTasks: (() => void)[] = [
                    () => setUsers(data.users || []),
                    () => setChemicals(data.chemicals || []),
                    () => setChemicalMasters(data.chemicalMasters || []),
                    () => setStorageLocations(data.storageLocations || []),
                    () => setInstruments(data.instruments || []),
                    () => setOnInstrumentStock(data.onInstrumentStock || []),
                    () => setTestParameters(data.testParameters || []),
                    () => setControlMaterials(data.controlMaterials || []),
                    () => setControlLotTargets(data.controlLotTargets || []),
                    () => setIqcResults(data.iqcResults || []),
                    () => setPersonnel(data.personnel || []),
                    () => setTrainees(data.trainees || []),
                    () => setJobRoles(data.jobRoles || []),
                    () => setOrganizationUnits(data.organizationUnits || []),
                    () => setLabEquipment(data.labEquipment || []),
                    () => setWorkItems(data.workItems || []),
                    () => setNonConformities(data.nonConformities || []),
                    () => setLeaveRecords(data.leaveRecords || []),
                    () => setAttendanceRecords(data.attendanceRecords || []),
                    () => setWorkSchedule(data.workSchedule || {startTime: '07:30', endTime: '16:30'}),
                    () => setHolidays(data.holidays || []),
                    () => setDutyAssignments(data.dutyAssignments || []),
                    () => setTaskAssignments(data.taskAssignments || []),
                    () => setPersonnelAssignmentHistory(data.personnelAssignmentHistory || []),
                    () => setKpiScores(data.kpiScores || []),
                    () => setMonitoredAreas(data.monitoredAreas || []),
                    () => setMonitoredEquipment(data.monitoredEquipment || []),
                    () => setWaterSources(data.waterSources || []),
                    () => setAccessLogs(data.accessLogs || []),
                    () => setAreaEnvLogs(data.areaEnvLogs || []),
                    () => setEquipEnvLogs(data.equipEnvLogs || []),
                    () => setWaterConductivityLogs(data.waterConductivityLogs || []),
                    () => setIncidentReports(data.incidentReports || []),
                    () => setTrainingCourses(data.trainingCourses || []),
                    () => setTrainingRecords(data.trainingRecords || []),
                    () => setCompetencies(data.competencies || []),
                    () => setCompetencyAssessments(data.competencyAssessments || []),
                    () => setLabDocuments(data.labDocuments || []),
                    () => setDocumentCategories(data.documentCategories || []),
                    () => setImprovementInitiatives(data.improvementInitiatives || []),
                    () => setCustomerFeedback(data.customerFeedback || []),
                    () => setAssessments(data.assessments || []),
                    () => setPlanningSlips(data.planningSlips || []),
                    () => setDisposalRecords(data.disposalRecords || []),
                    () => setManualPreparationLogs(data.manualPreparationLogs || []),
                    () => setMaintenanceChecklistLogs(data.maintenanceChecklistLogs || []),
                    () => setEquipmentUsageLogs(data.equipmentUsageLogs || []),
                    () => setRoomLocations(data.roomLocations || []),
                    () => setEQAMaterials(data.eqaMaterials || []),
                    () => setPreventiveActionReports(data.preventiveActionReports || []),
                    () => setEqaResults(data.eqaResults || []),
                    () => setDecontaminationLogs(data.decontaminationLogs || []),
                    () => setSystemEvents(data.systemEvents || []),
                    () => setEqaSchedule(data.eqaSchedule || []),
                ];
                
                const totalTasks = restoreTasks.length;
                let completedTasks = 0;
                
                const processTask = () => {
                    if (completedTasks < totalTasks) {
                        restoreTasks[completedTasks]();
                        completedTasks++;
                        const progress = Math.round((completedTasks / totalTasks) * 100);
                        setRestoreProgress(progress);
                        setTimeout(processTask, 50); // Small delay for UI update
                    } else {
                         setTimeout(() => {
                             setIsRestoreProgressModalOpen(false);
                             alert("Phục hồi dữ liệu thành công! Trang sẽ được tải lại.");
                             window.location.reload();
                         }, 1000);
                    }
                };
                
                processTask();

            } catch (err) {
                console.error("Lỗi khi phục hồi dữ liệu:", err);
                alert("Tệp sao lưu không hợp lệ hoặc đã bị hỏng.");
                setIsRestoreProgressModalOpen(false);
            }
        };
        reader.readAsText(file);
    };
    
    const handleInitiateRestore = (file: File) => {
        setConfirmAction({
            onConfirm: () => { handleRestore(file); setIsConfirmModalOpen(false); },
            title: 'Xác nhận Phục hồi Dữ liệu',
            message: 'Phục hồi dữ liệu sẽ GHI ĐÈ toàn bộ dữ liệu hiện tại. Hành động này không thể hoàn tác. Bạn có chắc chắn muốn tiếp tục?'
        });
        setIsConfirmModalOpen(true);
    };

    const handleDownloadTemplate = () => {
        const headers = ["Tên hóa chất", "Số CAS", "Quy cách", "Nhà cung cấp mặc định", "Đơn vị mặc định", "Vị trí lưu trữ mặc định", "Mức tồn kho tối thiểu"];
        const ws = utils.json_to_sheet([{}], { header: headers });
        const wb = utils.book_new();
        utils.book_append_sheet(wb, ws, "ChemicalMasterTemplate");
        writeFile(wb, "danh_muc_hoa_chat_mau.xlsx");
    };

    const handleImportChemicalMasters = (file: File, mode: 'replace' | 'append') => {
        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const data = e.target?.result;
                const workbook = read(data, { type: 'binary' });
                const sheetName = workbook.SheetNames[0];
                const worksheet = workbook.Sheets[sheetName];
                const json: any[] = utils.sheet_to_json(worksheet, { defval: "" });
    
                const newMasters: types.ChemicalMaster[] = [];
                const errors: string[] = [];
    
                json.forEach((row: any, index: number) => {
                    const rowNum = index + 2;
                    const name = String(row["Tên hóa chất"] || '').trim();
    
                    if (!name) {
                        return; // Silently skip empty rows
                    }
    
                    newMasters.push({
                        id: `cmaster-import-${Date.now()}-${rowNum}`,
                        name: name,
                        casNumber: String(row["Số CAS"] || '').trim(),
                        specification: String(row["Quy cách"] || '').trim(),
                        defaultSupplier: String(row["Nhà cung cấp mặc định"] || '').trim(),
                        defaultUnit: String(row["Đơn vị mặc định"] || 'ml').trim(),
                        defaultLocation: String(row["Vị trí lưu trữ mặc định"] || '').trim(),
                        minimumLevel: Number(row["Mức tồn kho tối thiểu"] || 0),
                    });
                });
    
                let trulyNewCount = 0;
                if (mode === 'replace') {
                    setChemicalMasters(newMasters);
                    trulyNewCount = newMasters.length;
                } else { // append
                    const existingKeys = new Set(chemicalMasters.map(p => `${p.name.trim().toLowerCase()}|${p.casNumber.trim().toLowerCase()}`));
                    const trulyNew = newMasters.filter(nm => !existingKeys.has(`${nm.name.trim().toLowerCase()}|${nm.casNumber.trim().toLowerCase()}`));
                    setChemicalMasters(prev => [...prev, ...trulyNew]);
                    trulyNewCount = trulyNew.length;
                }
    
                let successMessage = '';
                if (mode === 'replace') {
                    successMessage = `Đã nhập và thay thế thành công ${trulyNewCount} hóa chất.`;
                } else {
                    const skippedCount = newMasters.length - trulyNewCount;
                    successMessage = `Đã thêm thành công ${trulyNewCount} hóa chất mới.` + (skippedCount > 0 ? ` ${skippedCount} hóa chất đã tồn tại đã được bỏ qua.` : '');
                }
    
                if (errors.length > 0) {
                    alert(`${successMessage}\n\nTuy nhiên, các dòng sau đã bị bỏ qua do lỗi:\n- ${errors.join('\n- ')}`);
                } else {
                    alert(successMessage);
                }
    
            } catch (error) {
                console.error("Lỗi khi nhập file:", error);
                alert(`Lỗi khi xử lý file Excel: ${error instanceof Error ? error.message : String(error)}`);
            }
        };
        reader.readAsBinaryString(file);
    };
    

    const handleDownloadTestTemplate = () => {
        const headers = ["name", "method", "unit", "referenceRange", "tea"];
        const ws = utils.json_to_sheet([{}], { header: headers });
        const wb = utils.book_new();
        utils.book_append_sheet(wb, ws, "danh_muc_xet_nghiem_mau.xlsx");
    };

    const handleImportTestParameters = (file: File, mode: 'replace' | 'append') => {
        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const data = e.target?.result;
                const workbook = read(data, { type: 'binary' });
                const sheetName = workbook.SheetNames[0];
                const worksheet = workbook.Sheets[sheetName];
                const json: any[] = utils.sheet_to_json(worksheet, { defval: "" });
    
                const newTests: types.TestParameter[] = [];
                const errors: string[] = [];
    
                json.forEach((row: any, index: number) => {
                    const rowNum = index + 2;
                    const name = String(row.name || '').trim();
    
                    if (!name) {
                        return; // Silently skip empty rows
                    }
    
                    const unit = String(row.unit || '').trim();
                    if (!unit) {
                        errors.push(`Dòng ${rowNum} thiếu Đơn vị.`);
                        return; // Skip this invalid row
                    }
    
                    newTests.push({
                        id: `tp-import-${Date.now()}-${rowNum}`,
                        name: name,
                        method: String(row.method || '').trim(),
                        unit: unit,
                        referenceRange: String(row.referenceRange || '').trim(),
                        tea: Number(row.tea || 0),
                    });
                });
    
                let trulyNewCount = 0;
                if (mode === 'replace') {
                    setTestParameters(newTests);
                    trulyNewCount = newTests.length;
                } else { // append
                    const existingNames = new Set(testParameters.map(p => p.name.toLowerCase()));
                    const trulyNew = newTests.filter(nt => !existingNames.has(nt.name.toLowerCase()));
                    setTestParameters(prev => [...prev, ...trulyNew]);
                    trulyNewCount = trulyNew.length;
                }
    
                let successMessage = '';
                if (mode === 'replace') {
                    successMessage = `Đã nhập và thay thế thành công ${trulyNewCount} xét nghiệm.`;
                } else {
                    const skippedCount = newTests.length - trulyNewCount;
                    successMessage = `Đã thêm thành công ${trulyNewCount} xét nghiệm mới.` + (skippedCount > 0 ? ` ${skippedCount} xét nghiệm đã tồn tại đã được bỏ qua.` : '');
                }
    
                if (errors.length > 0) {
                    alert(`${successMessage}\n\nTuy nhiên, các dòng sau đã bị bỏ qua do lỗi:\n- ${errors.join('\n- ')}`);
                } else {
                    alert(successMessage);
                }
    
            } catch (error) {
                console.error("Lỗi khi nhập file:", error);
                alert(`Lỗi khi xử lý file Excel: ${error instanceof Error ? error.message : String(error)}`);
            }
        };
        reader.readAsBinaryString(file);
    };

    const handleDownloadIQCTemplate = () => {
        const headers = ["testName", "controlLotNumber", "controlLevel", "date (YYYY-MM-DD)", "time (HH:MM)", "value", "notes"];
        const ws = utils.json_to_sheet([{}], { header: headers });
        const wb = utils.book_new();
        utils.book_append_sheet(wb, ws, "IQCResultsTemplate");
        writeFile(wb, "mau_nhap_ket_qua_noi_kiem.xlsx");
    };
    
    const handleImportIQCResults = (file: File) => {
        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const data = e.target?.result;
                const workbook = read(data, { type: 'binary' });
                const sheetName = workbook.SheetNames[0];
                const worksheet = workbook.Sheets[sheetName];
                const json: any[] = utils.sheet_to_json(worksheet, { defval: "" });
    
                const testMap: Map<string, string> = new Map(testParameters.map(t => [t.name.toLowerCase(), t.id]));
                const controlMap: Map<string, string> = new Map(controlMaterials.map(c => [`${c.lotNumber.toLowerCase()}-${c.level.toLowerCase()}`, c.id]));
                
                const newResults: Omit<types.IQCResult, 'id'>[] = [];
                const errors: string[] = [];
    
                json.forEach((row: any, index: number) => {
                    const rowNum = index + 2;
                    const testName = String(row.testName || '').trim().toLowerCase();
                    const controlLot = String(row.controlLotNumber || '').trim().toLowerCase();
                    const controlLevel = String(row.controlLevel || '').trim().toLowerCase();
                    const date = row['date (YYYY-MM-DD)'];
                    const time = row['time (HH:MM)'];
                    const valueStr = String(row.value || '');
                    const value = parseFloat(valueStr);
                    
                    if (!testName && !controlLot && !controlLevel && !date && !time && !valueStr) {
                        return; // Skip empty rows
                    }
                    
                    if (!testName || !controlLot || !controlLevel || !date || !time || isNaN(value)) {
                        errors.push(`Dòng ${rowNum}: Thiếu hoặc sai định dạng dữ liệu bắt buộc.`);
                        return;
                    }
                    
                    const testParameterId = testMap.get(testName);
                    if (!testParameterId) {
                        errors.push(`Dòng ${rowNum}: Không tìm thấy xét nghiệm "${row.testName}".`);
                        return;
                    }
                    
                    const controlMaterialId = controlMap.get(`${controlLot}-${controlLevel}`);
                    if (!controlMaterialId) {
                        errors.push(`Dòng ${rowNum}: Không tìm thấy vật liệu control Lô "${row.controlLotNumber}" - Mức "${row.controlLevel}".`);
                        return;
                    }
                    
                    let isoDateStr: string;
                    try {
                        if (typeof date === 'number') {
                            const excelEpoch = new Date(1899, 11, 30);
                            const dateObj = new Date(excelEpoch.getTime() + date * 86400000);
                            const timeParts = String(time).split(':');
                            dateObj.setUTCHours(parseInt(timeParts[0], 10));
                            dateObj.setUTCMinutes(parseInt(timeParts[1], 10));
                            isoDateStr = dateObj.toISOString();
                        } else {
                             isoDateStr = new Date(`${date}T${time}`).toISOString();
                        }
        
                        if (isNaN(new Date(isoDateStr).getTime())) {
                             throw new Error();
                        }
                    } catch {
                        errors.push(`Dòng ${rowNum}: Định dạng ngày/giờ không hợp lệ ("${date} ${time}").`);
                        return;
                    }
    
                    newResults.push({
                        testParameterId,
                        controlMaterialId,
                        date: isoDateStr,
                        value,
                        recordedBy: currentUser?.fullName || 'N/A',
                        notes: String(row.notes || '').toString(),
                    });
                });
    
                const resultsWithIds = newResults.map(r => ({ ...r, id: `iqc-import-${Date.now()}-${Math.random()}`}));
                setIqcResults(prev => [...prev, ...resultsWithIds]);

                const successMessage = `Đã nhập thành công ${newResults.length} kết quả nội kiểm.`;
                if (errors.length > 0) {
                    alert(`${successMessage}\n\nTuy nhiên, các dòng sau đã bị bỏ qua do lỗi:\n- ${errors.join('\n- ')}`);
                } else if (newResults.length > 0) {
                    alert(successMessage);
                } else if (errors.length > 0 && newResults.length === 0) {
                    alert(`Không nhập được kết quả nào. Đã xảy ra các lỗi sau:\n- ${errors.join('\n- ')}`);
                } else {
                    alert('Không có dữ liệu mới để nhập.');
                }
    
            } catch (error) {
                console.error("Lỗi khi nhập file IQC:", error);
                alert(`Lỗi khi xử lý file Excel: ${error instanceof Error ? error.message : String(error)}`);
            }
        };
        reader.readAsBinaryString(file);
    };

    // Global Search Handlers
    const handleSearch = (query: string) => {
        setSearchQuery(query);
        if (!query.trim()) {
            setSearchResults([]);
            return;
        }

        const lowerQuery = query.toLowerCase();
        let results: types.SearchResult[] = [];

        // Search Chemicals
        results = results.concat(
            chemicals.filter(c => c.name.toLowerCase().includes(lowerQuery) || c.casNumber.toLowerCase().includes(lowerQuery) || c.lotNumber.toLowerCase().includes(lowerQuery) || c.barcode.toLowerCase().includes(lowerQuery))
            .map(c => ({ id: c.id, type: 'chemical', title: c.name, details: `Lô: ${c.lotNumber} | CAS: ${c.casNumber}`, category: 'Kho' }))
        );

        // Search Equipment
        results = results.concat(
            labEquipment.filter(e => e.name.toLowerCase().includes(lowerQuery) || e.assetId.toLowerCase().includes(lowerQuery) || e.serialNumber.toLowerCase().includes(lowerQuery))
            .map(e => ({ id: e.id, type: 'equipment', title: e.name, details: `Mã TS: ${e.assetId} | Vị trí: ${e.location}`, category: 'Thiết bị' }))
        );
        
        // Search Personnel
        results = results.concat(
            personnel.filter(p => p.fullName.toLowerCase().includes(lowerQuery) || p.employeeId.toLowerCase().includes(lowerQuery))
            .map(p => ({ id: p.id, type: 'personnel', title: p.fullName, details: `Mã NV: ${p.employeeId}`, category: 'Nhân sự' }))
        );
        
        // Search Documents
        results = results.concat(
            labDocuments.filter(d => d.title.toLowerCase().includes(lowerQuery))
            .map(d => ({ id: d.id, type: 'document', title: d.title, details: `Danh mục: ${d.category} | Phiên bản: ${d.version}`, category: 'Tài liệu' }))
        );
        
        // Search Non-Conformities
        results = results.concat(
            nonConformities.filter(nc => nc.description.toLowerCase().includes(lowerQuery) || nc.ncId.toLowerCase().includes(lowerQuery))
            .map(nc => ({ id: nc.id, type: 'nonconformity', title: nc.ncId, details: nc.description, category: 'Sự không phù hợp' }))
        );

        setSearchResults(results);
    };

    const handleSearchResultClick = (result: types.SearchResult) => {
        setFocusedItemId(result.id);
        setSearchQuery('');
        setSearchResults([]);

        switch (result.type) {
            case 'chemical':
                setActiveModule('qms2429');
                setActivePage('warehouse');
                break;
            case 'equipment':
                setActiveModule('qms2429');
                setActivePage('equipment');
                break;
            case 'personnel':
                 setActiveModule('qms2429');
                 setActivePage('personnel');
                break;
            case 'document':
                 setActiveModule('qms2429');
                 setActivePage('documents');
                break;
            case 'nonconformity':
                 setActiveModule('qms2429');
                 setActivePage('nonconformity');
                break;
        }
    };
    
    // Information Management Handler
    const handleSaveSystemEvent = (data: Omit<types.SystemEvent, 'id'> | types.SystemEvent) => {
        handleSave(setSystemEvents, data, 'se');
        setIsSystemEventFormOpen(false);
    };

    const handleCreateNCFromIncidentWithConfirm = (incident: types.IncidentReport) => {
        setConfirmAction({
            onConfirm: () => {
                const description = `Sự cố [${incident.incidentType}] tại [${incident.location}]: ${incident.description}`;
                const newNC: Omit<types.NonConformity, 'id' | 'ncId'> = {
                    date: incident.date,
                    description: description,
                    category: 'safety',
                    severity: 'minor',
                    status: 'open',
                    reportedBy: incident.reportedBy,
                    correctiveAction: `${incident.immediateAction}\n${incident.correctiveAction}`.trim(),
                };
                setNcCreationSource({ type: 'incident', id: incident.id });
                setEditingNC(newNC as any);
                setIsNonConformityFormOpen(true);
                setIsConfirmModalOpen(false);
            },
            title: 'Chuyển sang SKPH',
            message: `Bạn có chắc muốn tạo một phiếu SKPH mới từ sự cố "${incident.description.substring(0, 50)}..."?`
        });
        setIsConfirmModalOpen(true);
    };

    const handleCreateNCFromSystemEventWithConfirm = (event: types.SystemEvent) => {
        setConfirmAction({
            onConfirm: () => {
                const description = `Từ sự kiện hệ thống [${event.type.toUpperCase()}] lúc ${new Date(event.timestamp).toLocaleString('vi-VN')}: ${event.description}`;
                const newNC: Omit<types.NonConformity, 'id' | 'ncId'> = {
                    date: new Date(event.timestamp).toISOString().split('T')[0],
                    description: description,
                    category: 'system',
                    severity: 'minor',
                    status: 'open',
                    reportedBy: event.user,
                };
                setNcCreationSource({ type: 'systemEvent', id: event.id });
                setEditingNC(newNC as any);
                setIsNonConformityFormOpen(true);
                setIsConfirmModalOpen(false);
            },
            title: 'Chuyển sang SKPH',
            message: `Bạn có chắc muốn tạo một phiếu SKPH mới từ sự kiện hệ thống: "${event.description.substring(0, 50)}..."?`
        });
        setIsConfirmModalOpen(true);
    };


    // ======== RENDER LOGIC ========
    if (!currentUser) {
        return <LoginPage onLogin={handleLogin} />;
    }

    // FIX: Add explicit type to navigationItems to fix type inference issue with item.id
    const navigationItems: { id: Page; label: string; icon: React.ReactNode }[] = [
        { id: 'alerts', label: 'Cảnh báo', icon: <BellIcon /> },
        { id: 'warehouse', label: 'Quản lý Kho', icon: <ArchiveBoxIcon /> },
        { id: 'quality', label: 'Quản lý Chất lượng', icon: <ChartBarSquareIcon /> },
        { id: 'nonconformity', label: 'Sự không phù hợp', icon: <ExclamationTriangleIcon /> },
        { id: 'audit', label: 'Đánh giá', icon: <ClipboardDocumentCheckIcon /> },
        { id: 'equipment', label: 'Thiết bị', icon: <ToolIcon /> },
        { id: 'personnel', label: 'Nhân sự', icon: <AcademicCapIcon /> },
        { id: 'documents', label: 'Tài liệu', icon: <BookOpenIcon /> },
        { id: 'safety', label: 'An toàn & Môi trường', icon: <ShieldCheckIcon /> },
        { id: 'customer', label: 'Dịch vụ Khách hàng', icon: <HeadphonesIcon /> },
        { id: 'improvement', label: 'Cải tiến', icon: <RecycleIcon /> },
        { id: 'organization', label: 'Tổ chức', icon: <BuildingOfficeIcon /> },
        { id: 'info', label: 'Quản lý Thông tin', icon: <InformationIcon /> },
        { id: 'dataManagement', label: 'Quản lý Dữ liệu', icon: <DatabaseIcon /> },
        { id: 'settings', label: 'Cài đặt', icon: <SettingsIcon /> },
    ];

    const renderPage = () => {
        switch(activePage) {
            case 'alerts': return <AlertsPage chemicals={chemicals} labEquipment={labEquipment} iqcResults={iqcResults} controlLotTargets={controlLotTargets} testParameters={testParameters} controlMaterials={controlMaterials} monitoredAreas={monitoredAreas} monitoredEquipment={monitoredEquipment} waterSources={waterSources} areaEnvLogs={areaEnvLogs} equipmentTempLogs={equipEnvLogs} waterConductivityLogs={waterConductivityLogs} incidentReports={incidentReports} />;
            case 'warehouse': return <WarehouseManagementPage 
                chemicals={chemicals} chemicalMasters={chemicalMasters} storageLocations={storageLocations} instruments={instruments} 
                planningSlips={planningSlips} disposalRecords={disposalRecords} onInstrumentStock={onInstrumentStock} manualLogEntries={manualPreparationLogs} 
                currentUser={currentUser} 
                focusedItemId={focusedItemId}
                onEditChemical={(c) => { setEditingChemical(c); setIsChemicalFormOpen(true); }}
                onDeleteChemical={(id) => handleDelete(setChemicals, id, 'Xóa Hóa chất', 'Bạn có chắc muốn xóa hóa chất này?')}
                onGetSafetyInfo={async (c) => { setIsSafetyInfoOpen(true); setChemicalForSafety(c); setIsSafetyInfoLoading(true); const info = await getSafetyInfo(c.name, c.casNumber); setSafetyInfo(info); setIsSafetyInfoLoading(false); }}
                onOpenAdjustModal={(c) => { setChemicalToAdjust(c); setIsAdjustModalOpen(true); }}
                onOpenUsageLog={(c) => { setChemicalForLog(c); setIsUsageLogOpen(true); }}
                onOpenBarcodeModal={(c) => { setChemicalForBarcode(c); setIsBarcodeModalOpen(true); }}
                onOpenSafetyDoc={(c) => { setChemicalForSafetyDoc(c); setIsSafetyDocOpen(true); }}
                // FIX: Add `supplier` property when creating a new chemical from a master.
                onAddLot={(master) => { setEditingChemical({ ...master, supplier: master.defaultSupplier, id: '', barcode: '', lotNumber: '', quantity: 0, unit: master.defaultUnit, dateReceived: new Date().toISOString().split('T')[0], personReceived: currentUser.fullName, deliveryPerson: '', sequenceNumber: '', expirationDate: '', storageLocation: master.defaultLocation, initialQuantity: 0, qualityAssessment: '' }); setIsChemicalFormOpen(true); }}
                onRecordUsage={(c) => { setChemicalToAdjust(c); setIsAdjustModalOpen(true); }}
                onOpenMoveToInstrumentModal={(c) => { setChemicalToMove(c); setIsMoveToInstrumentModalOpen(true); }}
                onInstrumentAdjust={(item, action) => { setStockToAdjust({item, action}); setIsOnInstrumentAdjustModalOpen(true); }}
                onSavePlanningSlip={(items) => { const newSlip = { id: `PDT-${Date.now()}`, createdAt: new Date().toISOString(), createdBy: currentUser.fullName, items }; setPlanningSlips(prev => [newSlip, ...prev]); return newSlip; }}
                onViewPlanningSlip={(s) => { setSlipToView(s); setIsPlanningSlipModalOpen(true); }}
                onUpdatePhysicalCount={handleUpdatePhysicalCount}
                onAddDisposalRecord={(r) => handleSave(setDisposalRecords, r, 'disp')}
                onUpdateDisposalRecord={(r) => handleSave(setDisposalRecords, r, 'disp')}
                onDeleteDisposalRecord={(id) => handleDelete(setDisposalRecords, id, 'Xóa Biên bản', 'Bạn có chắc muốn xóa biên bản hủy này?')}
                onPrintDisposalRecord={(r) => setDisposalToPrint(r)}
                onExportDisposalToDoc={() => alert("Chức năng đang phát triển")}
                onExportDisposalToExcel={() => alert("Chức năng đang phát triển")}
                onImportStockIn={() => alert("Chức năng đang phát triển")}
                onDownloadStockInTemplate={() => alert("Chức năng đang phát triển")}
                // FIX: Pass the missing `onAddManualEntry` prop.
                onAddManualEntry={(log) => handleSave(setManualPreparationLogs, log, 'man-prep')}
                monitoredAreas={monitoredAreas} monitoredEquipment={monitoredEquipment} areaEnvLogs={areaEnvLogs} 
                equipmentTempLogs={equipEnvLogs} waterSources={waterSources} waterConductivityLogs={waterConductivityLogs}
             />;
            case 'quality': return <QualityManagementPage 
                chemicals={chemicals} manualLogEntries={manualPreparationLogs} chemicalMasters={chemicalMasters} 
                currentUser={currentUser} onAddManualEntry={(log) => handleSave(setManualPreparationLogs, log, 'man-prep')} 
                testParameters={testParameters} controlMaterials={controlMaterials} controlLotTargets={controlLotTargets} 
                iqcResults={iqcResults} onAddIQCResult={() => { setSettingsInitialData(null); setActiveSettingsModal('iqcResult'); setIsSettingsModalOpen(true); }} 
                onOpenIQCCommentModal={handleOpenIQCCommentModal}
                onConvertIqcToNc={handleConvertIqcToNc}
                onOpenIQCImportModal={() => setIsIQCImportModalOpen(true)}
                onOpenWestgardGuidanceModal={handleOpenWestgardGuidanceModal}
                onExportIQCWithChart={handleExportIQCWithChart}
                onExportIQCToPdf={handleExportIQCToPdf}
                onOpenCalculateTargetModal={handleOpenCalculateTargetModal}
                personnel={personnel}
                eqaMaterials={eqaMaterials}
                eqaResults={eqaResults}
                onOpenEQAResultModal={(materialId, result) => {
                    setEditingEqaResult({ materialId, result });
                    setIsEqaResultModalOpen(true);
                }}
                eqaSchedule={eqaSchedule}
                onOpenEQAScheduleModal={(schedule) => { setEditingEQASchedule(schedule || null); setIsEQAScheduleFormOpen(true); }}
                onDeleteEQASchedule={handleDeleteEQASchedule}
            />;
             case 'nonconformity': return <NonConformityPage 
                nonConformities={nonConformities} preventiveActionReports={preventiveActionReports} currentUser={currentUser}
                focusedItemId={focusedItemId}
                onAddOrUpdateNC={(item) => { setEditingNC(item); setIsNonConformityFormOpen(true); }}
                onDeleteNC={(id) => handleDelete(setNonConformities, id, 'Xóa SKPH', 'Bạn có chắc muốn xóa phiếu SKPH này?')}
                onAddOrUpdatePreventiveAction={(item) => { setEditingPA(item as any); setIsPreventiveActionFormOpen(true); }}
                onDeletePreventiveAction={(id) => handleDelete(setPreventiveActionReports, id, 'Xóa HĐPN', 'Bạn có chắc muốn xóa phiếu HĐPN này?')}
                onExportToDoc={() => alert("Chức năng đang phát triển")} onExportToExcel={() => alert("Chức năng đang phát triển")}
                onExportCorrectiveActionToDoc={() => alert("Chức năng đang phát triển")} onExportCorrectiveActionLogToDoc={() => alert("Chức năng đang phát triển")}
                onExportCorrectiveActionLogToExcel={() => alert("Chức năng đang phát triển")} onExportPreventiveActionToDoc={() => alert("Chức năng đang phát triển")}
            />;
            case 'equipment': return <EquipmentPage 
                equipment={labEquipment} personnel={personnel} equipmentUsageLogs={equipmentUsageLogs} workItems={workItems} 
                currentUser={currentUser} maintenanceChecklistLogs={maintenanceChecklistLogs} accessLogs={accessLogs}
                focusedItemId={focusedItemId}
                onAdd={() => { setEditingEquipment(null); setIsEquipmentFormOpen(true); }}
                onEdit={(eq) => { setEditingEquipment(eq); setIsEquipmentFormOpen(true); }}
                onDelete={(id) => handleDelete(setLabEquipment, id, 'Xóa Thiết bị', 'Bạn có chắc muốn xóa thiết bị này?')}
                onViewDetails={(eq) => setEquipmentForDetail(eq)}
                onOpenAddUsageLog={() => { setEditingUsageLog(null); setIsEquipmentUsageLogFormOpen(true); }}
                onEditUsageLog={(log) => { setEditingUsageLog(log); setIsEquipmentUsageLogFormOpen(true); }}
                onUpdateUsageLog={handleSaveOrUpdateUsageLog}
                onUpdateAssociatedWorkItems={(eqId, itemIds) => setLabEquipment(prev => prev.map(eq => eq.id === eqId ? {...eq, associatedWorkItemIds: itemIds} : eq))}
                onAddOrUpdateWorkItem={(item) => { handleSave(setWorkItems, item, 'wi'); setIsSettingsModalOpen(false); }}
                onDeleteWorkItem={(id) => { handleDelete(setWorkItems, id, 'Xóa Công việc', 'Bạn có chắc muốn xóa công việc này?'); setIsSettingsModalOpen(false); }}
                onCheckTask={handleCheckMaintenanceTask}
                onUpdateProcedure={handleUpdateEquipmentProcedure}
                onCreateNonConformity={handleCreateNonConformityFromLog}
                onExportToDoc={handleExportEquipmentProfileToDoc} 
                onExportUsageLogToDoc={handleExportUsageLogToDoc} 
                onExportMaintenanceSheetToDoc={() => alert("Chức năng đang phát triển")}
            />;
            case 'personnel': return <PersonnelPage 
                personnel={personnel} 
                jobRoles={jobRoles} 
                trainees={trainees} 
                trainingCourses={trainingCourses}
                trainingRecords={trainingRecords} 
                competencies={competencies} 
                competencyAssessments={competencyAssessments.filter(ca => ca.personnelId === personnelForDetail?.id)}
                focusedItemId={focusedItemId}
                onAdd={() => { setEditingPersonnel(null); setIsPersonnelFormOpen(true); }}
                onEdit={(p) => { setEditingPersonnel(p); setIsPersonnelFormOpen(true); }}
                onDelete={(id) => handleDelete(setPersonnel, id, 'Xóa Nhân sự', 'Bạn có chắc muốn xóa hồ sơ nhân sự này?')}
                onViewDetails={(p) => setPersonnelForDetail(p)}
                onAddTrainee={() => { setEditingTrainee(null); setIsTraineeFormOpen(true); }}
                onEditTrainee={(t) => { setEditingTrainee(t); setIsTraineeFormOpen(true); }}
                onDeleteTrainee={(id) => handleDelete(setTrainees, id, 'Xóa Học viên', 'Bạn có chắc muốn xóa hồ sơ học viên này?')}
                onAddTrainingCourse={() => { setEditingTrainingCourse(null); setIsTrainingCourseFormOpen(true); }}
                onEditTrainingCourse={(c) => { setEditingTrainingCourse(c); setIsTrainingCourseFormOpen(true); }}
                onDeleteTrainingCourse={(id) => handleDelete(setTrainingCourses, id, 'Xóa Khóa học', 'Bạn có chắc muốn xóa khóa học này?')}
                onAddCompetency={() => { setEditingCompetency(null); setIsCompetencyFormOpen(true); }}
                onEditCompetency={(c) => { setEditingCompetency(c); setIsCompetencyFormOpen(true); }}
                onDeleteCompetency={(id) => handleDelete(setCompetencies, id, 'Xóa Năng lực', 'Bạn có chắc muốn xóa năng lực này?')}
                // Props moved from OrganizationPage
                organizationUnits={organizationUnits}
                personnelAssignmentHistory={personnelAssignmentHistory}
                leaveRecords={leaveRecords}
                attendanceRecords={attendanceRecords}
                dutyAssignments={dutyAssignments}
                taskAssignments={taskAssignments}
                kpiScores={kpiScores}
                workSchedule={workSchedule}
                holidays={holidays}
                onAddLeave={() => setIsLeaveFormOpen(true)}
                onAddOrUpdateAttendance={(personnelId, date, record) => { setAttendanceContext({personnelId, date, record}); setIsAttendanceFormOpen(true); }}
                onAddDutyAssignment={(data) => handleSave(setDutyAssignments, data, 'duty')}
                onDeleteDutyAssignment={(id) => handleDelete(setDutyAssignments, id, 'Hủy trực', 'Bạn có chắc muốn hủy ca trực này?')}
                onAddTaskAssignment={(data) => handleSave(setTaskAssignments, data, 'task')}
                onOpenMovePersonnel={() => setIsMovePersonnelOpen(true)}
                onAddOrUpdateKpiScore={(personnelId, date, bonusPoints, penaltyPoints, notes) => handleSave(setKpiScores, { id: `${personnelId}-${date}`, personnelId, date, bonusPoints, penaltyPoints, notes }, '')}
            />;
            case 'documents': return <DocumentsPage 
                documents={labDocuments}
                focusedItemId={focusedItemId}
                onAdd={() => { setEditingDocument(null); setIsDocumentFormOpen(true); }}
                onEdit={(doc) => { setEditingDocument(doc); setIsDocumentFormOpen(true); }}
                onDelete={(id) => handleDelete(setLabDocuments, id, 'Xóa Tài liệu', 'Bạn có chắc muốn xóa tài liệu này?')}
                onViewDocument={setDocumentToView}
            />;
            case 'safety': return <EnvironmentSafetyPage 
                accessLogs={accessLogs} areaEnvLogs={areaEnvLogs} equipEnvLogs={equipEnvLogs}
                waterConductivityLogs={waterConductivityLogs} decontaminationLogs={decontaminationLogs}
                incidentReports={incidentReports} monitoredAreas={monitoredAreas} monitoredEquipment={monitoredEquipment}
                waterSources={waterSources} currentUser={currentUser} labEquipment={labEquipment} roomLocations={roomLocations}
                nonConformities={nonConformities}
                onAddAccessLog={(log) => handleSave(setAccessLogs, log, 'acc')}
                onUpdateAccessLog={(log) => handleSave(setAccessLogs, log, 'acc')}
                onAddAreaEnvLog={(log) => handleSave(setAreaEnvLogs, log, 'ael')}
                onAddEquipEnvLog={(log) => handleSave(setEquipEnvLogs, log, 'eel')}
                onAddWaterConductivityLog={(log) => handleSave(setWaterConductivityLogs, log, 'wcl')}
                onAddOrUpdateDecontaminationLog={(log) => { setEditingDecontaminationLog(log || null); setIsDecontaminationLogModalOpen(true); }}
                onDeleteDecontaminationLog={(id) => handleDelete(setDecontaminationLogs, id, 'Xóa Sổ Khử nhiễm', 'Bạn có chắc muốn xóa mục này?')}
                onAddOrUpdateIncidentReport={(report) => handleSave(setIncidentReports, report, 'inc')}
                onDeleteIncidentReport={(id) => handleDelete(setIncidentReports, id, 'Xóa Báo cáo', 'Bạn có chắc muốn xóa báo cáo sự cố này?')}
                onCreateNCFromIncident={handleCreateNCFromIncidentWithConfirm}
                onExportIncidentToDoc={() => alert('Chức năng đang phát triển')}
                onAddItem={(type, item) => {
                    if (type === 'area') handleSave(setMonitoredAreas, item, 'ma');
                    if (type === 'equipment') handleSave(setMonitoredEquipment, item, 'me');
                    if (type === 'waterSource') handleSave(setWaterSources, item, 'ws');
                }}
                onUpdateItem={(type, item) => {
                    if (type === 'area') handleSave(setMonitoredAreas, item, 'ma');
                    if (type === 'equipment') handleSave(setMonitoredEquipment, item, 'me');
                    if (type === 'waterSource') handleSave(setWaterSources, item, 'ws');
                }}
                onDeleteItem={(type, id) => {
                    if (type === 'area') handleDelete(setMonitoredAreas, id, 'Xóa Khu vực', 'Xóa khu vực này?');
                    if (type === 'equipment') handleDelete(setMonitoredEquipment, id, 'Xóa Thiết bị', 'Xóa thiết bị này?');
                    if (type === 'waterSource') handleDelete(setWaterSources, id, 'Xóa Nguồn nước', 'Xóa nguồn nước này?');
                }}
            />;
            case 'customer': return <CustomerServicePage 
                feedbackItems={customerFeedback}
                onAddOrUpdate={(item) => { setEditingFeedback(item || null); setIsFeedbackFormOpen(true); }}
                onDelete={(id) => handleDelete(setCustomerFeedback, id, 'Xóa Phản hồi', 'Bạn có chắc muốn xóa mục này?')}
            />;
            case 'improvement': return <ContinuousImprovementPage 
                initiatives={improvementInitiatives}
                onAddOrUpdate={(item) => { setEditingImprovement(item || null); setIsImprovementFormOpen(true); }}
                onDelete={(id) => handleDelete(setImprovementInitiatives, id, 'Xóa Sáng kiến', 'Bạn có chắc muốn xóa mục này?')}
            />;
            case 'organization': return <OrganizationPage 
                organizationUnits={organizationUnits} jobRoles={jobRoles} personnel={personnel}
                onAddUnit={(parentId) => { setOrgUnitParentId(parentId); setEditingOrgUnit(null); setIsOrgUnitFormOpen(true); }}
                onEditUnit={(unit) => { setEditingOrgUnit(unit); setIsOrgUnitFormOpen(true); }}
                onDeleteUnit={(id) => handleDelete(setOrganizationUnits, id, 'Xóa Đơn vị', 'Bạn có chắc muốn xóa đơn vị này?')}
                onAddRole={() => { setEditingJobRole(null); setIsJobRoleFormOpen(true); }}
                onEditRole={(role) => { setEditingJobRole(role); setIsJobRoleFormOpen(true); }}
                onDeleteRole={(id) => handleDelete(setJobRoles, id, 'Xóa Chức danh', 'Bạn có chắc muốn xóa chức danh này?')}
            />;
            case 'audit': return <AssessmentPage 
                assessments={assessments}
                onSave={assessment => handleSave(setAssessments, assessment, 'asm')}
                onDelete={id => handleDelete(setAssessments, id, 'Xóa Đánh giá', 'Bạn có chắc muốn xóa đợt đánh giá này?')}
                currentUser={currentUser}
                onViewDocument={setDocumentToView}
            />;
            case 'info': return <InformationManagementPage 
                systemEvents={systemEvents}
                onAddEvent={() => { setEditingSystemEvent(null); setIsSystemEventFormOpen(true); }}
                onDeleteEvent={(id) => handleDelete(setSystemEvents, id, 'Xóa Sự kiện Hệ thống', 'Bạn có chắc muốn xóa vĩnh viễn sự kiện này?')}
                onCreateNonConformity={handleCreateNCFromSystemEventWithConfirm}
            />;
            case 'dataManagement': return <DataManagementPage onBackup={handleBackup} onInitiateRestore={handleInitiateRestore} />;
            case 'settings': return <SettingsPage 
                testParameters={testParameters} chemicalMasters={chemicalMasters} instruments={instruments} roomLocations={roomLocations} storageLocations={storageLocations} controlMaterials={controlMaterials} controlLotTargets={controlLotTargets} eqaMaterials={eqaMaterials} documentCategories={documentCategories}
                onOpenModal={(type, item) => { setActiveSettingsModal(type); setSettingsInitialData(item || null); setIsSettingsModalOpen(true); }}
                onDeleteItem={(type, id) => {
                    if(type === 'testParameter') handleDelete(setTestParameters, id, 'Xóa xét nghiệm', 'Bạn có chắc muốn xóa?');
                    if(type === 'chemicalMaster') handleDelete(setChemicalMasters, id, 'Xóa hóa chất', 'Bạn có chắc muốn xóa?');
                    if(type === 'instrument') handleDelete(setInstruments, id, 'Xóa máy', 'Bạn có chắc muốn xóa?');
                    if(type === 'roomLocation') handleDelete(setRoomLocations, id, 'Xóa vị trí', 'Bạn có chắc muốn xóa?');
                    if(type === 'storage') handleDelete(setStorageLocations, id, 'Xóa kho/tủ', 'Bạn có chắc muốn xóa?');
                    if(type === 'controlMaterial') handleDelete(setControlMaterials, id, 'Xóa vật liệu', 'Bạn có chắc muốn xóa?');
                    if(type === 'controlLotTarget') handleDelete(setControlLotTargets, id, 'Xóa target', 'Bạn có chắc muốn xóa?');
                    if(type === 'eqaMaterial') handleDelete(setEQAMaterials, id, 'Xóa vật liệu', 'Bạn có chắc muốn xóa?');
                    if(type === 'documentCategory') handleDelete(setDocumentCategories, id, 'Xóa danh mục', 'Bạn có chắc muốn xóa?');
                }}
                onOpenChemicalMasterImport={() => setIsChemicalMasterImportOpen(true)}
                onImportChemicalMasters={(file, mode) => { handleImportChemicalMasters(file, mode); setIsChemicalMasterImportOpen(false); }}
                onDownloadChemicalTemplate={handleDownloadTemplate}
                onOpenTestParameterImport={() => setIsTestParameterImportOpen(true)}
                onImportTestParameters={(file, mode) => { handleImportTestParameters(file, mode); setIsTestParameterImportOpen(false); }}
                onDownloadTestTemplate={handleDownloadTestTemplate}
                users={users} currentUser={currentUser} 
                onOpenUserFormModal={(user) => { setEditingUser(user); setIsUserFormOpen(true); }}
                onDeleteUser={(id) => handleDelete(setUsers, id, 'Xóa người dùng', 'Bạn có chắc muốn xóa?')}
                workSchedule={workSchedule} holidays={holidays}
                onUpdateWorkSchedule={(ws) => setWorkSchedule(ws)}
                onAddHoliday={(h) => handleSave(setHolidays, h, 'holi')}
                onDeleteHoliday={(id) => handleDelete(setHolidays, id, 'Xóa ngày nghỉ', 'Xóa ngày nghỉ này?')}
             />;
        }
    }
    
    // RENDER MODALS
    return (
        <div className={`flex h-screen bg-slate-100 ${isSidebarCollapsed ? 'sidebar-collapsed' : ''}`}>
        <aside className={`bg-slate-800 text-white flex flex-col transition-all duration-300 ${isSidebarCollapsed ? 'w-20' : 'w-72'}`}>
            <div className="flex items-center justify-between p-4 border-b border-slate-700 h-16">
                 {!isSidebarCollapsed && <h1 className="text-xl font-bold whitespace-nowrap">QLCL Lab</h1>}
                 <button onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)} className="p-2 rounded-md hover:bg-slate-700">
                    <ChevronDoubleLeftIcon className={`w-6 h-6 transition-transform duration-300 ${isSidebarCollapsed ? 'rotate-180' : ''}`} />
                 </button>
            </div>
             <div className="flex items-center p-3 mx-2 my-2 rounded-lg bg-slate-900">
                <UserIcon className="w-8 h-8 text-white bg-slate-700 rounded-full p-1 flex-shrink-0" />
                {!isSidebarCollapsed && (
                    <div className="ml-3 overflow-hidden">
                        <p className="text-sm font-semibold truncate">{currentUser.fullName}</p>
                        <p className="text-xs text-slate-400">{currentUser.role}</p>
                    </div>
                )}
            </div>
            <nav className="flex-1 overflow-y-auto mt-2">
                <ul>
                    {navigationItems.map(item => <PrimaryNavItem key={item.id} icon={item.icon} label={item.label} isActive={activePage === item.id} onClick={() => setActivePage(item.id)} isCollapsed={isSidebarCollapsed} />)}
                </ul>
            </nav>
             <div className="p-2 border-t border-slate-700">
                <a href="#" onClick={(e) => { e.preventDefault(); handleLogout(); }} title={isSidebarCollapsed ? 'Đăng xuất' : undefined}
                    className={`flex p-4 text-base rounded-lg mx-2 my-1 transition-colors text-slate-200 hover:bg-slate-700 hover:text-white ${isSidebarCollapsed ? 'justify-center' : 'items-center'}`}>
                    <LogoutIcon />
                    {!isSidebarCollapsed && <span className="ml-4">Đăng xuất</span>}
                </a>
            </div>
        </aside>

        <main className="flex-1 flex flex-col overflow-hidden">
            <header className="flex items-center justify-between p-4 h-16 bg-white border-b border-slate-200">
                <div className="flex items-center gap-4">
                     <GlobalSearch 
                        query={searchQuery}
                        onQueryChange={handleSearch}
                        results={searchResults}
                        onResultClick={handleSearchResultClick}
                        isLoading={isSearching}
                    />
                </div>
                <button onClick={() => setIsChatbotOpen(true)} className="flex items-center gap-2 px-4 py-2 bg-indigo-50 text-indigo-700 rounded-full text-sm font-semibold hover:bg-indigo-100">
                    <SparklesIcon className="w-5 h-5" />
                    Trợ lý AI
                </button>
            </header>
            <div className="flex-1 overflow-y-auto p-6">
                {activeModule === 'qms2429' ? renderPage() : <QmsIsoPage />}
            </div>
        </main>
        
        {/* --- MODALS --- */}
        
        <ConfirmationModal
            isOpen={isConfirmModalOpen}
            onClose={() => setIsConfirmModalOpen(false)}
            onConfirm={() => {
                if (confirmAction) {
                    confirmAction.onConfirm();
                    // Do not set to null here, it will be set in handleDelete
                }
            }}
            title={confirmAction?.title || 'Xác nhận'}
            message={confirmAction?.message || 'Bạn có chắc chắn muốn tiếp tục?'}
        />
        
        {isChemicalFormOpen && <ChemicalFormModal isOpen={isChemicalFormOpen} onClose={() => setIsChemicalFormOpen(false)} onSubmit={handleSaveChemical} initialData={editingChemical} storageLocations={storageLocations} />}
        {isAdjustModalOpen && <AdjustQuantityModal isOpen={isAdjustModalOpen} onClose={() => setIsAdjustModalOpen(false)} onSubmit={handleAdjustQuantity} chemical={chemicalToAdjust} currentUser={currentUser} storageLocations={storageLocations} instruments={instruments} />}
        {isUsageLogOpen && <UsageLogModal isOpen={isUsageLogOpen} onClose={() => setIsUsageLogOpen(false)} chemical={chemicalForLog} />}
        {isSafetyInfoOpen && <SafetyInfoModal isOpen={isSafetyInfoOpen} onClose={() => setIsSafetyInfoOpen(false)} chemical={chemicalForSafety} safetyInfo={safetyInfo} isLoading={isSafetyInfoLoading} />}
        {isBarcodeModalOpen && <BarcodeModal isOpen={isBarcodeModalOpen} onClose={() => setIsBarcodeModalOpen(false)} chemical={chemicalForBarcode} />}
        {isSafetyDocOpen && <SafetyDocumentModal isOpen={isSafetyDocOpen} onClose={() => setIsSafetyDocOpen(false)} chemical={chemicalForSafetyDoc} />}
        {isMoveToInstrumentModalOpen && <MoveToInstrumentModal isOpen={isMoveToInstrumentModalOpen} onClose={() => setIsMoveToInstrumentModalOpen(false)} onSubmit={(instrumentId, quantity, openVialExpiration) => handleMoveToInstrument(chemicalToMove!.id, instrumentId, quantity, openVialExpiration)} chemical={chemicalToMove} instruments={instruments} />}
        {isOnInstrumentAdjustModalOpen && stockToAdjust && <OnInstrumentAdjustModal isOpen={isOnInstrumentAdjustModalOpen} onClose={() => setIsOnInstrumentAdjustModalOpen(false)} onSubmit={(data) => handleOnInstrumentAdjust(stockToAdjust.item, data)} stockItem={stockToAdjust.item} action={stockToAdjust.action} currentUser={currentUser} />}
        {isPlanningSlipModalOpen && <PlanningSlipModal slip={slipToView} onClose={() => setSlipToView(null)} />}
        {isDisposalFormOpen && <DisposalFormModal isOpen={isDisposalFormOpen} onClose={() => setIsDisposalFormOpen(false)} onSubmit={(data) => handleSave(setDisposalRecords, data, 'disp')} initialData={editingDisposalRecord} currentUserFullName={currentUser.fullName} />}
        
        {isPersonnelFormOpen && <PersonnelFormModal isOpen={isPersonnelFormOpen} onClose={() => setIsPersonnelFormOpen(false)} onSubmit={(data) => handleSave(setPersonnel, data, 'p')} initialData={editingPersonnel} jobRoles={jobRoles} organizationUnits={organizationUnits} />}
        {isTraineeFormOpen && <TraineeFormModal isOpen={isTraineeFormOpen} onClose={() => setIsTraineeFormOpen(false)} onSubmit={handleSaveTrainee} initialData={editingTrainee} personnel={personnel} />}
        {personnelForDetail && <PersonnelDetailModal isOpen={!!personnelForDetail} onClose={() => setPersonnelForDetail(null)} personnel={personnelForDetail} jobRole={jobRoles.find(jr => jr.id === personnelForDetail.jobRoleId)} organizationUnit={organizationUnits.find(ou => ou.id === personnelForDetail.organizationUnitId)} onAddDocument={() => setIsPersonnelDocFormOpen(true)} onDeleteDocument={(docId) => handleDeletePersonnelDoc(personnelForDetail.id, docId)} onViewDocument={setDocumentToView} trainingRecords={trainingRecords.filter(tr => tr.personnelId === personnelForDetail.id)} trainingCourses={trainingCourses} competencies={competencies} competencyAssessments={competencyAssessments.filter(ca => ca.personnelId === personnelForDetail.id)} allPersonnel={personnel} onAddTrainingRecord={() => setIsTrainingRecordFormOpen(true)} onDeleteTrainingRecord={(id) => handleDelete(setTrainingRecords, id, 'Xóa Ghi nhận', 'Xóa ghi nhận đào tạo này?')} onAddCompetencyAssessment={() => setIsCompetencyAssessmentFormOpen(true)} onDeleteCompetencyAssessment={(id) => handleDelete(setCompetencyAssessments, id, 'Xóa Đánh giá', 'Xóa đánh giá năng lực này?')} />}
        {isPersonnelDocFormOpen && personnelForDetail && <PersonnelDocumentFormModal isOpen={isPersonnelDocFormOpen} onClose={() => setIsPersonnelDocFormOpen(false)} onSubmit={(data) => { handleSavePersonnelDoc(personnelForDetail!.id, data); setIsPersonnelDocFormOpen(false); }} />}
        {isJobRoleFormOpen && <JobRoleFormModal isOpen={isJobRoleFormOpen} onClose={() => setIsJobRoleFormOpen(false)} onSubmit={(data) => handleSave(setJobRoles, data, 'role')} initialData={editingJobRole} />}
        {isOrgUnitFormOpen && <OrganizationUnitFormModal isOpen={isOrgUnitFormOpen} onClose={() => setIsOrgUnitFormOpen(false)} onSubmit={(data) => handleSave(setOrganizationUnits, data, 'unit')} initialData={editingOrgUnit} parentId={orgUnitParentId} units={organizationUnits} />}
        {isLeaveFormOpen && <LeaveFormModal isOpen={isLeaveFormOpen} onClose={() => setIsLeaveFormOpen(false)} onSubmit={(data) => handleSave(setLeaveRecords, data, 'leave')} personnel={personnel} />}
        {isAttendanceFormOpen && <AttendanceFormModal isOpen={isAttendanceFormOpen} onClose={() => { setAttendanceContext(null); setIsAttendanceFormOpen(false); }} onSubmit={(data) => handleSave(setAttendanceRecords, data, 'att')} context={attendanceContext} personnel={personnel.find(p => p.id === attendanceContext?.personnelId)} />}
        {isDutyFormOpen && <DutyAssignmentFormModal isOpen={isDutyFormOpen} onClose={() => setIsDutyFormOpen(false)} onSubmit={(data) => handleSave(setDutyAssignments, data, 'duty')} context={null} />}
        {isTaskFormOpen && <TaskAssignmentFormModal isOpen={isTaskFormOpen} onClose={() => setIsTaskFormOpen(false)} onSubmit={(data) => handleSave(setTaskAssignments, data, 'task')} context={null}/>}
        {isMovePersonnelOpen && <MovePersonnelModal isOpen={isMovePersonnelOpen} onClose={() => setIsMovePersonnelOpen(false)} onSubmit={() => {}} personnel={personnel} organizationUnits={organizationUnits} />}

        {isTrainingCourseFormOpen && <TrainingCourseFormModal isOpen={isTrainingCourseFormOpen} onClose={() => setIsTrainingCourseFormOpen(false)} onSubmit={(data) => handleSave(setTrainingCourses, data, 'course')} initialData={editingTrainingCourse} />}
        {isTrainingRecordFormOpen && personnelForDetail && <TrainingRecordFormModal isOpen={isTrainingRecordFormOpen} onClose={() => setIsTrainingRecordFormOpen(false)} onSubmit={(data) => handleSave(setTrainingRecords, data, 'tr')} personnel={personnelForDetail} courses={trainingCourses} />}
        {isCompetencyFormOpen && <CompetencyFormModal isOpen={isCompetencyFormOpen} onClose={() => setIsCompetencyFormOpen(false)} onSubmit={(data) => handleSave(setCompetencies, data, 'comp')} initialData={editingCompetency} />}
        {isCompetencyAssessmentFormOpen && personnelForDetail && <CompetencyAssessmentFormModal isOpen={isCompetencyAssessmentFormOpen} onClose={() => setIsCompetencyAssessmentFormOpen(false)} onSubmit={(data) => handleSave(setCompetencyAssessments, data, 'ca')} personnel={personnelForDetail} competencies={competencies} assessors={personnel} />}

        {isEquipmentFormOpen && <EquipmentFormModal isOpen={isEquipmentFormOpen} onClose={() => setIsEquipmentFormOpen(false)} onSubmit={handleSaveEquipment} initialData={editingEquipment} roomLocations={roomLocations} />}
        {equipmentForDetail && <EquipmentDetailModal isOpen={!!equipmentForDetail} onClose={() => setEquipmentForDetail(null)} equipment={equipmentForDetail} onAddMaintenance={() => setIsMaintenanceFormOpen(true)} onAddCalibration={() => setIsCalibrationFormOpen(true)} onAddDocument={() => setIsEquipmentDocFormOpen(true)} onDeleteMaintenance={(id) => handleDeleteEquipmentSubRecord('maintenance', equipmentForDetail.id, id)} onDeleteCalibration={(id) => handleDeleteEquipmentSubRecord('calibration', equipmentForDetail.id, id)} onDeleteDocument={(id) => handleDeleteEquipmentSubRecord('document', equipmentForDetail.id, id)} onViewDocument={setDocumentToView} />}
        {isMaintenanceFormOpen && equipmentForDetail && <MaintenanceLogFormModal isOpen={isMaintenanceFormOpen} onClose={() => setIsMaintenanceFormOpen(false)} onSubmit={(data) => { handleAddMaintenanceRecord(equipmentForDetail!.id, data); setIsMaintenanceFormOpen(false); }} currentUser={currentUser} />}
        {isCalibrationFormOpen && equipmentForDetail && <CalibrationLogFormModal isOpen={isCalibrationFormOpen} onClose={() => setIsCalibrationFormOpen(false)} onSubmit={(data) => { handleAddCalibrationRecord(equipmentForDetail!.id, data); setIsCalibrationFormOpen(false); }} currentUser={currentUser} />}
        {isEquipmentDocFormOpen && equipmentForDetail && <EquipmentDocumentFormModal isOpen={isEquipmentDocFormOpen} onClose={() => setIsEquipmentDocFormOpen(false)} onSubmit={(data) => { handleAddEquipmentDocument(equipmentForDetail!.id, data); setIsEquipmentDocFormOpen(false); }} />}
        {isEquipmentUsageLogFormOpen && <EquipmentUsageLogFormModal isOpen={isEquipmentUsageLogFormOpen} onClose={() => { setEditingUsageLog(null); setIsEquipmentUsageLogFormOpen(false); }} onSubmit={handleSaveOrUpdateUsageLog} initialData={editingUsageLog} equipmentList={labEquipment} userList={personnel} currentUser={currentUser} accessLogs={accessLogs} workItems={workItems} onAddWorkItem={handleAddWorkItem} />}
        
        {isNonConformityFormOpen && <NonConformityFormModal isOpen={isNonConformityFormOpen} onClose={() => setIsNonConformityFormOpen(false)} onSubmit={handleSaveNonConformity} initialData={editingNC} currentUser={currentUser} />}
        {isPreventiveActionFormOpen && <PreventiveActionFormModal isOpen={isPreventiveActionFormOpen} onClose={() => setIsPreventiveActionFormOpen(false)} onSubmit={handleSavePreventiveAction} initialData={editingPA} currentUser={currentUser} />}

        {isDocumentFormOpen && <DocumentFormModal isOpen={isDocumentFormOpen} onClose={() => setIsDocumentFormOpen(false)} onSubmit={(data) => handleSave(setLabDocuments, data, 'doc')} initialData={editingDocument} documentCategories={documentCategories} />}
        {documentToView && <DocumentViewerModal isOpen={!!documentToView} onClose={() => setDocumentToView(null)} document={documentToView} />}
        
        {isImprovementFormOpen && <ImprovementFormModal isOpen={isImprovementFormOpen} onClose={() => setIsImprovementFormOpen(false)} onSubmit={(data) => handleSave(setImprovementInitiatives, data, 'imp')} initialData={editingImprovement} currentUser={currentUser} />}
        {isFeedbackFormOpen && <FeedbackFormModal isOpen={isFeedbackFormOpen} onClose={() => setIsFeedbackFormOpen(false)} onSubmit={(data) => handleSave(setCustomerFeedback, data, 'fb')} initialData={editingFeedback} currentUser={currentUser} />}
        
        {isDecontaminationLogModalOpen && <DecontaminationLogFormModal isOpen={isDecontaminationLogModalOpen} onClose={() => setIsDecontaminationLogModalOpen(false)} onSubmit={(data) => { handleSave(setDecontaminationLogs, data, 'decon'); setIsDecontaminationLogModalOpen(false); }} initialData={editingDecontaminationLog} currentUser={currentUser} monitoredAreas={monitoredAreas} monitoredEquipment={monitoredEquipment} roomLocations={roomLocations} labEquipment={labEquipment} />}
        
        {isSettingsModalOpen && activeSettingsModal === 'testParameter' && <TestParameterFormModal isOpen={isSettingsModalOpen} onClose={() => setIsSettingsModalOpen(false)} onSubmit={(data) => { handleSave(setTestParameters, data, 'tp'); setIsSettingsModalOpen(false); }} initialData={settingsInitialData} />}
        {isSettingsModalOpen && activeSettingsModal === 'chemicalMaster' && <ChemicalMasterFormModal isOpen={isSettingsModalOpen} onClose={() => setIsSettingsModalOpen(false)} onSubmit={(data) => { handleSave(setChemicalMasters, data, 'cm'); setIsSettingsModalOpen(false); }} initialData={settingsInitialData} />}
        {isSettingsModalOpen && activeSettingsModal === 'instrument' && <InstrumentFormModal isOpen={isSettingsModalOpen} onClose={() => setIsSettingsModalOpen(false)} onSubmit={(data) => { handleSave(setInstruments, data, 'inst'); setIsSettingsModalOpen(false); }} initialData={settingsInitialData} />}
        {isSettingsModalOpen && activeSettingsModal === 'roomLocation' && <RoomLocationFormModal isOpen={isSettingsModalOpen} onClose={() => setIsSettingsModalOpen(false)} onSubmit={(data) => { handleSave(setRoomLocations, data, 'rl'); setIsSettingsModalOpen(false); }} initialData={settingsInitialData} />}
        {isSettingsModalOpen && activeSettingsModal === 'storage' && <StorageFormModal isOpen={isSettingsModalOpen} onClose={() => setIsSettingsModalOpen(false)} onSubmit={(data) => { handleSave(setStorageLocations, data, 'sl'); setIsSettingsModalOpen(false); }} initialData={settingsInitialData} />}
        {isSettingsModalOpen && activeSettingsModal === 'controlMaterial' && <ControlMaterialFormModal isOpen={isSettingsModalOpen} onClose={() => setIsSettingsModalOpen(false)} onSubmit={(data) => { handleSave(setControlMaterials, data, 'ctrl'); setIsSettingsModalOpen(false); }} initialData={settingsInitialData} chemicalMasters={chemicalMasters} />}
        {isSettingsModalOpen && activeSettingsModal === 'controlLotTarget' && <ControlLotTargetFormModal isOpen={isSettingsModalOpen} onClose={() => setIsSettingsModalOpen(false)} onSubmit={(data) => { handleSave(setControlLotTargets, data, 'clt'); setIsSettingsModalOpen(false); }} initialData={settingsInitialData} testParameters={testParameters} controlMaterials={controlMaterials} />}
        {isSettingsModalOpen && activeSettingsModal === 'eqaMaterial' && <EQAMaterialFormModal isOpen={isSettingsModalOpen} onClose={() => setIsSettingsModalOpen(false)} onSubmit={(data) => handleSave(setEQAMaterials, data, 'eqa'); setIsSettingsModalOpen(false); }} initialData={settingsInitialData} />}
        {isSettingsModalOpen && activeSettingsModal === 'documentCategory' && <DocumentCategoryFormModal isOpen={isSettingsModalOpen} onClose={() => setIsSettingsModalOpen(false)} onSubmit={(data) => { handleSave(setDocumentCategories, data, 'doccat'); setIsSettingsModalOpen(false); }} initialData={settingsInitialData} />}
        {isSettingsModalOpen && activeSettingsModal === 'iqcResult' && <IQCResultFormModal isOpen={isSettingsModalOpen} onClose={() => setIsSettingsModalOpen(false)} onSubmit={(data) => { handleSave(setIqcResults, data, 'iqc'); setIsSettingsModalOpen(false); }} currentUser={currentUser} testParameters={testParameters} controlMaterials={controlMaterials} />}
        {isSettingsModalOpen && activeSettingsModal === 'workItem' && <WorkItemFormModal isOpen={isSettingsModalOpen} onClose={() => setIsSettingsModalOpen(false)} onSubmit={(data) => { handleSave(setWorkItems, data, 'wi'); setIsSettingsModalOpen(false); }} initialData={settingsInitialData} />}
        
        {isChemicalMasterImportOpen && <ChemicalMasterImportModal isOpen={isChemicalMasterImportOpen} onClose={() => setIsChemicalMasterImportOpen(false)} onImport={handleImportChemicalMasters} onDownloadTemplate={handleDownloadTemplate} />}
        {isTestParameterImportOpen && <TestParameterImportModal isOpen={isTestParameterImportOpen} onClose={() => setIsTestParameterImportOpen(false)} onImport={handleImportTestParameters} onDownloadTemplate={handleDownloadTestTemplate} />}

        {isUserFormOpen && <UserFormModal isOpen={isUserFormOpen} onClose={() => setIsUserFormOpen(false)} onSubmit={(data) => handleSave(setUsers, data, 'user')} initialData={editingUser} currentUser={currentUser} />}

        {isIQCCommentModalOpen && resultToComment && <IQCCommentModal isOpen={isIQCCommentModalOpen} onClose={() => setIsIQCCommentModalOpen(false)} onSubmit={handleSaveIQCComment} result={resultToComment} test={testParameters.find(t => t.id === resultToComment.testParameterId)} control={controlMaterials.find(c => c.id === resultToComment.controlMaterialId)} />}
        {isIQCImportModalOpen && <IQCImportModal isOpen={isIQCImportModalOpen} onClose={() => setIsIQCImportModalOpen(false)} onImport={handleImportIQCResults} onDownloadTemplate={handleDownloadIQCTemplate} />}
        {isWestgardGuidanceModalOpen && <WestgardGuidanceModal isOpen={isWestgardGuidanceModalOpen} onClose={() => setIsWestgardGuidanceModalOpen(false)} violation={selectedViolationForGuidance} />}
        {pdfExportData && <IQCPdfReport {...pdfExportData} />}
        {isCalculateTargetModalOpen && <CalculateTargetConfirmationModal isOpen={isCalculateTargetModalOpen} onClose={() => setIsCalculateTargetModalOpen(false)} onConfirm={handleConfirmSaveCalculatedTarget} data={calculatedTargetData} />}
        {isEqaResultModalOpen && <EQAResultFormModal isOpen={isEqaResultModalOpen} onClose={() => setIsEqaResultModalOpen(false)} onSubmit={handleSaveEQAResult} initialData={editingEqaResult?.result} initialMaterialId={editingEqaResult?.materialId} currentUser={currentUser} testParameters={testParameters} eqaMaterials={eqaMaterials} />}
        {isEQAScheduleFormOpen && <EQAScheduleFormModal isOpen={isEQAScheduleFormOpen} onClose={() => setIsEQAScheduleFormOpen(false)} onSubmit={handleSaveEQASchedule} initialData={editingEQASchedule} eqaMaterials={eqaMaterials} personnel={personnel} />}

        {isChatbotOpen && <Chatbot isOpen={isChatbotOpen} onClose={() => setIsChatbotOpen(false)} onSendQuery={async (q) => { setChatHistory(h => [...h, { role: 'user', parts: [{ text: q }] }]); setIsChatbotLoading(true); const res = await getChatbotResponse(q, {}, chatHistory); setChatHistory(h => [...h, { role: 'model', parts: [{ text: res }] }]); setIsChatbotLoading(false); }} history={chatHistory} 
        isLoading={isChatbotLoading} />}
        {isRestoreProgressModalOpen && <RestoreProgressModal isOpen={isRestoreProgressModalOpen} progress={restoreProgress} />}
        {isSystemEventFormOpen && <SystemEventFormModal isOpen={isSystemEventFormOpen} onClose={() => setIsSystemEventFormOpen(false)} onSubmit={handleSaveSystemEvent} initialData={editingSystemEvent} currentUser={currentUser} />}
      </div>
    );
}

export default App;