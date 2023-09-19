<template>
  <div
    class="container mx-auto max-w-prose p-2 min-h-screen flex flex-col items-center justify-center"
  >
    <h1 class="text-5xl tracking-widest">Canvas</h1>
    <div class="p-3">
      <h2 class="text-3xl">Courses</h2>
      <ul>
        <li v-for="course in courses" :key="course.id">
          {{ course.name }}
        </li>
      </ul>
    </div>
    <div>
      <h2 class="text-3xl">Teachers</h2>
      <ul>
        <li v-for="teacher in teachers" :key="teacher.id">
          {{ teacher.firstName + " " + teacher.lastName }}
        </li>
      </ul>
    </div>
    <div>
      <h2 class="text-3xl">Students</h2>
      <ul>
        <li v-for="student in students" :key="student.id">
          {{ student.firstName + " " + student.lastName }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { Course, Teacher, Student } from "./models/school";

const courses = ref([] as Course[]);
const teachers = ref([] as Teacher[]);
const students = ref([] as Student[]);
</script>
