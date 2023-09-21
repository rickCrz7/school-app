export interface Course {
    id: number
    name: string
    teachers: Teacher[]
    students: Student[]
}

export interface Student {
    id: number
    firstName: string
    lastName: string
}

export interface Teacher {
    id: number
    firstName: string
    lastName: string
}
