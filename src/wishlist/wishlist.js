import React, { Component} from 'react';
import './wishlist.css';

import DataService from '../services/data-service';
import NotificationService,{NOTIF_WISHLIST_CHANGE} from '../services/notification-service';

import ProductCondensed from '../product-condensed/product-condensed';

let ns = new NotificationService();
class WhisList extends Component {
    
    constructor(props){
        super(props);
        this.state = {wishList:[]};

        //Bind functions
        this.createWishList = this.createWishList.bind(this);
        this.onWishListChanges = this.onWishListChanges.bind(this);
    }
    
    componentDidMount(){
        ns.addObserver(NOTIF_WISHLIST_CHANGE, this, this.onWishListChanges);
    }

    componentWillUnmount(){
        ns.removeObserver(this,NOTIF_WISHLIST_CHANGE);
    }

    onWishListChanges(newWishList){
        this.setState({wishList:newWishList});
    }

    createWishList = () => {
        const list = this.state.wishList.map((product)=>
            <ProductCondensed product={product} key={product._id} />
        );
        return list;
    }


    render(){
        return (
            <div className="card">
                <div className="card-block">
                    <h4 className="card-title">Whish List</h4>
                    <ul className="list-group">
                        {this.createWishList()}
                    </ul>
                </div>
            </div>
        );
    }
}

export default WhisList;