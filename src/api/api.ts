import axios from "axios";


export const instance = axios.create({
    withCredentials: true,
    headers: {
        "API-KEY": "226ab278-2dfb-4ab9-ae80-f2d3924748f4"
    },
    baseURL: `https://social-network.samuraijs.com/api/1.0/`
})

export const usersAPI = {
    getUsers (currentPage: number = 1, pageSize: number = 100) {
        return instance.get(`users?page=${currentPage}&count=${pageSize}`)
            .then(response => response.data)
    },
    follow(id:number) {
        return instance.post(`follow/${id}`)
            .then(response => response.data)
    },
    unfollow(id:number) {
        return instance.delete(`follow/${id}`)
            .then(response => response.data)
    },
    openUserProfile(id: string) {
        console.log("This method is obsolete, use the same method from profileAPI")
        return profileAPI.openUserProfile(id)
    }
}

export const profileAPI = {
    openUserProfile(id: string) {
        return instance.get(`profile/${id}`)
    },
    getStatus(userId: string) {
        return instance.get(`profile/status/${userId}`)
    },
    updateStatus(status: string) {
        return instance.put(`profile/status`,{status: status})
    }
}

export const authAPI = {
    authMe() {
        return instance.get(`auth/me`)
            .then(response => response.data)
    }
}
