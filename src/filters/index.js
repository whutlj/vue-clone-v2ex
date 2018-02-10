export function dateHelper(timestamp){
    var result = '';
            var now = Date.parse(new Date()) / 1000;
            var seconds = now - timestamp;//获取秒数
            if(seconds < 1){
                result+= '刚刚';
                return result;
            }
            if(seconds  <10){
                result += '几秒前';
                return result;
            }
            var minutes = seconds / 60;
            if(minutes < 1){
                result += Math.floor(seconds) + '秒钟前';
                return result;
            }
            var hours = minutes / 60;
            if(hours < 1){
                result += Math.floor(minutes) + '分钟前';
                return result;
            }
            var days = hours / 24;
            if(days < 1){
                result += Math.floor(hours) + '小时前';
                return result;
            }else{
                result += Math.floor(days) + '天前';
                return result;
            }
}

export function toLocale(timestamp){
            console.log(timestamp);
            var last_reply = new Date()
            last_reply.setTime(timestamp * 1000);
            return last_reply.toLocaleString();
            
        }