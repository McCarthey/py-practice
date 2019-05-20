import * as React from 'react'
import * as ReactDOM from 'react-dom'
import DataSource from './dataSource'

interface CommentState {
    comments: any
}

interface BlogState {
    blog: any
}

interface HocState {
    data: any
}

// Normal components
// class Comment extends React.Component<any, CommentState> {
//     constructor(props: any) {
//         super(props)
//         this.handleChange = this.handleChange.bind(this)
//         this.state = {
//             comments: DataSource.getComments() 
//         }
//     }

//     componentDidMount() {
//         DataSource.addChangeListener(this.handleChange)
//     }

//     componentWillUnmount() {
//         DataSource.removeChangeListener(this.handleChange)
//     }

//     handleChange() {
//         this.setState({
//             comments: DataSource.getComments()
//         })
//     }

//     render() {
//         return (
//             <div>
//                 {this.state.comments.map((comment: any) => (
//                     <div>
//                         {comment.name}: {comment.comment}
//                     </div>
//                 ))}
//             </div>
//         )
//     }
// }

// class Blog extends React.Component<any, BlogState> {
//     constructor(props: any) {
//         super(props)
//         this.handleChange = this.handleChange.bind(this)
//         this.state = {
//             blog: DataSource.getBlogById(this.props.blogId) 
//         }
//     }

//     componentDidMount() {
//         DataSource.addChangeListener(this.handleChange)
//     }

//     componentWillUnmount() {
//         DataSource.removeChangeListener(this.handleChange)
//     }

//     handleChange() {
//         this.setState({
//             blog: DataSource.getBlogById(this.props.blogId)
//         })
//     }

//     render() {
//         return (
//             <div>
//                 <h3>
//                     {this.state.blog.name}
//                 </h3>
//                 <p>{this.state.blog.content}</p>
//             </div>
//         )
//     }
// }


// Use HOC
function withSubscription(WrappedComponent: any, selectData: any) {
    return class extends React.Component<any, HocState> {
        constructor(props: any) {
            super(props)
            this.handleChange = this.handleChange.bind(this)
            this.state = {
                data: selectData(DataSource, props)
            }
        }

        componentDidMount() {
            DataSource.addChangeListener(this.handleChange)
        }
    
        componentWillUnmount() {
            DataSource.removeChangeListener(this.handleChange)
        }
    
        handleChange() {
            this.setState({
                data: selectData(DataSource, this.props)
            })
        }
        
        render() {
            return <WrappedComponent data={this.state.data} {...this.props} />
        }
    }
}

class Comment extends React.Component<any, any> {
    render() {
        return (
            <div>
                {this.props.data.map((comment: any, index: number) => (
                    <div key={index}>
                        {comment.name}: {comment.comment}
                    </div>
                ))}
            </div>
        )
    }
}

class Blog extends React.Component<any, any> {
    render() {
        return (
        <div>
            <h3>
                {this.props.data.name}
            </h3>
            <p>{this.props.data.content}</p>
        </div>
        )
    }
}

const CommentWithHOC = withSubscription(Comment, (DataSource: any) => DataSource.getComments())
const BlogWithHOC = withSubscription(Blog, (DataSource: any, props: any) => DataSource.getBlogById(props.blogId))

class App extends React.Component {
    render() {
        return (
            <div>
                <h1>This is high-order-component</h1>
                <CommentWithHOC />
                <BlogWithHOC blogId={3} />
            </div>
        )
    }
}

ReactDOM.render(<App />, document.getElementById('app'))
