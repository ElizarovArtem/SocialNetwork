import axios from "axios";


export const instance = axios.create({
    withCredentials: true,
    headers: {
        "API-KEY": "99c9c733-db8a-44c7-9158-dadaf379aa0f"
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
    },
    updatePhoto(photoFile: File) {
        const formData = new FormData()
        formData.append('image', photoFile)
        return instance.put(`profile/photo`, formData, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        })
    }
}

export type LogInSettingsType = {
    email: string
    password: string
    rememberMe: boolean
}
export const authAPI = {
    authMe() {
        return instance.get(`auth/me`)
            .then(response => response.data)
    },
    logIn(email: string, password: string, rememberMe: boolean) {
        return instance.post(`auth/login`, {email, password, rememberMe})
    },
    logOut() {
        return instance.delete(`auth/login`)
    }
}
