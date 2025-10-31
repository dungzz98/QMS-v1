import React from 'react';
import { WestgardViolation } from '../types';

interface WestgardGuidanceModalProps {
  isOpen: boolean;
  onClose: () => void;
  violation: WestgardViolation | null;
}

const getGuidanceForRule = (rule: string) => {
    switch (rule) {
        case '1-3s':
            return {
                title: 'Hướng dẫn xử lý lỗi 1-3s (Lỗi ngẫu nhiên)',
                actions: [
                    'Dừng trả kết quả của bệnh nhân cho xét nghiệm này.',
                    'Kiểm tra lại toàn bộ quy trình: thuốc thử, máy, mẫu QC.',
                    'Chạy lại mẫu QC đó. Nếu đạt, chạy thêm mức QC còn lại. Nếu cả hai đều đạt, tiếp tục chạy mẫu bệnh nhân.',
                    'Nếu vẫn không đạt, tiến hành tìm nguyên nhân theo danh sách bên dưới.'
                ],
                causes: {
                    'Thuốc thử': ['Bọt khí trong thuốc thử', 'Lô thuốc thử mới chưa được QC đạt', 'Thuốc thử bị bay hơi'],
                    'Máy xét nghiệm': ['Kim hút bị tắc nghẽn một phần', 'Sự cố với hệ thống điện'],
                    'Mẫu QC': ['Pha sai nồng độ', 'Để mẫu ở nhiệt độ phòng quá lâu', 'Trộn mẫu không đều'],
                    'Người thực hiện': ['Lỗi pipet', 'Sử dụng sai mẫu QC cho xét nghiệm']
                },
                solutions: [
                    'Sau khi xác định và khắc phục nguyên nhân, cần hiệu chuẩn (calibrate) lại xét nghiệm.',
                    'Chạy lại cả hai mức QC. Khi kết quả đạt, có thể tiếp tục chạy mẫu bệnh nhân.',
                    'Ghi lại toàn bộ sự cố và hành động khắc phục vào sổ nhật ký QC.'
                ]
            };
        case '2-2s':
            return {
                title: 'Hướng dẫn xử lý lỗi 2-2s (Lỗi hệ thống)',
                actions: [
                    'Dừng trả kết quả của bệnh nhân.',
                    'Đây là dấu hiệu của lỗi hệ thống. Cần kiểm tra các thay đổi gần đây.'
                ],
                causes: {
                    'Thuốc thử & Hiệu chuẩn': ['Thuốc thử bắt đầu hỏng (gần HSD)', 'Sự thay đổi trong lô thuốc thử/chất hiệu chuẩn', 'Lưu trữ không đúng cách'],
                    'Máy xét nghiệm': ['Sự trôi (drift) của thiết bị', 'Thay đổi nhiệt độ buồng ủ', 'Đèn đo sắp hết tuổi thọ']
                },
                solutions: [
                    'Thực hiện hiệu chuẩn lại xét nghiệm.',
                    'Nếu hiệu chuẩn không thành công hoặc QC vẫn lỗi, kiểm tra lại thuốc thử (sử dụng lô mới nếu có).',
                    'Kiểm tra nhật ký bảo trì thiết bị. Liên hệ kỹ sư nếu cần thiết.',
                    'Ghi lại toàn bộ sự cố và hành động khắc phục.'
                ]
            };
        case 'R-4s':
            return {
                title: 'Hướng dẫn xử lý lỗi R-4s (Lỗi ngẫu nhiên lớn)',
                actions: [
                    'Dừng trả kết quả của bệnh nhân.',
                    'Lỗi này chỉ ra sự thiếu chính xác lớn, thường là lỗi ngẫu nhiên ở một trong hai mức QC.'
                ],
                causes: {
                    'Máy xét nghiệm': ['Kim hút không chính xác, có bọt khí', 'Bộ phận pha loãng gặp sự cố'],
                    'Mẫu QC': ['Trộn một trong hai mẫu QC không đều', 'Sử dụng sai mẫu QC'],
                    'Người thực hiện': ['Lỗi thao tác rõ ràng']
                },
                solutions: [
                    'Chạy lại cả hai mức QC.',
                    'Kiểm tra trực quan kim hút, thuốc thử xem có bọt khí không.',
                    'Nếu lỗi vẫn tiếp diễn, hiệu chuẩn lại và kiểm tra bảo trì máy.',
                    'Ghi lại toàn bộ sự cố và hành động khắc phục.'
                ]
            };
        case '4-1s':
        case '10-x':
             return {
                title: `Hướng dẫn xử lý lỗi ${rule} (Lỗi hệ thống/Xu hướng)`,
                actions: [
                    'Kiểm tra lại các kết quả QC gần đây để xác nhận xu hướng.',
                    'Không cần dừng ngay lập tức nhưng phải lên kế hoạch khắc phục sớm.'
                ],
                causes: {
                    'Thuốc thử & Hiệu chuẩn': ['Thuốc thử hoặc chất hiệu chuẩn sắp hỏng', 'Lưu trữ không đúng nhiệt độ quy định'],
                    'Máy xét nghiệm': ['Sự xuống cấp của các bộ phận (đèn, điện cực)', 'Cần bảo trì (VD: vệ sinh điện cực, ống dẫn)']
                },
                solutions: [
                    'Thực hiện hiệu chuẩn lại xét nghiệm.',
                    'Kiểm tra hạn sử dụng và điều kiện bảo quản của thuốc thử, chất hiệu chuẩn và mẫu QC.',
                    'Xem lại lịch bảo trì định kỳ của thiết bị. Thực hiện bảo trì nếu cần thiết.',
                    'Ghi lại toàn bộ sự cố và hành động khắc phục.'
                ]
            };
        case '1-2s':
            return {
                title: 'Hướng dẫn cho cảnh báo 1-2s (Quy tắc cảnh báo)',
                actions: [
                    'Không cần dừng chạy mẫu bệnh nhân.',
                    'Đây là quy tắc cảnh báo, cho thấy có khả năng xảy ra vấn đề.'
                ],
                causes: {
                    'Ngẫu nhiên': ['Đây có thể chỉ là một sai số ngẫu nhiên trong giới hạn cho phép.'],
                    'Hệ thống': ['Có thể là dấu hiệu đầu tiên của một lỗi hệ thống đang bắt đầu (VD: thuốc thử sắp hỏng, máy bắt đầu trôi).']
                },
                solutions: [
                    'Tiếp tục chạy mẫu nhưng phải đặc biệt chú ý đến kết quả QC tiếp theo.',
                    'Kiểm tra các quy tắc vi phạm khác trên cùng điểm QC (VD: 2-2s, R-4s).',
                    'Nếu điểm QC tiếp theo cũng vi phạm, hãy dừng lại và xử lý như một lỗi hệ thống.'
                ]
            };
        default:
            return {
                title: 'Hướng dẫn chung',
                actions: ['Xem xét lại dữ liệu và quy trình.'],
                causes: {'Không xác định': ['Kiểm tra các yếu tố chung.']},
                solutions: ['Liên hệ quản lý chất lượng để được hỗ trợ.']
            };
    }
};

