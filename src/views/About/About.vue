<template>
    <div class="section-about">
        <div class="about-grid">
            <div class="about-item border-shadow">
                <p class="about-item-title">About Platform</p>
                <div class="about-item-text">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</div>
            </div>
            <div class="about-item border-shadow">
                <p class="about-item-title">About Company</p>
                <div class="about-item-text">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'About'
}
</script>
<style scoped>
    .section-about {
        margin-top: 80px;
    }
    .about-grid {
        display: grid;
        grid-template-columns: 1fr 1fr;
        row-gap: 30px;
        column-gap: 50px;
    }
    .about-item {
        padding: 30px 60px 70px;
        color: #fff;
    }
    .about-item-title {
        font-weight: 700;
        font-size: 15px;
        line-height: 18px;
        margin-bottom: 10px;
    }
    .about-item-text {
        font-weight: 400;
        font-size: 14px;
        line-height: 17px;
    }
</style>