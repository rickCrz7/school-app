<template>
    <div class="p-4 items center">
        <div class="flex justify-center m-4">
            <h1 class="text-5xl tracking-widest">Classroom</h1>
        </div>
    </div>
    <div class="container mx-auto p-12 min-h-screen flex flex-col">
        <div class="sec p-4">
            <h2 class="flex justify-center mb-2">Courses</h2>
            <input
                v-model="cName"
                type="text"
                class="w-full border-2 border-gray-300 p-2 rounded-md mb-2"
                placeholder="Course Name"
            />
            <div class="grid grid-cols-2 gap-2">
                <div class="third p-2">
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
                            class="grid grid-rows-[1fr,auto] w-full text-left hover:bg-blue-400 p-1 px-2 rounded-sm border-2 border-gray-500 border-opacity-0 hover:border-opacity-100 cursor-"
                        >
                            {{ teacher.firstName }} {{ teacher.lastName }}
                        </li>
                    </ul>
                </div>
                <div class="third p-2">
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
            </div>
            <button
                class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full mt-2"
                @click="AddCourses"
            >
                Add Course
            </button>
            <ul>
                <li v-for="course in courses" :key="course.id">
                    {{ course.name }}
                </li>
            </ul>
        </div>
        <!-- <div class="sec p-4">
            <h2 class="flex justify-center">Teachers</h2>
            <input
                v-model="tName"
                type="text"
                class="w-full border-2 border-gray-300 p-2 rounded-md"
                placeholder="Add a new teacher"
                @keyup.enter="AddTeacher"
            />
            <ul>
                <li v-for="teacher in teachers" :key="teacher.id">
                    {{ teacher.firstName }} {{ teacher.lastName }}
                </li>
            </ul>
        </div>
        <div class="sec p-4">
            <h2 class="flex justify-center">Students</h2>
            <input
                v-model="sName"
                type="text"
                class="w-full border-2 border-gray-300 p-2 rounded-md"
                placeholder="Add a new student"
                @keyup.enter="AddStudents"
            />
            <ul>
                <li v-for="student in students" :key="student.id">
                    {{ student.firstName }} {{ student.lastName }}
                </li>
            </ul>
        </div> -->
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

const itemSelected = ref(false)

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

const AddStudentToCourse = (student: Student) => {
    studentSelect.value.push(student)
}

const RemoveStudentFromCourse = (student: Student) => {
    studentSelect.value = studentSelect.value.filter((s) => s.id !== student.id)
    
}
</script>
