
import * as firebase from 'firebase';

export const unreadMessage = (id) => {
    firebase.database().ref().child(`orders/${id}/read/`).update({read: false});
}

export const readMessage = (id) => {
    // firebase.database().ref().child(`orders/${id}/read/`).push({read: true});
}
export const scrollbar = (list) => {
    if(list.length >= 10){
        return true;
    }else{
        return false
    }
};

export const getNumbers = list => {
    const arr = [];
    let numberOfRead, numberOfUnread, overAllNumber;
    overAllNumber = list.length;
    list.map(el => {
        if(el.data.read.read){
            arr.push(el);
        }
        return arr;
    });
    numberOfRead = arr.length
    numberOfUnread = overAllNumber - numberOfRead;
    return {
        overAllNumber,
        numberOfRead,
        numberOfUnread
    };
};

export const textLength = sentence => {
    const textArr = [];
    let text;
    if(sentence){
        sentence.split(' ').map(word => {
            textArr.push(word);
            if(textArr.join('').length <= 30){
                text = textArr.join(' ');
            }
        });
    }
    return text + '...';
}

export const getTime = (year, month, day, hours, minutes) => {
    const date = new Date();
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    let  time = 'now';

    if(date.getFullYear() === year){
            if(date.getDate() === day){
            if(date.getHours() === hours){
                if(date.getMinutes() === minutes || date.getMinutes() < minutes){
                    return time = ' now';
                }

                if(date.getMinutes() > minutes){
                    return time = date.getMinutes() - minutes + 'min'
                }

            }else if(date.getHours() > hours){
                return time = date.getHours() - hours + 'hrs';   
            }
        }else if(date.getDate() > day){
            if((date.getDate() - day) < 3){
                if(date.getDate() - day){
                    return time = '1 day';
                }else{
                    return time = (date.getDate() - day) + 'days';
                }
                
            }else{
                return time =  day + ' ' + months[month - 1];
            }
        }
  
    }else{
        return time = day + '/ ' + months[month - 1] + '/ ' + year;
    }

    return time;

};