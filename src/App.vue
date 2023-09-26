<template>
    <div class="p-4 items center">
        <div class="flex justify-center mt-4">
            <h1 class="text-5xl tracking-widest">School</h1>
        </div>
    </div>
    <div class="container mx-auto p-12 min-h-screen flex flex-col">
        <div
            class="sec p-4 rounded-t-lg grid grid-cols-2 cursor-pointer"
            @click="showAddToggle"
        >
            <h2 class="flex justify-self-auto mb-2">Add Course</h2>
            <span class="flex justify-end items-center">
                <i
                    class="i-mdi:plus-circle-outline text-2xl cursor-pointer hover:text-blue-400"
                    @click="showAddToggle"
                ></i>
            </span>
        </div>
        <div v-show="showAdd" class="sec p-4 rounded-b-lg">
            <input
                v-model="cName"
                type="text"
                class="w-full border-2 border-gray-300 p-2 rounded-md mb-2"
                placeholder="Course Name"
            />
            <div class="grid grid-cols-2 gap-2">
                <div class="third p-2 rounded-md">
                    <h3 class="flex justify-center mb-2">Teachers</h3>
                    <input
                        v-model="tName"
                        type="text"
                        class="w-full border-2 border-gray-300 p-2 rounded-md"
                        placeholder="Add a new teacher"
                        @keyup.enter="AddTeacher"
                    />
                    <ul class="mt-2">
                        <li
                            v-for="teacher in teachers"
                            :key="teacher.id"
                            class="grid grid-rows-[1fr,auto] w-full text-left hover:bg-blue-400 p-1 px-2 rounded-sm border-2 border-gray-500 border-opacity-0 hover:border-opacity-100 cursor-pointer"
                            @click="AddTeacherToCourse(teacher)"
                        >
                            {{ teacher.firstName }} {{ teacher.lastName }}
                        </li>
                    </ul>
                </div>
                <div class="third p-2 rounded-md">
                    <h3 class="flex justify-center mb-2">Students</h3>
                    <input
                        v-model="sName"
                        type="text"
                        class="w-full border-2 border-gray-300 p-2 rounded-md"
                        placeholder="Add a new student"
                        @keyup.enter="AddStudents"
                    />
                    <ul class="mt-2">
                        <li
                            v-for="student in students"
                            :key="student.id"
                            class="grid grid-rows-[1fr,auto] w-full text-left hover:bg-blue-400 p-1 px-2 rounded-sm border-2 border-gray-500 border-opacity-0 hover:border-opacity-100 cursor-pointer"
                            @click="AddStudentToCourse(student)"
                        >
                            {{ student.firstName }} {{ student.lastName }}
                        </li>
                    </ul>
                </div>
                <div class="third p-2 rounded-md">
                    <h3 class="flex mb-2 pl-2">Teachers Selected</h3>
                    <ul class="mt-2">
                        <li
                            v-for="teacher in teacherSelect"
                            :key="teacher.id"
                            class="grid grid-rows-[1fr,auto] w-full text-left hover:bg-red-400 p-1 px-2 rounded-sm border-2 border-gray-500 border-opacity-0 hover:border-opacity-100 cursor-pointer"
                            @click="DeselectTeacher(teacher)"
                        >
                            {{ teacher.firstName }} {{ teacher.lastName }}
                        </li>
                    </ul>
                </div>
                <div class="third p-2 rounded-md">
                    <h3 class="flex mb-2 pl-2">Students Selected</h3>
                    <ul class="mt-2">
                        <li
                            v-for="student in studentSelect"
                            :key="student.id"
                            class="grid grid-rows-[1fr,auto] w-full text-left hover:bg-red-400 p-1 px-2 rounded-sm border-2 border-gray-500 border-opacity-0 hover:border-opacity-100 cursor-pointer"
                            @click="DeselectStudent(student)"
                        >
                            {{ student.firstName }} {{ student.lastName }}
                        </li>
                    </ul>
                </div>
            </div>
            <button
                class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full mt-2"
                @click="AddCourses"
            >
                Add Course
            </button>
        </div>
        <div
            v-for="course in courses"
            v-show="courses.length !== 0"
            :key="course.id"
            class="card mt-4"
        >
            <div class="card-header grid grid-cols-2">
                <h2 class="card-title">{{ course.name }}</h2>
                <span
                    class="card-delete flex justify-end items-center cursor-pointer hover:text-red-400"
                    @click="DeleteCourse(course)"
                    ><i class="i-mdi:trash text-2xl"></i
                ></span>
            </div>
            <div class="card-body">
                <div>
                    <h3>Instructors</h3>
                    <ul>
                        <li
                            v-for="teacher in course.teachers"
                            :key="teacher.id"
                        >
                            {{ teacher.firstName }} {{ teacher.lastName }}
                        </li>
                    </ul>
                </div>
                <div>
                    <h3>Students</h3>
                    <ul>
                        <li
                            v-for="student in course.students"
                            :key="student.id"
                        >
                            {{ student.firstName }} {{ student.lastName }}
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Course, Teacher, Student } from './models/school'

const tName = ref('')
const sName = ref('')
const cName = ref('')

const courses = ref([] as Course[])
const teachers = ref([] as Teacher[])
const students = ref([] as Student[])

const teacherSelect = ref([] as Teacher[])
const studentSelect = ref([] as Student[])

const showAdd = ref(false)

const showAddToggle = () => {
    showAdd.value = !showAdd.value
}

const AddCourses = () => {
    courses.value.push({
        id: Math.random(),
        name: cName.value,
        teachers: teacherSelect.value,
        students: studentSelect.value
    })
    cName.value = ''
    teacherSelect.value = []
    studentSelect.value = []
    console.log(courses.value)
}

const AddTeacher = () => {
    var splitArray = tName.value.split(' ')

    var firstN = splitArray[0]
    var lastN = splitArray[1]
    teachers.value.push({
        id: Math.random(),
        firstName: firstN,
        lastName: lastN
    })

    tName.value = ''
    console.log(teachers.value)
}

const AddStudents = () => {
    var splitArray = sName.value.split(' ')

    var firstN = splitArray[0]
    var lastN = splitArray[1]
    students.value.push({
        id: Math.random(),
        firstName: firstN,
        lastName: lastN
    })

    sName.value = ''
}

const AddTeacherToCourse = (teacher: Teacher) => {
    teacherSelect.value.push(teacher)
}

const DeselectTeacher = (teacher: Teacher) => {
    teacherSelect.value.splice(teacherSelect.value.indexOf(teacher), 1)
}

const AddStudentToCourse = (student: Student) => {
    studentSelect.value.push(student)
}

const DeselectStudent = (student: Student) => {
    studentSelect.value.splice(studentSelect.value.indexOf(student), 1)
}

const DeleteCourse = (course: Course) => {
    courses.value.splice(courses.value.indexOf(course), 1)
}

// const searchCourseByTeacher = (teacher: Teacher) => {
//     return courses.value.filter((course) => {
//         return course.teachers.includes(teacher)
//     })
// }

// const searchCourseByStudent = (student: Student) => {
//     return courses.value.filter((course) => {
//         return course.students.includes(student)
//     })
// }

// const searchCourseByName = (name: string) => {
//     return courses.value.filter((course) => {
//         return course.name.includes(name)
//     })
// }
</script>
