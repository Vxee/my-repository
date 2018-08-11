Vue.directive('clickoutside', {
    bind: function(el, binding, vnode){
        function documentHandler(e){
            if(el.contains(e.target)){
                return false;
            }
            if(binding.expression){
                binding.value(e);
            }
        }
        if(binding.modifiers.esc){
            function keyboardHandler(e){
                if(binding.expression && e.keyCode === 27){
                    binding.value(e);
                }
            }
            el.__vueKeyBoard__ = keyboardHandler;
            document.addEventListener('keydown', keyboardHandler);
        }
        
        el.__vueClickOutside__ = documentHandler;
        
        document.addEventListener('click', documentHandler);
        
    },
    unbind: function(el, binding){
        document.removeEventListener('click', el.__vueClickOutside__);
        delete el.__vueClickOutside__;
        if(binding.modifiers.esc){
            document.removeEventListener('keydown', el.__vueKeyBoard__);
            delete el.__vueKeyBoard__;
        }
        
    },
    update: function(el, binding){
        binding.expression = binding.expression === "handleClose" ? "" : "handleClose";
    }
})