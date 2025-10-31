import React, { useMemo } from 'react';
import { SafetySubPage } from '../types';
import { LoginIcon } from './icons/LoginIcon';
import { BuildingStorefrontIcon } from './icons/BuildingStorefrontIcon';
import { ThermometerIcon } from './icons/ThermometerIcon';
import { WaterIcon } from './icons/WaterIcon';
import { DocumentAlertIcon } from './icons/DocumentAlertIcon';
import { SettingsIcon } from './icons/SettingsIcon';
import { AccessLog, AreaEnvironmentLog, EquipmentTemperatureLog, WaterConductivityLog, DecontaminationLog, IncidentReport } from '../types';
import { BeakerIcon } from './icons/BeakerIcon';

interface SafetyDashboardPageProps {
  onNavigate: (page: SafetySubPage) => void;
  accessLogs: AccessLog[];
  areaEnvLogs: AreaEnvironmentLog[];
  equipEnvLogs: EquipmentTemperatureLog[];
  waterConductivityLogs: WaterConductivityLog[];
  decontaminationLogs: DecontaminationLog[];
  incidentReports: IncidentReport[];
}

interface ActivityItem {
    id: string;
    timestamp: Date;
    type: string;
    icon: React.ReactNode;
    description: React.ReactNode;
    details: string;
    targetPage: SafetySubPage;
}

const formatRelativeTime = (date: Date): string => {
  const now = new Date();
  const seconds = Math.round((now.getTime() - date.getTime()) / 1000);
  
  if (seconds < 60) return `${seconds} giây trước`;
  const minutes = Math.round(seconds / 60);
  if (minutes < 60) return `${minutes} phút trước`;
  const hours = Math.round(minutes / 60);
  if (hours < 24) {
      if (now.toDateString() === date.toDateString()) {
        return `${hours} giờ trước`;
      }
  }
  
  if (now.toDateString() === date.toDateString()) {
      return `Hôm nay lúc ${date.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })}`;
  }
  
  const yesterday = new Date();
  yesterday.setDate(now.getDate() - 1);
  if (yesterday.toDateString() === date.toDateString()) {
      return `Hôm qua lúc ${date.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })}`;
  }

  return date.toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' });
};


const ActionCard: React.FC<{ icon: React.ReactNode; title: string; description: string; onClick: () => void; }> = ({ icon, title, description, onClick }) => (
    <div onClick={onClick} className="bg-white p-4 rounded-lg shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer flex flex-col border border-slate-200">
        <div className="flex items-center mb-2">
            <div className="p-2 bg-slate-100 rounded-full mr-3">{icon}</div>
            <h3 className="text-md font-bold text-slate-800">{title}</h3>
        </div>
        <p className="text-xs text-slate-600 flex-grow">{description}</p>
        <div className="text-right text-blue-600 font-semibold text-sm mt-2">
            Đi đến &rarr;
        </div>
    </div>
);

