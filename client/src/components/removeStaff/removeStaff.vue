<template>

    <div class="remove-staff-container">

        <form @submit.prevent="removeStaff()">

            <div class="form-header">

                <div class="form-header-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                        stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                        class="lucide lucide-x-icon lucide-x">
                        <path d="M18 6 6 18" />
                        <path d="m6 6 12 12" />
                    </svg>
                </div>
                <h1 class="form-header-text">Remove {{ staff.currentStaffRemove.name }} ?</h1>

            </div>

            <label class="password-label">

                Password
                <div class="password-container">
                    <input :type="passwordVisible?'text':'password'" class="password" placeholder="Enter Admin Password" v-model="password" required>

                    <button class="toggle-password-visibility" type="button" @click="togglePasswordVisibility">

                        <svg v-if="passwordVisible" data-testid="geist-icon" height="16" stroke-linejoin="round" viewBox="0 0 16 16"
                            width="16">
                            <path fill-rule="evenodd" clip-rule="evenodd"
                                d="M4.02168 4.76932C6.11619 2.33698 9.88374 2.33698 11.9783 4.76932L14.7602 7.99999L11.9783 11.2307C9.88374 13.663 6.1162 13.663 4.02168 11.2307L1.23971 7.99999L4.02168 4.76932ZM13.1149 3.79054C10.422 0.663244 5.57797 0.663247 2.88503 3.79054L-0.318359 7.5106V8.48938L2.88503 12.2094C5.57797 15.3367 10.422 15.3367 13.1149 12.2094L16.3183 8.48938V7.5106L13.1149 3.79054ZM6.49997 7.99999C6.49997 7.17157 7.17154 6.49999 7.99997 6.49999C8.82839 6.49999 9.49997 7.17157 9.49997 7.99999C9.49997 8.82842 8.82839 9.49999 7.99997 9.49999C7.17154 9.49999 6.49997 8.82842 6.49997 7.99999ZM7.99997 4.99999C6.34311 4.99999 4.99997 6.34314 4.99997 7.99999C4.99997 9.65685 6.34311 11 7.99997 11C9.65682 11 11 9.65685 11 7.99999C11 6.34314 9.65682 4.99999 7.99997 4.99999Z"
                                fill="currentColor"></path>
                        </svg>

                        <svg  v-else data-testid="geist-icon" height="16" stroke-linejoin="round"
                            viewBox="0 0 16 16" width="16">
                            <path fill-rule="evenodd" clip-rule="evenodd"
                                d="M0.191137 2.06228L0.751694 2.56055L14.2517 14.5605L14.8122 15.0588L15.8088 13.9377L15.2482 13.4394L13.4399 11.832L16.3183 8.48938V7.51059L13.1149 3.79053C10.6442 0.921301 6.36413 0.684726 3.59378 3.07992L1.74824 1.43943L1.18768 0.941162L0.191137 2.06228ZM14.7602 7.99998L12.3187 10.8354L10.6699 9.36978C11.249 8.24171 11.0661 6.82347 10.1213 5.87865C9.08954 4.8469 7.49326 4.72376 6.32676 5.50923L4.72751 4.08767C6.88288 2.36327 10.1023 2.59076 11.9783 4.76931L14.7602 7.99998ZM7.52702 6.57613L9.46929 8.30259C9.56713 7.82531 9.43091 7.30959 9.06063 6.93931C8.64578 6.52446 8.0484 6.4034 7.52702 6.57613ZM-0.318359 7.51059L1.40386 5.5106L2.54051 6.48938L1.23971 7.99998L4.02168 11.2307C5.52853 12.9805 7.90301 13.4734 9.89972 12.7017L10.4405 14.1008C7.88008 15.0904 4.82516 14.4625 2.88503 12.2094L-0.318359 8.48938V7.51059Z"
                                fill="currentColor"></path>
                        </svg>

                    </button>

                </div>

            </label>

            <button class="remove-staff" type="submit">Remove Staff</button>

            <router-link to="Dashboard">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                    class="lucide lucide-move-left-icon lucide-move-left">
                    <path d="M6 8L2 12L6 16" />
                    <path d="M2 12H22" />
                </svg>
                Back to Dashboard
            </router-link>

        </form>

    </div>

</template>

<style scoped src="./removeStaff.css"></style>

<script setup>

    import {useRemoveStaff} from "./removeStaff.js"
    import { useStaffStore } from "../stores/staff.js";

    const staff = useStaffStore();
    
    const {
        password,
        passwordVisible,
        togglePasswordVisibility,
        removeStaff,
    }=useRemoveStaff();

</script>