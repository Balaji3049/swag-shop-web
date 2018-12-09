export const NOTIF_WISHLIST_CHANGE = "notif_wishlist_changed";

var observers = {};
let instance = null;

class NotificationService {
    constructor(){
        if(!instance){
            instance = this;
        }
        return instance;
    }

    removeObserver = (observer,notifName) => {
        var obs = observers[notifName];
        
        if(obs){
            for(var x=0;x<obs.length;x++){
                if(observer === obs[x].observer){
                    obs.splice(x,1);
                    observers[notifName] = obs;
                    break;
                }
            }
        }
    }

    postNotification = (notifName,data) => {
        var obs = observers[notifName];
        if(obs){
            for(var x=0;x<obs.length;x++){
                var obj = obs[x]; 
                obj.callback(data);
            }
        }
    }

    addObserver = (notifName,observer,callback) => {
        let obs = observers[notifName];

        if(!obs){
            observers[notifName] = [];
        }

        let obj = {observer:observer,callback:callback};
        observers[notifName].push(obj);
    }
}

export default NotificationService;