import React from 'react'
import './index.css'
interface IProps {}
interface IState {
    // currentType: String
}
const win:any = window
export default class Sticky extends React.Component<IProps, IState> {
    placeHolderRef:any = React.createRef()
    contentRef:any = React.createRef()
    handleScroll = () => {
        console.log(this.placeHolderRef.current.getBoundingClientRect().top)
        let placeHolderRef = this.placeHolderRef.current
        let contentRef = this.contentRef.current
        let top = placeHolderRef.getBoundingClientRect().top
        if (top <= 0) {
            placeHolderRef.style.height = '40px'
            contentRef.classList.add('fixed')
        } else {
            placeHolderRef.style.height = '0'
            contentRef.classList.remove('fixed')
        }
    }
    componentDidMount() {
        win.addEventListener('scroll',this.handleScroll)
    }
    componentWillUnmount() {
        win.removeEventListener('scroll',this.handleScroll)
    }
    render() {
        return (
            <div>
                <div ref={this.placeHolderRef}></div>
                <div ref={this.contentRef}>
                    {this.props.children}
                </div>
            </div>
        )
    }
}
