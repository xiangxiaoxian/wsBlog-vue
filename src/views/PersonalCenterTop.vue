<template>
    <div class="personal-center-top">
        <div class="personal-center-top-left">{{value}}</div>
        <div class="personal-center-top-right">
            <span></span>
            <span>管理博客</span>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return {
            value:'向瑞的博客'
        }
    }
}
</script>
<style scoped>
*{
    margin: 0;
    padding: 0;
}
.personal-center-top{
    width: 100%;
    height: 100px;
    background-color: rgb(12, 11, 11);
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.personal-center-top-left{
    color: #fff;
    font-size: 20px;
    font-weight: bolder;
    margin-left: 30px;
}
.personal-center-top-right{
    width: 100px;
    height: 25px;
    border: 1px solid #ccc;
    background-color: #ccc;
    border-radius: 3px;
    padding: 5px 0;
    margin-right: 30px;
}
</style>