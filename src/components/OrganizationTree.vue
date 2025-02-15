<template>
    <div>
    <ul class="subtree" :class="{'root': root}">
        <li v-for="division in organization.children" :key="division.id">
        <div v-if="!division.isEditing" 
            class="division" 
            @click="toggleDivision(division)"
            @contextmenu.prevent="startEditing(division)"
        >
            <RouterLink @click.stop :to="`/division/${division.id}`">{{ division.name }}</RouterLink>
            {{ division.isOpen ? '▼' : '►' }}
        </div>
        <input
            v-else
            v-model="division.name"
            @blur="stopEditing(division)"
            @keyup.enter="stopEditing(division)"
            @keyup.escape="cancelEditing(division)"
            autofocus
            />

        <transition name="fade">
            <OrganizationTree
            v-if="division.children.length && division.isOpen"
            :organization="division"
            :root="false"
            />
        </transition>
        </li>
    </ul>
    </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';
import { RouterLink } from 'vue-router';

const props = defineProps<{
    organization: Division;
    root?: boolean
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
.subtree {
    list-style-type: none;
    padding-left: 10px;
    margin-left: 10px;
    border-left: 1px solid #9cc5ad;
    &.root {
        padding-left: 0px;
        margin-left: 0px;
        border-left: none;
    }
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