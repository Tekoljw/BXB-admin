export default function Loading() {
  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="bg-slate-800 rounded-2xl p-6 animate-pulse">
            <div className="h-20 bg-slate-700 rounded"></div>
          </div>
        ))}
      </div>
      <div className="bg-slate-800 rounded-2xl p-6 mb-8 animate-pulse">
        <div className="h-40 bg-slate-700 rounded"></div>
      </div>
      <div className="bg-white rounded-lg p-6 animate-pulse">
        <div className="h-96 bg-gray-200 rounded"></div>
      </div>
    </div>
  )
}
