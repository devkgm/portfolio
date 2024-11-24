import { FaBirthdayCake, FaMapMarkerAlt, FaEnvelope, FaUser, FaPhone } from 'react-icons/fa';

export default function AboutMe() {
  return (
    <div className="mb-12 overflow-hidden rounded-2xl bg-white/70 p-6 md:p-8 shadow-lg backdrop-blur-sm">
      <h2 className="mb-6 md:mb-8 text-2xl md:text-3xl font-bold">
        <span className="bg-gradient-to-r from-violet-600 to-blue-600 bg-clip-text text-transparent">
          About Me
        </span>
      </h2>
      <div className="grid gap-6 md:gap-8 md:grid-cols-2">
        <div className="space-y-4 md:space-y-6">
          <div className="group flex items-center gap-4 rounded-xl bg-white p-4 shadow-md transition-all hover:-translate-y-1 hover:shadow-lg">
            <div className="flex h-10 w-10 md:h-12 md:w-12 items-center justify-center rounded-xl bg-gradient-to-br from-violet-400 to-violet-600 text-white shadow-lg transition-transform group-hover:scale-110">
              <FaUser className="h-5 w-5 md:h-6 md:w-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">이름</p>
              <p className="text-base md:text-lg font-semibold text-gray-900">김경모</p>
            </div>
          </div>
          
          <div className="group flex items-center gap-4 rounded-xl bg-white p-4 shadow-md transition-all hover:-translate-y-1 hover:shadow-lg">
            <div className="flex h-10 w-10 md:h-12 md:w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-400 to-blue-600 text-white shadow-lg transition-transform group-hover:scale-110">
              <FaBirthdayCake className="h-5 w-5 md:h-6 md:w-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">생년월일</p>
              <p className="text-base md:text-lg font-semibold text-gray-900">1999년 8월 6일</p>
            </div>
          </div>

          <div className="group flex items-center gap-4 rounded-xl bg-white p-4 shadow-md transition-all hover:-translate-y-1 hover:shadow-lg">
            <div className="flex h-10 w-10 md:h-12 md:w-12 items-center justify-center rounded-xl bg-gradient-to-br from-yellow-400 to-yellow-600 text-white shadow-lg transition-transform group-hover:scale-110">
              <FaPhone className="h-5 w-5 md:h-6 md:w-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">전화번호</p>
              <p className="text-base md:text-lg font-semibold text-gray-900">010-2376-5607</p>
            </div>
          </div>
        </div>
        
        <div className="space-y-4 md:space-y-6">
          <div className="group flex items-center gap-4 rounded-xl bg-white p-4 shadow-md transition-all hover:-translate-y-1 hover:shadow-lg">
            <div className="flex h-10 w-10 md:h-12 md:w-12 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-400 to-emerald-600 text-white shadow-lg transition-transform group-hover:scale-110">
              <FaMapMarkerAlt className="h-5 w-5 md:h-6 md:w-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">위치</p>
              <p className="text-base md:text-lg font-semibold text-gray-900">경기도 부천시</p>
            </div>
          </div>
          
          <div className="group flex items-center gap-4 rounded-xl bg-white p-4 shadow-md transition-all hover:-translate-y-1 hover:shadow-lg">
            <div className="flex h-10 w-10 md:h-12 md:w-12 items-center justify-center rounded-xl bg-gradient-to-br from-rose-400 to-rose-600 text-white shadow-lg transition-transform group-hover:scale-110">
              <FaEnvelope className="h-5 w-5 md:h-6 md:w-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">이메일</p>
              <a 
                href="mailto:gm.kim333@gmail.com" 
                className="text-base md:text-lg font-semibold text-blue-600 transition-colors hover:text-blue-700 hover:underline"
              >
                gm.kim333@gmail.com
              </a>
            </div>
          </div>

          
        </div>
      </div>
    </div>
  );
} 