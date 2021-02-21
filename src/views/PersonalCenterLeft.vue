<template>
    <div class="person-center-left">
        <div class="person-center-left-1">
            <div class="person-center-left-top">
                <img src="#" alt="" class="head-photo">
                <div class="person-center-left-top-frist">
                    <div class="person-center-left-top-frist-div1">{{user}}</div>
                    <div class="person-center-left-top-frist-div2">码龄{{age}}年</div>
                </div>
            </div>
            <div class="person-center-left-top-two">
                <span></span>
                <span>暂无认证</span>
            </div>
        </div>
        <div class="person-center-midd">
            <div class="person-center-midd-first">
                <div>{{original}}</div>
                <div>原创</div>
            </div>
            <div class="person-center-midd-first">
                <div>{{weeksRankings}}</div>
                <div>周排名</div>
            </div>
            <div class="person-center-midd-first">
                <div>{{totalRankings}}</div>
                <div>总排名</div>
            </div>
            <div class="person-center-midd-first">
                <div>{{visit}}</div>
                <div>访问</div>
            </div>
            <div class="person-center-midd-first">
                <div>{{grade}}</div>
                <div>等级</div>
            </div>
        </div>
        <div class="person-center-footer">
            <div class="person-center-footer-three">
                <div>{{integrate}}</div>
                <div>积分</div>
            </div>
            <div class="person-center-footer-three">
                <div>{{fans}}</div>
                <div>粉丝</div>
            </div>
            <div class="person-center-footer-three">
                <div>{{praise}}</div>
                <div>获赞</div>
            </div>
            <div class="person-center-footer-three">
                <div>{{comment}}</div>
                <div>评论</div>
            </div>
            <div class="person-center-footer-three">
                <div>{{collect}}</div>
                <div>收藏</div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return {
            user:'龙景熊',
            age:0,
            original:0,
            weeksRankings:'-',
            totalRankings:'-',
            visit:0,
            grade:0,
            integrate:0,
            fans:0,
             praise:0,
             comment:0,
             collect:0,
        }
    },
}
</script>
<style scoped>
    .person-center-left{
        width: 300px;
        height: 230px;
        background-color: white;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        /* align-items: center; */
       padding-left: 20px;
    }
    .person-center-left-1{
        display: flex;
    }
    .person-center-left-top{
        display: flex;
        align-content: center;
    }
    .head-photo{
        width: 48px;
        height: 48px;
        border-radius: 50%;
        background-color: #ccc;
    }
    .person-center-left-top-frist{
        padding-top: 5px;
        margin-left: 6px;
    }
    .person-center-left-top-frist-div1{
        font-size: 14px;
        font-weight: 500;
        line-height: 20px;
    }
    .person-center-left-top-frist-div2{
        color: #999aaa;
        font-size: 13px;
        line-height: 20px;
    }
    .person-center-left-top-two{
        display: flex;
        color: #555666;
        cursor: pointer;
        font-size: 13px;
        margin-left: 5px;
        align-items: center;
        margin-top: 20px;
    }
    .person-center-midd{
        width: 280px;
        display: flex;
        justify-content: space-between;
        border-bottom: 1px solid #f5f6f7;
        padding: 10px 0;

    }
    .person-center-midd-first{
        display: flex;
        flex-direction: column;
        align-items: center;

    }
    .person-center-midd-first div{
        padding: 4px 0;
    }
    .person-center-footer{
        width: 280px;
        display: flex;
        justify-content: space-between;
        padding: 10px 0;
    }
    .person-center-footer-three{
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    .person-center-footer-three div{
        padding: 4px 0;
    }
</style>