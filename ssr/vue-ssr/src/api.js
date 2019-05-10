// 模拟api
export const fetchItem = (id) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                id,
                title: `Item ${id}'s title`
            })
        }, time)
    })
}