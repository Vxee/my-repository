var app = new Vue({
    el: '#app',
    data: {
        list: [
            {
                id: 1,
                name: 'iphone 7',
                price: 6188,
                count: 1,
                selected: false
            },
            {
                id: 2,
                name: 'ipad pro',
                price: 5888,
                count: 1,
                selected: false
            },
            {
                id: 3,
                name: 'macbook pro',
                price: 21488,
                count: 1,
                selected: false
            }
        ],
        state: 'not all'
    },
    computed: {
        totalPrice: function(){
            var total = 0;
            for(var i = 0; i < this.list.length; i++){
                var item = this.list[i];
                if(item.selected) total+= item.price*item.count;
            }
            return total.toLocaleString();
        }
    },
    methods: {
        handleReduce: function(index){
            if(this.list[index].count === 1) return;
            this.list[index].count--;
        },
        handleAdd: function(index){
            this.list[index].count++;
        },
        handleRemove: function(index){
            this.list.splice(index,1);
        },
        singleSelect: function(index){
            this.list[index].selected = !this.list[index].selected;
            for(var i = 0; i < this.list.length; i++){
                if(!this.list[i].selected){
                    this.state = 'not all';
                    return;
                }
            }
            this.state = 'all'
        },
        selectAll: function(){
            this.state = 'all';
            for(var i = 0; i < this.list.length; i++){
                this.list[i].selected = true;
            }
        },
        notSelectAll: function(){
            this.state = 'not all';
            for(var i = 0; i < this.list.length; i++){
                this.list[i].selected = false;
            }
        }
    }
})