const SafetyDashboardPage: React.FC<SafetyDashboardPageProps> = (props) => {
    const { onNavigate, accessLogs, areaEnvLogs, equipEnvLogs, waterConductivityLogs, decontaminationLogs, incidentReports } = props;
    
    const recentActivities = useMemo<ActivityItem[]>(() => {
        const activities: ActivityItem[] = [];

        accessLogs.forEach(log => {
            activities.push({
                id: `access-${log.id}`,
                timestamp: new Date(log.entryTime),
                type: 'Ra/Vào',
                icon: <LoginIcon className="w-5 h-5 text-green-600"/>,
                description: <>{log.personOrUnit} <strong>{log.exitTime ? 'rời khỏi' : 'vào'}</strong> {log.areaName}</>,
                details: `Công việc: ${log.task}`,
                targetPage: 'access'
            });
        });

        areaEnvLogs.forEach(log => {
            activities.push({
                id: `area-${log.id}`,
                timestamp: new Date(`${log.date}T${log.time}`),
                type: 'Môi trường KV',
                icon: <BuildingStorefrontIcon className="w-5 h-5 text-sky-600"/>,
                description: <>Ghi nhận tại <strong>{log.areaName}</strong></>,
                details: `NĐ: ${log.temperature}°C, ĐA: ${log.humidity}%`,
                targetPage: 'areaEnv'
            });
        });

        equipEnvLogs.forEach(log => {
            activities.push({
                id: `equip-${log.id}`,
                timestamp: new Date(`${log.date}T${log.time}`),
                type: 'Nhiệt độ TB',
                icon: <ThermometerIcon className="w-5 h-5 text-amber-600"/>,
                description: <>Ghi nhận nhiệt độ <strong>{log.equipmentName}</strong></>,
                details: `Nhiệt độ: ${log.temperature}°C`,
                targetPage: 'equipEnv'
            });
        });

        waterConductivityLogs.forEach(log => {
             activities.push({
                id: `water-${log.id}`,
                timestamp: new Date(`${log.date}T${log.time}`),
                type: 'Chất lượng nước',
                icon: <WaterIcon className="w-5 h-5 text-blue-600"/>,
                description: <>Kiểm tra chất lượng nước <strong>{log.sourceName}</strong></>,
                details: `Độ dẫn điện: ${log.conductivity} µS/cm`,
                targetPage: 'waterConductivity'
            });
        });

        decontaminationLogs.forEach(log => {
             activities.push({
                id: `decon-${log.id}`,
                timestamp: new Date(`${log.date}T${log.time}`),
                type: 'Khử nhiễm',
                icon: <BeakerIcon className="w-5 h-5 text-purple-600"/>,
                description: <>Khử nhiễm <strong>{log.areaOrEquipment}</strong></>,
                details: `Phương pháp: ${log.method}`,
                targetPage: 'decontamination'
            });
        });
        
        incidentReports.forEach(log => {
             activities.push({
                id: `incident-${log.id}`,
                timestamp: new Date(`${log.date}T${log.time}`),
                type: 'Sự cố',
                icon: <DocumentAlertIcon className="w-5 h-5 text-red-600"/>,
                description: <>Báo cáo sự cố tại <strong>{log.location}</strong></>,
                details: `Loại: ${log.incidentType}`,
                targetPage: 'incidents'
            });
        });

        return activities.sort((a,b) => b.timestamp.getTime() - a.timestamp.getTime()).slice(0, 15);

    }, [accessLogs, areaEnvLogs, equipEnvLogs, waterConductivityLogs, decontaminationLogs, incidentReports]);

    return (
        <div>
            <h2 className="text-xl font-bold text-slate-800 mb-4">Truy cập nhanh</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                <ActionCard 
                    icon={<LoginIcon className="w-5 h-5 text-green-600" />}
                    title="Sổ Ra/Vào"
                    description="Ghi nhận và quản lý lịch sử ra vào các khu vực được kiểm soát."
                    onClick={() => onNavigate('access')}
                />
                <ActionCard 
                    icon={<BuildingStorefrontIcon className="w-5 h-5 text-sky-600" />}
                    title="Giám sát Khu vực"
                    description="Theo dõi nhiệt độ và độ ẩm của các khu vực quan trọng."
                    onClick={() => onNavigate('areaEnv')}
                />
                <ActionCard 
                    icon={<ThermometerIcon className="w-5 h-5 text-amber-600" />}
                    title="Nhiệt độ Thiết bị"
                    description="Ghi nhận nhiệt độ của các thiết bị như tủ lạnh, tủ ấm."
                    onClick={() => onNavigate('equipEnv')}
                />
                <ActionCard 
                    icon={<WaterIcon className="w-5 h-5 text-blue-600" />}
                    title="Chất lượng Nước"
                    description="Theo dõi độ dẫn điện của các nguồn nước tinh khiết."
                    onClick={() => onNavigate('waterConductivity')}
                />
                 <ActionCard 
                    icon={<BeakerIcon className="w-5 h-5 text-purple-600" />}
                    title="Sổ Khử nhiễm"
                    description="Ghi nhận các hoạt động khử nhiễm bề mặt, thiết bị hàng ngày."
                    onClick={() => onNavigate('decontamination')}
                />
                <ActionCard 
                    icon={<DocumentAlertIcon className="w-5 h-5 text-red-600" />}
                    title="Báo cáo Sự cố"
                    description="Lập và quản lý các phiếu báo cáo sự cố phơi nhiễm hoặc tai nạn."
                    onClick={() => onNavigate('incidents')}
                />
                 <ActionCard 
                    icon={<SettingsIcon className="w-5 h-5 text-slate-600" />}
                    title="Cài đặt"
                    description="Quản lý danh mục các khu vực, thiết bị, và nguồn nước cần giám sát."
                    onClick={() => onNavigate('manageItems')}
                />
            </div>
            
            <div className="mt-8">
                <h2 className="text-xl font-bold text-slate-800 mb-4">Hoạt động Gần đây</h2>
                {recentActivities.length > 0 ? (
                    <div className="bg-white rounded-lg shadow-lg p-4 border border-slate-200">
                        <ul className="divide-y divide-slate-200">
                            {recentActivities.map(activity => (
                                <li key={activity.id} className="py-3 flex items-center justify-between gap-4">
                                    <div className="flex items-center gap-4">
                                        <div className="p-2 bg-slate-100 rounded-full">{activity.icon}</div>
                                        <div>
                                            <p className="text-sm text-slate-800">{activity.description}</p>
                                            <p className="text-xs text-slate-500">{activity.details}</p>
                                        </div>
                                    </div>
                                    <div className="text-right flex-shrink-0">
                                         <p className="text-xs font-medium text-slate-500">{formatRelativeTime(activity.timestamp)}</p>
                                        <button onClick={() => onNavigate(activity.targetPage)} className="text-xs text-blue-600 hover:underline">Xem chi tiết</button>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                ) : (
                    <div className="text-center py-10 text-slate-500 bg-white rounded-lg shadow-md border">
                        <p>Chưa có hoạt động nào được ghi nhận.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SafetyDashboardPage;