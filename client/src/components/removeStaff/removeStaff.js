import {ref} from 'vue';
import { useStaffStore } from "../stores/staff";
import { useAuthStore } from "../stores/auth";
import { useFeedbackStore } from "../stores/feedback";
import api from '../api';
import router from '../../router'


export function useRemoveStaff(){

    const password = ref('');
    const passwordVisible=ref(false);
    const staff = useStaffStore();
    const auth = useAuthStore();
    const feedback = useFeedbackStore();

    function togglePasswordVisibility(){
        passwordVisible.value=!passwordVisible.value
    }

    async function removeStaff(){

        const self = {
            staffId: auth.getStaffId,
            password: password.value,
        }

        const saleStaff = {
            staffId: staff.currentStaffRemove.staffId,
            name: staff.currentStaffRemove.name
        }

        try{

            const response=await api.delete('auth/admin/remove-user', {data: {self, saleStaff}});
            console.log(response);
            feedback.addNotification("success", response.data.message)
            if(response.status===200) router.push("/dashboard");

        }catch(err){
            console.log(err);
            feedback.addNotification("error", err.response.data.message)
        }

    }

    return {
        password,
        passwordVisible,
        togglePasswordVisibility,
        removeStaff,
    }
}