export default function Career() {
  return (
    <div className="mb-12 overflow-hidden rounded-2xl bg-white/70 p-6 md:p-8 shadow-lg backdrop-blur-sm">
      <h2 className="mb-6 md:mb-8 text-2xl md:text-3xl font-bold">
        <span className="bg-gradient-to-r from-violet-600 to-blue-600 bg-clip-text text-transparent">
          Career
        </span>
      </h2>

      <div className="space-y-8">
        {/* 각 경력 항목 */}
        <div className="relative pl-8 border-l-2 border-violet-200">
          <div className="absolute -left-2 top-0 h-4 w-4 rounded-full bg-gradient-to-r from-violet-500 to-blue-500" />
          <div className="mb-2">
            <span className="text-sm font-medium text-violet-600">
              2024.06 - 현재
            </span>
          </div>
          <h3 className="text-lg font-bold text-gray-900 mb-2">㈜뉴컨</h3>
          <p className="text-base text-gray-700 mb-2">웹 용역 개발</p>
          <ul className="list-disc list-inside text-gray-600 space-y-1">
            <li>태양광 발전소 관제 시스템 개발</li>
            <li>IoT 기반 사업장 밀집지역 실시간 유해가스 감시 플랫폼 개발</li>
            <li>스마트팜 작물 모델링용 라벨링 시스템 개발</li>
            <li>과학원 특정유해물질 관리 시스템 유지보수</li>
            <li>농업 농촌 기후변화 정보시스템 기능개선 및 유지보수</li>
            <li>국가기상위성센터 위성분석 자료 관리 시스템 개발</li>
            <li>한국공항공사 안전관리 시스템 기능개선</li>
            <li>한국상하수도협회 파이프에셋 시스템 기능개선 및 유지보수</li>
          </ul>
        </div>

        <div className="relative pl-8 border-l-2 border-violet-200">
          <div className="absolute -left-2 top-0 h-4 w-4 rounded-full bg-gradient-to-r from-violet-500 to-blue-500" />
          <div className="mb-2">
            <span className="text-sm font-medium text-violet-600">
              2023.10 - 2024.05
            </span>
          </div>
          <h3 className="text-lg font-bold text-gray-900 mb-2">구디아카데미</h3>
          <p className="text-base text-gray-700 mb-2">
            Java 백엔드 개발자 양성과정 수료
          </p>
          <ul className="list-disc list-inside text-gray-600 space-y-1">
            <li>웹 프론트엔드/백엔드 개발 학습</li>
            <li>팀 프로젝트 수행 및 발표</li>
          </ul>
        </div>

        <div className="relative pl-8 border-l-2 border-violet-200">
          <div className="absolute -left-2 top-0 h-4 w-4 rounded-full bg-gradient-to-r from-violet-500 to-blue-500" />
          <div className="mb-2">
            <span className="text-sm font-medium text-violet-600">
              2020.12 - 2023.03
            </span>
          </div>
          <h3 className="text-lg font-bold text-gray-900 mb-2">㈜피엔티</h3>
          <p className="text-base text-gray-700 mb-2">PLC 프로그래밍</p>
          <ul className="list-disc list-inside text-gray-600 space-y-1">
            <li>이차전지 코터 장비 설치 및 프로그래밍</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
