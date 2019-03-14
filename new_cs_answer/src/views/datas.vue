<template>
    <van-row>
        <div class="top"></div>
        <van-notice-bar>
            我寻思你也没提交试卷啊？看啥看？提交完试卷给你看正确答案
        </van-notice-bar>
        <div>
            <van-card
                    desc="不能查看"
                    title="前端组纳新"
                    :thumb="imageURL[0]"
            >
                <div slot="footer">
                    <van-button size="small" type="warning" @click="look" disabled>查看答案</van-button>
                </div>
            </van-card>
            <van-cell-group>
                <van-cell/>
            </van-cell-group>
        </div>
        <div>
            <van-card
                    desc="不能查看"
                    title="后端组纳新"
                    :thumb="imageURL[1]"
            >
                <div slot="footer">
                    <van-button size="small" type="warning" disabled>查看答案</van-button>
                </div>
            </van-card>
            <van-cell-group>
                <van-cell/>
            </van-cell-group>
        </div>
        <div>
            <van-card
                    desc="不能查看"
                    title="视觉组纳新"
                    :thumb="imageURL[2]"
            >
                <div slot="footer">
                    <van-button size="small" type="warning" disabled>查看答案</van-button>
                </div>
            </van-card>
            <van-cell-group>
                <van-cell/>
            </van-cell-group>
        </div>
        <div>
            <van-card
                    desc="不能查看"
                    title="产品组纳新"
                    :thumb="imageURL[3]"
            >
                <div slot="footer">
                    <van-button size="small" type="warning" disabled>查看答案</van-button>
                </div>
            </van-card>
            <van-cell-group>
                <van-cell/>
            </van-cell-group>
        </div>
        <div>
            <van-card
                    desc="不能查看"
                    title="运营组纳新"
                    :thumb="imageURL[4]"
            >
                <div slot="footer">
                    <van-button size="small" type="warning" disabled>查看答案</van-button>
                </div>
            </van-card>
            <van-cell-group>
                <van-cell/>
            </van-cell-group>
        </div>
        <div>
            <van-card
                    desc="不能查看"
                    title="基础组纳新"
                    :thumb="imageURL[5]"
            >
                <div slot="footer">
                    <van-button size="small" type="warning" disabled>查看答案</van-button>
                </div>
            </van-card>
            <van-cell-group>
                <van-cell/>
            </van-cell-group>
        </div>
        <div class="bottom"></div>
    </van-row>
</template>

<script>
    export default {
        name: 'datas',
        data() {
            return {
                imageURL: [
                    'http://img.creatshare.com/28f33a05c5dc07bcf604d74a3a790ddd.png',
                    'http://img.creatshare.com/fef44741d3dab40b391219258b3b5aae.png',
                    'http://img.creatshare.com/b0cba98aeb6a79ac90296abeed528cbf.png',
                    'http://img.creatshare.com/a241fd4f07f5e74399937f9ac3d9fd24.png',
                    'http://img.creatshare.com/4565a26a47d226cea83750a31f269f74.png',
                    'http://img.creatshare.com/337bbf18333d63758c595ae91363f5c3.png',
                ],
            }
        },
        methods: {
            look() {
                this.$router.push('')
            }
        }
    }
</script>

<style scoped>
</style>
