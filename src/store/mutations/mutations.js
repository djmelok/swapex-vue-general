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
    UPDATE_COINS(state, _value) {
        const value = Object.values(_value).filter(item => typeof item === 'object');
        value.forEach((item, idx) => {
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
                active: item.active
            });
            //     {
            //         id: 0,
            //         logo: 'swx.png',
            //         name: 'SWX',
            //         amount: 0,
            //         fullName: 'Swapex',
            //         fullAmount: 0,
            //         rate: 124.0,
            //         ratePercent: 14.2
            //     },
        });
    }
}