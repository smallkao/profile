export  interface ProjectOverview {
  id: number //
  title: string // 專案名稱
  description: string // 專案描述
  technologies: string[] // 使用的技術關鍵字
  websiteUrl?: string // 專案官方網站或預覽網址，可選
  techNature: string[]
  nature: string[]
  images?: ImageResource[] // 專案相關圖片
  course?: string[] // 專案相關圖片
}
