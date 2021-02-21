<template>
    <div class="personal-center">
        <PersonalCenterTop></PersonalCenterTop>
        <div class="personal-center-2">
            <div>
                 <PersonalCenterLeft></PersonalCenterLeft>
                 <Search></Search>
            </div>
            <PersonalCenterRight class="personal-center-3"></PersonalCenterRight>
        </div>
    </div>
</template>
<script>
export default {
    components:{
        PersonalCenterTop:()=>import('./PersonalCenterTop'),
        PersonalCenterLeft:()=>import('./PersonalCenterLeft'),
        Search:()=>import('./search'),
        PersonalCenterRight:()=>import('./PersonalCenterRight')
    }
}
</script>
<style scoped>
*{
    margin: 0;
    padding: 0;
}
.personal-center{
    width: 100%;
    background-color: #ccc;
    padding: 10px;
}
.personal-center-2{
    width: 95%;
    display: flex;
    /* justify-content: center; */
    margin: 0 auto;
}
.personal-center-3{
    margin-left: 10px;
}
</style>