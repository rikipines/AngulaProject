export class courses {
    id!: number
    name!: string
    categoryId:number=-1
    lessonsAmount!:number
    dateOfStart!:Date
    syllibus!:string[]
    lecturerId!:number
    image!:string
    way_Of_Learning!:Way_Of_Learning

}
enum Way_Of_Learning {
        Frontaly = 'Frontaly',
        Zoom = 'Zoom',
  }

  