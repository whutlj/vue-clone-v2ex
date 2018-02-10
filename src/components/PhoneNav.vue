<template>
    <div class="pnav visible-xs-block" >
        <div class="navbar navbar-default">
            <nav class="nav nav-navbar">
            <div class="menu" @click = "showLeftBar">
                <span class="glyphicon glyphicon-menu-hamburger" aria-hidden="true"></span>
            </div>
             <a class="head-title" href="/">
                <span class="title">V2EX CLONE</span>
            </a>
            </nav>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'pnav',
        methods: {
            showLeftBar(){
                //是哟你使用bootstrap
                var $wrapper = $('.container');
                // console.log($wrapper);
                $wrapper.toggleClass('leftopen');
                $('body').toggleClass('noscroll');
            }
        }
    }
</script>
<style>
    .menu{
        display: inline-block;
        height: 50px;
        position: absolute; 
        left: 0;
    }
    .menu .glyphicon{
        font-size: 30px;
        padding: 10px;
    }
    .noscroll{
        overflow-y:hidden;
    }
</style>