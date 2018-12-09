import NotificationService,{NOTIF_WISHLIST_CHANGE} from './notification-service';

let instance = null;
var wishList = [];

var ns = new NotificationService();

class DataService {
    constructor(){
        if(!instance){
            instance = this;
        }
        return instance;
    }

    addWishListItem = item => {
        wishList.push(item);
        ns.postNotification(NOTIF_WISHLIST_CHANGE,wishList);
    }

    removeWishListItem = item => {
        for(var x=0;x<wishList.length;x++){
            if(wishList[x]._id === item._id){
                wishList.splice(x,1);
                ns.postNotification(NOTIF_WISHLIST_CHANGE,wishList);
                break;
            }
        }
    }
}

export default DataService;