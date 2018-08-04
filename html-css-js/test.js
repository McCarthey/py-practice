const posts = [
    { id: 1, upVotes: 2 },
    { id: 2, upVotes: 89 },
    { id: 3, upVotes: 1 }
]

const totalUpvotes = posts.reduce((totalUpvotes, currentPost) => {
	totalUpvotes + currentPost.upVotes, 0
})

console.log(totalUpvotes)