const GuidanceSection: React.FC<{ title: string; items: string[] | Record<string, string[]> }> = ({ title, items }) => (
    <div>
        <h4 className="text-md font-semibold text-slate-700 mt-4 mb-2">{title}</h4>
        {Array.isArray(items) ? (
            <ul className="list-disc list-inside space-y-1 text-slate-600">
                {items.map((item, index) => <li key={index}>{item}</li>)}
            </ul>
        ) : (
            <div className="space-y-2">
                {Object.entries(items).map(([category, points]) => (
                    <div key={category}>
                        <p className="font-semibold text-slate-600">{category}:</p>
                        <ul className="list-disc list-inside ml-4 space-y-1 text-slate-600">
                            {/* FIX: Explicitly cast `points` to `string[]` to resolve a TypeScript type inference issue where it was being inferred as `unknown`. */}
                            {(points as string[]).map((point, index) => <li key={index}>{point}</li>)}
                        </ul>
                    </div>
                ))}
            </div>
        )}
    </div>
);


const WestgardGuidanceModal: React.FC<WestgardGuidanceModalProps> = ({ isOpen, onClose, violation }) => {
  if (!isOpen || !violation) return null;

  const guidance = getGuidanceForRule(violation.rule);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
      <div className="bg-white rounded-lg shadow-xl p-6 m-4 w-full max-w-2xl max-h-[80vh] flex flex-col">
        <div className="flex justify-between items-center border-b pb-3">
          <h2 className="text-xl font-semibold text-slate-700">
            {guidance.title}
          </h2>
          <button onClick={onClose} className="text-slate-500 hover:text-slate-800 text-3xl leading-none">&times;</button>
        </div>
        <div className="mt-4 flex-grow overflow-y-auto pr-4 text-sm">
            <GuidanceSection title="1. Hành động Khắc phục Ngay lập tức" items={guidance.actions} />
            <GuidanceSection title="2. Tìm hiểu Nguyên nhân (Checklist)" items={guidance.causes} />
            <GuidanceSection title="3. Giải pháp & Phòng ngừa" items={guidance.solutions} />
        </div>
        <div className="mt-6 flex justify-end">
            <button type="button" onClick={onClose} className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">Đã hiểu</button>
        </div>
      </div>
    </div>
  );
};

export default WestgardGuidanceModal;