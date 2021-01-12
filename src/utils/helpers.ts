export const changeObjectInArray = (items: Array<any>, itemId: number, changedProp: Object) => {
    return items.map(u => {
        if (u.id === itemId) {
            return {...u, ...changedProp}
        }
        return u;
    })
}