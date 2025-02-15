<template>
    <div>
    <ul>
        <li v-for="division in organization.children" :key="division.id">
        <div v-if="!division.isEditing" 
            class="division" 
            @click="toggleDivision(division)"
            @contextmenu.prevent="startEditing(division)"
        >
            {{ division.name }} {{ division.isOpen ? '▼' : '►' }}
        </div>
        <input
            v-else
            v-model="division.name"
            @blur="stopEditing(division)"
            @keyup.enter="stopEditing(division)"
            @keyup.escape="cancelEditing(division)"
            autofocus
            />

        <!-- Список сотрудников -->
        <!-- <ul v-if="division.staff.length && division.isOpen">
            <li v-for="officer in division.staff" :key="officer.id">
            {{ officer.firstName }} {{ officer.lastName }}
            </li>
        </ul> -->

        <transition name="fade">
            <OrganizationTree
            v-if="division.children.length && division.isOpen"
            :organization="division"
            />
        </transition>
        </li>
    </ul>
    </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';

const props = defineProps<{
    organization: Division;
}>();

interface Officer {
    id: number;
    firstName: string;
    lastName: string;
    division: Division;
}

interface Division {
    id: number;
    name: string;
    staff: Officer[];
    children: Division[];
    isOpen?: boolean; 
    isEditing?: boolean;
}

// Функция для раскрытия/сворачивания узла
const toggleDivision = (division: Division) => {
    division.isOpen = !division.isOpen;
};

// Функция для начала редактирования
    const startEditing = (division: Division) => {
    division.isEditing = true;
    };

    // Функция для завершения редактирования
    const stopEditing = (division: Division) => {
    division.isEditing = false;
    };

    // Функция для отмены редактирования
    const cancelEditing = (division: Division) => {
    division.isEditing = false;
    };
</script>

<style lang="scss" scoped>
ul {
    list-style-type: none;
    padding-left: 0px;
}

.division {
    background: none;
    border: none;
    cursor: pointer;
    font-size: 16px;
    padding: 5px;
    text-align: left;
    &:hover {
        background-color: #f0f0f0;
    }
}

/* Анимация для плавного раскрытия/сворачивания */
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.3s, transform 0.3s;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
    transform: translateY(-10px);
}
</style>