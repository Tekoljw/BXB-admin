import CreativeLoader from "@/components/creative-loader"

export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="flex flex-col items-center space-y-8">
        <CreativeLoader variant="circle" size={60} />
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">
            加载中...
          </h2>
          <p className="text-gray-500 dark:text-gray-400">
            正在为您准备最佳的交易体验
          </p>
        </div>
      </div>
    </div>
  )
}
