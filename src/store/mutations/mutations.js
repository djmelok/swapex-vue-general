import Vue from 'vue'

export default {
    OPEN_SIDEBAR(state) {
        window.document.body.style.overflow = 'hidden';
        state.isOpenSidebar = true;
    },
    CLOSE_SIDEBAR(state) {
        window.document.body.removeAttribute('style');
        state.isOpenSidebar = false;
    },
    HIDE_DATA(state) {
        state.isShowData = false;
    },
    SHOW_DATA(state) {
        state.isShowData = true;
    },
    REMOVE_COIN(state, item) {
        state.coins = state.coins.filter(i => i !== item);
    },
    UPDATE_STATE(state, value) {
        state.course = Number(value.rate);
        const coins = Object.values(value).filter(item => typeof item === 'object');
        coins.forEach((item, idx) => {
            if (!item.active) return;
            Vue.set(state.coins, idx, {
                id: idx,
                logo: item.ico,
                name: item.name,
                amount: item.score,
                fullName: item.fullname,
                fullAmount: 0,
                rate: 121.0,
                ratePercent: 23.0,
                key: item.key,
                multykeys: item.multykeys,
                acts: item.acts,
                standard: item.standard,
                active: item.active
            });
        });
    }
}