export function truncateFileName(fileName: string, maxLength = 20) {
    if (fileName.length <= maxLength) return fileName
  
    const extension = fileName.split(".").pop()
    const nameWithoutExtension = fileName.slice(0, fileName.lastIndexOf("."))
  
    if (nameWithoutExtension.length <= maxLength) return fileName
  
    const start = nameWithoutExtension.slice(0, 3)
    const end = nameWithoutExtension.slice(-4)
  
    return `${start}...${end}.${extension}`
  }
  
  