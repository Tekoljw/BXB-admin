            )}
          </div>
        )
      
      default:
        return (
          <div className={`${cardStyle} rounded-lg overflow-hidden`}>
            <div className="p-6">
              <div className="text-center text-gray-500">
                <p>暂无数据</p>
              </div>
            </div>
          </div>
        )
    }
  }