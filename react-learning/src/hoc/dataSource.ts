const DataSrouce = {
    getComments() {
        return [{
            name: 'Test',
            comment: 'This is a test'
        },{
            name: 'Demo',
            comment: 'A demo comment'
        }]
    },
    getBlogById(id: number) {
        return {
            name: `blog${id}`,
            id,
            content: `This is a test blog. Its id is ${id}`
        }
    },
    addChangeListener(cb: any) {
        cb()
    },
    removeChangeListener(cb: any) {
        cb()
    }
}

export default DataSrouce