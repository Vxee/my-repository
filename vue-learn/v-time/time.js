var Time = {
    // 获得当前时间戳
    getUnix: function(){
        var date = new Date();
        return date.getTime();
    },
    // 获取今天0点0分0秒的时间戳
    getTodayUnix: function(){
        var date = new Date();
        date.setHours(0);
        date.setMinutes(0);
        date.setSeconds(0);
        date.setMilliseconds(0);
        return date.getTime();
    },
    // 获取今年1月1日0点0分0秒的时间
    getYearUnix: function(){
        var date = new Date();
        date.setMonth(0);
        date.setDate(1);
        date.setHours(0);
        date.setMinutes(0);
        date.setSeconds(0);
        date.setMilliseconds(0);
        return date.getTime();
    },
    // 获取标准年月日
    getLastDate: function(time){
        var date = new Date(time);
        var month = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1;
        var day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
        return date.getFullYear() + '-' + month + '-' + day;
    },
    // 转换时间
    getFormatTime: function(timestamp){
        var now = this.getUnix();
        var today = this.getTodayUnix();
        var year = this.getYearUnix();
        var timer = (now - timestamp) / 1000;
        var tip = '';

        if(timer <= 0){
            tip = '刚刚';
        } else if(Math.floor(timer/60) <= 0){
            tip = '刚刚';
        } else if(timer < 3600){
            tip = Math.floor(timer/60) + '分钟前';
        } else if(timer >= 3600 && (timestamp - today >= 0)){
            tip = Math.floor(timer/3600) + '小时前';
        } else if(timer/86400 < 31) {
            tip = Math.ceil(timer/86400) + '天前';
        } else {
            tip = this.getLastDate(timestamp);
        }
        return tip;
    },
    // 已经出生了多少天
    getBirthday(timestamp){
        var now = this.getUnix();
        var timer = (now - timestamp) /1000;
        return '已经出生了' + Math.ceil(timer / 86400) + '天';
    },
    // 出生日期转化为年龄 按一年365天一月31天计算
    getBirthToAge(timestamp){
        var now = this.getUnix();
        var timer = (now -timestamp) / 1000;
        day = Math.ceil(timer / 86400);
        year = Math.floor( day / 365); 
        month = Math.floor((day - year * 365) / 31);
        date = day - year * 365 - month * 31;
        return year + '岁' + month + '月' + date + '天';
    }
}
Vue.directive('time', {
    bind: function(el, binding) {
        el.innerHTML = Time.getFormatTime(binding.value);
        el.__timeout__ = setInterval(function(){
            el.innerHTML = Time.getFormatTime(binding.value);
        },60000);
    },
    unbind: function(el){
        clearInterval(el.__timeout__);
        delete el.__timeout__;
    }
})
Vue.directive('birthday', {
    bind: function(el, binding){
        el.innerHTML = Time.getBirthday(binding.value);
        el.__birthfromnow__ = setInterval(function(){
            el.innerHTML = Time.getBirthday(binding.value);
        },6000);
    },
    unbind:function(el){
        clearInterval(el.__birthfromnow__);
        delete el.__birthfromnow__;
    }
})
Vue.directive('birthtoage', {
    bind: function(el, binding){
        el.innerHTML = Time.getBirthToAge(binding.value);
        el.__birthtoage__ = setInterval(function(){
            el.innerHTML = Time.getBirthToAge(binding.value);
        },6000);
    },
    unbind:function(el){
        clearInterval(el.__birthtoage__);
        delete el.__birthtoage__;
    }
})