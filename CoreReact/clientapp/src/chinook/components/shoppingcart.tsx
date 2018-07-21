import * as React from 'react'
import { IChinookStates } from '../common/types'

interface IState{
    expanded: boolean
}

interface IStateFromProps{
    chinookStates: IChinookStates
    checkout: () => void
}

export class ShoppingCart extends React.Component<IStateFromProps, IState> {
    constructor(props: IStateFromProps){
        super(props)
        this.state = {expanded: false}
    }
    
    canCheckOut = () => {
        const s = this.props.chinookStates
        return s.loggedInEmployeeId > 0 && s.selectedCustomerId > 0 &&
            (s.shoppingCart.albumIds.length > 0 || s.shoppingCart.trackIds.length > 0)
    }

    handleCheckout = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        this.props.checkout()
    }

    render(){
        const albumCounter = this.props.chinookStates.shoppingCart.albumIds.length
        const trackCounter = this.props.chinookStates.shoppingCart.trackIds.length
        return (
            <p>
                <span>Albums: {albumCounter}, Tracks: {trackCounter} in shopping cart{'   '}</span> 
                {this.canCheckOut() && (
                    <button className='btn btn-success' onClick={this.handleCheckout}> Check Out </button>
                )}
            </p>
        )
    }
}
